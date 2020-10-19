import { useState, useEffect } from "react";
import axios from "axios";

function useGetLatestResults() {
  const [resultsLoading, setResultsLoading] = useState(true);
  const [resultsError, setResultsErro] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    let cancel;
    axios({
      method: "GET",
      url: "api/results",
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    }).then((res) => {
      console.log(res);
    });
    return () => cancel();
  }, [0]);

  return <div></div>;
}

export default useGetLatestResults;
