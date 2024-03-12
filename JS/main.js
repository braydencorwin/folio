const theme = 'theme';
const dataTheme = 'data-theme';
const themeTab = '.theme-tab';
const switcherBtn = '.switcher-btn';
const dark = 'dark';
const light = 'light';
const open = 'open';
const active = 'active';

const modalOpen = '[data-open]';
const modalClose = '[data-close]';
const isVisible = 'is-visible';

const dataItem = 'data-item'
const dataFilter = '[data-filter]';
const portfolioData = '[data-item]';

const root = document.documentElement;

// Theme
const toggleTheme = document.querySelector(themeTab);
const switcher = document.querySelectorAll(switcherBtn);
const currentTheme = localStorage.getItem(theme);

//Portfolio

const filterLink = document.querySelectorAll(dataFilter);

const searchBox = document.querySelector('#search');


const portfolioCards = [
    {   dataItem :'web',
        img : './Assets/images/portfolio-1.jpg',
        title : 'Web Development',
        desc : 'Food Website',
        modalId : 'web-1',
    },
    {   dataItem :'web',
        img : './Assets/images/portfolio-2.jpg',
        title : 'Web Development',
        desc : 'Skate Website',
        modalId : 'web-2',
    },
    {   dataItem :'ui',
        img : './Assets/images/portfolio-3.jpg',
        title : 'UI Design',
        desc : 'Cool Design',
        modalId : 'ui-1',
    },
    {   dataItem :'app',
        img : './Assets/images/portfolio-4.jpg',
        title : 'App Development',
        desc : 'Game App',
        modalId : 'app-1',
    },
    {   dataItem :'app',
        img : './Assets/images/portfolio-5.jpg',
        title : 'App Development',
        desc : 'Gambling Website',
        modalId : 'app-2',
    },
    {   dataItem :'app',
        img : './Assets/images/portfolio-6.jpg',
        title : 'App Development',
        desc : 'Money Website',
        modalId : 'app-3',
    },
    {   dataItem :'web',
        img : './Assets/images/portfolio-7.jpg',
        title : 'Web Development',
        desc : 'Eating Website',
        modalId : 'web-3',
    },
    {   dataItem :'ui',
        img : './Assets/images/portfolio-8.jpg',
        title : 'UI Design',
        desc : 'Fantastic Design',
        modalId : 'ui-2',
    },

];


//portfolio generator
const grid = document.querySelector('.portfolio-grid')

const cardGen = (obj) => {
    const pcard = document.createElement('div');
    pcard.classList.add('portfolio-card');
    pcard.dataset.item= obj.dataItem;
    pcard.dataset.open = obj.modalId;

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    const cardImg = document.createElement('img');
    cardImg.setAttribute('src', obj.img);

    const cardPopup = document.createElement('div');
    cardPopup.classList.add('card-popup-box');
   

    const cardType= document.createElement('div');
    cardType.textContent = obj.title;
    const cardTitle = document.createElement('h3');
    cardTitle.textContent = obj.desc;


    cardPopup.append(cardType, cardTitle);
    cardBody.append(cardImg, cardPopup);
    pcard.append(cardBody);
    return pcard;  
};

for(let i = 0; i < portfolioCards.length; i++){
    grid.append(cardGen(portfolioCards[i]))
};

const portfolioItems = document.querySelectorAll(portfolioData);
// Modal 
const openModal = document.querySelectorAll(modalOpen);

const setActive = (elm, selector) => {
    if(document.querySelector(`${selector}.${active}`) != null){
        document.querySelector(`${selector}.${active}`).classList.remove(active); 
    } 
    elm.classList.add(active);
};

const setTheme = (val) => {
    if(val === dark){
        root.setAttribute(dataTheme, dark);
        localStorage.setItem(theme, dark);
    } else {
        root.setAttribute(dataTheme, light);
        localStorage.setItem(theme, light);
    }
};

if(currentTheme){
    root.setAttribute(dataTheme, currentTheme)
    switcher.forEach((btn)=> {
        btn.classList.remove(active);
    })

    if(currentTheme ===  dark){
        switcher[1].classList.add(active);
    } else{
        switcher[0].classList.add(active);
    }
};

toggleTheme.addEventListener('click', function(){
    const tab = this.parentElement.parentElement;
    if(!tab.className.includes(open)){
        tab.classList.add(open)
    } else{
        tab.classList.remove(open)
    }
});

