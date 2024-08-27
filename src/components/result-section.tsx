import { useEffect } from "react";
import useStore from "@/store/useStore";

import type { exportType } from "@/types";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

import { FileTextIcon, FileSpreadsheetIcon, FileJsonIcon } from "lucide-react";

const SAVE_OPTIONS: { format: exportType; label: string; icon: any }[] = [
  { format: "text", label: "Save as TEXT", icon: FileTextIcon },
  { format: "csv", label: "Save as CSV", icon: FileSpreadsheetIcon },
  { format: "json", label: "Save as JSON", icon: FileJsonIcon }
];

export default function ResultSection() {
  const {
    results,
    addResult,
    // setResults,
    exportAs
  } = useStore();

  useEffect(() => {
    // for demo purposes
    addResult("test");
    addResult("test2");
    addResult("test3");
  }, []);

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

  return (
    <section className="flex grow flex-col gap-4 rounded-lg bg-gray-700 p-4 shadow-md">
      <Textarea
        placeholder="Crawled results"
        className="grow resize-none focus:ring-2 focus:ring-blue-500"
        value={results.join("\n")}
        readOnly
      />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        {SAVE_OPTIONS.map((option) => (
          <Button
            key={option.format}
            className="flex w-full items-center justify-center transition-colors duration-200 ease-in-out"
            variant="outline"
            onClick={() => handleSave(option.format)}
            title={option.label}
            disabled={!results}
            spellCheck={false}
          >
            <option.icon className="mr-2" size={18} />
            {option.label}
          </Button>
        ))}
      </div>
    </section>
  );
}
