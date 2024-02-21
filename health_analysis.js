const addPatientBtn = document.getElementById("add_patient");
const report = document.getElementById("report");
const searchBtn = document.getElementById("btn_search");
const patients = [];

function addPatient() {
  const name = document.getElementById("name_input").value;
  const gender = document.querySelector('input[name="gender"]:checked');
  const age = document.getElementById("age_input").value;
  const condition = document.getElementById("condition").value;

  if (name && gender && age && condition) {
    patients.push({
      name: name,
      gender: gender.value,
      age: age,
      condition: condition,
    });
  }
}

function resetFrom() {
  document.getElementById("name_input").value = "";
  document.getElementById("age_input").value = "";
  document.getElementById("condition").value = "";
  document.querySelector('input[name="gender"]:checked').checked = false;
}

function generateReport() {
  const report_data = {
    Diabetes: 0,
    Thyroid: 0,
    "High Blood Pressure": 0,
  };

  const gender_data = {
    Male: { ...report_data },
    Female: { ...report_data },
  };
  report.innerHTML = "<h3>All patients</h3>";
  for (i of patients) {
    report_data[i.condition] += 1;
    gender_data[i.gender][i.condition] += 1;
  }
  for (let key in report_data) {
    report.innerHTML += `<p>${key} : ${report_data[key]}</p>`;
  }
  for (let key in gender_data) {
    report.innerHTML += `<h3>${key}</h3>`;
    for (let item in gender_data[key]) {
      report.innerHTML += `<p>${item} : ${gender_data[key][item]}</p>`;
    }
  }
}

function searchCondition() {
  const input = document.getElementById("search_bar").value.toLowerCase();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";
  var out = "";

  fetch("health_analysis.json")
    .then((response) => response.json())
    .then((data) => {
      condition = data.conditions.find(
        (item) => item.name.toLowerCase() === input
      );
      if (condition) {
        for (let key in condition) {
          item = condition[key];
          if (typeof item == "object") {
            const out_temp = item.join(",");
            out += `<p><strong>${key}: </strong> ${out_temp} </p> `;
          } else {
            if (key == "name") {
              out += `<h2> ${item} </h2>`;
            } else if (key == "imagesrc") {
              out += `<img src="images/${item}" alt="${item}">`;
            } else {
              out += `<p><strong>${key}: </strong> ${item} </p> `;
            }
          }
        }
      } else {
        out = "content not found";
      }
      resultDiv.innerHTML = out;
    });
}

addPatientBtn.onclick = () => {
  addPatient();
  resetFrom();
  generateReport();
};

searchBtn.onclick = searchCondition;
