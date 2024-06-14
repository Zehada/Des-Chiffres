import { useState } from "react";
import "./App.css";
import StartButton from "./components/StartButton";
import Timer from "./components/Timer";

import { DndContext } from "@dnd-kit/core";
import Droppable from "./components/Droppable";
import Draggable from "./components/Draggable";

function App() {
  const draggableItems = ["A", "B", "C", "D", "E", "F"];
  let className = "";
  const [gameIsStarted, setGameStatus] = useState(false);
  const [timer, setTimer] = useState();

  const [children, setChildren] = useState([]);
  gameIsStarted ? (className += "started") : (className += "start");
  const handleClick = () => {
    setGameStatus(true);
    setTimeout(() => {
      setTimer(<Timer />);
    }, 1000);
  };

  const containers = ["1", "2", "3"];
  const [parents, setParents] = useState([]);
  // const [exclude, setExclude] = useState([]);

  return (
    <>
      <StartButton
        gameisstarted={gameIsStarted}
        classname={className}
        clickevent={handleClick}
      />
      {timer}
      <div>
        <DndContext onDragEnd={handleDragEnd}>
          {draggableItems.map((iddrag) =>
            !children.some((child) => iddrag === child) ? (
              <Draggable key={iddrag} id={iddrag}>
                {iddrag}
              </Draggable>
            ) : null
          )}
          {/* {parent === null ? draggableMarkup : null} */}

          {containers.map((id) => (
            // We updated the Droppable component so it would accept an `id`
            // prop and pass it to `useDroppable`
            <Droppable key={id} id={id}>
              {parents
                .filter((parent) => parent.charAt(0) === id)
                .map((parent) => (
                  <Draggable key={parent.charAt(1)} id={parent.charAt(1)}>
                    {parent.charAt(1)}
                  </Draggable>
                ))}
              {parents.some((parent) => parent.charAt(0) === id)
                ? null
                : "Drop here"}
            </Droppable>
          ))}
        </DndContext>
      </div>
    </>
  );

  function handleDragEnd(event) {
    const { over } = event;

    // setChildren(
    //   over && !children.includes(event.active.id)
    //     ? [...children, event.active.id]
    //     : children.filter((child) => child !== event.active.id)
    // );

    // children.filter((child) => child === children.slice(-1)[0])

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`

    if (over && !children.includes(event.active.id)) {
      setChildren([...children, event.active.id]);
      if (parents.some((parent) => parent.includes(over.id))) {
        const exclude = parents.filter((parent) => parent.includes(over.id));
        if (exclude.length > 0) {
          setChildren(
            children
              .filter((child) => child !== exclude[0].charAt(1))
              .concat(event.active.id)
          );
        }
      }
    } else {
      setChildren(children.filter((child) => child !== event.active.id));
    }

    if (over) {
      setParents([...parents, over.id + event.active.id]);

      if (parents.some((parent) => parent.includes(over.id))) {
        setParents(
          parents
            .filter((parent) => !parent.includes(over.id))
            .concat([over.id + event.active.id])
        );
        // parents.map((parent) => setChildren(children.concat(parent.charAt(1))));
      }
    } else if (!over) {
      setParents(parents.filter((parent) => !parent.includes(event.active.id)));
    }

    // parents.map((parent) => setChildren([...children, parent.charAt(1)]));

    // setChildren(parents.map((parent) => parent.charAt(1)));

    // setParents(
    //   over // over && !parents.some((parent) => parent.includes(over.id))
    //     ? [...parents, over.id + event.active.id]
    //     : parents.filter((parent) => !parent.includes(event.active.id)) // Seuls les parent qui n'incluent pas event.active.id sont conservés dans le nouveau tableau.
    // );

    // setParents(
    //   over && parents.some((parent) => parent.includes(over.id))
    //     ? parents.filter((parent) => !parent.includes(over.id))
    //     : parents
    // );

    // !over && children.includes(event.active.id)
    //   ? children.filter((child) => child !== event.active.id)
    //   : null;

    // !over && children.includes(event.active.id)
    //   ? children.filter((child) => child !== event.active.id)
    //   : null;

    console.log(parents);
    console.log(children);
  }
}

export default App;
