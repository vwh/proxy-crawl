export default function Footer() {
  return (
    <footer className="fixed bottom-0 z-50 w-full border-t bg-background">
      <ul className="flex items-center justify-center px-5 py-1">
        <li>
          <a
            target="_blank"
            href="https://github.com/vwh/proxy-crawl"
            className="hover:underline"
          >
            <strong className="text-sm text-primary">
              Start us <span className="animate-pulse">⭐️</span> on GitHub
            </strong>
          </a>
        </li>
      </ul>
    </footer>
  );
}
