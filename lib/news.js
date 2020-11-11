import axios from "axios";

// Retrieve sorted data for articles
export async function getSortedNews(page) {
  const url = "https://api.triathlon.org/v1/content/news";
  // Get API key from .env file
  const apiKey = process.env.APIKEY;

  const options = {
    headers: {
      apikey: apiKey,
    },
    params: {
      per_page: 10,
      order: "desc",
      page: page,
    },
  };

  const { data } = await axios.get(url, options);

  const allNewsData = data.data.map((article) => {
    let newsId = article.news_id;

    let data = {
      title: article.news_title,
      date: article.news_entry_date,
      image: article.news_thumbnail,
    };

    return {
      newsId,
      data,
    };
  });

  return allNewsData;
}

export async function getNewsIds() {
  const url = "https://api.triathlon.org/v1/content/news";
  // Get API key from .env file
  const apiKey = process.env.APIKEY;

  const options = {
    headers: {
      apikey: apiKey,
    },
    params: {
      per_page: 100,
    },
  };

  const { data } = await axios.get(url, options);

  const allNewsIds = data.data.map((article) => {
    let newsId = article.news_id;

    return newsId.toString();
  });
  return allNewsIds;
}

export async function getArticle(id) {
  const url = `https://api.triathlon.org/v1/content/news/${id}`;
  // Get API key from .env file
  const apiKey = process.env.APIKEY;

  const options = {
    headers: {
      apikey: apiKey,
    },
  };

  const article = await axios.get(url, options);

  return article.data;
}
