function get_data() {
  fetch("travel_recommendation.json")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

get_data();
