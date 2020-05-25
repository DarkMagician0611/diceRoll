var diceMap = {
  1: "A.png",
  2: "B.png",
  3: "C.png",
  4: "D.png",
  5: "E.png",
  6: "F.png",
};

function pageLoad() {
    const dice = [...document.querySelectorAll(".die-list")];
    dice.forEach((die) => {
        toggleClasses(die);
        let number = getRandomNumber(1, 6);
        die.dataset.roll = number;
    });
}

function rollDice() {
  const dice = [...document.querySelectorAll(".die-list")];
  let resultSet = [];
  dice.forEach((die) => {
    toggleClasses(die);
    let number = getRandomNumber(1, 6);
    die.dataset.roll = number;
    resultSet.push(number);
    let id = die.id.split("-")[1];
    const result = document.getElementById("result-" + id);
    result.innerHTML = "";
    var img = document.createElement("img");
    img.src = diceMap[number];
    img.setAttribute("height", "130px");
    img.setAttribute("width", "130px");
    setTimeout(() => {
      result.appendChild(img);
    }, 1500);
  });
  computeWin(resultSet);
}

function computeWin(resultSet) {
    let game = Number(document.getElementById("game").value);
    let bet = Number(document.getElementById("bet").value);
    let winElement = document.getElementById("win-count");
    let winAmount = calculateAmount(resultSet, game, bet);
    winElement.innerHTML = "";
    setTimeout(() => {
        winElement.innerHTML = winAmount;
    }, 1600);
}

function calculateAmount(resultSet, game, bet) {
    let winAmount = 0;
    if(game == 1) {
        if(resultSet == [1, 1, 1]) {
            winAmount = 200 * bet;
        } else if(resultSet == [3, 3, 3]) {
            winAmount = 10 * bet;
        }
    }
    return winAmount;
}

function toggleClasses(die) {
  die.classList.toggle("odd-roll");
  die.classList.toggle("even-roll");
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.getElementById("roll-button").addEventListener("click", rollDice);
