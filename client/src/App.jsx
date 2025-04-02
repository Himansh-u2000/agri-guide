import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import RootLayout from './layout/RootLayout'
import Home from './components/home/Home'
import AboutUs from "./pages/aboutUs/AboutUs";
import CropAdvisor from "./pages/cropAdvisor/CropAdvisor";
import AgriBot from "./pages/agribot/AgriBot";
import PageNotFound from "./pages/PageNotFound";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="advisor" element={<CropAdvisor />} />
          <Route path="agribot" element={<AgriBot />} />
          <Route path="about" element={<AboutUs />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App