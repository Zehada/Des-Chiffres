import { useState } from "react";

function Symbol(props) {
  const droppableId = props.droppableid;
  const [selectedSymbol, setSelectedSymbol] = useState("");

  return (
    <>
      <select
        name="symbol-list"
        className="symbol-list"
        size="0"
        value={selectedSymbol}
        onChange={(e) => setSelectedSymbol(e.target.value)}
      >
        <option value="+">+</option>
        <option value="−">−</option>
        <option value="×">×</option>
        <option value="÷">÷</option>
      </select>
    </>
  );
}

export default Symbol;
