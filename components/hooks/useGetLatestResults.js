import { useState, useEffect } from "react";
import axios from "axios";

function useGetLatestResults() {
  const [resultsLoading, setResultsLoading] = useState(true);
  const [resultsError, setResultsError] = useState(false);
  const [results, setResults] = useState([]);
  const [resultsTitle, setResultsTitle] = useState("");

  useEffect(() => {
    let cancel;
    setResultsLoading(true);
    setResultsError(false);
    axios({
      method: "GET",
      url: "api/results",
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        //   console.log(res.data.data);
        setResultsLoading(false);
        setResults(res.data.data.eventResults);
        setResultsTitle(res.data.data.eventTitle);
        //   console.log(results);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setResultsError(true);
      });
    return () => cancel();
  }, []);

  return { resultsLoading, resultsError, results, resultsTitle };
}

export default useGetLatestResults;
