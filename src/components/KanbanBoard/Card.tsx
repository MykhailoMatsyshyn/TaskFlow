const Card = ({ task }) => {
  return (
    <div className=" p-4 h-[154px] w-[335px] bg-[#121212] rounded-lg">
      <h4 className="font-bold">{task.title}</h4>
      <p className="text-sm">{task.description}</p>
      <div className="flex gap-2">
        {/* Дії */}
        <button>Move</button>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default Card;
