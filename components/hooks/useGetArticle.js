import React, { useState, useEffect } from "react";
import axios from "axios";

function useGetArticle(article) {
  console.log("FIRST:", article);
  const [articleInfo, setArticleInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log("THIRD: ", article);
    console.log("FOURTH: ", `/api/article/${article}`);
    try {
      axios({
        method: "GET",
        url: `/api/article/${article}`,
      }).then((res) => {
        console.log("ANOTHER: ", res.data);
        setArticleInfo(res.data);
        setLoading(false);
        setError(false);
      });
    } catch (e) {
      console.log(e.message);
    }
  }, [0]);

  return { articleInfo, loading, error };
  //   console.log(articleId);
}

export default useGetArticle;
