import { useEffect, useState } from "react";
import axios from "axios";

export default function useGetNews(pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [news, setNews] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: `/api/news/${pageNumber}`,
      // query: { page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        console.log("done");
        setNews((prevNews) => {
          return [...prevNews, ...res.data.data];
        });
        setHasMore(res.data.data.length > 0);
        setLoading(false);
        //   console.log(res.data);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [pageNumber]);

  return { loading, error, hasMore, news };
}
