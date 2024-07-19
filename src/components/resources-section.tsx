import { useRef, useEffect } from "react";
import useStore from "@/store";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

import { PowerSquareIcon } from "lucide-react";

export default function ResourcesSection() {
  const { getResources, setSelectedResource, selectedResource } = useStore();
  const resourcesRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (resourcesRef.current) {
      resourcesRef.current.value = getResources().join("\n");
    }
  }, [selectedResource, getResources]);

  return (
    <section className="flex flex-col gap-2 grow">
      <div className="flex gap-1">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setSelectedResource("http/s")}
        >
          HTTP/S
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setSelectedResource("socks4")}
        >
          SOCKS4
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setSelectedResource("socks5")}
        >
          SOCKS5
        </Button>
      </div>
      <Textarea
        ref={resourcesRef}
        placeholder="Proxy Resources"
        className="h-full resize-none"
      />
      <Button variant="outline" className="w-full">
        <PowerSquareIcon className="w-5 h-5" />
        <span className="ml-2 font-semibold">Start Crawling</span>
      </Button>
    </section>
  );
}
