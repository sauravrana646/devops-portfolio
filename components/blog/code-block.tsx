"use client";

import { Children, isValidElement, useMemo, useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

function extractText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return extractText(node.props.children);
  }
  return "";
}

export function CodeBlock({
  children,
  className,
  ...props
}: {
  children?: ReactNode;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const text = useMemo(() => extractText(children).replace(/\n$/, ""), [children]);

  async function onCopy() {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="group relative mb-6">
      <pre
        className={cn(
          "overflow-x-auto rounded-md bg-cta p-5 pr-14 text-sm leading-relaxed text-canvas-elevated",
          className,
        )}
        {...props}
      >
        {Children.count(children) ? children : null}
      </pre>
      <button
        type="button"
        onClick={onCopy}
        className="absolute top-3 right-3 inline-flex h-11 w-11 items-center justify-center rounded-md border border-[rgb(247_250_248_/0.18)] bg-[rgb(247_250_248_/0.08)] text-canvas-elevated transition-opacity hover:bg-[rgb(247_250_248_/0.16)] focus-visible:opacity-100 sm:h-8 sm:w-8 md:opacity-0 md:group-hover:opacity-100 [@media(pointer:coarse)]:opacity-100"
        aria-label={copied ? "Copied" : "Copy code"}
      >
        {copied ? <Check className="h-4 w-4" strokeWidth={1.5} /> : <Copy className="h-4 w-4" strokeWidth={1.5} />}
      </button>
    </div>
  );
}
