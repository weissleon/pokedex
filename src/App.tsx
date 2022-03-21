import LoadingOverlay from "./components/common/LoadingOverlay";
import { Suspense } from "react";
import "./App.css";
import { QueryClient, QueryClientProvider, setLogger } from "react-query";
import PokedexPage from "./pages/PokedexPage";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

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
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-blue-300">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<LoadingOverlay />}>
                  <PokedexPage />
                </Suspense>
              }
            />
          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
