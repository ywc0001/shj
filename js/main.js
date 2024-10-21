window.onload = function() {
    const introPage = document.getElementById('introPage');
    const mainPage = document.getElementById('mainPage');

    // introPage.addEventListener('click', function() {
    //     fadeOutIntro();
    //     enterFullscreen();
    // });

        // 2秒后触发渐隐效果
        setTimeout(() => {
            introPage.classList.add('fade-out'); // 添加CSS的渐隐类
            // 渐隐动画结束后（2秒）跳转到quiz.html
            setTimeout(() => {
                window.location.href = 'views/quiz.html'; // 跳转到quiz.html
            }, 2000); // 等待2秒，渐隐完成后跳转
        }, 2000); // 2秒后开始渐隐
};

function fadeOutIntro() {
    const introPage = document.getElementById('introPage');
    const mainPage = document.getElementById('mainPage');
    
    introPage.classList.add('fade-out');

    setTimeout(() => {
        introPage.classList.add('hidden');
        mainPage.classList.remove('hidden');
    }, 2000);  // 2秒动画时间
}