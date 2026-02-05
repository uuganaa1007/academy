import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MovieMain } from "./modules/movie/components/MovieMain";
import { MovieDetailPage } from "./modules/movie/components/MovieDetailPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<MovieMain />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
