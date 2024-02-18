import Dropdown from "./components/Dropdown";
function App() {
  const options = [
    { labe: "Red", value: "red" },
    { labe: "Green", value: "green" },
    { labe: "Blue", value: "blue" },
  ];
  return <Dropdown options={options} />;
}

export default App;
