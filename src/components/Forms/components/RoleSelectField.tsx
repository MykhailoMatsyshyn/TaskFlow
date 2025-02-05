const RoleSelectField = ({
  register,
  errors,
}: {
  register: any;
  errors: any;
}) => (
  <>
    <select
      {...register("role")}
      id="role"
      className={`w-full h-[49px] border pl-[14px] ${
        errors.role ? "border-red-500" : "border-[#BEDBB0]"
      } bg-background rounded-md opacity-40 focus:outline-none focus:opacity-100 text-text font-normal text-[14px] tracking-tight`}
    >
      <option value="">Choose a role</option>
      <option value="Admin">Admin</option>
      <option value="Project Manager">Project Manager</option>
      <option value="Team Member">Team Member</option>
    </select>
    {errors.role && (
      <p className="absolute text-red-500 text-xs -mt-[8px] ml-[13px] backdrop-blur-sm bg-[var(--text-color-error-transparent)] rounded px-[5px]">
        {errors.role?.message}
      </p>
    )}
  </>
);

export default RoleSelectField;
