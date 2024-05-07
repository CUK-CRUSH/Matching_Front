export interface ValidationButtonDTO {
  readonly text?: string;
  readonly navigation?: string;
  readonly navigation?: string;
  readonly buttonEnabled?: boolean;
  readonly onStateChange?: () => void;
}

export interface ValidationPrevButtonDTO {
  readonly text?: string;
  readonly navigation?: string;
  readonly onStateChange?: () => void;
}

export interface ValidationTextDTO {
  readonly titleTexts: string[];
  readonly descriptionTexts?: string[];
}
