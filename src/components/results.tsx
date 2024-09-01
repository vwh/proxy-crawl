import React, { useState, useCallback, useMemo } from "react";

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

const SAVE_OPTIONS: {
  format: exportType;
  label: string;
  icon: React.ComponentType<any>;
}[] = [
  { format: "text", label: "Save as TEXT", icon: FileTextIcon },
  { format: "csv", label: "Save as CSV", icon: FileSpreadsheetIcon },
  { format: "json", label: "Save as JSON", icon: FileJsonIcon }
];

interface ResultProps {
  results: string[];
}

export default function Results({ results }: ResultProps) {
  const [isCopying, setIsCopying] = useState(false);

  const handleExport = useCallback(
    (format: exportType): string => {
      switch (format) {
        case "text":
          return results.join("\n");
        case "csv":
          return results
            .map((result) => `"${result.replace(/"/g, '""')}"`)
            .join("\n");
        case "json":
          return JSON.stringify(results, null, 2);
        default:
          throw new Error(`Unsupported export format: ${format}`);
      }
    },
    [results]
  );

  const handleSave = useCallback(
    (format: exportType) => {
      const exportedData = handleExport(format);
      const blob = new Blob([exportedData], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `results.${format}`;
      link.click();
      URL.revokeObjectURL(url);
    },
    [handleExport]
  );

  const handleCopy = useCallback(() => {
    setIsCopying(true);
    navigator.clipboard.writeText(results.join("\n"));
    setTimeout(() => setIsCopying(false), 2000);
  }, [results]);

  const resultsText = useMemo(() => results.join("\n"), [results]);
  const saveButtons = useMemo(
    () =>
      SAVE_OPTIONS.map((option) => (
        <Button
          key={option.format}
          className="flex w-full items-center justify-center transition-colors duration-200 ease-in-out"
          variant="outline"
          onClick={() => handleSave(option.format)}
          title={option.label}
          disabled={!results.length}
        >
          <option.icon className="mr-2" size={18} />
          {option.label}
        </Button>
      )),
    [results.length, handleSave]
  );

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
        value={resultsText}
        disabled={!results.length}
        readOnly
      />
      <div className="grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-2">
        {saveButtons}
        <Button
          className="flex w-full items-center justify-center transition-colors duration-200 ease-in-out md:col-span-3"
          variant="outline"
          onClick={handleCopy}
          title="Copy results to clipboard"
          disabled={!results.length}
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
