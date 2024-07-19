import { create } from "zustand";
import defaultProxyResources from "@/lib/proxy-resources";

type ProxyType = "socks4" | "socks5" | "http/s";

interface StoreState {
  httpResources: string[];
  socks4Resources: string[];
  socks5Resources: string[];
  setHttpResources: (resources: string[]) => void;
  setSocks4Resources: (resources: string[]) => void;
  setSocks5Resources: (resources: string[]) => void;

  selectedResource: ProxyType;
  setSelectedResource: (resource: ProxyType) => void;

  getResources: () => string[];

  results: string[];
  setResults: (results: string[]) => void;
  addResult: (result: string) => void;

  isCrawling: boolean;
  setIsCrawling: (isCrawling: boolean) => void;

  exportAsText: () => string;
  exportAsCSV: () => string;
  exportAsJSON: () => string;
}

const useStore = create<StoreState>((set, get) => ({
  httpResources: defaultProxyResources.http,
  socks4Resources: defaultProxyResources.socks4,
  socks5Resources: defaultProxyResources.socks5,

  setHttpResources: (resources: string[]) => set({ httpResources: resources }),
  setSocks4Resources: (resources: string[]) =>
    set({ socks4Resources: resources }),
  setSocks5Resources: (resources: string[]) =>
    set({ socks5Resources: resources }),

  selectedResource: "http/s",
  setSelectedResource: (resource: ProxyType) =>
    set({ selectedResource: resource }),

  results: [],
  setResults: (results: string[]) => set({ results }),
  addResult: (result: string) =>
    set((state) => ({ results: [...state.results, result] })),

  isCrawling: false,
  setIsCrawling: (isCrawling: boolean) => set({ isCrawling }),

  getResources: () => getResourcesByType(get(), get().selectedResource),

  exportAsText: () => {
    const resources = getResourcesByType(get(), get().selectedResource);
    return resources.join("\n");
  },

  exportAsCSV: () => {
    const resources = getResourcesByType(get(), get().selectedResource);
    return resources.map((resource) => `"${resource}"`).join(",");
  },

  exportAsJSON: () => {
    const resources = getResourcesByType(get(), get().selectedResource);
    return JSON.stringify(resources, null, 2);
  },
}));

function getResourcesByType(state: StoreState, type: ProxyType): string[] {
  switch (type) {
    case "socks4":
      return state.socks4Resources;
    case "socks5":
      return state.socks5Resources;
    case "http/s":
      return state.httpResources;
    default:
      return [];
  }
}

export default useStore;
