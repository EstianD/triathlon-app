import axios from "axios";

export default (req, res) => {
  const url = "https://api.triathlon.org/v1/search/events";
  const apiKey = process.env.APIKEY;

  const todayDate = new Date().toISOString().split("T")[0];
  console.log(todayDate);
  //   console.log(todayDate.toISOString().split("T")[0]);

  const options = {
    headers: {
      apikey: apiKey,
    },
    params: {
      per_page: 100,
      // page: 1,
      order: "desc",
      filters: "year,2020|sport.cat_name, triathlon",
      end_date: todayDate,
      elite: true,
    },
  };

  async function getLatestResults() {
    const resultData = await axios.get(url, options);
    //  console.log(res.data);
    let { data } = resultData.data;

    //  console.log(data);
    let resultArray = data.filter((event) => event.event_cancelled === false);
    //  console.log(resultArray);
    //  console.log("EVENT: ", resultArray[resultArray.length - 1]);

    let results = resultArray[resultArray.length - 1];
    res.json({
      data: resultArray,
    });
    //  data.map((entry) => {
    //    if (entry.event_cancelled === false) {
    //      console.log(entry);
    //      return entry;
    //    }
    //  });
  }

  try {
    getLatestResults();
    //  console.log(dataResults);
    //  res.json(dataResults);
  } catch (e) {
    res.json({ msg: e });
  }

  //   console.log("results");
};
