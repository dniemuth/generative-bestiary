import { getQuery } from "ufo";
import {
    STORY_INTRO,
} from "~/utils/promptants";
import { createMessage, createStoryPrompt } from "../../utils/helpers";

export default defineEventHandler(async (event) => {

    const params = getQuery(event?._path ?? "");
    const APIKEY = process.env["GEMINI_APIKEY"] ?? "";
    const basePath = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
    const headers = {
        "Content-Type": "application/json",
        "x-goog-api-key": APIKEY,
    };

    const storyPrompts = createStoryPrompt(params);
    const messageContent = `${STORY_INTRO} ${storyPrompts}`;
    const body = {
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
