document.getElementById('quizForm').onsubmit = function(e) {
    e.preventDefault();

    // 收集用户选择的答案
    const answers = {
        q1: document.querySelector('input[name="q1"]:checked')?.value,
        q2: document.querySelector('input[name="q2"]:checked')?.value,
        q3: document.querySelector('input[name="q3"]:checked')?.value,
        q4: document.querySelector('input[name="q4"]:checked')?.value,
        q5: document.querySelector('input[name="q5"]:checked')?.value,

    };

    if (!answers.q1 || !answers.q2 || !answers.q3 || !answers.q4 || !answers.q5) {
        alert('请回答所有问题~');
        return;
    }

    // 统计选择的答案，匹配守护兽
    const creature = matchCreature(answers);
    window.location.href = `result.html?creature=${creature}`;
};

// 匹配守护兽的逻辑
function matchCreature(answers) {
    let aCount = 0, bCount = 0, cCount = 0, dCount = 0;

    // 统计每个选项的选择次数
    for (const answer in answers) {
        if (answers[answer] === 'A') aCount++;
        else if (answers[answer] === 'B') bCount++;
        else if (answers[answer] === 'C') cCount++;
        else if (answers[answer] === 'D') dCount++;
    }

    // 根据最多选择的选项匹配守护兽
    if (aCount >= bCount && aCount >= cCount && aCount >= dCount) {
        return '麒麟'; // A选项：麒麟
    } else if (bCount >= aCount && bCount >= cCount && bCount >= dCount) {
        return '白泽'; // B选项：白泽
    } else if (cCount >= aCount && cCount >= bCount && cCount >= dCount) {
        return '凤凰'; // C选项：凤凰
    } else {
        return '驳'; // D选项：驳
    }
}
