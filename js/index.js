document.addEventListener('DOMContentLoaded', () => {

    const createButton = document.getElementById('popup-btn'),
    mainTag = document.querySelector('.main'),
    overlay = document.querySelector('.overlay'),
    custom = document.querySelector('.custom'),
    customChilds = document.querySelectorAll('.custom > div'),
    radioButton = document.querySelectorAll('.radio input'),
    personSkin = document.querySelector('.person-skin'),
    personClothes = document.querySelector('.person-clothes'),
    personHair = document.querySelector('.person-hair');

    const maleSkin = ['img/skin/skin-1.png', 'img/skin/skin-2.png', 'img/skin/skin-3.png'],
        femaleSkin = ['img/skin/skin-4.png', 'img/skin/skin-5.png', 'img/skin/skin-6.png'],
        maleHair = ['img/hair/construct/hair-1.png', 'img/hair/construct/hair-2.png', 'img/hair/construct/hair-3.png'],
        femaleHair = ['img/hair/construct/hair-4.png', 'img/hair/construct/hair-5.png', 'img/hair/construct/hair-6.png'],
        maleClothes = ['img/clothes/construct/clothes-1.png', 'img/clothes/construct/clothes-2.png', 'img/clothes/construct/clothes-3.png'],
        femaleClothes = ['img/clothes/construct/clothes-4.png', 'img/clothes/construct/clothes-5.png', 'img/clothes/construct/clothes-6.png'];

    createButton.addEventListener('click', () => {
        mainTag.style.display = 'none';
        overlay.style.display = 'none';
        custom.style.display = 'flex';
        customChilds.forEach((el) => {
            el.style.display = 'block';
        })
    });

    

    function changeSkin() {
        if(this.id === 'male') {
            personSkin.style.background = `url(${maleSkin[0]}) center center / cover no-repeat`;
            personHair.style.background = `url(${maleHair[0]}) center center / cover no-repeat`;
            personClothes.style.background = `url(${maleClothes[0]}) center center / cover no-repeat`;
        } else if (this.id === 'female') {
            personSkin.style.background = `url(${femaleSkin[0]}) center center / cover no-repeat`;
            personHair.style.background = `url(${femaleHair[0]}) center center / cover no-repeat`;
            personClothes.style.background = `url(${femaleClothes[0]}) center center / cover no-repeat`;
        }
    }

    radioButton[0].addEventListener('change', changeSkin);
    radioButton[1].addEventListener('change', changeSkin);
});

