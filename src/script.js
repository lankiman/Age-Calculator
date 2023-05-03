"use strict";

//globals
const dayInput = document.getElementById("js-day-input");
const dayHeading = document.getElementById("js-day-heading");
const mthHeading = document.getElementById("js-month-heading");
const yrHeading = document.getElementById("js-year-heading");
const dayErrorMessage = document.getElementById("js-day-error-message");
const mthInput = document.getElementById("js-month-input");
const mthErrorMessage = document.getElementById("js-month-error-message");
const yrInput = document.getElementById("js-year-input");
const yrErrorMessage = document.getElementById("js-year-error-message");
const submitButton = document.getElementById("js-submit-button");
const yrResult = document.getElementById("js-years");
const mthResult = document.getElementById("js-months");
const dayResult = document.getElementById("js-days");
const dateErrorMessage = document.getElementById("js-date-error-message");

let days = 0;
let months = 0;
let years = 0;

let dayDetCalc = 0;
let mthDetCalc = 0;
let yrDetCalc = 0;
let monthChecker = 0;
let leapYearChecker = 0;
let februaryChecker = 0;

const currentYear = new Date().getFullYear();

const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function calculateAge(year, month, day) {
  const now = new Date();
  const birthdate = new Date(year, month - 1, day);
  let years = now.getFullYear() - birthdate.getFullYear();
  let months = now.getMonth() - birthdate.getMonth();
  let days = now.getDate() - birthdate.getDate();

  if (months < 0 || (months === 0 && now.getDate() < birthdate.getDate())) {
    years--;
    months += 12;
  }

  if (days < 0) {
    months--;
    days += getDaysInMonth(now.getMonth(), now.getFullYear());
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

function getDaysInMonth(month, year) {
  if (month === 1 && isLeapYear(year)) {
    return 29;
  }
  return monthDays[month];
}

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function resultReset() {
  dayResult.textContent = "--";
  mthResult.textContent = "--";
  yrResult.textContent = "--";
}

function inputReset() {
  dayInput.value = "";
  mthInput.value = "";
  yrInput.value = "";
}

function dayErrordisp() {
  dayInput.classList.add("border-Lightred");
  dayHeading.classList.replace("text-Smokeygrey", "text-Lightred");
}

function dayErrordispReset() {
  dayHeading.classList.replace("text-Lightred", "text-Smokeygrey");
  dayInput.classList.remove("border-Lightred");
  dayErrorMessage.textContent = "";
}

function mthErrordisp() {
  mthInput.classList.add("border-Lightred");
  mthHeading.classList.replace("text-Smokeygrey", "text-Lightred");
}

function mthErrordispReset() {
  mthHeading.classList.replace("text-Lightred", "text-Smokeygrey");
  mthInput.classList.remove("border-Lightred");

  mthErrorMessage.textContent = "";
}

function yrErrordisp() {
  yrHeading.classList.replace("text-Smokeygrey", "text-Lightred");
  yrInput.classList.add("border-Lightred");
}

function yrErrordispReset() {
  yrHeading.classList.replace("text-Lightred", "text-Smokeygrey");
  yrInput.classList.remove("border-Lightred");
  yrErrorMessage.textContent = "";
}

function validDateErrordisp() {
  dayErrordisp();
  mthErrordisp();
  yrErrordisp();
  dateErrorMessage.textContent = "Must be a valid Date";
}

function validDateErrordispReset() {
  dayErrordispReset();
  mthErrordispReset();
  yrErrordispReset();
  dateErrorMessage.textContent = "";
}
function animateAgeResults() {
  const yearResult = document.getElementById("js-yrs-animation");
  const monthResult = document.getElementById("js-mth-animation");
  const dayResult = document.getElementById("js-day-animation");

  setTimeout(() => {
    yearResult.classList.add("animate__lightSpeedInLeft");
    setTimeout(() => {
      yearResult.classList.remove("animate__lightSpeedInLeft");
    }, 1000);
  }, 0);

  setTimeout(() => {
    monthResult.classList.add("animate__lightSpeedInLeft");
    setTimeout(() => {
      monthResult.classList.remove("animate__lightSpeedInLeft");
    }, 1000);
  }, 500);

  setTimeout(() => {
    dayResult.classList.add("animate__lightSpeedInLeft");
    setTimeout(() => {
      dayResult.classList.remove("animate__lightSpeedInLeft");
    }, 1000);
  }, 1000);

  const ageResults = document.querySelectorAll(".age-result");
  setTimeout(() => {
    ageResults.forEach(result => {
      result.classList.add("animate__shakeY");
      setTimeout(() => {
        result.classList.remove("animate__shakeY");
      }, 1000);
    });
  }, 2000);
}
dayInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    mthInput.focus();
  }
});
mthInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    yrInput.focus();
  }
});
yrInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    submitButton.click();
  }
});

