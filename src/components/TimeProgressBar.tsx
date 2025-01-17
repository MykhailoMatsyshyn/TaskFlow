import React, { useEffect, useState } from "react";

const TimeProgressBar = ({ startDateTime, deadline }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = new Date(startDateTime).getTime();
    const end = new Date(deadline).getTime();
    const totalDuration = end - start;

    const updateProgress = () => {
      const now = new Date().getTime();
      const elapsed = now - start;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(newProgress);
    };

    updateProgress(); // Initial update
    const interval = setInterval(updateProgress, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [startDateTime, deadline]);

  return (
    <div
      style={{
        width: "100%",
        // maxWidth: "600px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h3>Project Progress</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "14px",
          marginBottom: "5px",
        }}
      >
        <span>{new Date(startDateTime).toLocaleString()}</span>
        <span>{new Date(deadline).toLocaleString()}</span>
      </div>
      <div
        style={{
          position: "relative",
          height: "20px",
          backgroundColor: "#e0e0e0",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            backgroundColor: "#76c7c0",
            borderRadius: "10px",
            transition: "width 0.5s ease-in-out",
          }}
        ></div>
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};

export default TimeProgressBar;
