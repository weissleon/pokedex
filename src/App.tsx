import LoadingOverlay from "./components/common/LoadingOverlay";
import { Suspense } from "react";
import "./App.css";
import { QueryClient, QueryClientProvider, setLogger } from "react-query";
import PokedexPage from "./pages/PokedexPage";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

const queryClient = new QueryClient({
  defaultOptions: { queries: { suspense: true } },
});
setLogger({
  error: () => {},
  log: () => {},
  warn: () => {},
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-tl from-lime-200 to-teal-200">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <ErrorBoundary fallback={<div>Error occurred</div>}>
                  <Suspense
                    fallback={
                      <div className="relative">
                        <LoadingOverlay />
                      </div>
                    }
                  >
                    <PokedexPage />
                  </Suspense>
                </ErrorBoundary>
              }
            />
          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
