import axios from "axios";

export default (req, res) => {
  const url = "https://api.triathlon.org/v1/content/news";
  const apiKey = process.env.APIKEY;

  const {
    query: { page },
  } = req;

  //   const todayDate = new Date().toISOString().split("T")[0];
  //   console.log(todayDate);
  // console.log(todayDate.toISOString().split("T")[0]);

  console.log("request: ", page);
  const options = {
    headers: {
      apikey: apiKey,
    },
    params: {
      per_page: 10,
      order: "desc",
      page: page,
      // end_date: todayDate,
    },
  };

  //   console.log(options);

  async function getNewsData() {
    const data = await axios.get(url, options);
    //  console.log(data.data);
    res.json(data.data);
  }

  try {
    getNewsData();
  } catch (e) {
    res.json({ msg: e });
  }

  // console.log(data);

  // res.json(data.data);

  // res.statusCode = 200;
  // res.json({ key: process.env.APIKEY });
};
