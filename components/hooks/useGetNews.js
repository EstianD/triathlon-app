import { useEffect, useState } from "react";
import { getSortedNews } from "../../lib/news";
import axios from "axios";

export default function useGetNews(pageNumber, newsData) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [allNews, setAllNews] = useState(newsData);
  const [news, setNews] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  function loadNews(page) {
    // console.log(page);
    let pageData = allNews.filter((entry) => {
      return entry.pageNumber == page;
    });

    setNews((prevNews) => {
      return [...prevNews, ...pageData];
    });
    setHasMore(
      pageData[pageData.length - 1].pageNumber <
        newsData[newsData.length - 1].pageNumber
    );
    setLoading(false);

    console.log("ALL DATA: ", newsData[newsData.length - 1]);
    console.log("NEWS: ", pageData);
    console.log("NEWS LENGTH: ", news.length);
    console.log("NEWSDATA LENGTH: ", newsData.length);
    console.log("HAS MORE: ", hasMore);
    console.log("PAGE: ", pageData);
  }

  useEffect(() => {
    setLoading(true);
    setError(false);
    loadNews(pageNumber);
  }, [pageNumber]);

  return { loading, error, hasMore, news };
}
