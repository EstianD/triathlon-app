import axios from "axios";

export async function getLatestResults() {
  const baseUrl = "https://api.triathlon.org/v1";
  const apiKey = process.env.APIKEY;
  // Date of today to filter end date for events
  const todayDate = new Date().toISOString().split("T")[0];

  const options = {
    headers: {
      apikey: apiKey,
    },
    params: {
      per_page: 100,
      page: 2,
      order: "asc",
      filters: "year,2020|sport.cat_name, triathlon",
      end_date: todayDate,
      elite: true,
    },
  };

  async function getEventResults(programs) {
    const options = {
      headers: {
        apikey: apiKey,
      },
      params: {
        limit: 10,
      },
    };

    try {
      let resultsArr = [];

      for (let i = 0; i < programs.length; i++) {
        let resultsObj = {};

        const resultsUrl = `${baseUrl}/events/${programs[i].event_id}/programs/${programs[i].prog_id}/results`;
        const resultsData = await axios.get(resultsUrl, options);

        resultsObj.progName = resultsData.data.data.prog_name;

        // console.log()

        // newResultsObject = {
        //   athleteId: athlete.athlete_id,
        //   athleteTitle: athlete.athlete_title,
        //   position: athlete.position,
        //   totalTime: athlete.total_time,
        //   athleteFlag: athlete.athlete_flag,
        //   athleteProfile: athlete.athlete_listing,
        // };

        resultsObj.results = resultsData.data.data.results;

        // console.log("------------", resultsData.data.data);
        console.log(resultsObj);
      }

      // programs.map((prog) => {
      //   const resultsUrl = `${baseUrl}/events/${eventId}/programs/${progId}/results`;
      //   const resultsData = await axios.get(resultsUrl, options);
      // })

      const { data } = resultsData.data;
      // console.log("RESULTS: ", results);
      console.log("RRRR: ", data);
      let newResultsObject = {};
      let newResultsArr = [];

      console.log(data.prog_name);

      // data.results.map((athlete) => {
      // newResultsObject = {
      //   athleteId: athlete.athlete_id,
      //   athleteTitle: athlete.athlete_title,
      //   position: athlete.position,
      //   totalTime: athlete.total_time,
      //   athleteFlag: athlete.athlete_flag,
      //   athleteProfile: athlete.athlete_listing,
      // };

      //   newResultsArr.results.push(newResultsObject);
      //   console.log("ARRAY: ", newResultsArr);
      // });

      return newResultsArr;
    } catch (e) {
      console.log("error getting results: ", e.message);
    }
  }

  async function getProgramIds(eventId) {
    const progUrl = `${baseUrl}/events/${eventId}/programs`;
    const options = {
      headers: {
        apikey: apiKey,
      },
      // params: {
      //   prog_name: "Elite_Men",
      // },
    };

    try {
      const prog = await axios.get(progUrl, options);
      const { data } = prog.data;
      console.log("DATA: ", data);
      // Loop through programs and return Elite Men/Women program_ids
      const progArr = data.filter((prog) => {
        // console.log(prog);
        return (
          (prog.prog_name == "Elite Men" && prog.results) ||
          (prog.prog_name == "Elite Women" && prog.results)
        );
      });

      console.log("PROG_ARR: ", progArr);

      // const progId = data[0].prog_id;
      //  console.log("PROG: ", data);
      if (progArr) {
        return progArr;
      }
    } catch (e) {
      console.log("Error retrieving programId: ", e.message);
    }
  }

  async function getLatestEvent() {
    try {
      const eventUrl = `${baseUrl}/search/events`;
      //  Get list of events
      const eventData = await axios.get(eventUrl, options);
      let { data } = eventData.data;
      // console.log("EVENTS: ", data);
      // Retrieve events that was not cancelled
      let eventArray = data.filter((event) => event.event_cancelled === false);
      // Get latest event that had a result
      let event = eventArray[eventArray.length - 1];
      return event;
    } catch (e) {
      console.log("Error retrieving events: ", e.message);
    }
  }

  try {
    //  getLatestResults();
    const event = await getLatestEvent();
    const eventId = event.event_id;
    // Retrieve prog_id for event
    const programs = await getProgramIds(eventId);
    console.log("PROGS: ", programs);

    let eventResults = await getEventResults(programs);

    // programs.map(async (prog) => {

    //   // console.log("HERE: ", eventResults);
    // });

    // const eventResults = await getEventResults(eventId, programId);
    // console.log("EVENT_RES: ", eventResults);
    const LatestResults = {
      eventTitle: event.event_title,
      eventDate: event.event_date,
      eventResults,
    };

    return {
      LatestResults,
    };
  } catch (e) {
    //  res.json({ msg: e });
  }
}
