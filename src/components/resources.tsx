import React, { useCallback, useState, useMemo } from "react";

import defaultResources from "@/lib/resources";
import scrap from "@/lib/scraping";
import type { ProxyType } from "@/types";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

import {
  ArrowRightIcon,
  LoaderCircleIcon,
  SaveIcon,
  CheckIcon
} from "lucide-react";

const RESOURCE_TYPES: { name: ProxyType; label: string }[] = [
  { name: "http/s", label: "HTTP/S" },
  { name: "socks4", label: "SOCKS4" },
  { name: "socks5", label: "SOCKS5" }
];

interface ResourcesProps {
  setResults: React.Dispatch<React.SetStateAction<string[]>>;
  setLengths: React.Dispatch<
    React.SetStateAction<{
      oldLength: number;
      newLength: number;
    }>
  >;
}

export default function Resources({ setResults, setLengths }: ResourcesProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isCrawling, setIsCrawling] = useState(false);
  const [selectedResource, setSelectedResource] = useState<ProxyType>("http/s");
  const [resources, setResources] = useState<Record<ProxyType, string[]>>(
    () => {
      const savedResources = localStorage.getItem("resources");
      if (savedResources) {
        try {
          return JSON.parse(savedResources);
        } catch (error) {
          console.error("Failed to parse saved resources:", error);
        }
      }
      return defaultResources;
    }
  );

  const handleResourceTypeClick = useCallback((type: ProxyType) => {
    setSelectedResource(type);
  }, []);

  const handleResourceChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newResources = event.target.value.split("\n").filter(Boolean);
      setResources((prev) => ({ ...prev, [selectedResource]: newResources }));
    },
    [selectedResource]
  );

  const handleStartCrawling = useCallback(async () => {
    setIsCrawling(true);
    setResults([]);
    setLengths({ oldLength: 0, newLength: 0 });
    try {
      const neededResources = Array.from(
        // remove duplicates from resources
        new Set(Object.values(resources[selectedResource]).flat())
      );
      const crawlPromises = neededResources.map(async (url) => {
        const results = await scrap(url);
        const flattenedResults = results
          .flat()
          .filter((result): result is string => typeof result === "string");
        setLengths((prev) => ({
          ...prev,
          oldLength: prev.oldLength + flattenedResults.length
        }));
        setResults((prev) => [...prev, ...flattenedResults]);
      });
      await Promise.all(crawlPromises);
    } catch (error) {
      console.error("Error during crawling:", error);
    } finally {
      // remove duplicates from results
      setResults((prev) => {
        const uniqueResults = Array.from(new Set(prev));
        setLengths((prevLengths) => ({
          ...prevLengths,
          newLength: uniqueResults.length
        }));
        return uniqueResults;
      });
      setIsCrawling(false);
    }
  }, [resources, selectedResource, setResults]);

  const handleSaveResources = useCallback(() => {
    setIsSaving(true);
    try {
      localStorage.setItem("resources", JSON.stringify(resources));
      console.log("Resources saved successfully.");
    } catch (error) {
      console.error("Failed to save resources:", error);
    } finally {
      setTimeout(() => setIsSaving(false), 2000);
    }
  }, [resources]);

  const resourceButtons = useMemo(
    () =>
      RESOURCE_TYPES.map((type) => (
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
      )),
    [selectedResource, isCrawling, handleResourceTypeClick]
  );

  return (
    <section className="flex grow flex-col gap-4 rounded-lg bg-gray-700 p-4 shadow-md">
      <div className="flex gap-2">{resourceButtons}</div>
      <Textarea
        placeholder="Proxy resources"
        className="h-full resize-none text-sm focus:ring-2 focus:ring-primary"
        spellCheck={false}
        value={resources[selectedResource].join("\n")}
        onChange={handleResourceChange}
        disabled={isCrawling}
      />
      <div className="flex w-full gap-2">
        <Button
          variant="default"
          className="w-full grow bg-primary transition-colors duration-200 ease-in-out"
          onClick={handleStartCrawling}
          disabled={isCrawling}
          title={isCrawling ? "Crawling in progress" : "Start Crawling"}
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
        <Button
          variant="outline"
          className="transition-colors duration-200 ease-in-out"
          title="Save resources"
          onClick={handleSaveResources}
          disabled={isCrawling}
        >
          {isSaving ? (
            <CheckIcon
              size={18}
              className="opacity-100 transition-opacity duration-300 ease-in"
            />
          ) : (
            <SaveIcon
              size={18}
              className="opacity-100 transition-opacity duration-300 ease-in"
            />
          )}
        </Button>
      </div>
    </section>
  );
}
