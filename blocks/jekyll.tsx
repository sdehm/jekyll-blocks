import { FolderBlockProps, FileBlockProps } from "@githubnext/blocks";
import { useEffect, useMemo, useState } from "react";
import DOMPurify from "dompurify";

export default function (props: FolderBlockProps) {
  const { tree, onRequestGitHubData } = props;
  const content = tree.find((item) => item.path === "src/_site/index.html");
  const cssContent = tree.find(
    (item) => item.path === "src/_site/assets/main.css"
  );

  const [sanitizedContent, setSanitizedContent] = useState<string>("");
  const [css, setCss] = useState<string>("");

  const getContent = async () => {
    const file = await onRequestGitHubData(content?.url as string);
    const sanitizedContent = DOMPurify.sanitize(atob(file.content));
    setSanitizedContent(sanitizedContent);

    const cssFile = await onRequestGitHubData(cssContent?.url as string);
    setCss(atob(cssFile.content));
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
      <style>{css}</style>
      <div
        style={{
          all: "initial",
        }}
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </div>
  );
}
