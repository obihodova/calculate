let firstNumber = "";
let secondNumber = "";
let sign = "";
let result = false;

const action = ["-", "+", "x", "/"];
const digit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];

const display = document.querySelector("#display");

function clear() {
  firstNumber = "";
  secondNumber = "";
  sign = "";
  result = false;
  display.textContent = "0";
}

function round(digit) {
  const m = Math.pow(10, 8);
  let cuttedDigit = String(Math.round(digit * m) / m);

  console.log("cutted", cuttedDigit);

  if (cuttedDigit.length > 10) {
    cuttedDigit = Number(cuttedDigit).toPrecision(7);
  }

  console.log("after precision", cuttedDigit);

  return cuttedDigit;

  // const m = Math.pow(10, 8);
  // return Math.round(digit * m) / m;
}

function backspace() {
  if (firstNumber && sign && secondNumber) {
    secondNumber = secondNumber.slice(0, secondNumber.length - 1);
    display.textContent = secondNumber ? secondNumber : sign;
  } else if (firstNumber && sign) {
    sign = "";
    display.textContent = sign ? sign : firstNumber;
  } else if (firstNumber && !result) {
    firstNumber = firstNumber.slice(0, firstNumber.length - 1);
    display.textContent = firstNumber ? firstNumber : "0";
  }
}

function percent() {
  if (firstNumber && sign && secondNumber) {
    secondNumber = secondNumber / 100;
    display.textContent = secondNumber;
  } else if (firstNumber && sign) {
    return;
  } else if (firstNumber) {
    firstNumber = firstNumber / 100;
    display.textContent = firstNumber;
  }
}

document.querySelector(".keybord").addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;

  if (e.target.id === "backspace") {
    backspace();
    return;
  }

  if (e.target.id === "percent") {
    percent();
    return;
  }

  if (e.target.id === "clear") {
    clear();
  }

  display.textContent = "0";

  const key = e.target.textContent;

  if (digit.includes(key)) {
    if (secondNumber === "" && sign === "") {
      if (
        (key === "." && firstNumber.includes(".")) ||
        firstNumber.length > 10
      ) {
        display.textContent = firstNumber;
        return;
      }
      firstNumber += key;
      display.textContent = firstNumber;
    } else if (firstNumber !== "" && result) {
      secondNumber = key;
      result = false;
      display.textContent = secondNumber;
    } else {
      if (
        (key === "." && secondNumber.includes(".")) ||
        secondNumber.length > 10
      ) {
        display.textContent = secondNumber;
        return;
      }

      secondNumber += key;
      display.textContent = secondNumber;
    }

    return;
  }

  if (action.includes(key)) {
    sign = key;
    display.textContent = sign;
    return;
  }

  if (key === "=") {
    if (secondNumber === "") {
      secondNumber = firstNumber;
    }
    if (firstNumber === ".") {
      firstNumber = "0";
    }
    if (secondNumber === ".") {
      secondNumber = "0";
    }
    switch (sign) {
      case "+":
        firstNumber = String(+firstNumber + +secondNumber);
        break;
      case "-":
        firstNumber = String(firstNumber - secondNumber);
        break;
      case "x":
        firstNumber = String(firstNumber * secondNumber);
        break;
      case "/":
        if (secondNumber === "0") {
          display.textContent = "Ошибка";
          firstNumber = "";
          secondNumber = "";
          sign = "";
          return;
        }
        firstNumber = String(firstNumber / secondNumber);
        break;
    }
    sign = "";
    result = true;
    display.textContent = round(firstNumber);
  }
});
