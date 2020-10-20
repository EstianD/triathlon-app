function calcTimeDifference(storyDate) {
  // console.log(storyDate);
  //   Calculate the difference in Minutes
  function calcMinutesDiff(now, dateStory) {
    let millisecondsDiff = now - dateStory;
    // console.log("now: ", dateStory);
    // console.log("then: ", now);
    let minutesDiff = Math.floor(millisecondsDiff / 1000 / 60);
    return minutesDiff;
  }
  // Calculate differece in hours
  function calcHoursDiff(now, dateStory) {
    let millisecondsDiff = now - dateStory;
    let hoursDiff = Math.floor(millisecondsDiff / 1000 / 60 / 60);
    // console.log(hoursDiff);
    return hoursDiff;
  }

  // Calculate difference in days
  function calcDaysDiff(now, dateStory) {
    let millisecondsDiff = now - dateStory;
    let daysDiff = Math.floor(millisecondsDiff / 1000 / 60 / 60 / 24);
    // console.log(daysDiff);
    return daysDiff;
  }

  //
  const dateNow = new Date().getTime();
  const datePublished = new Date(storyDate).getTime();
  let trailingInfo;

  if (calcMinutesDiff(dateNow, datePublished) < 60) {
    trailingInfo =
      calcMinutesDiff(dateNow, datePublished) > 1
        ? " Minutes ago"
        : " Minute ago";
    return calcMinutesDiff(dateNow, datePublished) + trailingInfo;
  } else if (calcHoursDiff(dateNow, datePublished) < 24) {
    trailingInfo =
      calcHoursDiff(dateNow, datePublished) > 1 ? " Hours ago" : " Hour ago";
    return calcHoursDiff(dateNow, datePublished) + trailingInfo;
  } else {
    trailingInfo =
      calcDaysDiff(dateNow, datePublished) > 1 ? " Days ago" : " Day ago";
    return calcDaysDiff(dateNow, datePublished) + trailingInfo;
  }
}

export default calcTimeDifference;
