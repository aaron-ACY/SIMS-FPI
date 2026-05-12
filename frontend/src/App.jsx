import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AppRoutes } from "./routes/AppRoutes";
import PageTitleUpdater from "./components/Common/PageTitleUpdater";

function App() {
  return (
    <Router>
      <PageTitleUpdater />
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
