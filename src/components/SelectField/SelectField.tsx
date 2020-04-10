import React from "react";
import Select from "react-select";

export type Option = {
  value: any;
  label: any;
};

interface Props {
  options: Option[];
  value: any;
  change: (option: any) => void;
  isMulti?: boolean;
  placeholder?: string;
}

const SelectField: React.FC<Props> = ({
  options,
  value,
  isMulti = false,
  change,
  placeholder,
}): JSX.Element => {
  return (
    <Select
      options={options}
      defaultValue={value}
      onChange={change}
      isMulti={isMulti}
      placeholder={placeholder}
    />
  );
};

export default SelectField;
