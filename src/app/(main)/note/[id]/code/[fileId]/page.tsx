'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Editor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

import getFile from '@/apis/file/get-file';

function Code() {
  const { fileId } = useParams();
  const { data: fileInfo } = useQuery({
    queryKey: ['fileInfo', fileId],
    queryFn: () => getFile(+fileId),
  });

  return (
    <div className="h-[717px] w-[1016px] overflow-y-auto rounded-[28px] bg-white p-[20px] shadow-[0_0_30px_0_rgba(0,0,0,0.05)] scrollbar-hide">
      {fileInfo?.language === 'markdown' ? (
        <div className="p-[12px]">
          <ReactMarkdown rehypePlugins={[rehypeHighlight, rehypeRaw]}>{fileInfo?.content}</ReactMarkdown>
        </div>
      ) : (
        fileInfo?.content && (
          <Editor
            width="100%"
            height="100%"
            theme="Github"
            language={fileInfo?.language}
            value={fileInfo?.content}
            options={{
              fontSize: 16,
              domReadOnly: true,
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
