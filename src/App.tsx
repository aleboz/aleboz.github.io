import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import RouteAnnouncer from "./components/RouteAnnouncer";
import AppRoutes from "./routes";

const App = () => (
  <MotionConfig reducedMotion="user">
    <BrowserRouter>
      <RouteAnnouncer />
      <AppRoutes />
    </BrowserRouter>
  </MotionConfig>
);

export default App;
