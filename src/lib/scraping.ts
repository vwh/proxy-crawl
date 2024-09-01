import axios from "axios";

const PROXY_REGEXP =
  /(?:^|\D)(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{1,5})(?:\D|$)/g;

const CORS_SERVERS = [
  "", // No CORS
  "https://cors.eu.org/",
  "https://corsproxy.io/?"
];

const scrap = async (url: string): Promise<string[]> => {
  const isGoodUrl = url.match(
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
  );
  if (!isGoodUrl) {
    console.error("Invalid URL:", url);
    return [];
  }

  for (let i = 0; i < CORS_SERVERS.length; i++) {
    try {
      const fullUrl = CORS_SERVERS[i] + url;
      const response = await axios.get(fullUrl, {
        timeout: 30 * 1000
      });

      const data = response.data;
      const matches = data.match(PROXY_REGEXP);

      if (!matches) {
        console.log(`No proxies found in attempt ${i + 1} for ${fullUrl}`);
        continue;
      }

      const cleanData = matches
        .map((item: string) => item.trim())
        .filter((proxy: string) => proxy && !proxy.includes("127.0.0.1"))
        .map((proxy: string) => proxy.replace(/"/g, "").replace(/>/g, ""));

      console.log(`Attempt ${i + 1} successful for ${fullUrl}`);
      return cleanData;
    } catch (error) {
      console.error(
        `Attempt ${i + 1} failed for ${CORS_SERVERS[i] + url}:`,
        error
      );
      if (i === CORS_SERVERS.length - 1) {
        console.error(`All attempts failed for ${url}`);
      }
    }
  }

  return [];
};

export default scrap;
