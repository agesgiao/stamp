let currentIndex = null;
let correctAnswer = "";
let currentElement = null;

// ����p�̉摜�����`�����z��
const correctImages = [
    'sakana1_correct.png', 'sakana2_correct.png', 'sakana3_correct.png',
    'sakana4_correct.png', 'sakana5_correct.png', 'sakana6_correct.png',
    'sakana7_correct.png', 'sakana8_correct.png'
];

// ���[�J���X�g���[�W����擾���āA�y�[�W�ǂݍ��ݎ��ɕ���
document.addEventListener("DOMContentLoaded", function () {
    const savedStamps = JSON.parse(localStorage.getItem("stamps")) || [];
    const stampContainers = document.querySelectorAll(".stamp-container img");

    savedStamps.forEach(index => {
        if (stampContainers[index]) {
            stampContainers[index].src = `img/${correctImages[index]}`;
        }
    });
});

// Ctrl + Q �Ń��Z�b�g
document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.key === 'q') {
        event.preventDefault();  // �f�t�H���g�̓����h�~
        resetStamps();  // �X�^���v�����Z�b�g
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

        // �摜�𐳉��o�[�W�����ɕύX
        currentElement.querySelector("img").src = `img/${correctImages[currentIndex]}`;

        // �擾�ς݂̃X�^���v�����[�J���X�g���[�W�ɕۑ�
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

// �X�^���v�����Z�b�g����֐�
function resetStamps() {
    // ���[�J���X�g���[�W���N���A
    localStorage.removeItem("stamps");

    // ���ׂẴX�^���v�摜�����ɖ߂�
    const stampContainers = document.querySelectorAll(".stamp-container img");
    stampContainers.forEach(img => {
        img.src = "img/sakana_default.png";  // �����摜�ɖ߂�
    });

    alert("�X�^���v�����[�����Z�b�g����܂����I");
}
