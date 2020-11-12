import axios from "axios";

export async function getLatestResults(eventPassed = undefined) {
  console.log("EVENT PASSED: ", eventPassed);
  let event;
  let eventId;
  let LatestResults;
  // Add a optional parameter event_id
  // console.log("ID: ", e_id);
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
    console.log("GETTING RESULTS");

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
        let progAthleteResultsObj = {};
        let athleteResultsArr = [];

        const resultsUrl = `${baseUrl}/events/${programs[i].event_id}/programs/${programs[i].prog_id}/results`;
        const resultsData = await axios.get(resultsUrl, options);

        // Destructure object
        const { data } = resultsData.data;

        // LOOP THROUGH ATHLETE POSITIONS
        data.results.map((athlete) => {
          let athleteObject = {};

          athleteObject = {
            athleteId: athlete.athlete_id,
            athleteTitle: athlete.athlete_title,
            position: athlete.position,
            totalTime: athlete.total_time,
            athleteFlag: athlete.athlete_flag,
            athleteProfile: athlete.athlete_listing,
          };

          athleteResultsArr.push(athleteObject);
        });
        progAthleteResultsObj.progName = data.prog_name;
        progAthleteResultsObj.results = athleteResultsArr;

        resultsArr.push(progAthleteResultsObj);
      }

      return resultsArr;
    } catch (e) {
      console.log("error getting results: ", e.message);
    }
  }

  async function getProgramIds(eventId) {
    console.log("GETTING PROGRAM IDS", eventId);
    const progUrl = `${baseUrl}/events/${eventId}/programs`;
    const options = {
      headers: {
        apikey: apiKey,
      },
    };

    try {
      const prog = await axios.get(progUrl, options);
      const { data } = prog.data;

      // Loop through programs and return Elite Men/Women program_ids
      const progArr = data.filter((prog) => {
        return (
          (prog.prog_name == "Elite Men" && prog.results) ||
          (prog.prog_name == "Elite Women" && prog.results)
        );
      });

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
    console.log("ID: ", eventPassed);
    // Check if event_id was sent from function call
    if (eventPassed == undefined) {
      console.log("UNDEFINED");
      event = await getLatestEvent();

      eventId = event.event_id;

      // Retrieve prog_id for event
      const programs = await getProgramIds(eventId);

      let eventResults = await getEventResults(programs);
      // console.log("HERE: ", event);

      LatestResults = {
        eventTitle: event.event_title,
        eventDate: event.event_date,
        eventResults,
      };

      console.log("LATEST RESULTS: ", LatestResults);
    } else {
      console.log("NOPE");

      eventId = eventPassed.event_id;

      // Retrieve prog_id for event
      const programs = await getProgramIds(eventId);

      let eventResults = await getEventResults(programs);
      // console.log("HERE: ", event);
      console.log(eventResults);
      LatestResults = {
        eventTitle: eventPassed.event_title,
        eventDate: eventPassed.event_date,
        eventResults,
      };

      // Check if eventResults is not empty
      // Empty = no results for Elite Men/Women
      // Rerun function without passed Id
      if (LatestResults.eventResults.length == 0) {
        console.log("NO RESULTS");
        event = await getLatestEvent();

        eventId = event.event_id;

        // Retrieve prog_id for event
        const programs = await getProgramIds(eventId);

        let eventResults = await getEventResults(programs);
        // console.log("HERE: ", event);

        LatestResults = {
          eventTitle: event.event_title,
          eventDate: event.event_date,
          eventResults,
        };
      }

      console.log("LATEST RESULTS: ", LatestResults);
    }

    return {
      LatestResults,
    };
  } catch (e) {}
}
