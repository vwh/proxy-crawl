import { Button } from "./components/ui/button";
import { Textarea } from "./components/ui/textarea";

import { PowerSquareIcon } from "lucide-react";

function App() {
  return (
    <div className="container mx-auto h-screen p-4">
      <main className="flex flex-col gap-4 h-full">
        <section className="flex flex-col gap-2 grow">
          <Textarea
            placeholder="Proxy Resources"
            className="h-full resize-none"
          />
          <Button variant="outline" className="w-full">
            <PowerSquareIcon className="w-5 h-5" />
            <span className="ml-2 font-semibold">Start Crawling</span>
          </Button>
        </section>
        <section className="flex flex-col gap-2 grow">
          <Textarea
            placeholder="Proxy Results"
            className="h-full resize-none"
            disabled
          />
          <div className="flex gap-1 flex-col md:flex-row">
            <Button className="grow" variant="outline" disabled>
              Save as TEXT
            </Button>
            <Button className="grow" variant="outline" disabled>
              Save as CSV
            </Button>
            <Button className="grow" variant="outline" disabled>
              Save as JSON
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
