import { useEffect } from "react";
import AOS from "aos";

import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <>
      <Toaster position="top-right" />
      <AppRoutes />
    </>
  );
}

export default App;