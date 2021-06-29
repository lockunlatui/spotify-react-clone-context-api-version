import { BrowserRouter as Router } from "react-router-dom";

import CustomRoutes from "./CustomRoutes";

const routes = () => {
  return (
    <Router>
      <CustomRoutes />
    </Router>
  );
};

export default routes;
