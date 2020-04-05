const start = document.querySelector('.starting-page__button');
const formHero = document.querySelector('.customization__start__button');

let healthpoints = 0;
let manapoints = 0;
let attack = 0;
let defense = 0;

function SelectedHero() {
    let selectedValue = document.querySelector('.first').value;
    const heroimage = document.querySelector('.customization__container-image');
    const heroimage2nd = document.querySelector('.game__container__hero__image-container');
    if (selectedValue === 'warrior') {
        heroimage.innerHTML = '<img src="image/Warrior.png" alt="Warrior" class="customization__image">';
        heroimage2nd.innerHTML = '<img src="image/Warrior.png" alt="Warrior" class="game__container__hero__image">';
        return warrior
    } else if (selectedValue === 'archer') {
        heroimage.innerHTML = '<img src="image/Archer.png" alt="Archer" class="customization__image">';
        heroimage2nd.innerHTML = '<img src="image/Archer.png" alt="Warrior" class="game__container__hero__image">';
        return archer
    }
}

function SelectedWeapon() {
    const selectedValue = document.querySelector('.second').value;
    if (selectedValue === 'sword') {
        return sword
    } else if (selectedValue === 'axe') {
        return axe
    } else if (selectedValue === 'twoHandedSword') {
        return twoHandedSword
    } else if (selectedValue === 'bow') {
        return bow
    }

}

function SelectedOffHand() {
    const selectedValue = document.querySelector('.third').value;
    if (selectedValue === 'shield') {
        return shield
    } else if (selectedValue === 'sword') {
        return offSword
    } else if (selectedValue === 'quiver') {
        return quiver
    }
}

function creatHero(hero, weapon, offhand) {

    healthpoints = hero.hp;
    manapoints = hero.mp;
    attack = hero.atk + weapon.atk + offhand.atk;
    defense = hero.def + weapon.def + offhand.def;
}

function scroll(page) {
    let target = document.querySelector(page);
    let targetPosition = target.getBoundingClientRect().top;
    let startPosition = window.pageYOffset;
    let distance = startPosition + targetPosition;
    window.scrollTo(startPosition, distance);
}
start.addEventListener('click', function () {
    scroll('.customization');
})

formHero.addEventListener('click', function () {
    let hero = SelectedHero();
    let weapon = SelectedWeapon();
    let offhand = SelectedOffHand();
    creatHero(hero, weapon, offhand);
    scroll('.game');
    new Hero(healthpoints, manapoints, attack, defense);
})

class Hero {
    constructor(healthpoints, manapoints, attack, defense) {
        this.healthpoints = healthpoints;
        this.manapoints = manapoints;
        this.attack = attack;
        this.defense = defense;
        const hpbar = document.querySelector('.game__container__hero__bars__hp');
        const manabar = document.querySelector('.game__container__hero__bars__mana');
        hpbar.textContent = healthpoints;
        manabar.textContent = manapoints;
    }

    attack() {

    }
    defense() {

    }
    special() {

    }
    pass() {

    }

}