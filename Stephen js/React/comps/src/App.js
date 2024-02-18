import Accordion from "./components/Accordion";

function App() {
  const items = [
    {
      id: "1",
      label: "Can I use React",
      content: "you can use Reactfdsafdsafdsfdsaf",
    },
    {
      id: "2",
      label: "Can I use JS",
      content: "you can use JSfdsafdsafdsfdsafdsaf",
    },
    {
      id: "3",
      label: "Can I use CSS",
      content: "you can use CSSfdsafdsafdsafdsafdsaf",
    },
  ];

  return <Accordion items={items} />;
}

export default App;
