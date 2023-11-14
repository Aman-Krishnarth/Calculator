// numerical numbers
let button_1 = document.querySelector("#button_1");
let button_2 = document.querySelector("#button_2");
let button_3 = document.querySelector("#button_3");
let button_4 = document.querySelector("#button_4");
let button_5 = document.querySelector("#button_5");
let button_6 = document.querySelector("#button_6");
let button_7 = document.querySelector("#button_7");
let button_8 = document.querySelector("#button_8");
let button_9 = document.querySelector("#button_9");
let button_0 = document.querySelector("#button_0");

// special buttons
let specialButton_1 = document.querySelector("#special_1");
let specialButton_2 = document.querySelector("#special_2");
let specialButton_3 = document.querySelector("#special_3");
let specialButton_4 = document.querySelector("#special_4");
let specialButton_5 = document.querySelector("#special_5");
let specialButton_6 = document.querySelector("#special_6");
let specialButton_7 = document.querySelector("#special_7");
let specialButton_8 = document.querySelector("#special_8");
let specialButton_9 = document.querySelector("#special_9");
let specialButton_10 = document.querySelector("#special_10");

// equation tab's button
let equationTab = document.querySelector("#equationTab");

// event listener for keyboard buttons
document.addEventListener("keydown", (event) => {
  if (event.key === "Backspace") {
    deleteEntry();
  }
  if (event.key === "Enter") {
    calculateAns();
    specialButton_4.textContent = "AC";
  }
  if (
    (event.key >= "0" && event.key <= "9") ||
    event.key === "+" ||
    event.key === "-" ||
    event.key === "*" ||
    event.key === "/" ||
    event.key === "(" ||
    event.key === ")" ||
    event.key === "." ||
    event.key === "%"
  ) {
    equationTab.textContent += event.key;
  }
});

// function to check valid parenthesis
let parenthesis = []
function validParenthesis(){
    if(parenthesis.length>0){
        parenthesis.pop();
        return true;
    }
    else{
        alert("Invalid Parenthesis");
        return false;
    }
}

// adding event listeners to calculator buttons
button_1.addEventListener("click", () => {
  equationTab.textContent += "1";
});
button_2.addEventListener("click", () => {
  equationTab.textContent += "2";
});
button_3.addEventListener("click", () => {
  equationTab.textContent += "3";
});
button_4.addEventListener("click", () => {
  equationTab.textContent += "4";
});
button_5.addEventListener("click", () => {
  equationTab.textContent += "5";
});
button_6.addEventListener("click", () => {
  equationTab.textContent += "6";
});
button_7.addEventListener("click", () => {
  equationTab.textContent += "7";
});
button_8.addEventListener("click", () => {
  equationTab.textContent += "8";
});
button_9.addEventListener("click", () => {
  equationTab.textContent += "9";
});
button_0.addEventListener("click", () => {
  equationTab.textContent += "0";
});

specialButton_1.addEventListener("click", () => {
  equationTab.textContent += "(";
  parenthesis.push("(");
});

specialButton_2.addEventListener("click", () => {
    let valid = validParenthesis();
    if(valid){
        equationTab.textContent += ")";
    }
});

specialButton_3.addEventListener("click", () => {
  equationTab.textContent += "%";
});

function deleteEntry() {
  if (specialButton_4.textContent === "AC") {
    equationTab.textContent = "";
    specialButton_4.textContent = "CE";
  } else {
    equationTab.textContent = equationTab.textContent.slice(
      0,
      equationTab.textContent.length - 1
    );
  }
}

specialButton_4.addEventListener("click", () => {
  deleteEntry();
});

specialButton_5.addEventListener("click", () => {
  equationTab.textContent += "/";
});

specialButton_6.addEventListener("click", () => {
  equationTab.textContent += "*";
});

specialButton_7.addEventListener("click", () => {
  equationTab.textContent += "-";
});

specialButton_8.addEventListener("click", () => {
  equationTab.textContent += ".";
});

specialButton_9.addEventListener("click", () => {
  calculateAns();
  specialButton_4.textContent = "AC";
});

specialButton_10.addEventListener("click", () => {
  equationTab.textContent += "+";
});

function calculateAns() {
  if (equationTab.innerText.length > 0 && equationTab.innerText!=="Nothing to display" && equationTab.innerText!=="Math error"){
    let s = equationTab.textContent;
    s = s.replace("%", "*0.01");
    let postfixExpression = infixToPostfix(s);
    document.getElementById("equationTab").textContent =
      evaluateEquation(postfixExpression);
  } else {
    document.getElementById("equationTab").textContent = "Nothing to display";
  }
}

let priority = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
};
function infixToPostfix(s) {
  let postfixExpression = [];
  let stack = [];
  let element = "";
  console.log(s);

  for (let index = 0; index < s.length; index++) {
    if (s[index] in priority) {
      postfixExpression.push(Number(element));
      element = "";
      if (stack[stack.length - 1] === "(") {
        stack.push(s[index]);
      } else {
        while (
          stack.length > 0 &&
          priority[stack[stack.length - 1]] >= priority[s[index]]
        ) {
          postfixExpression.push(stack.pop());
        }
        stack.push(s[index]);
      }
    } else if (s[index] === ")") {
      postfixExpression.push(Number(element));
      element = "";
      while (stack[stack.length - 1] !== "(") {
        postfixExpression.push(stack.pop());
      }
      stack.pop();
    } else if (s[index] === "(") {
      stack.push(s[index]);
    } else {
      element += s[index];
    }
  }
  if (element.length > 0) {
    postfixExpression.push(Number(element));
  }
  while (stack.length > 0) {
    postfixExpression.push(stack.pop());
  }
  return postfixExpression;
}


function evaluateEquation(arr) {
  let stack = [];
  for (let index = 0; index < arr.length; index++) {
    if (arr[index] in priority) {
      operand2 = stack.pop();
      operand1 = stack.pop();
      if(operand1===undefined || operand2===undefined){
        return "Math error";
      }
      if (arr[index] === "+") {
        stack.push(operand1 + operand2);
      }
      if (arr[index] === "-") {
        stack.push(operand1 - operand2);
      }
      if (arr[index] === "*") {
        stack.push(operand1 * operand2);
      }
      if (arr[index] === "/") {
        if (operand2 === 0) {
          return "Math error";
        } else {
          stack.push(operand1 / operand2);
        }
      }
    } else {
      stack.push(arr[index]);
    }
  }
  return stack.pop();
}