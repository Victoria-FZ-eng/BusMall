'use strict';
alert('Select Your Favorite Product From The Above');

let firstEl = document.getElementById('first');
let secEl = document.getElementById('second');
let thirdEl = document.getElementById('third');
// let sec = document.getElementById('section');

let round = 0;
let maxRound = 25;

let prodNames = [];


function Products(name, path){
  this.name = name;
  this.path = path;
  this.times = 0;
  this.select = 0;
  Products.allProducts.push(this);
  prodNames.push(this.name);

}

Products.allProducts=[];

new Products('bag', 'img/bag.jpg');
new Products('banana', 'img/banana.jpg');
new Products('bathroom', 'img/bathroom.jpg');
new Products('boots', 'img/boots.jpg');
new Products('breakfast', 'img/breakfast.jpg');
new Products('bubblegum', 'img/bubblegum.jpg');
new Products('chair', 'img/chair.jpg');
new Products('cthulhu', 'img/cthulhu.jpg');
new Products('dog-duck', 'img/dog-duck.jpg');
new Products('dragon', 'img/dragon.jpg');
new Products('pen', 'img/pen.jpg');
new Products('pet-sweep', 'img/pet-sweep.jpg');
new Products('scissors', 'img/scissors.jpg');
new Products('shark', 'img/shark.jpg');
new Products('sweep', 'img/sweep.png');
new Products('tauntaun', 'img/tauntaun.jpg');
new Products('unicorn', 'img/unicorn.jpg');
new Products('usb', 'img/usb.gif');
new Products('water-can', 'img/water-can.jpg');
new Products('wine-glass', 'img/wine-glass.jpg');

let leftIndex ;
let middleIndex ;
let rightIndex ;


function randomIndex(){
  return Math.floor(Math.random()*Products.allProducts.length);

}
let selectionArray = [];
function renderImgs(){

  // if (selectionArray.length === 0){
  //   leftIndex = randomIndex();
  //   middleIndex = randomIndex();
  //   rightIndex = randomIndex();
  //   selectionArray.push(rightIndex);
  //   selectionArray.push(leftIndex);
  //   selectionArray.push(middleIndex);
  // }

  while ( selectionArray.includes(leftIndex) || selectionArray.includes(rightIndex) || selectionArray.includes(middleIndex) || leftIndex === rightIndex || leftIndex === middleIndex || middleIndex === rightIndex ){
    rightIndex = randomIndex();
    middleIndex = randomIndex();
    leftIndex = randomIndex();
  }
  selectionArray[0]=leftIndex;
  selectionArray[1]= middleIndex;
  selectionArray[2] = rightIndex;



  firstEl.src=Products.allProducts[selectionArray[0]].path;
  Products.allProducts[selectionArray[0]].times++;

  secEl.src=Products.allProducts[selectionArray[1]].path;
  Products.allProducts[selectionArray[1]].times++;

  thirdEl.src=Products.allProducts[selectionArray[2]].path;
  Products.allProducts[selectionArray[2]].times++;

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
    // else {
    //   alert('please click on one of the products');
    //   round--;
    // }
    renderImgs();
  }
  else if (round > maxRound){
    // sec.removeEventListener('click', handleClicking);
    let cont = document.getElementById('list');
    let btn = document.createElement('botton');
    cont.appendChild(btn);
    btn.setAttribute('id', 'box');
    btn.textContent='View Results';
    btn.addEventListener('click', renderList, {once:true});

    firstEl.removeEventListener('click', handleClicking);
    secEl.removeEventListener('click', handleClicking);
    thirdEl.removeEventListener('click', handleClicking);
    btn.removeEventListener('click', handleClicking);

  }


}

let prodVotes = [];
let timeShown = [];

function renderList(){
  let container = document.getElementById('list');
  let unorder = document.createElement('ul');
  container.appendChild(unorder);
  for (let i = 0 ; i < Products.allProducts.length ; i++){
    let list = document.createElement('li');
    unorder.appendChild(list);
    list.textContent=`The product (${Products.allProducts[i].name}); has ${Products.allProducts[i].select} votes and was seen ${Products.allProducts[i].times} times.`;
    prodVotes.push(Products.allProducts[i].select);
    timeShown.push(Products.allProducts[i].times);

  }
  chart();
  setArr();
  
 
}
firstEl.addEventListener('click', handleClicking);
secEl.addEventListener('click', handleClicking);
thirdEl.addEventListener('click', handleClicking);
// sec.addEventListener('click', handleClicking);
 getArr();


console.log(Products.allProducts);


function chart(){
  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: prodNames,
      datasets: [{
        label: 'Votes',
        data: prodVotes,
        backgroundColor: [
          'rgba(54, 162, 235, 0.9)',
        ],

        borderWidth: 1 },{


        label: 'showing times',
        data: timeShown,
        backgroundColor: [
          'rgba(201, 95, 97, 0.9)',
        ],

        borderWidth: 1
      }]
    }
  });
}


function setArr(){
  let slarr = JSON.stringify(Products.allProducts);
  localStorage.setItem('Votes', slarr);

}

function getArr(){
  if (setArr !== null ){
    let vD = localStorage.getItem('Votes');
    let voteData = JSON.parse(vD);
    Products.allProducts = voteData;
   
  }
}


