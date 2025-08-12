import type { IStatFormFields, IStoryPrompts } from "./types";

export const profCalc = (cr: number) => cr === 0 ? 2 : Math.ceil(cr / 4) + 1;

export const modifierCalc = (score: number) => Math.floor((score - 10) / 2);

export const createMessage = (prompt: IStatFormFields) => {
  const cr = prompt.cr ? `Challenge Rating should be ${prompt.cr}. ` : '';
  const type = prompt.type ? `Type should be ${prompt.type}. ` : '';
  const size = prompt.size ? `Size should be ${prompt.size}. ` : '';
  return `${cr}${type}${size}${prompt.details?.trim() ?? ''}`;
}

export const cleanPALMResponse = (output: string): string =>
  output.replace("```JSON", "").replace("```json", "").replace("```", "");

export const createImaginePrompt = (prompt: IStatFormFields) => {
  const type = prompt.type ? `${prompt.type}. ` : 'enemy that could be fought in dungeons and dragons. ';
  const size = prompt.size ? `a ${prompt.size} ` : 'an ';
  return `Imagine ${size}${type}${prompt.details ? prompt.details.trim() + '. ' : ''}`
}

export const createStoryPrompt = (prompt: IStoryPrompts) => {
  const name = prompt.name ? `The name of the character is ${prompt.name}. ` : '';
  const size = prompt.size ? `The size of the character is ${prompt.size}. ` : '';
  const type = prompt.type ? `The type of the character is ${prompt.type}. ` : '';
  const alignment = prompt.alignment ? `The alignment of the character is ${prompt.alignment}. ` : '';
  return `${name}${size}${type}${alignment}${prompt.details?.trim() ?? ''}`;
}