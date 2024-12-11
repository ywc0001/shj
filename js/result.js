// 定义守护神兽的文案内容
const guardianDescriptions = {
    "麒麟": [
        "《山海经·海外北经》记载：“中曲之山，有兽焉，其状如马而白身黑尾，一角，虎牙爪，音如鼓音，其名曰驳，是食虎豹，可以御兵。”",
        "麒麟象征着权力与正义，选择麒麟作为守护兽的用户通常具有强烈的责任感和领导才能。",
        "他们在面对困难时勇敢果断，能够带领他人走出困境。",
        "麒麟的出现给予他们信心和力量，让他们更加坚定地追求自己的目标。"
    ],
    "白泽": [
        "《山海经·西次三经》有云：“昆仑之丘，有神兽，其状如羊而四角，名曰白泽，能言语，知天下事。”",
        "白泽拥有渊博的知识和洞察力，它的守护对象是那些充满智慧和创造力的人。",
        "白泽能为用户提供灵感和指引，帮助他们在面对复杂问题时找到最佳解决方案。",
        "用户与白泽相互成就，共同探索未知的领域。"
    ],
    "凤凰": [
        "《山海经》中记载:“有鸟焉，其状如鸡，五采而文，名曰凤凰，首文曰德，翼文曰义，背文曰礼，膺文曰仁，腹文曰信。是鸟也，饮食自然，自歌自舞，见则天下安宁。”",
        "凤凰代表着高贵与和谐，选择凤凰作为守护兽的用户内心善良，追求和平与美好。",
        "凤凰的存在让他们更加注重自身的修养和品德，以优雅的姿态面对生活中的挑战。",
        "他们与凤凰一起，为创造一个和谐的世界而努力。"
    ],
    "驳": [
        "《山海经·海外北经》记载：“中曲之山，有兽焉，其状如马而白身黑尾，一角，虎牙爪，音如鼓音，其名曰驳，是食虎豹，可以御兵。",
        "驳忠诚勇敢，它守护的用户充满活力和勇气。",
        "这些用户在面对困难时毫不退缩，积极乐观地迎接挑战。",
        "驳的陪伴让他们更加坚定自己的信念，勇敢地追求自己的梦想。"
    ]
};

// 定义守护神兽的视频路径
const guardianVideos = {
    "麒麟": "../assets/videos/kylin.mp4",
    "白泽": "../assets/videos/baize.mp4",
    "凤凰": "../assets/videos/phoenix.mp4",
    "驳": "../assets/videos/bo.mp4"
};

// 获取页面元素
const matchedAnimal = localStorage.getItem("matchedAnimal");
const matchedAnimalElement = document.getElementById("matched-animal");
const descriptionElement = document.getElementById("description");
const startVideoBtn = document.getElementById("startVideoBtn");
const retryBtn = document.getElementById("retryBtn");
const videoElement = document.getElementById("guardian-video");
const videoSource = document.getElementById("video-source");
// 反馈功能
const feedbackBtn = document.getElementById("feedbackBtn");
const feedbackPopup = document.getElementById("feedbackPopup");
const closeFeedback = document.getElementById("closeFeedback");
const submitFeedback = document.getElementById("submitFeedback");
const feedbackText = document.getElementById("feedbackText");
// 获取退出按钮
const logoutBtn = document.getElementById("logoutBtn");

// 显示匹配的守护神兽
if (matchedAnimal && guardianDescriptions[matchedAnimal]) {
    matchedAnimalElement.innerText = matchedAnimal;

    let currentTextIndex = 0;
    const texts = guardianDescriptions[matchedAnimal];

    function showNextText() {
        if (currentTextIndex < texts.length) {
            const text = document.createElement("p");
            text.innerText = texts[currentTextIndex];
            text.style.animation = "fadeIn 1s ease-in-out";
            descriptionElement.appendChild(text);
            currentTextIndex++;
            setTimeout(showNextText, 2000); // 每段文字延迟2秒出现
        } else {
            startVideoBtn.classList.remove("hidden");
            retryBtn.classList.remove("hidden");
        }
    }

    descriptionElement.classList.remove("hidden");
    showNextText();
} else {
    matchedAnimalElement.innerText = "未能找到匹配结果，请返回重新测试。";
}

// 播放守护神兽视频
function playVideo() {
    const videoPath = guardianVideos[matchedAnimal];
    if (!videoPath) {
        alert("未找到视频资源！");
        return;
    }
    videoSource.src = videoPath;
    videoElement.load();
    videoElement.classList.remove("hidden");
    videoElement.requestFullscreen();
    videoElement.play().catch(err => console.error("视频播放失败：", err));
    descriptionElement.classList.add("hidden");
    startVideoBtn.classList.add("hidden");
}

// 再测一次
function retryTest() {
    window.location.href = "quiz.html";
}

// 打开反馈弹窗
feedbackBtn.addEventListener("click", () => {
    feedbackPopup.style.display = "block";
});

// 关闭反馈弹窗
closeFeedback.addEventListener("click", () => {
    feedbackPopup.style.display = "none";
    feedbackText.value = ""; // 清空输入框
});

// 提交反馈
submitFeedback.addEventListener("click", () => {
    const feedback = feedbackText.value.trim();

    if (!feedback) {
        alert("反馈内容不能为空！");
        return;
    }

    // 获取用户匹配的守护神兽名称
    const username = localStorage.getItem("matchedAnimal") || "匿名用户";

    // 构造反馈对象
    const feedbackObj = {
        username: username,
        feedback: feedback,
        timestamp: new Date().toISOString()
    };

    // 将反馈存储到本地存储
    let feedbackList = JSON.parse(localStorage.getItem("feedbacks")) || [];
    feedbackList.push(feedbackObj);
    localStorage.setItem("feedbacks", JSON.stringify(feedbackList));

    alert("感谢您的反馈！");
    feedbackText.value = ""; // 清空输入框
    feedbackPopup.style.display = "none";
});

// 添加点击事件监听器
logoutBtn.addEventListener("click", () => {
    const confirmLogout = confirm("确定要退出登录吗？");
    if (confirmLogout) {
        // 清除登录信息
        localStorage.removeItem("loggedInUser"); // 或者根据你的实际存储方式清除
        window.location.href = "../index.html"; // 跳转到登录页面
    }
});
