const result = document.getElementById("search_result");
const search_text = document.getElementById("search");
const search_btn = document.getElementById("search_btn");
const clear_btn = document.getElementById("clear_btn");

function get_text(obj) {
  return `
  <h4>${obj["name"]}</h4>
  <img src="${obj["imageUrl"]}" alt="${obj["name"]}">
  <p>${obj["description"]}</p>
  `;
}

function update(keyword) {
  result.innerHTML = "";
  let out = "";
  fetch("travel_recommendation.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      for (let j in data) {
        out += `<h2>${j}</h2>`;
        if (j == "countries") {
          for (let country of data[j]) {
            out += `<h3>${country["name"]}</h3>`;
            for (let city of country["cities"]) {
              out += get_text(city);
            }
          }
        } else {
          for (let i of data[j]) {
            out += get_text(i);
          }
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

search_btn.onclick = () => {
  search();
};
clear_btn.onclick = () => {
  result.innerHTML = "";
  search_text.value = "";
};
