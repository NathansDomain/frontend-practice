/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/

const inputEl = document.getElementById("input-el")
const btnEl = document.getElementById("btn-el")
const lengthEl = document.getElementById("length-el")
const volumeEl = document.getElementById("volume-el")
const massEl = document.getElementById("mass-el")

btnEl.addEventListener("click", () => {
    const val = Number(inputEl.value)
    lengthEl.textContent = unitConverter(val, 3.281, "meters", "feet")
    volumeEl.textContent = unitConverter(val, 0.264, "liters", "gallons")
    massEl.textContent = unitConverter(val, 2.204, "kilograms", "pounds")
})

function unitConverter(val, ratio, unit1, unit2) {
    let metricVal = (val * ratio).toFixed(2)
    let imperialVal = (val / ratio).toFixed(2)
    return `${val} ${unit1} = ${metricVal} ${unit2} | ${val} ${unit2} = ${imperialVal} ${unit1}`
}