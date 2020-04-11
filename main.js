const start = document.querySelector('.starting-page__button');
const formHero = document.querySelector('.customization__start__button');

let healthpoints = 0;
let manapoints = 0;
let attack = 0;
let defense = 0;
let round = 0;

const monsters = [monster];

function SelectedHero() {
    let selectedValue = document.querySelector('.first').value;
    const heroimage = document.querySelector('.customization__container-image');
    const heroimage2nd = document.querySelector('.game__container__hero__image-container');
    const hpstats = document.querySelector('.customization__stats__container .customization__stats__attributes');
    const mpstats = document.querySelector('.customization__stats__container .customization__stats__attributes:nth-child(2)');
    const atkstats = document.querySelector('.customization__stats__container .customization__stats__attributes:nth-child(3)');
    const defstats = document.querySelector('.customization__stats__container .customization__stats__attributes:nth-child(4)');
    if (selectedValue === 'warrior') {
        heroimage.innerHTML = '<img src="image/Warrior.png" alt="Warrior" class="customization__image">';
        heroimage2nd.innerHTML = '<img src="image/Warrior.png" alt="Warrior" class="game__container__hero__image">';
        hpstats.textContent = `HP: ${warrior.hp}`;
        mpstats.textContent = `MP: ${warrior.mp}`;
        atkstats.textContent = `ATK: ${warrior.atk}`;
        defstats.textContent = `DEF: ${warrior.def}`;
        return warrior
    } else if (selectedValue === 'archer') {
        heroimage.innerHTML = '<img src="image/Archer.png" alt="Archer" class="customization__image">';
        heroimage2nd.innerHTML = '<img src="image/Archer.png" alt="Warrior" class="game__container__hero__image">';
        hpstats.textContent = `HP: ${archer.hp}`;
        mpstats.textContent = `MP: ${archer.mp}`;
        atkstats.textContent = `ATK: ${archer.atk}`;
        defstats.textContent = `DEF: ${archer.def}`;
        return archer
    }
}

function SelectedWeapon() {
    const selectedValue = document.querySelector('.second').value;
    const atkstats = document.querySelector('.customization__stats__container:nth-child(2) .customization__stats__attributes');
    const defstats = document.querySelector('.customization__stats__container:nth-child(2) .customization__stats__attributes:nth-child(2)');
    if (selectedValue === 'sword') {
        atkstats.textContent = `ATK: ${sword.atk}`
        defstats.textContent = `DEF: ${sword.def}`
        return sword
    } else if (selectedValue === 'axe') {
        atkstats.textContent = `ATK: ${axe.atk}`
        defstats.textContent = `DEF: ${axe.def}`
        return axe
    } else if (selectedValue === 'twoHandedSword') {
        atkstats.textContent = `ATK: ${twoHandedSword.atk}`
        defstats.textContent = `DEF: ${twoHandedSword.def}`
        return twoHandedSword
    } else if (selectedValue === 'bow') {
        atkstats.textContent = `ATK: ${bow.atk}`
        defstats.textContent = `DEF: ${bow.def}`
        return bow
    }

}

function SelectedOffHand() {
    const selectedValue = document.querySelector('.third').value;
    const atkstats = document.querySelector('.customization__stats__container:nth-child(3) .customization__stats__attributes');
    const defstats = document.querySelector('.customization__stats__container:nth-child(3) .customization__stats__attributes:nth-child(2)')
    if (selectedValue === 'shield') {
        atkstats.textContent = `ATK: ${shield.atk}`
        defstats.textContent = `DEF: ${shield.def}`
        return shield
    } else if (selectedValue === 'sword') {
        atkstats.textContent = `ATK: ${offSword.atk}`
        defstats.textContent = `DEF: ${offSword.def}`
        return offSword
    } else if (selectedValue === 'quiver') {
        atkstats.textContent = `ATK: ${quiver.atk}`
        defstats.textContent = `DEF: ${quiver.def}`
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
    new Clash(healthpoints, manapoints, attack, defense, monsters, hero);
})

function whoWin() {
    const divContainer = document.querySelector('.game__container__combat-text');
    const createSpan = document.createElement('span');
    if (healthpoints < 0) {
        divContainer.appendChild(createSpan);
        createSpan.textContent = `Monster kill Player`;
        return
    } else if (monsters[0].hp < 0) {
        divContainer.appendChild(createSpan);
        createSpan.textContent = `Player kill monster`;
        return
    }
}

function mstr() {
    console.log(round);
    const divContainer = document.querySelector('.game__container__combat-text');
    const createSpan = document.createElement('span');
    if (round === 3 || round === 7 || round === 10) {
        let special = Math.floor(Math.random() * ((monsters[0].atk + 20) - (monsters[0].atk + 5))) + (monsters[0].atk + 5);
        divContainer.appendChild(createSpan);
        createSpan.textContent = `Monster use special ability and hit Player for ${Math.floor(special - (monsters[0].atk * (defense / 100)))}`;
        healthpoints -= Math.floor(special - (monsters[0].atk * (defense / 100)));
        document.querySelector('.game__container__hero__bars__hp').textContent = healthpoints;
        monsters[0].mp -= 20;
        document.querySelector('.game__container__monster__bars__mana').textContent = monsters[0].mp;
    } else if (round === 4 || round === 8 || round === 11) {
        monsters[0].hp += 20;
        monsters[0].hp = monsters[0].hp > 300 ? monsters[0].hp = 300 : monsters[0].hp;
        monsters[0].mp += 20;
        monsters[0].mp = monsters[0].mp > 30 ? monsters[0].mp = 30 : monsters[0].mp;
        divContainer.appendChild(createSpan);
        createSpan.textContent = `Monster renewed 20hp and 20mp`;
        document.querySelector('.game__container__monster__bars__hp').textContent = monsters[0].hp;
        document.querySelector('.game__container__monster__bars__mana').textContent = monsters[0].mp;
    } else {
        let dmg = Math.floor(Math.random() * ((monsters[0].atk + 5) - (monsters[0].atk - 5))) + (monsters[0].atk - 5);
        divContainer.appendChild(createSpan);
        createSpan.textContent = `Monster hit Player for ${Math.floor(dmg - (monsters[0].atk * (defense / 100)))}`;
        healthpoints -= Math.floor(dmg - (monsters[0].atk * (defense / 100)));
        document.querySelector('.game__container__hero__bars__hp').textContent = healthpoints;
    }
    whoWin()
}

