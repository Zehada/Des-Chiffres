import { useState, useEffect } from "react";

function Timer() {
  const timeStart = 60;
  const [timeLeft, setTimeLeft] = useState(timeStart);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  return <div className="timer">{timeLeft}</div>;
}

export default Timer;
