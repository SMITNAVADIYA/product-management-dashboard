import { BrowserRouter } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import PageContainer from "./components/layout/PageContainer";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <PageContainer>
        <AppRoutes />
      </PageContainer>
    </BrowserRouter>
  );
}

export default App;
