const nameInputEl = document.getElementById("name");
const sortBtnEl = document.getElementById("sort");
const resetBtnEl = document.getElementById("reset");
const ChibaMasterValueEl = document.getElementById("ChibaMasterValue");
const ChibaHallgodValueEl = document.getElementById("ChibaHallgodValue");
const ChibadanceofferingValueEl = document.getElementById("ChibadanceofferingValue");
const ChibayurinnonValueEl = document.getElementById("ChibayurinnonValue");

sortBtnEl.onclick = sortingHat;
resetBtnEl.onclick = reset;

function getName() {
  return nameInputEl.value.trim();
}

function getHouses() {
  return JSON.parse(localStorage.getItem("houses"));
}

function checkHouses() {
  const houses = getHouses();
  console.log(houses);

  let housesForRandom = [];

  if (houses) {
    for (const house in houses) {
      if (houses[house] < 13) {
        housesForRandom.push(house);
      }
    }
  } else {
    housesForRandom = ["ชิบะมัสเตอร์", "ชิบุยฮอลกอด", "ชิเบะรำถวาย", "ชิกะยุรินนอง"];
  }
  return housesForRandom;
}

function sumStudents() {
  // get students from local storage
  const students = getHouses();
  let sum = 0;

  if (students) {
    sum = Object.values(students).reduce((a, b) => a + b);
  }

  console.log(sum);
  return sum;
}

function addStudentToHouse(house) {
  // update student to house in local storage
  let houses = {};

  if (getHouses()) {
    houses = getHouses();
  }

  houses[house] = (houses[house] || 0) + 1;
  localStorage.setItem("houses", JSON.stringify(houses));

  console.log(getHouses());
}

function showStudents() {
  const hourses = getHouses();

  if (!hourses) {
    ChibaMasterValueEl.innerText = "0";
    ChibaHallgodValueEl.innerText = "0";
    ChibadanceofferingValueEl.innerText = "0";
    ChibayurinnonValueEl.innerText = "0";
  } else {
    ChibaMasterValueEl.innerText = hourses.ChibaMaster ? hourses.ChibaMaster : "0";
    ChibaHallgodValueEl.innerText = hourses.ChibaHallgod ? hourses.ChibaHallgod : "0";
    ChibadanceofferingValueEl.innerText = hourses.Chibadanceoffering ? hourses.Chibadanceoffering : "0";
    ChibayurinnonValueEl.innerText = hourses.Chibayurinnon ? hourses.Chibayurinnon : "0";
  }
}

function randomHouse() {
  const houses = checkHouses();

  console.log("houses for random : " + houses);

  return houses[Math.floor(Math.random() * houses.length)];
}

function chooseHouse() {
  const chooseHouse = randomHouse();
  return chooseHouse;
}

function sortingHat() {
  const name = getName();
  console.log(name.length);

  if (name && sumStudents() < 50) {
    const house = chooseHouse(name);

    console.log(house);

    addStudentToHouse(house);

    alert(`${name} เจ้าได้อยู่บ้าน ${house}`);

    showStudents();

    // reset input field
    nameInputEl.value = "";

    if (!(sumStudents() < 10)) {
      sortBtnEl.style.display = "none";
      resetBtnEl.style.display = "inline-block";
      alert("ข้าได้ทำการคัดสรรครบทุกคนแล้ว!");
    }
  } else {
    alert("นายท่านชื่ออะไร");
  }
}

function reset() {
  nameInputEl.value = "";
  sortBtnEl.style.display = "inline-block";
  resetBtnEl.style.display = "none";

  const houses = {
    ChibaMaster: 0,
    ChibaHallgod: 0,
    Chibadanceoffering: 0,
    Chibayurinnon: 0,
  };

  localStorage.setItem("houses", JSON.stringify(houses));

  showStudents();
}

(function main() {
  if (!getHouses()) {
    const houses = {
        ChibaMaster: 0,
        ChibaHallgod: 0,
        Chibadanceoffering: 0,
        Chibayurinnon: 0,
    };

    localStorage.setItem("houses", JSON.stringify(houses));
  }

  showStudents();
})();