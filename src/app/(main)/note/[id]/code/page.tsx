'use client';

import Editor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

import fileStore from '@/stores/file-store';

function Code() {
  const fileContent = fileStore((state: { content: string }) => state.content);
  const fileLanguage = fileStore((state: { language: string }) => state.language);

  return (
    <div className="scrollbar-hide h-[696px] w-full overflow-y-auto border">
      {fileLanguage === 'markdown' ? (
        <div className="p-[32px]">
          <ReactMarkdown rehypePlugins={[rehypeHighlight, rehypeRaw]}>{fileContent}</ReactMarkdown>
        </div>
      ) : (
        fileContent && (
          <Editor
            width="100%"
            height="100%"
            theme="Github"
            language={fileLanguage}
            value={fileContent}
            options={{
              fontSize: 16,
              readOnly: true,
              minimap: {
                enabled: false,
              },
              overviewRulerLanes: 0,
              renderLineHighlight: 'none',
              scrollbar: {
                vertical: 'hidden',
                horizontal: 'hidden',
              },
            }}
          />
        )
      )}
    </div>
  );
}

export default Code;
