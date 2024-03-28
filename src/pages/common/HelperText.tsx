import { PropsWithChildren } from 'react';

export default function HelperText({ children }: PropsWithChildren) {
  return <p className="text-gray-400">{children}</p>;
}
