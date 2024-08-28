import React, { useCallback, useEffect, useState } from "react";
import useStore from "@/store/useStore";

import type { ProxyType } from "@/types";

import { request } from "@/lib/proxy-scrap";

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

export default function ResourcesSection() {
  const {
    getSelectedResources,
    addResources,
    setResources,
    setSelectedResource,
    selectedResource,
    isCrawling,
    setIsCrawling,
    addResult,
    setResults,
    resources: stateResources
  } = useStore();
  const [isSaving, setIsSaving] = useState(false);

  // Load resources from localStorage when load
  useEffect(() => {
    const savedResources = localStorage.getItem("resources");

    if (savedResources) {
      try {
        const parsedResources = JSON.parse(savedResources);
        setResources(parsedResources);
      } catch (error) {
        console.error("Failed to parse saved resources:", error);
      }
    }
  }, []);

  const handleResourceTypeClick = useCallback(
    (type: ProxyType) => {
      setSelectedResource(type);
    },
    [setSelectedResource]
  );

  const handleResourceChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const resources = event.target.value.split("\n").filter(Boolean);
      addResources(selectedResource, resources);
    },
    [selectedResource, addResources]
  );

  const handleStartCrawling = useCallback(async () => {
    setIsCrawling(true);
    setResults([]);

    const resources = getSelectedResources();
    await Promise.all(
      resources.map(async (r) => {
        const results = await request(r);
        if (results)
          for (const result of results) {
            addResult(result);
          }
      })
    );

    setIsCrawling(false);
  }, [setIsCrawling, setResults, getSelectedResources, request]);

  const handleSaveResources = useCallback(() => {
    setIsSaving(true);
    try {
      localStorage.setItem("resources", JSON.stringify(stateResources));
      console.log("Resources saved successfully.");
    } catch (error) {
      console.error("Failed to save resources:", error);
    } finally {
      setTimeout(() => setIsSaving(false), 2000);
    }
  }, [stateResources]);

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
        placeholder="Proxy resources"
        className="h-full resize-none text-sm focus:ring-2 focus:ring-primary"
        spellCheck={false}
        value={getSelectedResources().join("\n")}
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
        <div className="flex gap-1">
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
                className={`transition-opacity duration-300 ease-in ${isSaving ? "opacity-100" : "opacity-0"}`}
              />
            ) : (
              <SaveIcon
                size={18}
                className={`transition-opacity duration-300 ease-in ${!isSaving ? "opacity-100" : "opacity-0"}`}
              />
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}
