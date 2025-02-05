import { RiFilterLine, RiFilterOffLine } from "react-icons/ri";
import useUsersFilterStore from "../../stores/filters/UsersFilterStore";

/**
 * FilterSwitcher Component
 *
 * This component toggles between active and inactive filter states.
 * If filters are applied, it shows an option to reset them.
 */
const FilterSwitcher = () => {
  const { filters, resetFilters } = useUsersFilterStore();

  // Check if any filters are active (excluding pagination settings)
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
        title="Toggle Filters"
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

export default FilterSwitcher;
