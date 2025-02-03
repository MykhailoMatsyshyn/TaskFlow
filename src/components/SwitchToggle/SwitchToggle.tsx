import React from "react";
import styles from "./SwitchToggle.module.scss";

type SwitchToggleProps = {
  leftLabel: string;
  rightLabel: string;
  currentView: "kanban" | "gantt";
  onToggle: () => void;
  className?: string;
};

const SwitchToggle: React.FC<SwitchToggleProps> = ({
  leftLabel,
  rightLabel,
  currentView,
  onToggle,
  className = "",
}) => {
  return (
    <div className={`${styles.switchContainer} ${className}`}>
      <input
        type="radio"
        id="kanban"
        name="viewSwitch"
        value="kanban"
        checked={currentView === "kanban"}
        readOnly
      />
      <input
        type="radio"
        id="gantt"
        name="viewSwitch"
        value="gantt"
        checked={currentView === "gantt"}
        readOnly
      />
      <label htmlFor="kanban" onClick={onToggle}>
        {leftLabel}
      </label>
      <label htmlFor="gantt" onClick={onToggle}>
        {rightLabel}
      </label>
      <div
        className={`${styles.switchWrapper} ${
          currentView === "gantt" ? styles.moveRight : styles.moveLeft
        }`}
      >
        <div className={styles.switch}>
          <div
            className={`${styles.text} ${
              currentView === "kanban" ? styles.active : styles.inactive
            }`}
          >
            {leftLabel}
          </div>
          <div
            className={`${styles.text} ${
              currentView === "gantt" ? styles.active : styles.inactive
            }`}
          >
            {rightLabel}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwitchToggle;
