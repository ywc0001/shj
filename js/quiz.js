const questions = [
    {
        question: "1. 当你面对困难时，你的第一反应是：",
        options: [
            "勇敢面对，积极寻找解决办法。",
            "先观察情况，再谨慎行动。",
            "感到焦虑，但会努力克服。",
            "寻求他人帮助。",
        ],
    },
    {
        question: "2. 你在团队中通常扮演的角色是：",
        options: [
            "领导者，果断决策。",
            "创意者，提供新点子。",
            "协调者，促进团队和谐。",
            "实干者，认真执行任务。",
        ],
    },
    {
        question: "3. 你最喜欢的颜色是：",
        options: [
            "红色（代表热情、勇敢）",
            "蓝色（代表冷静、理智）",
            "绿色（代表生机、平和）",
            "黄色（代表活力、乐观）",
        ],
    },
    {
        question: "4. 以下哪种品质你最看重：",
        options: [
            "忠诚",
            "智慧",
            "善良",
            "勇敢",
        ],
    },
    {
        question: "5. 你对未知事物的态度是：",
        options: [
            "充满好奇，主动探索",
            "有些担心，但愿意尝试了解",
            "保持谨慎，观察他人行动后再决定",
            "不太感兴趣，除非必要",
        ],
    },
];

let currentQuestionIndex = 0;
const userAnswers = []; // 存储用户选项的数组

// 显示当前题目
function showQuestion(index) {
    const quizItem = document.getElementById("quiz-item");
    const userAnswer = userAnswers[index];

    quizItem.innerHTML = `
        <p>${questions[index].question}</p>
        <div class="options">
            ${questions[index].options.map((option, i) => `
                <label>
                    <input type="radio" name="q${index + 1}" value="${option}" 
                        ${userAnswer === option ? "checked" : ""} 
                        onchange="saveAnswer(${index}, this.value)">
                    <span>${option}</span>
                </label>
            `).join('')}
        </div>
    `;

    updateButtons();
}

// 保存用户的选项
function saveAnswer(questionIndex, answer) {
    userAnswers[questionIndex] = answer; // 将答案存储在数组中
    updateButtons(); // 更新按钮状态
}


// 更新按钮的可用性
function updateButtons() {
    const isAnswered = userAnswers[currentQuestionIndex] !== undefined; // 检查当前题目是否已回答
    const nextBtn = document.getElementById("nextBtn");

    document.getElementById("prevBtn").style.display = currentQuestionIndex === 0 ? 'none' : 'inline-block';
    nextBtn.style.display = currentQuestionIndex === questions.length - 1 ? 'none' : 'inline-block';
    document.getElementById("submitBtn").style.display = currentQuestionIndex === questions.length - 1 ? 'inline-block' : 'none';

    // 禁用或启用“下一题”按钮
    nextBtn.disabled = !isAnswered;
}

// 显示下一题
function showNext() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    }
}

// 显示上一题
function showPrev() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    }
}

// 初始化显示第一个问题
showQuestion(currentQuestionIndex);

function matchResult() {
    const choiceCounts = { A: 0, B: 0, C: 0, D: 0 };
    const optionsMapping = ["A", "B", "C", "D"];

    userAnswers.forEach((answer, index) => {
        const optionIndex = questions[index].options.indexOf(answer);
        if (optionIndex !== -1) {
            choiceCounts[optionsMapping[optionIndex]]++;
        }
    });

    const maxChoice = Object.keys(choiceCounts).reduce((a, b) =>
        choiceCounts[a] > choiceCounts[b] ? a : b
    );

    switch (maxChoice) {
        case "A":
            return "麒麟";
        case "B":
            return "白泽";
        case "C":
            return "凤凰";
        case "D":
            return "驳";
        default:
            return null; // 如果没有结果
    }
}

document.getElementById("quizForm").addEventListener("submit", function (e) {
    e.preventDefault();

    if (userAnswers.length < questions.length || userAnswers.includes(undefined)) {
        alert("请完成所有题目后再提交！");
        return;
    }

    const result = matchResult();
    if (result) {
        localStorage.setItem("matchedAnimal", result); // 保存匹配结果到 localStorage
        window.location.href = "result.html"; // 跳转到结果页面
    } else {
        alert("无法匹配结果，请重试！");
    }
});
