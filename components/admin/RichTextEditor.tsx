"use client";

import { useMemo, useRef, useCallback, useState, forwardRef } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { Code2, Type } from "lucide-react";
import api from "@/lib/axios";

// react-quill-new is a maintained fork of react-quill that removes the
// deprecated ReactDOM.findDOMNode call, so it works with React 18/19 + Next 15.
// We wrap it in forwardRef so the parent can reach the Quill instance
// (quillRef.current.getEditor()) for the custom image-upload handler.
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill-new");
    const Wrapped = forwardRef<unknown, Record<string, unknown>>(
      function QuillWithRef(props, ref) {
        // @ts-expect-error react-quill-new ref typing
        return <RQ ref={ref} {...props} />;
      }
    );
    return Wrapped;
  },
  {
    ssr: false,
    loading: () => (
      <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-10 text-center text-sm text-slate-400">
        Loading editor…
      </div>
    ),
  }
);

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write content here…",
}: RichTextEditorProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const quillRef = useRef<any>(null);
  const [sourceMode, setSourceMode] = useState(false);

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      const editor = quillRef.current?.getEditor?.();
      if (!editor) return;
      const range = editor.getSelection(true);
      const ph = "Uploading image…";
      editor.insertText(range.index, ph, "italic", true);
      try {
        const fd = new FormData();
        fd.append("file", file);
        const res = await api.post("/upload", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        editor.deleteText(range.index, ph.length);
        editor.insertEmbed(range.index, "image", res.data.url);
        editor.setSelection(range.index + 1, 0);
      } catch (err) {
        editor.deleteText(range.index, ph.length);
        alert((err as Error).message || "Image upload failed");
      }
    };
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ font: [] }, { size: ["small", false, "large", "huge"] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ script: "sub" }, { script: "super" }],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ align: [] }, { direction: "rtl" }],
          ["link", "image", "video"],
          ["clean"],
        ],
        handlers: { image: imageHandler },
      },
      clipboard: { matchVisual: false },
    }),
    [imageHandler]
  );

  const formats = [
    "font", "size", "header", "bold", "italic", "underline", "strike",
    "color", "background", "script", "blockquote", "code-block",
    "list", "indent", "align", "direction", "link", "image", "video",
  ];

  return (
    <div className="rich-text-editor">
      {/* Visual / HTML source switch */}
      <div className="mb-2 flex items-center justify-end gap-1">
        <button
          type="button"
          onClick={() => setSourceMode(false)}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
            !sourceMode ? "bg-sky-100 text-sky-700" : "text-slate-500 hover:bg-slate-100"
          }`}
        >
          <Type size={13} /> Visual
        </button>
        <button
          type="button"
          onClick={() => setSourceMode(true)}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
            sourceMode ? "bg-sky-100 text-sky-700" : "text-slate-500 hover:bg-slate-100"
          }`}
        >
          <Code2 size={13} /> HTML
        </button>
      </div>

      {sourceMode ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          className="h-[360px] w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-[13px] leading-relaxed text-emerald-200 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          placeholder="<p>Raw HTML…</p>"
        />
      ) : (
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
        />
      )}

      <style jsx global>{`
        .rich-text-editor .ql-toolbar {
          border-top-left-radius: 0.75rem;
          border-top-right-radius: 0.75rem;
          border-color: #e2e8f0;
          background: #f8fafc;
          position: sticky;
          top: 0;
          z-index: 5;
        }
        .rich-text-editor .ql-container {
          border-bottom-left-radius: 0.75rem;
          border-bottom-right-radius: 0.75rem;
          border-color: #e2e8f0;
          font-size: 0.95rem;
          min-height: 320px;
        }
        .rich-text-editor .ql-editor { min-height: 320px; }
        .rich-text-editor .ql-editor img { border-radius: 0.5rem; max-width: 100%; }
      `}</style>
    </div>
  );
}