class Clash {
    constructor(healthpoints, manapoints, attack, defense, monsters, hero) {
        this.healthpoints = healthpoints
        this.manapoints = manapoints;
        this.attack = attack;
        this.defense = defense;
        this.monsters = monsters;
        this.hero = hero;

        const hpbar = document.querySelector('.game__container__hero__bars__hp');
        const manabar = document.querySelector('.game__container__hero__bars__mana');
        const hpbarmonster = document.querySelector('.game__container__monster__bars__hp');
        const manabarmonster = document.querySelector('.game__container__monster__bars__mana');

        hpbar.textContent = healthpoints;
        manabar.textContent = manapoints;
        hpbarmonster.textContent = monsters[0].hp;
        manabarmonster.textContent = monsters[0].mp;
        this.gameStart();
    }

    gameStart() {
        this.atk();
        this.def();
        this.spc();
        this.pass();
    }

    attackAction() {
        round++
        let dmg = Math.floor(Math.random() * ((attack + 5) - (attack - 5))) + (attack - 5);
        const divContainer = document.querySelector('.game__container__combat-text');
        const createSpan = document.createElement('span');
        divContainer.appendChild(createSpan);
        createSpan.textContent = `Player hit monster for ${Math.floor(dmg - (attack * (monsters[0].def / 100)))}`;
        monsters[0].hp -= Math.floor(dmg - (attack * (monsters[0].def / 100)));
        document.querySelector('.game__container__monster__bars__hp').textContent = monsters[0].hp;
        setTimeout(mstr, 500);
        whoWin()
    }
    defenseAction() {
        round++
        console.log(defense)
        const divContainer = document.querySelector('.game__container__combat-text');
        const createSpan = document.createElement('span');
        divContainer.appendChild(createSpan);
        defense = defense * 2;
        createSpan.textContent = `Defense x2 for round`
        console.log(defense)
        setTimeout(mstr, 500);
        defense = defense / 2;
        console.log(defense)
        whoWin()
    }

    specialAction() {
        round++
        const divContainer = document.querySelector('.game__container__combat-text');
        const createSpan = document.createElement('span');
        if (manapoints < 30) {
            divContainer.appendChild(createSpan);
            createSpan.textContent = `Not enough mana`;
            return
        } else {
            let special = Math.floor(Math.random() * ((attack + 25) - (attack + 5))) + (attack + 5);
            divContainer.appendChild(createSpan);
            createSpan.textContent = `Player use special ability and hit monster for ${Math.floor(special - (attack * (monsters[0].def / 100)))}`;
            monsters[0].hp -= Math.floor(special - (attack * (monsters[0].def / 100)));
            document.querySelector('.game__container__monster__bars__hp').textContent = monsters[0].hp;
            manapoints -= 30;
            document.querySelector('.game__container__hero__bars__mana').textContent = manapoints;
        }
        setTimeout(mstr, 500);
        whoWin()
    }
    passAction() {
        round++
        const divContainer = document.querySelector('.game__container__combat-text');
        const createSpan = document.createElement('span');
        divContainer.appendChild(createSpan);
        if (SelectedHero() === warrior) {
            healthpoints += 35;
            healthpoints = healthpoints > 200 ? healthpoints = 200 : healthpoints;
            manapoints += 20;
            manapoints = manapoints > 50 ? manapoints = 50 : manapoints;
            createSpan.textContent = `Player renewed 35hp and 20mp`;
        } else if (SelectedHero() === archer) {
            healthpoints += 30;
            healthpoints = healthpoints > 150 ? healthpoints = 150 : healthpoints;
            manapoints += 25;
            manapoints = manapoints > 100 ? manapoints = 100 : manapoints;
            createSpan.textContent = `Player renewed 30hp and 30mp`;
        }
        document.querySelector('.game__container__hero__bars__hp').textContent = healthpoints;
        document.querySelector('.game__container__hero__bars__mana').textContent = manapoints;
        setTimeout(mstr, 500);
        whoWin()
    }
    atk() {
        const atkbutton = document.querySelector('.game__container__panel__attack');
        atkbutton.addEventListener('click', this.attackAction);
    }
    def() {
        const defbutton = document.querySelector('.game__container__panel__defense');
        defbutton.addEventListener('click', this.defenseAction);
    }

    spc() {
        const spcbutton = document.querySelector('.game__container__panel__special');
        spcbutton.addEventListener('click', this.specialAction);
    }
    pass() {
        const passbutton = document.querySelector('.game__container__panel__pass');
        passbutton.addEventListener('click', this.passAction);
    }

}