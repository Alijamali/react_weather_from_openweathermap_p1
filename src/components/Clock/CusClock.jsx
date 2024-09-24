import React, { useState, useEffect } from "react";

const CusClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // پاک کردن تایمر هنگام از بین رفتن کامپوننت
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ fontSize: "24px", fontWeight: "bold" }}>
      {time.toLocaleTimeString()}
    </div>
  );
};

export default CusClock;
