import { useState } from "react";

const BoardFilters = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button
        className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
        onClick={() => setIsModalOpen(true)}
      >
        <svg className="w-4 h-4">{/* SVG іконка */}</svg>
        Filters
      </button>

      {/* Модальне вікно */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-lg font-bold mb-4">Filters & Background</h2>
            {/* Зміна фону */}
            <button className="mb-4">Change Background</button>
            {/* Фільтрація */}
            <button>Filter by Priority</button>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardFilters;
