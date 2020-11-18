import React, { useState } from "react";
import MultiSelect from "react-multi-select-component";
import Specifications from "../../Specifications.json";

function SpecificationSelect() {
  const options = Specifications.map((spec) => {
    return {
      label: spec.cat_name,
      value: spec.cat_slug,
    };
  });

  const [selected, setSelected] = useState([]);

  return (
    <div>
      <span>Filter by Specification</span>
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy={"Select"}
      />
    </div>
  );
}

export default SpecificationSelect;
