'use strict';

let firstEl = document.getElementById('first');
let secEl = document.getElementById('second');
let thirdEl = document.getElementById('third');

var round = 0;
var maxRound = 25;



function Products(name, path){
  this.name = name;
  this.path = path;
  this.times = 0;
  this.select = 0;
  Products.allProducts.push(this);

}

Products.allProducts=[];

new Products('bag', '../img/bag.jpg');
new Products('banana', '../img/banana.jpg');
new Products('bathroom', '../img/bathroom.jpg');
new Products('boots', '../img/boots.jpg');
new Products('breakfast', '../img/breakfast.jpg');
new Products('bubblegum', '../img/bubblegum.jpg');
new Products('chair', '../img/chair.jpg');
new Products('cthulhu', '../img/cthulhu.jpg');
new Products('dog-duck', '../img/dog-duck.jpg');
new Products('dragon', '../img/dragon.jpg');
new Products('pen', '../img/pen.jpg');
new Products('pet-sweep', '../img/pet-sweep.jpg');
new Products('scissors', '../img/scissors.jpg');
new Products('shark', '../img/shark.jpg');
new Products('sweep', '../img/sweep.png');
new Products('tauntaun', '../img/tauntaun.jpg');
new Products('unicorn', '../img/unicorn.jpg');
new Products('usb', '../img/usb.gif');
new Products('water-can', '../img/water-can.jpg');
new Products('wine-glass', '../img/wine-glass.jpg');

let leftIndex ;
let middleIndex ;
let rightIndex ;


function randomIndex(){
  return Math.floor(Math.random()*Products.allProducts.length);

}

function renderImgs(){
  leftIndex = randomIndex();
  middleIndex = randomIndex();
  rightIndex = randomIndex();

  while ((leftIndex === middleIndex) || (leftIndex === rightIndex) || (middleIndex === rightIndex)){
    rightIndex = randomIndex();
    middleIndex = randomIndex();
  }

  firstEl.src=Products.allProducts[leftIndex].path;
  Products.allProducts[leftIndex].times++;

  secEl.src=Products.allProducts[middleIndex].path;
  Products.allProducts[middleIndex].times++;

  thirdEl.src=Products.allProducts[rightIndex].path;
  Products.allProducts[rightIndex].times++;

}
renderImgs();

function handleClicking(event){
  round++;
  if(round <= maxRound){
    if(event.target.id === 'first'){
      Products.allProducts[leftIndex].select++;
    }
    else if(event.target.id === 'second'){
      Products.allProducts[middleIndex].select++;
    }
    else if(event.target.id === 'third'){
      Products.allProducts[rightIndex].select++;
    }
    renderImgs();
  }
  else if (round > maxRound){
    let cont = document.getElementById('list');
    let btn = document.createElement('botton');
    cont.appendChild(btn);
    btn.setAttribute('id', 'box');
    btn.textContent='View Results';
    btn.addEventListener('click', renderList);
    firstEl.removeEventListener('click', handleClicking);
    secEl.removeEventListener('click', handleClicking);
    thirdEl.removeEventListener('click', handleClicking);

  }
}


function renderList(){
  let container = document.getElementById('list');
  let unorder = document.createElement('ul');
  container.appendChild(unorder);
  for (let i = 0 ; i < Products.allProducts.length ; i++){
    let list = document.createElement('li');
    unorder.appendChild(list);
    list.textContent=`The product (${Products.allProducts[i].name}); has ${Products.allProducts[i].select} votes and was seen ${Products.allProducts[i].times} times.`;
  }

}
firstEl.addEventListener('click', handleClicking);
secEl.addEventListener('click', handleClicking);
thirdEl.addEventListener('click', handleClicking);




