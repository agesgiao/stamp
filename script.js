let currentIndex = null;
let correctAnswer = "";
let currentElement = null;  // クリックされた画像の要素を保持する変数

// 正解用の画像名を定義した配列（画像名をここで対応させます）
const correctImages = [
    'sakana1_correct.png', 'sakana2_correct.png', 'sakana3_correct.png',
    'sakana4_correct.png', 'sakana5_correct.png', 'sakana6_correct.png',
    'sakana7_correct.png', 'sakana8_correct.png'
];

function showOverlay(index, hint, answer, element) {
    currentIndex = index;
    correctAnswer = answer;
    currentElement = element;  // クリックされた画像の要素を保存
    console.log(hint);  // ヒントをコンソールに表示して確認
    document.getElementById("hintText").innerText = hint;
    document.getElementById("keywordInput").value = "";
    document.getElementById("resultText").innerText = "";  // 初期状態
    document.getElementById("overlay").style.display = "flex";
}

function checkAnswer() {
    const userInput = document.getElementById("keywordInput").value;
    const resultText = document.getElementById("resultText");

    // data-* 属性からメッセージを取得
    const correctMessage = resultText.getAttribute("data-correct");
    const incorrectMessage = resultText.getAttribute("data-incorrect");

    if (userInput === correctAnswer) {
        resultText.innerText = correctMessage;  // 正解の場合のメッセージを表示
        resultText.style.color = "green";  // 正解の場合は緑色
        // 正解したら、オーバーレイを閉じて画像を変更
        currentElement.querySelector("img").src = `img/${correctImages[currentIndex]}`;  // 画像を変更
        setTimeout(closeOverlay, 1000);  // 1秒後にオーバーレイを閉じる
    } else {
        resultText.innerText = incorrectMessage;  // 不正解の場合のメッセージを表示
        resultText.style.color = "red";    // 不正解の場合は赤色
    }
}

function closeOverlay() {
    document.getElementById("overlay").style.display = "none";
}
