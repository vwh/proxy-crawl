import ResourcesSection from "./components/resources-section";
import ResultSection from "./components/result-section";

function App() {
  return (
    <div className="container mx-auto h-screen p-4">
      <main className="flex flex-col gap-4 h-full">
        <ResourcesSection />
        <ResultSection />
      </main>
    </div>
  );
}

export default App;
