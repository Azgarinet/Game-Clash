const startGame = document.querySelector('.starting-page__button')
const creatHero = document.querySelector('.customization__start__button')

function scroll(page) {
    let target = document.querySelector(page);
    let targetPosition = target.getBoundingClientRect().top;
    let startPosition = window.pageYOffset;
    let distance = startPosition + targetPosition
    window.scrollTo(startPosition, distance);
}

startGame.addEventListener('click', function () {
    scroll('.customization');
})
creatHero.addEventListener('click', function () {
    scroll('.game')
})