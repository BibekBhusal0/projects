function get_data() {
  fetch("travel_recommendation.json")
    .than((response) => response.json)
    .than((data) => {
      console.log(data);
    });
}
get_data();
