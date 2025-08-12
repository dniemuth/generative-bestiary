import { getQuery } from "ufo";
import { createImaginePrompt } from '../../utils/helpers';
import { IMAGINE_PROMPT_ENDING } from '../../utils/promptants'

export default defineEventHandler(async (event) => {
    const APIKEY = process.env["GPT_APIKEY"] ?? ""

    const params = getQuery(event?._path ?? "");
    const basePath = "https://api.openai.com/v1/images/generations"
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${APIKEY}`,
    };
    const promptStart = createImaginePrompt(params)
    const body = {
        "model": "dall-e-3",
        "prompt": `${promptStart} ${IMAGINE_PROMPT_ENDING}`,
        "n": 1,
        "size": "1024x1024"
    }

    try {
        const res = await fetch(basePath, {
            headers,
            method: "POST",
            body: JSON.stringify(body),
        });
        const result = await res.json();
        console.info(result);
        return result;
        // return 'hello world'
    } catch (err) {
        console.error(err);
        return err;
    }
})