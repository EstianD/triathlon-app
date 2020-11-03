import { useEffect, useState } from "react";
import { getSortedNews } from "../../lib/news";
import axios from "axios";

// Custome hook to retrieve data
export default function useGetNews(pageNumber, newsData) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [initialNews, setInitialNews] = useState(newsData);
  const [news, setNews] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  function loadNews(page) {
    // If initial data for pre-render
    if (page == 1) {
      setNews((prevNews) => {
        return [...prevNews, ...newsData];
      });

      setLoading(false);
    } else {
      // All subsequent data to be loaded pas page 1

      let cancel;

      axios({
        method: "GET",
        url: `/api/news/${pageNumber}`,
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
        .then((res) => {
          console.log("done");
          console.log(res);
          setNews((prevNews) => {
            return [...prevNews, ...res.data];
          });
          // Caps out at 150 articles
          setHasMore(news.length < 150);
          setLoading(false);
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
          setError(true);
        });
      return () => cancel();
    }
  }

  // Retrieve data whenever page number changes
  useEffect(() => {
    setLoading(true);
    setError(false);
    loadNews(pageNumber);
  }, [pageNumber]);

  return { loading, error, hasMore, news };
}
