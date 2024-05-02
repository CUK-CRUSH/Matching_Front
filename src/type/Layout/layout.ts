export interface LayoutDTO {
  children: React.ReactNode;
  display?: 'header' | 'footer' | 'both' | 'none';
  backgroundColor?: string;
}
