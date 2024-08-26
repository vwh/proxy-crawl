import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export default function ResultSection() {
  return (
    <section className="flex grow flex-col gap-2">
      <Textarea
        placeholder="Proxy Results"
        className="h-full resize-none"
        disabled
      />
      <div className="flex flex-col gap-1 md:flex-row">
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
