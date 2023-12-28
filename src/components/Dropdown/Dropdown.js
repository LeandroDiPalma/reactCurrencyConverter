import React from "react";
import Select, { components } from "react-select";
import { customStyles } from "./index";
const { Option } = components;

const OptionComponent= (props) => {
  return (
  <Option {...props}>
    {props.data.label}
  </Option>
  );
};

  const Dropdowns = (props) => {
    const {handleChange, placeholder, value, options} = props;

    const selectValue = options  && options.find((option) => option.value === value || option.label === value);

  return (
  <Select
    options={options}
    onChange={handleChange}
    placeholder={placeholder}
    styles={customStyles}
    value={selectValue}
    components={{ Option: OptionComponent }}
  />
  );
  };

  export default Dropdowns;
