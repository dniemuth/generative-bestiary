export interface IStatFormFields {
  cr?: number;
  size?: string;
  type?: string;
  details?: string;
  model?: 'palm' | 'gpt';
}

export interface IStoryPrompts extends IStatFormFields {
  name?: string;
  alignment?: string;
}