import axios from "axios";

const PROXY_REGEXP =
  /(?:^|\D)(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{1,5})(?:\D|$)/g;

const CORS_SERVERS = [
  "", // No CORS
  "https://cors.eu.org/",
  "https://corsproxy.io/?"
];

export const request = async (url: string) => {
  const isGoodUrl = url.match(
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
  );
  if (!isGoodUrl) {
    console.error("Invalid URL:", url);
    return;
  }

  for (let i = 0; i < CORS_SERVERS.length; i++) {
    try {
      const fullUrl = CORS_SERVERS[i] + url;
      const response = await axios.get(fullUrl, {
        timeout: 30 * 1000
      });

      const data = response.data;
      const cleanData =
        data.match(PROXY_REGEXP)?.map((item: string) => item.trim()) ?? [];

      cleanData.forEach((proxy: string) => {
        if (proxy && !proxy.includes("127.0.0.1")) {
          return proxy.replace(/"/g, "").replace(/>/g, "");
        }
      });

      console.log(`Attempt ${i + 1} successful for ${CORS_SERVERS[i] + url}`);
      return cleanData as string[];
    } catch (error) {
      console.error(
        `Attempt ${i + 1} failed for ${CORS_SERVERS[i] + url}:`,
        error
      );
      if (i === CORS_SERVERS.length - 1) {
        console.error(`All attempts failed for ${CORS_SERVERS[i] + url}`);
      }
    }
  }
};
