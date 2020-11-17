import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";

function SearchEvents({ handleSearchChange }) {
  return (
    <div>
      <InputGroup size="md" onChange={(e) => handleSearchChange(e)}>
        <FormControl
          aria-label="Medium"
          aria-describedby="inputGroup-sizing-sm"
        />
      </InputGroup>
    </div>
  );
}

export default SearchEvents;
