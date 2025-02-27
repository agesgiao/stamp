let currentIndex = null;
let correctAnswer = "";
let currentElement = null;  // �N���b�N���ꂽ�摜�̗v�f��ێ�����ϐ�

// ����p�̉摜�����`�����z��i�摜���������őΉ������܂��j
const correctImages = [
    'sakana1_correct.png', 'sakana2_correct.png', 'sakana3_correct.png',
    'sakana4_correct.png', 'sakana5_correct.png', 'sakana6_correct.png',
    'sakana7_correct.png', 'sakana8_correct.png'
];

function showOverlay(index, hint, answer, element) {
    currentIndex = index;
    correctAnswer = answer;
    currentElement = element;  // �N���b�N���ꂽ�摜�̗v�f��ۑ�
    console.log(hint);  // �q���g���R���\�[���ɕ\�����Ċm�F
    document.getElementById("hintText").innerText = hint;
    document.getElementById("keywordInput").value = "";
    document.getElementById("resultText").innerText = "";  // �������
    document.getElementById("overlay").style.display = "flex";
}

function checkAnswer() {
    const userInput = document.getElementById("keywordInput").value;
    const resultText = document.getElementById("resultText");

    // data-* �������烁�b�Z�[�W���擾
    const correctMessage = resultText.getAttribute("data-correct");
    const incorrectMessage = resultText.getAttribute("data-incorrect");

    if (userInput === correctAnswer) {
        resultText.innerText = correctMessage;  // �����̏ꍇ�̃��b�Z�[�W��\��
        resultText.style.color = "green";  // �����̏ꍇ�͗ΐF
        // ����������A�I�[�o�[���C����ĉ摜��ύX
        currentElement.querySelector("img").src = `img/${correctImages[currentIndex]}`;  // �摜��ύX
        setTimeout(closeOverlay, 1000);  // 1�b��ɃI�[�o�[���C�����
    } else {
        resultText.innerText = incorrectMessage;  // �s�����̏ꍇ�̃��b�Z�[�W��\��
        resultText.style.color = "red";    // �s�����̏ꍇ�͐ԐF
    }
}

function closeOverlay() {
    document.getElementById("overlay").style.display = "none";
}
