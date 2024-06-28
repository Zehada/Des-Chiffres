import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import "./App.css";
import StartButton from "./components/StartButton";
import Timer from "./components/Timer";
import Symbol from "./components/Symbol";

import { DndContext } from "@dnd-kit/core";
import Droppable from "./components/Droppable";
import Draggable from "./components/Draggable";

function App() {
  const draggableItems = ["A", "B", "C", "D", "E", "F"];
  let className = "";
  const [gameIsStarted, setGameStatus] = useState(false);
  const [displayContent, setDisplayContent] = useState(false);
  const [timer, setTimer] = useState();

  const [children, setChildren] = useState([]);
  gameIsStarted ? (className += "started") : (className += "start");
  const handleClick = () => {
    setGameStatus(true);
    setTimeout(() => {
      setDisplayContent(true);
    }, 1000);
  };

  const containers = ["1", "2", "3", "4"];
  const [parents, setParents] = useState([]);

  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount < draggableItems.length && displayContent) {
      const timer = setTimeout(
        () => {
          setVisibleCount(visibleCount + 1);
        },
        visibleCount === 0 ? 500 : 1000
      );

      return () => clearTimeout(timer);
    } else if (visibleCount === draggableItems.length) {
      const timer = setTimeout(() => {
        setTimer(<Timer />);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [visibleCount, draggableItems.length, displayContent]);

  return (
    <>
      <StartButton
        gameisstarted={gameIsStarted}
        classname={className}
        clickevent={handleClick}
      />
      {timer}
      {displayContent ? (
        <main>
          <DndContext onDragEnd={handleDragEnd}>
            <div>
              {draggableItems.map((iddrag, index) =>
                !children.some((child) => iddrag === child) ? (
                  <Draggable
                    key={iddrag}
                    id={iddrag}
                    classname={
                      index < visibleCount ? "draggable visible" : "draggable"
                    }
                  >
                    {iddrag}
                  </Draggable>
                ) : null
              )}
            </div>
            <div id="droppables">
              {containers.map((id) => (
                <div className={"droppable-box"} key={id + "d"}>
                  <Droppable key={id} id={id} classname="droppable">
                    {parents
                      .filter((parent) => parent.charAt(0) === id)
                      .map((parent) => (
                        <Draggable
                          key={parent.charAt(1)}
                          id={parent.charAt(1)}
                          classname="draggable visible"
                        >
                          {parent.charAt(1)}
                        </Draggable>
                      ))}
                    {/* {parents.some((parent) => parent.charAt(0) === id)
                    ? null
                    : "Drop here"} */}
                  </Droppable>
                  {parseInt(id) % 2 !== 0 ? (
                    <Symbol key={id + "s"}></Symbol>
                  ) : null}
                </div>
              ))}
            </div>
          </DndContext>
        </main>
      ) : null}
    </>
  );

  function handleDragEnd(event) {
    const { over } = event;

    if (over) {
      // Ajoutez le nouveau parent et enfant

      const newParent = over.id + event.active.id;

      setParents([...parents, newParent]);
      setChildren([...children, event.active.id]);

      // Vérifiez si un parent existe déjà pour 'over.id'
      const existingParent = parents.find((parent) => parent.includes(over.id));
      const existingParentLetter = existingParent
        ? existingParent.charAt(1)
        : null;

      const existingActiveParent = parents.find((parent) =>
        parent.includes(event.active.id)
      );
      const existingActiveParentLetter = existingActiveParent
        ? existingActiveParent.charAt(1)
        : null;

      if (existingParent || existingActiveParent) {
        // Supprimez l'ancien parent et mettez à jour
        setParents(
          parents
            .filter((parent) => parent !== existingParent)
            .filter((parent) => parent !== existingActiveParent)
            .concat(newParent)
        );

        setChildren(
          children
            .filter((child) => child !== existingParentLetter)
            .filter((child) => child !== existingActiveParentLetter)
            .concat(event.active.id)
        );
      }
    } else {
      // Supprimez le parent et l'enfant associés à 'event.active.id'
      setParents(parents.filter((parent) => !parent.includes(event.active.id)));
      setChildren(children.filter((child) => child !== event.active.id));
    }
  }
}

export default App;