for(const elm of switcher) {
    elm.addEventListener('click', function(){
        const toggle = this.dataset.toggle;
        setActive(elm, switcherBtn);
        setTheme(toggle);
        // set active state
    })
};

searchBox.addEventListener('keyup', (e) => {
    const searchInput = e.target.value.toLowerCase().trim();
    portfolioItems.forEach((card) => {
        if (card.dataset.item.includes(searchInput)){
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    })

})


for(const link of filterLink){
    link.addEventListener('click', function(){
        setActive(link, '.filter-link');
        const filter = this.dataset.filter;
        portfolioItems.forEach((card) => {
            if(filter === 'all'){
                card.style.display = 'block';
            }else if(card.dataset.item === filter){
                card.style.display = 'block';
            } else{
                card.style.display = 'none';
            }
        })
    })
};


//Modal Gen
const modalAnimation = 'slideInOutTop';

const modalGen = (obj) => {

    //create parts
    modal = document.createElement('div');
    modal.classList.add('modal');
    modal.setAttribute('id', obj.modalId);
    modal.dataset.animation = modalAnimation;

    const modalDialogue = document.createElement('div');
    modalDialogue.classList.add('modal-dialogue');

    const modalHeader = document.createElement('div');  
    modalHeader.classList.add('modal-header');

    const modalHeadTitle = document.createElement('h3');
    modalHeadTitle.textContent = obj.desc;

    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fas', 'fa-times');
    closeIcon.setAttribute('data-close', '');

    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');

    const imgWrapper = document.createElement('div');
    imgWrapper.classList.add('img-wrapper');

    const modalImg = document.createElement('img'); 
    modalImg.setAttribute('src', obj.img);

    const modalText = document.createElement('div');
    modalText.classList.add('text-wrapper');
    
    const modalTitle = document.createElement('p');
    modalTitle.style= 'font-weight: bold;';
    modalTitle.textContent = obj.title;


    const modalTextContent1 = document.createElement('p');
    const modalTextContent2 = document.createElement('p');
    //Build Modal

    modalTitle.textContent = obj.desc;
    modalTextContent1.textContent = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus, maiores!';
    modalTextContent2.textContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, quod.';

    //build header
    modalHeader.append(modalHeadTitle, closeIcon);

    //build body
    modalBody.append(imgWrapper);
    imgWrapper.append(modalImg);

    modalText.append(modalTitle, modalTextContent1, modalTextContent2);
    modalBody.append(modalText);
    //put it all together
    modalDialogue.append(modalHeader, modalBody);
    modal.append(modalDialogue);

    return modal;
}


//Modal/ Full Site Modal "open buttons"
for(const elm of openModal){
    elm.addEventListener('click', function(){ 
        const modalId = this.dataset.open;

        //generate card on click
        for(item in portfolioCards){
            if(portfolioCards[item].modalId === this.dataset.open){            
                const modalSection = document.querySelector('.site-wrapper');
                modalSection.append(modalGen(portfolioCards[item]));  
                 modalSection.querySelector('.modal .modal-dialogue');
            }
        }
       setTimeout(() => {
        document.getElementById(modalId).classList.add(isVisible);
      }, "2");
        
    })
};

const closeModal = document.querySelectorAll(modalClose);



//modal close button

for (const elm of closeModal){
    elm.addEventListener('click', function(){
        this.parentElement.parentElement.parentElement.classList.remove(isVisible);
    })
 
};


//Modal


document.addEventListener('click', (e) =>{
    if(e.target === document.querySelector('.modal.is-visible') || e.target === document.querySelector('.modal.is-visible').querySelector(modalClose)){
        const removal = document.querySelector('.modal');
        document.querySelector('.modal.is-visible').classList.remove(isVisible);
        setTimeout(() => {
            removal.remove();
        }, "1000" ) 
    }
}); 


document.addEventListener('keyup', (e) =>{
    if(e.key === 'Escape'){
        const removal = document.querySelector('.modal');
        document.querySelector('.modal.is-visible').classList.remove(isVisible);
        setTimeout(() => {
            removal.remove();
        }, "1000" ) 
    }
});

const elmsDisplayed = getComputedStyle(root).getPropertyValue('--marquee-elms-displayed');
const marqueeContent = document.querySelector('ul.marquee-content')
root.style.setProperty('--marquee-elms', marqueeContent.children.length)

for(let i=0; i<elmsDisplayed; i++){
    marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true))
}

