import {
  BrowserRouter as Router,
  Routes,
  Route,
  redirect,
} from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import { Toaster } from "sonner";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Button } from "./components/ui/button";
import { LoaderCircle } from "lucide-react";

function App() {
  const LoginAdmin = lazy(() => import("./page/loginAdmin"));

  return (
    <>
      <Toaster richColors closeButton position="top-right" />
      <Router>
        <Routes>
          {/* login admin */}
          <Route
            path="/login-admin"
            element={
              <Suspense>
                <LoginAdmin />
                //{" "}
              </Suspense>
            }
          />
          {/* end login admin */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