submitButton.addEventListener("click", function() {
  const day = dayInput.value;
  const mth = mthInput.value;
  const yr = yrInput.value;

  if (day == "") {
    dayErrordisp();
    dayDetCalc = -1;
    monthChecker = 0;
    dayErrorMessage.textContent = "Field is Required";
    dateErrorMessage.textContent = "";
  } else if (day >= 1 && day <= 31) {
    days = day;
    dayDetCalc = 0;
    dayErrordispReset();
  } else {
    dayErrordisp();
    dayDetCalc = -1;
    dayErrorMessage.textContent = "must be a valid day";
    dateErrorMessage.textContent = "";
  }

  if (mth == "") {
    mthErrordisp();
    mthDetCalc = -1;
    mthErrorMessage.textContent = "Field is Required";
  } else if (mth >= 1 && mth <= 12) {
    months = mth;
    mthDetCalc = 0;
    mthErrordispReset();
  } else {
    mthErrordisp();
    mthDetCalc = -1;
    mthErrorMessage.textContent = "must be a valid month";
  }

  if (yr == "") {
    yrErrordisp();
    yrDetCalc = -1;
    yrErrorMessage.textContent = "Field is Required";
  } else if (yr < currentYear && yr >= 1000) {
    years = yr;
    yrDetCalc = 0;
    yrErrordispReset();
  } else if (yr < 1000) {
    yrErrordisp();
    yrDetCalc = -1;
    setTimeout(function() {
      alert("Year Cannot go beyond 1000's i.e more than 1023 years ago");
    }, 5);
    yrErrorMessage.textContent = "must be a valid year";
  } else {
    yrErrordisp();
    yrDetCalc = -1;
    yrErrorMessage.textContent = "must be in the past";
  }

  if (dayInput.value == "") {
    monthChecker = 0;
  } else if (dayInput.value > 31) {
    monthChecker = 0;
  } else if (
    (months == 4 || months == 6 || months == 9 || months == 11) &&
    days == 31 &&
    years < currentYear
  ) {
    monthChecker = -1;
  } else {
    monthChecker = 0;
  }

  if (dayInput.value == "") {
    leapYearChecker = 0;
  } else if (dayInput.value > 31) {
    leapYearChecker = 0;
  } else if (days == 29 && months == 2 && !isLeapYear(years)) {
    leapYearChecker = -1;
  } else {
    leapYearChecker = 0;
  }

  if (dayInput.value == "") {
    februaryChecker = 0;
  } else if (dayInput.value > 31) {
    februaryChecker = 0;
  } else if (days > 29 && months == 2) {
    februaryChecker = -1;
  } else {
    februaryChecker = 0;
  }

  if (februaryChecker == -1) {
    resultReset();
    validDateErrordisp();
    setTimeout(function() {
      alert("Inputed Month cannot have more than 29 days");
    }, 5);
    return;
  } else if (monthChecker == -1) {
    resultReset();
    validDateErrordisp();
    setTimeout(function() {
      alert("Inputed Month has only 30 days");
    }, 5);
    return;
  } else if (leapYearChecker == -1) {
    resultReset();
    validDateErrordisp();
    setTimeout(function() {
      alert("Inputed Year is not a Leap Year");
    }, 5);
    return;
  } else if (dayDetCalc == -1 || mthDetCalc == -1 || yrDetCalc == -1) {
    resultReset();
    return;
  } else {
    const age = calculateAge(years, months, days);
    dayResult.textContent = age.days;
    mthResult.textContent = age.months;
    yrResult.textContent = age.years;
    animateAgeResults();
    inputReset();
    validDateErrordispReset();
  }
});
