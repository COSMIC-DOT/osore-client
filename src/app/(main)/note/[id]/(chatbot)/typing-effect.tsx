import { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

function CustomParagraph({ node, ...props }: { node: { children: { type: string }[] } }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <p style={{ margin: 0 }} {...props} />;
}

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
    }, 30);

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

  return (
    <ReactMarkdown
      rehypePlugins={[rehypeHighlight, rehypeRaw]}
      components={{
        // @ts-ignore
        p: CustomParagraph,
      }}
    >
      {displayedText}
    </ReactMarkdown>
  );
}

export default TypingEffect;
