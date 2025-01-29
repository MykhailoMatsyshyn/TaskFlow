const SubmitButton = ({ type }: { type: "login" | "register" }) => (
  <button
    type="submit"
    className="w-full h-[49px] bg-[#BEDBB0] text-[#161616] rounded-lg font-medium text-[14px] tracking-tight"
  >
    {type === "login" ? "Log In " : "Register "}Now
  </button>
);

export default SubmitButton;
