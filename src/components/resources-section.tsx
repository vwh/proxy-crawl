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

const PROXY_REGEXP =
  /(?:^|\D)(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{1,5})(?:\D|$)/g;

export default function ResourcesSection() {
  const {
    getSelectedResources,
    setResources,
    setSelectedResource,
    selectedResource,
    isCrawling,
    setIsCrawling,
    addResult,
    setResults
  } = useStore();

  const resourcesRef = useRef<HTMLTextAreaElement>(null);

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

  const request = useCallback(
    async (url: string) => {
      const proxies = [
        "", // No CORS
        "https://cors.eu.org/",
        "https://corsproxy.io/?"
      ];

      for (let i = 0; i < proxies.length; i++) {
        try {
          const fullUrl = proxies[i] + url;
          const response = await fetch(fullUrl);

          if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
          }

          const data = await response.text();
          const cleanData =
            data.match(PROXY_REGEXP)?.map((item) => item.trim()) ?? [];

          cleanData.forEach((proxy) => {
            if (proxy && !proxy.includes("127.0.0.1")) {
              addResult(proxy.replace(/"/g, "").replace(/>/g, ""));
            }
          });

          console.log(`Attempt ${i + 1} successful for ${proxies[i] + url}`);
          break;
        } catch {
          console.error(`Attempt ${i + 1} failed for ${proxies[i] + url}:`);
          if (i === proxies.length - 1) {
            console.error(`All attempts failed for ${proxies[i] + url}`);
          }
        }
      }
    },
    [addResult]
  );

  const handleStartCrawling = useCallback(async () => {
    setIsCrawling(true);
    setResults([]);

    const resources = getSelectedResources();
    await Promise.all(resources.map(request));

    // TODO: remove duplicates

    setIsCrawling(false);
  }, [setIsCrawling, setResults, getSelectedResources, request]);

  const handleSaveResources = useCallback(() => {
    // TODO: Implement save functionality
    console.log("Saving resources");
  }, []);

  const handleOpenSettings = useCallback(() => {
    // TODO: Implement settings functionality
    console.log("Opening settings");
  }, []);

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
            <SaveIcon size={18} />
          </Button>
          <Button
            variant="outline"
            className="transition-colors duration-200 ease-in-out"
            title="Open settings"
            onClick={handleOpenSettings}
            disabled={isCrawling}
          >
            <SettingsIcon size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
}
