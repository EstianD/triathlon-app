import React, { useState } from "react";
import MultiSelect from "react-multi-select-component";
import Categories from "../../Categories.json";

function CategorySelect() {
  console.log(Categories);

  const options = Categories.map((category) => {
    return {
      label: category.cat_name,
      value: category.cat_slug,
    };
  });

  const [selected, setSelected] = useState([]);

  return (
    <div>
      <span>Filter by Category</span>
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy={"Select Category"}
        selectSomeItems={"Select Category"}
      />
    </div>
  );
}

export default CategorySelect;
