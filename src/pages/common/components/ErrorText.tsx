import { PropsWithChildren } from 'react';

export default function ErrorText({ children }: PropsWithChildren) {
  return <p className="text-red-500 p-2">{children}</p>;
}
