import axios from "axios";

export default (req, res) => {
  const apiKey = process.env.APIKEY;
  //   console.log(apiKey);
  console.log("QUERY: ", req.query);
  const {
    query: { article },
  } = req;

  console.log("REQ: ", article);

  const url = `https://api.triathlon.org/v1/content/news/${article}`;
  console.log(url);
  const options = {
    headers: {
      apikey: apiKey,
    },
  };

  async function getArticle() {
    try {
      const { data } = await axios.get(url, options);
      res.json({ data });
      console.log("DATA: ", { data });
    } catch (e) {
      res.json({ msg: e.message });
    }
  }

  try {
    getArticle();
  } catch (e) {
    res.json({ msg: e.message });
    //  console.log(e.message);
  }
};
