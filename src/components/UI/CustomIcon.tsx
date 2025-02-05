import Icons from "../../assets/icons/sprite.svg";

/**
 * CustomIcon Component
 *
 * This component renders an SVG icon from a sprite sheet.
 * It allows customization of size, color, and additional styles.
 *
 * @param {string} id - The unique identifier of the icon within the sprite.
 * @param {number} [size] - Optional size (width & height) of the icon.
 * @param {string} [color="currentColor"] - Optional color of the icon (defaults to "currentColor").
 * @param {string} [className] - Optional additional CSS classes for styling.
 *
 * @returns {JSX.Element} - The rendered SVG icon.
 */
interface ICustomIconProps {
  id: string;
  size?: number;
  color?: string;
  className?: string;
}

export const CustomIcon: React.FC<ICustomIconProps> = ({
  id,
  size,
  color = "currentColor",
  className,
}) => {
  /**
   * Predefined styles for specific icons.
   * Each icon can have different fill and stroke settings.
   */
  const CustomIconStyles: Record<string, { fill: string; stroke: string }> = {
    project: { fill: "none", stroke: color },
    container: { fill: color, stroke: "none" },
    palette: { fill: "none", stroke: color },
    hexagon: { fill: color, stroke: "none" },
    lightning: { fill: color, stroke: "none" },
    loading: { fill: color, stroke: "none" },
    puzzle: { fill: "none", stroke: color },
    star: { fill: color, stroke: "none" },
  };

  // Determine the appropriate fill and stroke for the given icon ID
  const { fill, stroke } = CustomIconStyles[id] || {
    fill: "none",
    stroke: color,
  };

  return (
    <svg
      width={size}
      height={size}
      className={className}
      fill={fill}
      stroke={stroke}
    >
      {/* Use the referenced icon from the sprite sheet */}
      <use href={`${Icons}#icon-${id}`} />
    </svg>
  );
};
