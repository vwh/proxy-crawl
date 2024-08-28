import { useState } from "react";
import useStore from "@/store/useStore";

import type { exportType } from "@/types";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

import {
  FileTextIcon,
  FileSpreadsheetIcon,
  FileJsonIcon,
  ClipboardIcon,
  ClipboardCheckIcon
} from "lucide-react";

const SAVE_OPTIONS: { format: exportType; label: string; icon: any }[] = [
  { format: "text", label: "Save as TEXT", icon: FileTextIcon },
  { format: "csv", label: "Save as CSV", icon: FileSpreadsheetIcon },
  { format: "json", label: "Save as JSON", icon: FileJsonIcon }
];

export default function ResultSection() {
  const { results, exportAs } = useStore();
  const [isCopying, setIsCopying] = useState(false);

  const handleSave = (format: exportType) => {
    const exportedData = exportAs(format);
    const blob = new Blob([exportedData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `results.${format}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    setIsCopying(true);
    navigator.clipboard.writeText(results.join("\n"));
    setTimeout(() => setIsCopying(false), 2000);
  };

  return (
    <section className="relative flex grow flex-col gap-4 rounded-lg bg-gray-700 p-4 shadow-md">
      {results.length > 0 && (
        <p className="absolute left-0 top-0 z-50 w-full rounded-t bg-primary p-2 text-sm text-background">
          {results.length} Results
        </p>
      )}
      <Textarea
        placeholder="Crawled results"
        className={`grow resize-none focus:ring-2 focus:ring-blue-500 ${
          results.length ? "mt-8" : "mt-0"
        }`}
        value={results.join("\n")}
        disabled={!results.length}
        readOnly
      />
      <div className="grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-2">
        {SAVE_OPTIONS.map((option) => (
          <Button
            key={option.format}
            className="flex w-full items-center justify-center transition-colors duration-200 ease-in-out"
            variant="outline"
            onClick={() => handleSave(option.format)}
            title={option.label}
            disabled={!results.length}
            spellCheck={false}
          >
            <option.icon className="mr-2" size={18} />
            {option.label}
          </Button>
        ))}
        <Button
          className="flex w-full items-center justify-center transition-colors duration-200 ease-in-out md:col-span-3"
          variant="outline"
          onClick={handleCopy}
          title="Copy results to clipboard"
          disabled={!results.length}
          spellCheck={false}
        >
          {isCopying ? (
            <ClipboardCheckIcon className="mr-2" size={18} />
          ) : (
            <ClipboardIcon className="mr-2" size={18} />
          )}
          Copy to clipboard
        </Button>
      </div>
    </section>
  );
}
