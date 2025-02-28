let currentIndex = null;
let correctAnswer = "";
let currentElement = null;

// 正解用の画像名を定義した配列
const correctImages = [
    'sakana1_correct.png', 'sakana2_correct.png', 'sakana3_correct.png',
    'sakana4_correct.png', 'sakana5_correct.png', 'sakana6_correct.png',
    'sakana7_correct.png', 'sakana8_correct.png'
];

// ローカルストレージから取得して、ページ読み込み時に復元
document.addEventListener("DOMContentLoaded", function () {
    const savedStamps = JSON.parse(localStorage.getItem("stamps")) || [];
    const stampContainers = document.querySelectorAll(".stamp-container img");

    savedStamps.forEach(index => {
        if (stampContainers[index]) {
            stampContainers[index].src = `img/${correctImages[index]}`;
        }
    });
});

// Ctrl + Q でリセット
document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.key === 'q') {
        event.preventDefault();  // デフォルトの動作を防止
        resetStamps();  // スタンプをリセット
    }
});

function showOverlay(index, hint, answer, element) {
    currentIndex = index;
    correctAnswer = answer;
    currentElement = element;

    document.getElementById("hintText").innerText = hint;
    document.getElementById("keywordInput").value = "";
    document.getElementById("resultText").innerText = "";
    document.getElementById("overlay").style.display = "flex";
}

function checkAnswer() {
    const userInput = document.getElementById("keywordInput").value;
    const resultText = document.getElementById("resultText");

    const correctMessage = resultText.getAttribute("data-correct");
    const incorrectMessage = resultText.getAttribute("data-incorrect");

    if (userInput === correctAnswer) {
        resultText.innerText = correctMessage;
        resultText.style.color = "green";

        // 画像を正解バージョンに変更
        currentElement.querySelector("img").src = `img/${correctImages[currentIndex]}`;

        // 取得済みのスタンプをローカルストレージに保存
        let savedStamps = JSON.parse(localStorage.getItem("stamps")) || [];
        if (!savedStamps.includes(currentIndex)) {
            savedStamps.push(currentIndex);
            localStorage.setItem("stamps", JSON.stringify(savedStamps));
        }

        setTimeout(closeOverlay, 1000);
    } else {
        resultText.innerText = incorrectMessage;
        resultText.style.color = "red";
    }
}

function closeOverlay() {
    document.getElementById("overlay").style.display = "none";
}

// スタンプをリセットする関数
function resetStamps() {
    // ローカルストレージをクリア
    localStorage.removeItem("stamps");

    // すべてのスタンプ画像を元に戻す
    const stampContainers = document.querySelectorAll(".stamp-container img");
    stampContainers.forEach(img => {
        img.src = "img/sakana_default.png";  // 初期画像に戻す
    });

    alert("スタンプラリーがリセットされました！");
}
