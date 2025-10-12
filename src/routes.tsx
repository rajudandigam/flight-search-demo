import { createBrowserRouter } from "react-router-dom";
import Home from "./features/flights/pages/Home";
import Results from "./features/flights/pages/Results";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/results", element: <Results /> },
]);
