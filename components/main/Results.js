import React, { useEffect } from "react";

import useGetLatestResults from "../hooks/useGetLatestResults";

function Results() {
  useGetLatestResults();
  return <div>resultssss</div>;
}

export default Results;
