"use client";

import { useEffect } from "react";

/**
 * Injects custom HTML/JS from Site Settings into the page.
 * Scripts inserted via dangerouslySetInnerHTML do NOT execute, so this
 * component parses the markup and re-creates <script> nodes so they run.
 */
export default function CodeInjector({
  code,
  position,
}: {
  code: string;
  position: "header" | "footer";
}) {
  useEffect(() => {
    if (!code || !code.trim()) return;

    const containerId = `injected-${position}-code`;
    if (document.getElementById(containerId)) return;

    const container = document.createElement("div");
    container.id = containerId;
    container.style.display = "contents";

    const temp = document.createElement("div");
    temp.innerHTML = code;

    Array.from(temp.childNodes).forEach((node) => {
      if (node.nodeName === "SCRIPT") {
        const old = node as HTMLScriptElement;
        const script = document.createElement("script");
        Array.from(old.attributes).forEach((attr) =>
          script.setAttribute(attr.name, attr.value)
        );
        script.text = old.text;
        container.appendChild(script);
      } else {
        container.appendChild(node.cloneNode(true));
      }
    });

    if (position === "header") {
      document.head.appendChild(container);
    } else {
      document.body.appendChild(container);
    }

    return () => {
      document.getElementById(containerId)?.remove();
    };
  }, [code, position]);

  return null;
}
