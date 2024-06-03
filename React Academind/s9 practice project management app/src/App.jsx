import SideBar from "./components/SideBar";
import AddProjectPage from "./components/AddProjectPage";
import NoProjectSelected from "./components/NoProjectSelected";

import { useState } from "react";

function App() {
  const [addProject, setAddProject] = useState(false);

  function handleClick() {
    setAddProject(true);
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar addProject={handleClick} />
      {!addProject && <NoProjectSelected addProject={handleClick} />}
      {addProject && <AddProjectPage />}
    </main>
  );
}

export default App;
