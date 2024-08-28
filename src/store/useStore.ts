import { create } from "zustand";

import type { ProxyType, exportType } from "@/types";
import defaultProxyResources from "@/lib/proxy-resources";

interface StoreState {
  resources: Record<ProxyType, string[]>;
  selectedResource: ProxyType;
  results: string[];
  isCrawling: boolean;
}

interface StoreActions {
  setResources: (type: ProxyType, resources: string[]) => void;
  setSelectedResource: (resource: ProxyType) => void;
  getSelectedResources: () => string[];
  setResults: (results: string[]) => void;
  addResult: (result: string) => void;
  setIsCrawling: (isCrawling: boolean) => void;
  exportAs: (format: exportType) => string;
}

const useStore = create<StoreState & StoreActions>((set, get) => ({
  resources: {
    "http/s": defaultProxyResources.http,
    socks4: defaultProxyResources.socks4,
    socks5: defaultProxyResources.socks5
  },

  selectedResource: "http/s",
  results: [],
  isCrawling: false,

  setResources: (type, resources) =>
    set((state) => ({
      resources: { ...state.resources, [type]: resources }
    })),

  setSelectedResource: (resource) => set({ selectedResource: resource }),

  getSelectedResources: () => get().resources[get().selectedResource],

  setResults: (results) => set({ results }),
  addResult: (result) =>
    set((state) => ({ results: [...state.results, result] })),

  setIsCrawling: (isCrawling) => set({ isCrawling }),

  exportAs: (format) => {
    const results = get().results;
    switch (format) {
      case "text":
        return results.join("\n");
      case "csv":
        return [
          ...results.map((result) => `"${result.replace(/"/g, '""')}"`)
        ].join("\n");
      case "json":
        return JSON.stringify(results, null, 2);
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  }
}));

export default useStore;
