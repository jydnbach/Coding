import SideBar from "./components/SideBar";
import AddProjectPage from "./components/AddProjectPage";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";

import { useState } from "react";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  function handleAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleStoreProject(projectData) {
    setProjectsState((prevState) => {
      const newProject = {
        ...projectData,
        id: Math.random().toString(36).slice(2, 11),
      };

      return {
        ...prevState,
        projects: [...prevState.projects, newProject],
        selectedProjectId: undefined,
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return { ...prevState, selectedProjectId: undefined };
    });
  }

  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return { ...prevState, selectedProjectId: id };
    });
  }

  function handleDeleteProject() {
    setProjectsState((prevState) => {
      const updatedProjects = prevState.projects.filter(
        (project) => project.id !== prevState.selectedProjectId
      );
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: updatedProjects,
      };
    });
  }

  let content;

  if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected addProject={handleAddProject} />;
  } else if (projectsState.selectedProjectId === null) {
    content = (
      <AddProjectPage
        onAdd={handleStoreProject}
        onCancel={handleCancelAddProject}
      />
    );
  } else if (projectsState.selectedProjectId) {
    const selectedProject = projectsState.projects.find(
      (project) => project.id === projectsState.selectedProjectId
    );
    content = (
      <SelectedProject
        project={selectedProject}
        onDelete={handleDeleteProject}
      />
    );
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar
        addProject={handleAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
      />
      {content}
    </main>
  );
}

export default App;
