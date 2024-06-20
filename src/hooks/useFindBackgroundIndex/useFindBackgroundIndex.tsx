import { useState, useEffect } from 'react';

const useFindBackgroundIndex = (currentBackground : string | undefined, backgrounds : string[]) => {
  const [index, setIndex] = useState<number>(-1);

  useEffect(() => {
    if (currentBackground) {
      const splitBackground = currentBackground.split('-');
      const targetElement = splitBackground[3]; // 'yellow'
      const targetIndex = backgrounds.findIndex(bg => bg.includes(targetElement));
      setIndex(targetIndex);
    }
  }, [currentBackground, backgrounds]);

  return index;
};

export default useFindBackgroundIndex;
