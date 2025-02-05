import React from "react";
import styles from "./SwitchToggle.module.scss";

/**
 * SwitchToggle Component
 *
 * A toggle switch component that allows switching between two views (e.g., Kanban and Gantt).
 *
 * Features:
 * - Uses radio buttons for accessibility.
 * - Displays labels for both views.
 * - Applies animated transitions between views.
 * - Supports additional custom styles via `className` prop.
 *
 * @param {string} leftLabel - Label for the left option (e.g., "Kanban").
 * @param {string} rightLabel - Label for the right option (e.g., "Gantt").
 * @param {"kanban" | "gantt"} currentView - The currently selected view.
 * @param {() => void} onToggle - Callback function triggered when switching views.
 * @param {string} [className] - Optional additional class names for styling.
 * @returns {JSX.Element} - A switch toggle component.
 */

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
      {/* Hidden radio buttons for accessibility */}
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

      {/* Labels for toggling between views */}
      <label htmlFor="kanban" onClick={onToggle}>
        {leftLabel}
      </label>
      <label htmlFor="gantt" onClick={onToggle}>
        {rightLabel}
      </label>

      {/* Animated switch indicator */}
      <div
        className={`${styles.switchWrapper} ${
          currentView === "gantt" ? styles.moveRight : styles.moveLeft
        }`}
      >
        <div className={styles.switch}>
          {/* Display active text for the selected view */}
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
