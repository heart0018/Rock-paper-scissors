const userHand = document.querySelectorAll(".button-group button");
const cheatButton = document.getElementById("cheatMode"); //チートモードのボタン

cheatButton.addEventListener('change', () => {
  const animation = cheatButton.checked ? "add" : "remove";
  document.body.classList[animation]("cheat-active");
});


//ユーザーが "✊ グー✌️ チョキ🖐 パーを選択した時の動作"
userHand.forEach((button) => {
  button.addEventListener("click", () => {
    //cpuの手をランダムに決定
    const hands = ["✊ グー", "✌️ チョキ", "🖐 パー"];
    let userSelect = button.textContent; //ユーザーの選択の内容

    let cpuHand;
    if (cheatButton.checked) {
      const cheatMoves = {
        "✊ グー": 1, //グーを選んだ場合、チョキを選ぶ
        "✌️ チョキ": 2,
        "🖐 パー": 0,
      };
      cpuHand = cheatMoves[userSelect];
    } else {
      cpuHand = Math.floor(Math.random() * hands.length);
    }
    const cpuSelect = hands[cpuHand]; //CPUの選択の内容

    //勝敗判定関数の実行
    const result = judge(userSelect, cpuSelect);
    //勝敗を画面に表示する関数の実行
    displayResult(userSelect, cpuSelect, result);
  });
});

//勝利判定関数

function judge(userChoice, cpuChoice) {
  if (userChoice === cpuChoice) {
    return "draw";
  } else if (
    (userChoice === "✊ グー" && cpuChoice === "✌️ チョキ") ||
    (userChoice === "✌️ チョキ" && cpuChoice === "🖐 パー") ||
    (userChoice === "🖐 パー" && cpuChoice === "✊ グー")
  ) {
    return "win";
  } else {
    return "lose";
  }
}

//勝敗を画面に表示する関数

function displayResult(userChoice, cpuChoice, result) {
  const resultElement = document.getElementById("result");
  resultElement.classList.remove("win", "lose", "draw");

  const message = {
    win: "あなたの勝ち！",
    lose: "あなたの負け！",
    draw: "引き分け！",
  };

  const cheatText = cheatButton.checked ? "（チートON）" : "";
  resultElement.classList.add(result);
  resultElement.textContent = `あなたの手: ${userChoice}、CPUの手:${cpuChoice} → ${message[result]}${cheatText}`;
}
