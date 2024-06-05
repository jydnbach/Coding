import SideBar from "./components/SideBar";
import AddProjectPage from "./components/AddProjectPage";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";

import { useState } from "react";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const taskId = Math.random().toString(36).slice(2, 11);
      const newTask = {
        text: text,
        id: taskId,
        projectId: prevState.selectedProjectId,
      };

      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectsState((prevState) => {
      const updatedTasks = prevState.tasks.filter((task) => task.id !== id);
      return {
        ...prevState,
        tasks: updatedTasks,
      };
    });
  }

  function handleAddProject(text) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleStoreProject(projectData) {
    setProjectsState((prevState) => {
      const projectId = Math.random().toString(36).slice(2, 11);
      const newProject = {
        ...projectData,
        id: projectId,
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

  // Content: 1. no project selected 2. add project page 3. selected project

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
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        tasks={projectsState.tasks}
      />
    );
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar
        addProject={handleAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;