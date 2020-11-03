import axios from "axios";

export default (req, res) => {
  const url = "https://api.triathlon.org/v1/content/news";
  const apiKey = process.env.APIKEY;

  const {
    query: { page },
  } = req;

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

  async function getNewsData() {
    const { data } = await axios.get(url, options);

    let newsData = data.data.map((article) => {
      let newsId = article.news_id;
      let data = {
        title: article.news_title,
        date: article.news_entry_date,
        image: article.news_thumbnail,
      };

      return { newsId, data };
    });

    res.json(newsData);
    return newsData;
  }

  try {
    getNewsData();
  } catch (e) {
    res.json({ msg: e });
  }
};
