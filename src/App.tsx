import LoadingOverlay from "./components/common/LoadingOverlay";
import { useState, Suspense, useTransition } from "react";
import "./App.css";
import PokemonCard from "./components/PokemonCard";
import { QueryClient, QueryClientProvider, setLogger } from "react-query";
import { AnimatePresence } from "framer-motion";
import { ErrorBoundary } from "react-error-boundary";
import ErrorDialog from "./components/common/ErrorDialog";
import PokedexPage from "./pages/PokedexPage";

const queryClient = new QueryClient({
  defaultOptions: { queries: { suspense: true } },
});
setLogger({
  error: () => {},
  log: () => {},
  warn: () => {},
});
function App() {
  const [isPending, startTransition] = useTransition();

  const [index, setIndex] = useState<number>(1);

  function handleOnNextClicked() {
    startTransition(() => {
      setIndex((prev) => prev + 1);
    });
  }
  function handleOnBeforeClicked() {
    if (index > 1)
      startTransition(() => {
        setIndex((prev) => prev - 1);
      });
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col justify-center items-center bg-blue-300">
        <PokedexPage />
        {/* <ErrorBoundary fallback={<ErrorDialog />}>
          <Suspense fallback={<LoadingOverlay />}>
            <AnimatePresence initial={true}>
              <PokemonCard index={index} />
            </AnimatePresence>
          </Suspense>
          <button onClick={handleOnBeforeClicked}>Prev</button>
          <button
            className={`px-4 py-1 ${
              isPending ? "bg-gray-400" : "bg-lime-400"
            } rounded-lg`}
            disabled={isPending}
            onClick={handleOnNextClicked}
          >
            Next
          </button>
        </ErrorBoundary> */}
      </div>
    </QueryClientProvider>
  );
}

export default App;
