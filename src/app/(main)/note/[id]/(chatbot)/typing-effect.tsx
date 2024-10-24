import { useEffect, useState, useRef } from 'react';

function TypingEffect({
  text,
  setIsChatTyping,
  chatContainerRef,
}: {
  text: string;
  setIsChatTyping: (isChatTyping: boolean) => void;
  chatContainerRef: React.RefObject<HTMLDivElement>;
}) {
  const [displayedText, setDisplayedText] = useState('');
  const previousHeightRef = useRef<number>(0);

  useEffect(() => {
    let index = 0;
    let newText = '';

    const intervalId = setInterval(() => {
      newText += text[index];
      setDisplayedText(newText);
      index += 1;

      if (index === text.length) {
        clearInterval(intervalId);
        setIsChatTyping(false);
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, [text]);

  useEffect(() => {
    if (chatContainerRef.current) {
      const currentHeight = chatContainerRef.current.scrollHeight;
      if (currentHeight > previousHeightRef.current) {
        // eslint-disable-next-line no-param-reassign
        chatContainerRef.current.scrollTop = currentHeight;
        previousHeightRef.current = currentHeight;
      }
    }
  }, [displayedText]);

  return <div>{displayedText}</div>;
}

export default TypingEffect;
