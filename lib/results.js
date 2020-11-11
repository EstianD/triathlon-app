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

  async function getEventResults(eventId, progId) {
    const resultsUrl = `${baseUrl}/events/${eventId}/programs/${progId}/results`;
    const options = {
      headers: {
        apikey: apiKey,
      },
      params: {
        limit: 10,
      },
    };

    try {
      const resultsData = await axios.get(resultsUrl, options);
      const { results } = resultsData.data.data;
      // console.log("RESULTS: ", results);

      let newResultsObject = {};
      let newResultsArr = [];
      results.map((athlete) => {
        newResultsObject = {
          athleteId: athlete.athlete_id,
          athleteTitle: athlete.athlete_title,
          position: athlete.position,
          totalTime: athlete.total_time,
          athleteFlag: athlete.athlete_flag,
          athleteProfile: athlete.athlete_listing,
        };

        newResultsArr.push(newResultsObject);
      });

      return newResultsArr;
    } catch (e) {
      console.log("error getting results: ", e.message);
    }
  }

  async function getProgramId(eventId) {
    const progUrl = `${baseUrl}/events/${eventId}/programs`;
    const options = {
      headers: {
        apikey: apiKey,
      },
      params: {
        prog_name: "Elite_Men",
      },
    };

    try {
      const prog = await axios.get(progUrl, options);
      const { data } = prog.data;
      const progId = data[0].prog_id;
      //  console.log("PROG: ", data);
      if (data[0].results) {
        return progId;
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
    const programId = await getProgramId(eventId);
    const eventResults = await getEventResults(eventId, programId);
    //  console.log(programId);
    //  console.log(eventId);
    //  console.log(eventResults);
    //  console.log(event);

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
