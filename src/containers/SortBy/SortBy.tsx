import React from "react";
import SelectField, { Option } from "../../components/SelectField/SelectField";
import { useStores } from "../../hooks/use-stores";
import { observer } from "mobx-react";
/**
 * Container that config Select Field component
 *
 */
const SortBy: React.FC = observer(
  (): JSX.Element => {
    const { movieStore } = useStores();
    const options: Option[] = [
      { value: "Popularity Descending", label: "Popularity Descending" },
      { value: "Popularity Ascending", label: "Popularity Ascending" },
      { value: "Rating Descending", label: "Rating Descending" },
      { value: "Rating Ascending", label: "Rating Ascending" },
      { value: "Release Date Descending", label: "Release Date Descending" },
      { value: "Release Date Ascending", label: "Release Date Ascending" },
      { value: "Title (A-Z)", label: "Title (A-Z)" },
      { value: "Title (Z-A)", label: "Title (Z-A)" },
    ];

    const handleChange = (option: Option): void => {
      movieStore.changeSortOrder(option.value);
    };
    return (
      <SelectField
        options={options}
        value={{
          value: movieStore.movieSortOrder,
          label: movieStore.movieSortOrder,
        }}
        change={handleChange}
      />
    );
  }
);

export default SortBy;
