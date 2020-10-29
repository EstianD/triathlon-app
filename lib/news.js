import axios from "axios";

export async function getSortedNews(page) {
  const url = "https://api.triathlon.org/v1/content/news";
  const apiKey = process.env.APIKEY;
  console.log("API KEY: ", apiKey);

  const options = {
    headers: {
      apikey: apiKey,
    },
    params: {
      per_page: 100,
      order: "desc",
      // page: page
    },
  };

  const { data } = await axios.get(url, options);
  console.log("ALL: ", data);
  console.log(data.data.length);
  let count = 0;
  let pageNumber = 1;
  const allNewsData = data.data.map((article) => {
    let newsId = article.news_id;

    if (count > 9) {
      pageNumber++;
      count = 0;
    }
    count++;
    //  console.log("HERE: ", article);

    let data = {
      title: article.news_title,
      date: article.news_entry_date,
      image: article.news_thumbnail,
    };

    return {
      newsId,
      pageNumber,
      data,
    };
  });
  //   console.log("HIER: ", allNewsData);
  return allNewsData;
}
