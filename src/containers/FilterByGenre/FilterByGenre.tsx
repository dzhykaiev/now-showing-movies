import React from "react";
import SelectField, { Option } from "../../components/SelectField/SelectField";
import { useStores } from "../../hooks/use-stores";
import { observer } from "mobx-react";
/**
 * Container that config Select Field component
 *
 */
const FilterByGenre: React.FC = observer(
  (): JSX.Element => {
    const { movieStore } = useStores();

    // convert genres to Option[] type view
    const options = movieStore.genres?.map((genre) => {
      return {
        value: genre.id,
        label: genre.name,
      };
    });
    // format from number or number[] genres ids to Option[] type
    const valuesFormated: Option[] = movieStore.genres?.reduce((acc, cur) => {
      if (movieStore.movieChosenGenres?.some((el) => el === cur.id)) {
        return [...acc, { value: cur.id, label: cur.name }];
      }
      return acc;
    }, []);
    // simple handler that trigger change into store
    const handleChange = (option: Option[]): void => {
      const genres = option?.map((el) => el.value);
      movieStore.changeChosenGenres(genres);
    };
    return (
      <SelectField
        options={options}
        value={valuesFormated}
        change={handleChange}
        isMulti={true}
        placeholder="Select genre..."
      />
    );
  }
);

export default FilterByGenre;
