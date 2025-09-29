import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Button } from "./components/ui/button";
import { LoaderCircle } from "lucide-react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex flex-col gap-4 justify-center items-center h-screen">
        <h1 className="text-3xl">Project Under Construction</h1>
        <Button>
          <LoaderCircle className="animate-spin" />
        </Button>
      </div>
    </>
  );
}

export default App;
