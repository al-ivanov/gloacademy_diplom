// нужна реализация добавления фото при добавлении карточки

document.addEventListener('DOMContentLoaded', () => {

    const createButton = document.getElementById('popup-btn'),
        readyBtn = document.getElementById('ready'),
        resetBtn = document.getElementById('reset'),
        votingBtn = document.getElementById('voting'),
        crimeBtn = document.getElementById('crime'),
        mainTag = document.querySelector('.main'),
        overlay = document.querySelector('.overlay'),
        custom = document.querySelector('.custom'),
        personSkin = document.querySelector('.person-skin'),
        personClothes = document.querySelector('.person-clothes'),
        personHair = document.querySelector('.person-hair'),
        changeSkinButton = document.querySelector('.skin'),
        changeHairButton = document.querySelector('.hair'),
        changeClothesButton = document.querySelector('.clothes'),
        customChilds = document.querySelectorAll('.custom > div'),
        radioButton = document.querySelectorAll('.radio input'),
        skinColorCard = document.querySelectorAll('.skin-color'),
        hairColorCard = document.querySelectorAll('.hair-style'),
        clothesStyleCard = document.querySelectorAll('.clothes-style'),
        progressBarHeight = document.querySelectorAll('.progress-bar'),
        progressBarPercent = document.querySelectorAll('.result-count');

    const maxSkinsCount = skinColorCard.length,
        maxHeirCount = hairColorCard.length;

    function showConfig() {
        mainTag.style.display = 'none';
        overlay.style.display = 'none';
        custom.style.display = 'flex';
        customChilds.forEach((el) => {
            el.style.display = 'block';
        });
    }

    function hideConfig() {
        mainTag.style.display = 'block';
        overlay.style.display = 'none';
        custom.style.display = 'none';
        customChilds.forEach((el) => {
            el.style.display = 'none';
        });
    }

    function changeSkin() {
        let skinColorActiveIndex = getActiveIndex(skinColorCard);

        updatePerson("skinColor", skinColorActiveIndex);
        updatePerson("hairColor");
        updatePerson("clothesStyle");

        updateCards("skinColor", skinColorActiveIndex);
        updateCards("hairColor");
        updateCards("clothesStyle");

    }
    
    function changeSkinCard(e, changeElement) {
        let counter;
        if(changeElement === 'skinColor') {
            counter = getActiveIndex(skinColorCard);
        } else if (changeElement === 'hairColor') {
            counter = getActiveIndex(hairColorCard);
        } else if (changeElement === 'clothesStyle') {
            counter = getActiveIndex(clothesStyleCard);
        }

        if(e.target.className === 'prev' || e.target.className === 'flaticon-left-arrow') {
            counter--;
            counter = counter < 1 ? maxHeirCount : counter;

            updateCards(changeElement, counter);
            updatePerson(changeElement, counter);
        }
        if(e.target.className === 'next' || e.target.className === 'flaticon-right-arrow') {
            counter++;
            counter = counter > maxHeirCount ? 1 : counter;

            updateCards(changeElement, counter);
            updatePerson(changeElement, counter);
        }
    }

    function updateCards(cardType, index = 1) {
            let currentIndex;
            if(radioButton[0].checked) {
                if(index <= 3) {
                    currentIndex = index;
                } else {
                    currentIndex = index - maxSkinsCount;
                }
            } else if (radioButton[1].checked) {
                if(index <= 3) {
                    currentIndex = index + maxSkinsCount;
                } else {
                    currentIndex = index;
                }
                
            }
            switch(cardType) {
                case 'skinColor':
                    skinColorCard.forEach(el => {
                        el.style.display = 'none';
                    })
                    currentIndex = currentIndex > maxSkinsCount ? currentIndex - maxSkinsCount : currentIndex;
                    skinColorCard[currentIndex - 1].style.display = 'block';
                break;

                case 'hairColor':
                    for(let i = 0; i < 6; i++) {
                        hairColorCard[i].style.display = 'none';
                    }
                    hairColorCard[currentIndex - 1].style.display = 'block';
                break;

                case 'clothesStyle':
                    for(let i = 0; i < 6; i++) {
                        clothesStyleCard[i].style.display = 'none';
                    }
                    clothesStyleCard[currentIndex - 1].style.display = 'block';
                break;
            }
    }

    function updatePerson(type, index = 1) {
        let currentIndex;
        if(radioButton[0].checked) {
            if(index <= 3) {
                currentIndex = index;
            } else {
                currentIndex = index - maxSkinsCount;
            }
        } else if (radioButton[1].checked) {
            if(index <= 3) {
                currentIndex = index + maxSkinsCount;
            } else {
                currentIndex = index;
            }
            
        }
            switch(type) {
                case 'skinColor':
                    currentIndex = currentIndex > maxHeirCount ? currentIndex - maxSkinsCount : currentIndex;
                    personSkin.style.background = 'url(img/skin/skin-' + currentIndex + '.png) center center / cover no-repeat';
                break;
    
                case 'hairColor':
                    personHair.style.background = 'url(img/hair/construct/hair-' + currentIndex + '.png) center center / cover no-repeat';
                break;
    
                case 'clothesStyle':
                    personClothes.style.background = 'url(img/clothes/construct/clothes-' + currentIndex + '.png) center center / cover no-repeat';
                break;

            }
    }

    function getActiveIndex(elements) {
        let activeElement = 1;
        elements.forEach((el) => {
            let elementStyle = window.getComputedStyle(el).display;
            if(elementStyle === 'block') {
                activeElement = parseInt(el.classList.value.replace(/\D+/g,''));
            }
        });

        return activeElement;
    }

    function checkData() {
        let person = {},
            errors = 0;
        const personName = document.getElementById('name').value,
            personAge = document.getElementById('age').value,
            personGender = document.querySelector('.radio input[name="sex"]:checked').value,
            positions = document.getElementById('select').options[document.getElementById('select').selectedIndex].value,
            bio = document.getElementById('bio').value,
            personConstruct = document.querySelector('.person').cloneNode(true);
            // skinStyle = window.getComputedStyle(personConstruct[0]).background,
            // clothesStyle = window.getComputedStyle(personConstruct[1]).background,
            // hairStyle = window.getComputedStyle(personConstruct[2]).background;


        if(personName === '') {
            alert('Введите ФИО');
            errors = 1;
        }

        if(personAge === '') {
            alert('Введите возраст');
            errors = 1;
        }

        if(bio === '') {
            alert('Введите биографию');
            errors = 1;
        }

        if(errors)
            return false;

        person.name = personName;
        person.age = personAge;
        person.gender = personGender;
        person.positions = positions;
        person.bio = bio;
        person.construct = personConstruct;
        // person.clothesStyle = clothesStyle;
        // person.hairStyle = hairStyle;
        console.log(person.construct);

        createPersonCard(person);
        hideConfig();

    }

    function createPersonCard(personObj) {
        progressBarHeight.forEach(el => {
            el.style.height = 0;
        });

        progressBarPercent.forEach(el => {
            el.textContent = "0%";
        });

        const mainCardsItem = document.querySelector('.main-cards-item').cloneNode(true);
        const candidateBlock = mainCardsItem.querySelector('.candidate-block');
        const insertBeforeBlock = mainCardsItem.querySelector('.result');
        
        mainCardsItem.querySelector('.photo').remove();

        mainCardsItem.classList.remove('main-cards-item-active');
        mainCardsItem.querySelector('.name').textContent = personObj.name;
        mainCardsItem.querySelector('.age').textContent = personObj.age;
        mainCardsItem.querySelector('.sex').textContent = personObj.gender;
        mainCardsItem.querySelector('.views').textContent = personObj.positions;
        mainCardsItem.querySelector('.bio').textContent = personObj.bio;

        candidateBlock.insertBefore(personObj.construct, insertBeforeBlock);

        document.querySelector('.main-cards').appendChild(mainCardsItem);

    }

    function resetResults() {
        const childToRemove = document.querySelectorAll('.main-cards-item')[2];
        document.querySelector('.main-cards').removeChild(childToRemove);
        showConfig();
    }

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function commitVoting() {
        const  progressBarHeight = document.querySelectorAll('.progress-bar'),
            progressBarPercent = document.querySelectorAll('.result-count'),
            mainCardsItems = document.querySelectorAll('.main-cards-item');
        let firstVote = getRandom(0, 100),
            secondVote = getRandom(0, 100 - firstVote),
            thirdVote = 100 - firstVote - secondVote;

            whriteInPercents(firstVote, secondVote, thirdVote);
    }

    function crimeVoting() {
        
        let thirdVote = getRandom(25, 100),
            secondVote = getRandom(0, 100 - thirdVote),
            firstVote = 100 - secondVote - thirdVote;
        
        whriteInPercents(firstVote, secondVote, thirdVote);    
    }

    function whriteInPercents(firstVote, secondVote, thirdVote) {
        const  progressBarHeight = document.querySelectorAll('.progress-bar'),
            progressBarPercent = document.querySelectorAll('.result-count'),
            mainCardsItems = document.querySelectorAll('.main-cards-item');

        progressBarHeight[0].style.height = firstVote + '%';
        progressBarHeight[1].style.height = secondVote + '%';
        progressBarHeight[2].style.height = thirdVote + '%';

        progressBarPercent[0].textContent = firstVote + '%';
        progressBarPercent[1].textContent = secondVote + '%';
        progressBarPercent[2].textContent = thirdVote + '%';

        mainCardsItems.forEach(el => {
            el.classList.remove('main-cards-item-active');
        });

        let maxValue = Math.max(firstVote, secondVote, thirdVote);
        const progressBarPercentArray = [...progressBarPercent];
        
        const maxValueElement = progressBarPercentArray.filter(el => el.textContent === maxValue + '%');
        maxValueElement[0].parentNode.parentNode.parentNode.classList.add('main-cards-item-active');
    }


    changeSkinButton.addEventListener('click', (e) => {
        changeSkinCard(e, 'skinColor');
    });
    changeHairButton.addEventListener('click', (e) => {
        changeSkinCard(e, 'hairColor');
    });
    changeClothesButton.addEventListener('click', (e) => {
        changeSkinCard(e, 'clothesStyle');
    });

    radioButton[0].addEventListener('change', changeSkin);
    radioButton[1].addEventListener('change', changeSkin);
    createButton.addEventListener('click', showConfig);
    readyBtn.addEventListener('click', checkData);
    resetBtn.addEventListener('click', resetResults);
    votingBtn.addEventListener('click', commitVoting);
    crimeBtn.addEventListener('click', crimeVoting);
});

