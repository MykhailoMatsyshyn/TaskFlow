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
        className="flex items-center text-text rounded-full"
        title="Reset Filters"
      >
        {areFiltersActive ? (
          <RiFilterOffLine size={28} />
        ) : (
          <RiFilterLine size={28} />
        )}
        <span className="sr-only">Toggle Filters</span>
      </button>
    </div>
  );
};

export default FilterIcon;
