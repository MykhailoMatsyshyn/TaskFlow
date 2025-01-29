/**
 * CardDescription Component
 *
 * Displays the task description with a two-line truncation.
 */
const CardDescription = ({ description }) => {
  return (
    <p
      className="font-normal text-[12px] leading-[16px] tracking-[-0.02em] text-white/50 overflow-hidden text-ellipsis"
      style={{
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: 2,
        height: "32px",
      }}
    >
      {description || <span className="opacity-50">No description</span>}
    </p>
  );
};

export default CardDescription;
