import { useState } from "react";

import Resources from "./components/resources";
import Results from "./components/results";

export default function App() {
  const [results, setResults] = useState<string[]>([]);

  return (
    <main className="container mx-auto h-screen p-4">
      <div className="flex h-full flex-col gap-4 pb-7">
        <Resources setResults={setResults} />
        <Results results={results} />
      </div>
    </main>
  );
}
