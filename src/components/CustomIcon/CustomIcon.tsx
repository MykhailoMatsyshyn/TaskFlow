import Icons from "../../assets/icons/sprite.svg";

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
      <use href={`${Icons}#icon-${id}`} />
    </svg>
  );
};
