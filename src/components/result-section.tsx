import { useState } from "react";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

import { FileText, FileSpreadsheet, FileJson } from "lucide-react";

const SAVE_OPTIONS = [
  { id: "text", label: "Save as TEXT", icon: FileText },
  { id: "csv", label: "Save as CSV", icon: FileSpreadsheet },
  { id: "json", label: "Save as JSON", icon: FileJson }
];

export default function ResultSection() {
  const [results, setResults] = useState("");

  const handleSave = (format: string) => {
    // TODO: Implement save
    console.log(`Saving as ${format}`);
  };

  return (
    <section className="flex grow flex-col gap-4 rounded-lg bg-gray-700 p-4 shadow-md">
      <Textarea
        placeholder="Crawled results"
        className="grow resize-none focus:ring-2 focus:ring-blue-500"
        value={results}
        onChange={(e) => setResults(e.target.value)}
        readOnly
      />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        {SAVE_OPTIONS.map((option) => (
          <Button
            key={option.id}
            className="flex w-full items-center justify-center transition-colors duration-200 ease-in-out"
            variant="outline"
            onClick={() => handleSave(option.id)}
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
