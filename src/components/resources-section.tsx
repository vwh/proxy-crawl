import React, { useRef, useEffect, useCallback } from "react";
import useStore from "@/store/useStore";

import type { ProxyType } from "@/types";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

import {
  ArrowRightIcon,
  LoaderCircleIcon,
  SaveIcon,
  SettingsIcon
} from "lucide-react";

const RESOURCE_TYPES: { name: ProxyType; label: string }[] = [
  { name: "http/s", label: "HTTP/S" },
  { name: "socks4", label: "SOCKS4" },
  { name: "socks5", label: "SOCKS5" }
];

export default function ResourcesSection() {
  const {
    getSelectedResources,
    setResources,
    setSelectedResource,
    selectedResource,
    isCrawling,
    setIsCrawling
  } = useStore();

  const resourcesRef = useRef<HTMLTextAreaElement>(null);

  // Update the textarea value when the selected resource changes
  useEffect(() => {
    if (resourcesRef.current) {
      resourcesRef.current.value = getSelectedResources().join("\n");
    }
  }, [selectedResource, getSelectedResources]);

  const handleResourceTypeClick = useCallback(
    (type: ProxyType) => {
      setSelectedResource(type);
    },
    [setSelectedResource]
  );

  const handleResourceChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const resources = event.target.value.split("\n").filter(Boolean);
      setResources(selectedResource, resources);
    },
    [selectedResource, setResources]
  );

  const handleStartCrawling = useCallback(() => {
    setIsCrawling(true);
    // TODO: Implement actual crawling logic here
    console.log("Start crawling");
    // For demonstration
    setTimeout(() => setIsCrawling(false), 3000);
  }, [setIsCrawling]);

  return (
    <section className="flex grow flex-col gap-4 rounded-lg bg-gray-700 p-4 shadow-md">
      <div className="flex gap-2">
        {RESOURCE_TYPES.map((type) => (
          <Button
            key={type.name}
            variant={selectedResource === type.name ? "default" : "outline"}
            className="w-full transition-colors duration-200 ease-in-out"
            onClick={() => handleResourceTypeClick(type.name)}
            title={`Switch to ${type.label}`}
            disabled={isCrawling}
          >
            {type.label}
          </Button>
        ))}
      </div>
      <Textarea
        ref={resourcesRef}
        placeholder="Proxy resources"
        className="h-full resize-none text-sm focus:ring-2 focus:ring-primary"
        spellCheck={false}
        onChange={handleResourceChange}
      />
      <div className="flex w-full gap-2">
        <Button
          variant="default"
          className="w-full grow bg-primary transition-colors duration-200 ease-in-out"
          onClick={handleStartCrawling}
          disabled={isCrawling}
          title={isCrawling ? "Crawling" : "Start Crawling"}
        >
          <span className="mr-2 font-semibold">
            {isCrawling ? "Crawling" : "Start Crawling"}
          </span>
          {isCrawling ? (
            <LoaderCircleIcon size={18} className="animate-spin" />
          ) : (
            <ArrowRightIcon size={18} />
          )}
        </Button>
        <div className="flex gap-1">
          <Button
            variant="outline"
            className="transition-colors duration-200 ease-in-out"
            title="Save resources"
            onClick={() => setResources(selectedResource, [])}
            disabled // TODO: Implement save
          >
            <SaveIcon size={18} />
          </Button>
          <Button
            variant="outline"
            className="transition-colors duration-200 ease-in-out"
            title="Open settings"
            disabled // TODO: Implement settings
          >
            <SettingsIcon size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
}
