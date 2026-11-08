import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ResearchPage from "./pages/ResearchPage";
import PublicationsPage from "./pages/PublicationsPage";
import ProjectsPage from "./pages/ProjectsPage";
import TeachingPage from "./pages/TeachingPage";
import SupervisionPage from "./pages/SupervisionPage";
import ServicePage from "./pages/ServicePage";
import NewsPage from "./pages/NewsPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

/** Single route table shared by the browser app and the build-time prerenderer. */
const AppRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/research" element={<ResearchPage />} />
      <Route path="/publications" element={<PublicationsPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/teaching" element={<TeachingPage />} />
      <Route path="/supervision" element={<SupervisionPage />} />
      <Route path="/service" element={<ServicePage />} />
      <Route path="/news" element={<NewsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default AppRoutes;
