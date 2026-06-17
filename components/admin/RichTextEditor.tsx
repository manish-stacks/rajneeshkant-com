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
          onChange={(content: string, _delta: unknown, source: string) => {
            // Ignore Quill's automatic normalisation on load (source === "api").
            // Only persist real edits the user makes inside Visual mode, so raw
            // HTML pasted in the HTML tab is never silently rewritten.
            if (source === "user") onChange(content);
          }}
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

        /* ── Article-like typography so the editor previews close to the live
              page (Quill loads none of the site CSS otherwise → looks plain). ── */
        .rich-text-editor .ql-editor {
          color: #374151;
          font-size: 1.0625rem;
          line-height: 1.75;
        }
        .rich-text-editor .ql-editor h1,
        .rich-text-editor .ql-editor h2,
        .rich-text-editor .ql-editor h3,
        .rich-text-editor .ql-editor h4,
        .rich-text-editor .ql-editor h5,
        .rich-text-editor .ql-editor h6 {
          color: #0f172a;
          font-weight: 700;
          line-height: 1.25;
          margin: 1.6em 0 0.6em;
        }
        .rich-text-editor .ql-editor > :first-child { margin-top: 0; }
        .rich-text-editor .ql-editor h1 { font-size: 2.1rem; }
        .rich-text-editor .ql-editor h2 { font-size: 1.6rem; }
        .rich-text-editor .ql-editor h3 { font-size: 1.3rem; }
        .rich-text-editor .ql-editor h4 { font-size: 1.1rem; }
        .rich-text-editor .ql-editor p { margin: 0 0 1.1em; }
        .rich-text-editor .ql-editor strong { font-weight: 700; color: #111827; }
        .rich-text-editor .ql-editor a { color: #2563eb; text-decoration: underline; }
        .rich-text-editor .ql-editor ul { list-style: disc; padding-left: 1.6em; margin: 0 0 1.1em; }
        .rich-text-editor .ql-editor ol { list-style: decimal; padding-left: 1.6em; margin: 0 0 1.1em; }
        .rich-text-editor .ql-editor li { margin: 0.35em 0; padding-left: 0.25em; }
        .rich-text-editor .ql-editor blockquote {
          border-left: 4px solid #38bdf8;
          background: #f0f9ff;
          margin: 1.2em 0;
          padding: 0.6em 1.1em;
          color: #475569;
          font-style: italic;
          border-radius: 0 0.5rem 0.5rem 0;
        }
        .rich-text-editor .ql-editor pre,
        .rich-text-editor .ql-editor .ql-code-block-container {
          background: #0f172a;
          color: #e2e8f0;
          border-radius: 0.6rem;
          padding: 1em 1.2em;
          overflow-x: auto;
          font-size: 0.9rem;
        }
        .rich-text-editor .ql-editor img {
          border-radius: 0.75rem;
          max-width: 100%;
          height: auto;
          margin: 1.2em 0;
        }
        .rich-text-editor .ql-editor table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.2em 0;
          display: block;
          overflow-x: auto;
        }
        .rich-text-editor .ql-editor th,
        .rich-text-editor .ql-editor td {
          border: 1px solid #e2e8f0;
          padding: 0.5em 0.75em;
          text-align: left;
        }
        .rich-text-editor .ql-editor th { background: #f8fafc; font-weight: 600; }
        .rich-text-editor .ql-editor hr { border: 0; border-top: 1px solid #e2e8f0; margin: 1.8em 0; }
      `}</style>
    </div>
  );
}