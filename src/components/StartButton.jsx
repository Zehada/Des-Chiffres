function StartButton(props) {
  const className = props.classname;
  const clickEvent = props.clickevent;
  const gameIsStarted = props.gameisstarted;
  return (
    <>
      <p className={"main-message " + className}>Find the number</p>
      <button className={"start-button " + className} onClick={clickEvent}>
        {gameIsStarted ? "Restart" : "Start"}
      </button>
    </>
  );
}

export default StartButton;
