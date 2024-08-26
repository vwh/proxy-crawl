import ResourcesSection from "./components/resources-section";
import ResultSection from "./components/result-section";

function App() {
  return (
    <div className="container mx-auto h-screen p-4">
      <main className="flex h-full flex-col gap-4">
        <ResourcesSection />
        <ResultSection />
      </main>
    </div>
  );
}

export default App;
