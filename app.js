const base_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCrr = document.querySelector(".from select");
const toCrr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for(let select of dropdowns) {
    for (let crrCode in countryList){
        // console.log(code, countryList[code]);
        let allOption = document.createElement("option");
        allOption.innerText = crrCode;
        allOption.value = crrCode;
        if(select.name === "from" && crrCode === "USD"){
            allOption.selected = "selected";
        }else if(select.name === "to" && crrCode === "INR"){
            allOption.selected = "selected";
        }
        select.append(allOption);
    }

    select.addEventListener("change", (evt) => {
        changeFlag(evt.target);
    });
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    // console.log(amtValue);
    if(amtValue === "" || amtValue < 1) {
        amtValue = 1;
        amount.value ="1";//this will be set in inpute after click 
    }

    const URL = `${base_URL}/${fromCrr.value.toLowerCase()}/${toCrr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    // console.log(data);
    let rate = data[toCrr.value.toLowerCase()];

    let finalAmount = amtValue * rate;
    // console.log(finalAmount)
    msg.innerText = `${amtValue} ${fromCrr.value} = ${finalAmount} ${toCrr.value}`;

}

const changeFlag = (element) => {
    // console.log(element);
    let crrCode = element.value;
    let cntryCode = countryList[crrCode];
    let newSrc = `https://flagsapi.com/${cntryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();//form nu default behaviour hoy k submit par click kariye to page refresh thay
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});