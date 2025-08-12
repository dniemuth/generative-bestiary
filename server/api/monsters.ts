import { getQuery } from "ufo";
import {
  PROMPT_ENDING,
  PROMPT_EXAMPLE,
  PROMPT_INTRO,
  PAYLOAD,
  STORY_INTRO,
} from "~/utils/promptants";
import { createMessage } from "../../utils/helpers";

export default defineEventHandler(async (event) => {
  const ragRes = await fetch(
    `https://api.open5e.com/v1/monsters?${event._path?.split("?")[1] ?? ""}`
  );
  const excludeKeys = [
    "page_no",
    "environments",
    "img_main",
    "document__slug",
    "document__title",
    "document__license_url",
    "document__url",
    "slug",
  ];
  const ragResult = await ragRes.json();
  const cleanedRag = ragResult?.results.map((stat: object) =>
    Object.fromEntries(
      Object.entries(stat).filter(([key]) => !excludeKeys.includes(key))
    )
  );
  console.info(cleanedRag);
  const ragResStr = cleanedRag
    .slice(-2)
    .map((stat: unknown) => JSON.stringify(stat));
  const ragExample = `Example Outputs:\n${ragResStr.join("\n")}`;
  console.info(ragResStr.join("\n"));
  console.info(ragExample);

  const params = getQuery(event?._path ?? "");
  const useGPT = params.model === "gpt";
  const APIKEY = useGPT
    ? process.env["GPT_APIKEY"] ?? ""
    : process.env["PALM_APIKEY"] ?? "";
  const basePath = useGPT
    ? "https://api.openai.com/v1/chat/completions"
    // : "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText";
    :"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
  const headers = {
    "Content-Type": "application/json",
    ...(useGPT
      ? { Authorization: `Bearer ${APIKEY}` }
      : { "x-goog-api-key": APIKEY }),
  };
  const userPrompts = createMessage(params);
  const messageContent = `${PROMPT_INTRO} ${userPrompts} ${PROMPT_ENDING}${ragExample}`;
  const body = useGPT
    ? { ...PAYLOAD, messages: [{ role: "user", content: messageContent }] }
    : {
        contents: {
          parts: {
            text: messageContent,
          }
        },
      };
  try {
    const res = await fetch(basePath, {
      headers,
      method: "POST",
      body: JSON.stringify(body),
    });
    const result = await res.json();
    console.info(result);
    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
});
