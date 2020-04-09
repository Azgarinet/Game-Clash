const start = document.querySelector('.starting-page__button');
const formHero = document.querySelector('.customization__start__button');

let healthpoints = 0;
let manapoints = 0;
let attack = 0;
let defense = 0;

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
    new Clash(healthpoints, manapoints, attack, defense, monsters);
})

class Clash {
    constructor(healthpoints, manapoints, attack, defense, monsters) {
        this.healthpoints = healthpoints
        this.manapoints = manapoints;
        this.attack = attack;
        this.defense = defense;
        this.monsters = monsters;

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
        let dmg = Math.floor(Math.random() * ((attack + 5) - (attack - 5))) + (attack - 5);
        const divContainer = document.querySelector('.game__container__combat-text');
        const createSpan = document.createElement('span');
        divContainer.appendChild(createSpan);
        createSpan.textContent = `Player hit monster for ${Math.floor(dmg - (attack * (monsters[0].def / 100)))}`
        monsters[0].hp -= Math.floor(dmg - (attack * (monsters[0].def / 100)));
        document.querySelector('.game__container__monster__bars__hp').textContent = monsters[0].hp;
    }
    defenseAction() {
        console.log('tak')
    }

    specialAction() {
        const divContainer = document.querySelector('.game__container__combat-text');
        const createSpan = document.createElement('span');
        if (manapoints < 30) {
            divContainer.appendChild(createSpan);
            createSpan.textContent = `Not enough mana`
            return
        } else {
            let dmg = Math.floor(Math.random() * ((attack + 25) - (attack + 5))) + (attack + 5);
            divContainer.appendChild(createSpan);
            createSpan.textContent = `Player use special ability and hit monster for ${Math.floor(dmg - (attack * (monsters[0].def / 100)))}`
            monsters[0].hp -= Math.floor(dmg - (attack * (monsters[0].def / 100)));
            document.querySelector('.game__container__monster__bars__hp').textContent = monsters[0].hp;
            manapoints -= 30;
            document.querySelector('.game__container__hero__bars__mana').textContent = manapoints;
        }
    }
    passAction() {
        const divContainer = document.querySelector('.game__container__combat-text');
        const createSpan = document.createElement('span');
        divContainer.appendChild(createSpan);
        healthpoints += 35;
        manapoints += 20;
        createSpan.textContent = `Player renewed 35hp and 20mp`
        document.querySelector('.game__container__hero__bars__hp').textContent = healthpoints;
        document.querySelector('.game__container__hero__bars__mana').textContent = manapoints;

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