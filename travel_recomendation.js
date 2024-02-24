const result = document.getElementById("search_result");
const search_text = document.getElementById("search");
const search_btn = document.getElementById("search_btn");
const clear_btn = document.getElementById("clear_btn");

function get_text(obj) {
  return `
  <div class="result_item">
    <img src="${obj["imageUrl"]}" alt="${obj["name"]}">
    <h3 class='result_text'>${obj["name"]}</h3>
    <p class='result_text'>${obj["description"]}</p>
    <button class="btn btn_small btn_green result_text">Visit</button>
    <br/>
  </div>

  `;
}

function update(keyword) {
  result.innerHTML = "";
  let out = "";
  fetch("travel_recommendation.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data[keyword]);
      if (keyword == "countries") {
        for (let country of data[keyword]) {
          for (let city of country["cities"]) {
            out += get_text(city);
          }
        }
      } else {
        for (let i of data[keyword]) {
          out += get_text(i);
        }
      }
      result.innerHTML = out;
    });
}

function search() {
  let search_term = search_text.value.toLowerCase();
  if (search_term == "beach") {
    search_term = "beaches";
  } else if (search_term == "temple") {
    search_term = "temples";
  } else if (search_term == "country") {
    search_term = "countries";
  }
  if (["beaches", "temples", "countries"].includes(search_term)) {
    update(search_term);
  }
}

search_btn.onclick = search;

clear_btn.onclick = () => {
  result.innerHTML = "";
  search_text.value = "";
};
