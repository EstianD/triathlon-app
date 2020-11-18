import axios from "axios";

export async function getEvents() {
  const url = "https://api.triathlon.org/v1/events";
  const contryUrl = "https://api.triathlon.org/v1/federations/countries";
  // Get API key from .env file
  const apiKey = process.env.APIKEY;

  let eventObj = {};
  let eventsArr = [];

  const options = {
    headers: {
      apikey: apiKey,
    },
    params: {
      per_page: 10,
      order: "desc",
      page: 1,
    },
  };

  const countries = await axios.get(contryUrl, options);
  console.log(countries.data);

  const { data } = await axios.get(url, options);

  const events = data.data;
  //   console.log(events);
  events.map((event) => {
    if (event.event_status === "Scheduled") {
      eventObj = {
        eventId: event.event_id,
        eventTitle: event.event_title,
        eventDate: event.event_date,
        eventVenue: event.event_venue,
        eventCountry: event.event_country,
        eventRegion: event.event_region_name,
        eventListing: event.event_listing,
        eventFlag: event.event_flag,
      };
      eventsArr.push(eventObj);
    }
  });

  return { eventData: eventsArr };

  //   console.log(eventsArr);
}
