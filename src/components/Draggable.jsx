import { useDraggable } from "@dnd-kit/core";

function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: props.id,
    });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 100,
      }
    : undefined;
  return (
    <button
      className={props.classname}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </button>
  );
}

export default Draggable;
