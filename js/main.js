window.onload = function() {
    const introPage = document.getElementById('introPage');
    const mainPage = document.getElementById('mainPage');

    introPage.addEventListener('click', function() {
        fadeOutIntro();
        enterFullscreen();
    });
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