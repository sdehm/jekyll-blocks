import { FolderBlockProps, FileBlockProps } from "@githubnext/blocks";
import { useEffect, useMemo, useState } from "react";
import DOMPurify from "dompurify";

export default function (props: FolderBlockProps) {
  const { tree, onRequestGitHubData } = props;
  const content = tree.find((item) => item.path === "src/_site/index.html");

  const [sanitizedContent, setSanitizedContent] = useState<string>("");

  const getContent = async () => {
    const file = await onRequestGitHubData(content?.url as string);
    const file_content = file.content;
    const sanitizedContent = DOMPurify.sanitize(atob(file_content));
    setSanitizedContent(sanitizedContent);
  };

  useEffect(() => {
    getContent();
  }, []);

  return (
    <div
      style={{
        padding: "25px 20px",
      }}
    >
      <div
        style={{
          all: "initial",
        }}
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </div>
  );
}
