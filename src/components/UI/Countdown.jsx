import React, { useState, useEffect } from "react";

const Countdown = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(expiryDate));

  function calculateTimeLeft(expiryDate) {
    const difference = +new Date(expiryDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(expiryDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [expiryDate]);

  const format = (num) => String(num).padStart(2, "0");

  if (timeLeft.hours === undefined) return null;

  return (
    <div className="de_countdown">
      {format(timeLeft.hours)}h {format(timeLeft.minutes)}m {format(timeLeft.seconds)}s
    </div>
  );
};

export default Countdown;