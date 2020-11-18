import React, { useState } from "react";
import MultiSelect from "react-multi-select-component";
import Countries from "../../Countries.json";

function CountrySelect() {
  const options = Countries.map((country) => {
    return {
      label: country.country_name,
      value: country.country_name,
    };
  });

  const [selected, setSelected] = useState([]);

  return (
    <div>
      <span>Filter by Country</span>
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy={"Select"}
      />
    </div>
  );
}

export default CountrySelect;
