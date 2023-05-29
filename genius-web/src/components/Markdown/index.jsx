/*
 * @Description:
 * @Version: 2.0
 * @Autor: jinglin.gao
 * @Date: 2023-03-29 17:32:18
 * @LastEditors: jinglin.gao
 * @LastEditTime: 2023-03-31 13:15:52
 */
import ReactMarkdown from "react-markdown";
import "katex/dist/katex.min.css";
import RemarkMath from "remark-math";
import RehypeKatex from "rehype-katex";
import RemarkGfm from "remark-gfm";
import RehypePrsim from "rehype-prism-plus";
import { useRef } from "react";

import "./markdown.css";
export function PreCode(props) {
  const ref = useRef(null);

  return (
    <pre ref={ref}>
      <span
        className="copy-code-button"
        onClick={() => {
          if (ref.current) {
            const code = ref.current.innerText;
            copyToClipboard(code);
          }
        }}
      ></span>
      {props.children}
    </pre>
  );
}
export function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then((res) => {
      //   showToast(Locale.Copy.Success);
      debugger;
    })
    .catch((err) => {
      //   showToast(Locale.Copy.Failed);
    });
}
export function Markdown(props) {
  return (
    <ReactMarkdown
      className="markdown-body"
      remarkPlugins={[RemarkMath, RemarkGfm]}
      rehypePlugins={[RehypeKatex, [RehypePrsim, { ignoreMissing: true }]]}
      components={{
        pre: PreCode,
      }}
    >
      {props.content}
    </ReactMarkdown>
  );
}
