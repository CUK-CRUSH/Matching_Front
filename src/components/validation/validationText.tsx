import { ValidationTextDTO } from '@/type/validation/validation';

export default function ValidationText({ titleTexts, descriptionTexts }: ValidationTextDTO) {
  return (
    <div>
      <div className="ml-2 mt-32 font-bold  text-[#363636]">
        {titleTexts.map((title) => (
          <h2 key={title} className="text-xl font-extrabold mb-2">
            {title}
          </h2>
        ))}
        {descriptionTexts && (
          <div>
            {descriptionTexts.map((text) => (
              <p key={text} className="text-base font-medium">
                {text}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
