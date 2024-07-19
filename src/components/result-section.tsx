import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export default function ResultSection() {
  return (
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
  );
}
