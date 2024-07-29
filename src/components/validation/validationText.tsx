import { ValidationTextDTO } from '@/type/validation/validation';

export default function ValidationText({
  titleTexts,
  descriptionTexts,
  titleTextColor = '#363636',
  marginTop = '6rem',
}: ValidationTextDTO) {
  return (
    <div>
      <div className={`ml-2`} style={{ marginTop: marginTop, color: titleTextColor }}>
        {titleTexts.map((title) => (
          <h2 key={title} className="text-xxl text-text_dary_soft font-bold mb-2">
            {title}
          </h2>
        ))}
        {descriptionTexts && (
          <div>
            {descriptionTexts.map((text) => (
              <p key={text} className="text-base text-local_gray_1 font-medium">
                {text}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
