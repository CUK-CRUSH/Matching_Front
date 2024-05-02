export interface ValidationButtonDTO {
  readonly text?: string;
  readonly navigation: string;
  readonly buttonEnabled?: boolean;
}

export interface ValidationTextDTO {
  readonly titleTexts: string[];
  readonly descriptionTexts?: string[];
}
