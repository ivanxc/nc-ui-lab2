var elem = document.getElementById('solve_btn');

elem.addEventListener('click', () => {
  let a = document.getElementById('a-coefficient').value;
  let b = document.getElementById('b-coefficient').value;
  let c = document.getElementById('c-coefficient').value;
  showSolution(a, b, c);
})

var inputs = document.querySelectorAll('.coefficient-block input[type=text]');

inputs.forEach(input => {
  input.addEventListener('input', () => {
    var a = document.getElementById('a-coefficient').value;
    var b = document.getElementById('b-coefficient').value;
    var c = document.getElementById('c-coefficient').value;
    document.getElementById("solution").hidden = true;
    createEquation(a, b, c)
  });
});

function showSolution(a, b, c) {
  var solutionElement = document.getElementById("solution");
  const newItem = document.createElement('div');
  newItem.id = 'solution';
  var solution = "<span>Решение: </span>";

  if (!validateCoefficient(a) && !validateCoefficient(b)) {
    solution = "<span>Некорректное уравнение</span>"
  } else if (!validateCoefficient(a)) {
    x = -c / b;
    solution+= "<span>x = " + x + "</span>";
    addToTable(document.getElementById("final-equation").innerHTML, x, x);
  } else {
    var discriminant = b * b - 4 * a * c;
    if (discriminant < 0) {
      solution += "<span>Корней нет</span>"
      addToTable(document.getElementById("final-equation").innerHTML, NaN, NaN);
    } else if (discriminant === 0) {
      x = -b / (2 * a);
      solution += "<span>x = " + x + "</span>";
      addToTable(document.getElementById("final-equation").innerHTML, x, x);
    } else {
      const x1 = (-b - Math.sqrt(discriminant)) / (2 * a);
      const x2 = (-b + Math.sqrt(discriminant)) / (2 * a);
      solution += "<span>x<sub>1</sub> = " + x1 +
          " x<sub>2</sub> = " + x2 + "</span>";
      addToTable(document.getElementById("final-equation").innerHTML, x1, x2);
    }
  }

  newItem.innerHTML = solution;
  solutionElement.parentNode.replaceChild(newItem, solutionElement);

}

function addToTable(equation, x1, x2) {
  var table = document.querySelector(".results table");
  var newElem = document.createElement("tr");
  var equationElement = document.createElement("td");
  equationElement.innerHTML = document.getElementById('final-equation').innerHTML;
  newElem.appendChild(equationElement);
  if (isNaN(x1) && isNaN(x2)) {
    var noRootElement = document.createElement("td");
    noRootElement.textContent = "Корней нет";
    noRootElement.colSpan = 2;
    newElem.appendChild(noRootElement);
  } else if (x1 === x2) {
    xElement = document.createElement("td");
    xElement.textContent = x1;
    xElement.colSpan = 2;
    newElem.appendChild(xElement);
  } else {
    x1Element = document.createElement("td");
    x1Element.textContent = x1;
    newElem.appendChild(x1Element);

    x2Element = document.createElement("td");
    x2Element.textContent = x2;
    newElem.appendChild(x2Element);
  }
  newElem.addEventListener("click", elem => {
    newElem.remove();
  });
  table.lastElementChild.appendChild(newElem);
}

function createEquation(a, b, c) {
  var equation = '';
  if (validateCoefficient(a)) {
    equation += String(a) + 'x' + '<sup>2</sup>';
  }
  if (validateCoefficient(b)) {
    if (b > 0 && equation.length > 0) {
      b = ' + ' + String(b);
    }
    b = String(b).replace('-', ' - ');
    equation += String(b) + 'x';
  }
  if (validateCoefficient(c)) {
    if (c > 0) {
      c = ' + ' + String(c);
    }
    c = String(c).replace('-', ' - ');
    equation += String(c);
  }
  equation += " = 0";
  equation.replace('1', '');

  var equationElement = document.getElementById('final-equation');

  const newItem = document.createElement('div');
  newItem.id = 'final-equation';
  newItem.innerHTML = equation;
  equationElement.parentNode.replaceChild(newItem, equationElement);
}

function validateCoefficient(coeff) {
  let regEx = /^[+-]?[1-9]+\d*$/;
  if (regEx.test(coeff)) {
    console.log(true);
    return true;
  }
  return false;
}