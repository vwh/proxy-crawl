import { useState } from "react";

import Resources from "./components/resources";
import Results from "./components/results";

export default function App() {
  const [results, setResults] = useState<string[]>([]);
  const [lengths, setLengths] = useState({ oldLength: 0, newLength: 0 });

  return (
    <main className="container mx-auto h-screen p-4">
      <div className="flex h-full flex-col gap-4 pb-7">
        <Resources setResults={setResults} setLengths={setLengths} />
        <Results results={results} lengths={lengths} />
      </div>
    </main>
  );
}
