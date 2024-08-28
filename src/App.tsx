import ResourcesSection from "./components/resources-section";
import ResultSection from "./components/result-section";

export default function App() {
  return (
    <main className="container mx-auto h-screen p-4">
      <div className="flex h-full flex-col gap-4 pb-7">
        <ResourcesSection />
        <ResultSection />
      </div>
    </main>
  );
}
