import { RiFilterLine, RiFilterOffLine } from "react-icons/ri";
import useFilterStore from "../../stores/filterStore";

const FilterIcon = () => {
  const { filters, resetFilters } = useFilterStore();

  // Check if any filters are active
  const areFiltersActive = Object.entries(filters).some(
    ([key, value]) =>
      value !== "" &&
      value !== undefined &&
      key !== "pageIndex" &&
      key !== "pageSize"
  );

  return (
    <div>
      <button
        onClick={resetFilters}
        className="flex items-center text-white rounded-full"
        title="Reset Filters"
      >
        {areFiltersActive ? (
          <RiFilterOffLine size={28} color="rgba(255, 255, 255, 0.8)" />
        ) : (
          <RiFilterLine size={28} color="rgba(255, 255, 255, 0.8)" />
        )}
        <span className="sr-only">Toggle Filters</span>
      </button>
    </div>
  );
};

export default FilterIcon;
