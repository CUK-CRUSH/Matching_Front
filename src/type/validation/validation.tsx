export interface ValidationButtonDTO {
  readonly text?: string;
  readonly navigation?: string;
  readonly buttonEnabled?: boolean;
  readonly onStateChange?: () => void;
  readonly rounded?: boolean;
  readonly userExists?: boolean;
}

export interface ValidationPrevButtonDTO {
  readonly text?: React.ReactNode;
  readonly navigation?: string;
  readonly onStateChange?: () => void;
}

export interface ValidationTextDTO {
  readonly titleTexts: string[];
  readonly descriptionTexts?: string[];
  readonly titleTextColor?: string;
  readonly marginTop?: string;
}
