const API_URL = "https://randomuser.me/api"

const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double-money");
const showMillionairesBtn = document.getElementById("show-millionaire");
const sortBtn = document.getElementById("sort");
const calcWealthBtn = document.getElementById("calculate-wealth");

let data = [];
getRandomUser();
getRandomUser();
getRandomUser();

// Fetch Random Users & Add Money
async function getRandomUser() {
    const res = await fetch(API_URL);
    const data = await res.json();
    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() *1000000)
    }

    addData(newUser); 
}

function addData(object) {
    data.push(object);
    updateDOM();
}

// Update DOM elements
function updateDOM(providedData = data) {
    // Clear Main Div
    main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";
    providedData.forEach(object => {
        const element = document.createElement("div");
        element.classList.add("person");
        element.innerHTML = `<strong>${object.name}</strong>${formatMoney(object.money)}`
        main.appendChild(element);
    });
}

// Format Money as Currency
function formatMoney(number) {
    return "$" + (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event Listeners
addUserBtn.addEventListener("click", getRandomUser);