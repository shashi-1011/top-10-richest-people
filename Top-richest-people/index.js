const draggable_list = document.getElementById("draggable_list");
const check = document.getElementById("check")

//correct order 10 richest people
const richestPeople = [
    'jeff Bezzoz',
    'Bill Gates',
    'Warren Buffet',
    'bernard Arnult',
    'Carlos Slim Helu',
    'Amanico Ortega',
    'Larry Ellison',
    'Mark Zukenburg',
    'Michale Boomarg',
    'Larry Page'
]
//dup = [...richestPeople]
//console.log(dup)
//stor listItems
const listItems = [];
//console.log(listItems.length)

let dragStartIndex;

//calling the funcciton
createList();

// example sort function
/**
 if we dont use the function in the sort then we dont get the correct output
 becuase they are treated as strings. sort genrally sorts in asceding order
 below program is an best example for that!
 */
/*numbers = [1,110, 3,40,302]
console.log(numbers.sort(function(a,b){
    return a-b
}))*/
//consturcting the funciton
function createList(){
    //making a copy of the rihcestpeople
    [...richestPeople]
    /**
     this will generate random numbers so using that sort key and value we are scrambling the array
     */
    .map(a=>({value:a, sort:Math.random()}))
    .sort((a,b)=>a.sort-b.sort).map(a=>a.value)  
    .forEach((person,index)=>{
        //console.log(person)

        const listItem = document.createElement('li');
       // listItem.classList.add('over');

        listItem.setAttribute('data-index', index);
        listItem.innerHTML=`
        <span class="number"> ${index+1}</span>
        <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <div>
        `;
        listItems.push(listItem);
        //console.log(listItems)// this will store all the li tags
        //if we dont append this we cant see the output in the webpage
        draggable_list.appendChild( listItem);
    })
    //calling the eventlisterns
    addEventListener();
}

function dragStart(){
    // console.log('Event:', 'dragstart');
    dragStartIndex=+this.closest('li').getAttribute('data-index');
    /*
     console.log(dragStartIndex)
     this will print the index value of the person in the consoole
    */
   
}
function dragEnter(){
    // console.log('Event:', 'dragenter');
    this.classList.add('over');
}
function dragLeave(){
    // console.log('Event:', 'dragleave');
    this.classList.remove('over');
}
function dragOver(e){
    e.preventDefault();
    // console.log('Event:', 'dragover');
}
function dragDrop(){
    // console.log('Event:', 'drop');
    const dragEndIndex =+this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);
    this.classList.remove('over');
}
function swapItems(fromIndex, toIndex){
    //console.log(123)
    //console.log(listItems.length)
    const itemone = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');
    //console.log(itemone, itemTwo)
    //console.log(typeof(itemTwo))
    //swaping the two items 
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemone);
}
function checkOrder(){
    listItems.forEach((listItem, index)=>{
        console.log(index)
        const personName = listItem.querySelector('.draggable').innerText.trim()
        console.log(personName)
        if(personName !== richestPeople[index]){
            listItem.classList.add('wrong');
        }else{
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    })
}
function addEventListener(){
const draggables = document.querySelectorAll('.draggable');
const dragListItem = document.querySelectorAll('.draggable_list li');

//Lopping therough the all draggables to add event listers
draggables.forEach(draggable=>{
    draggable.addEventListener('dragstart', dragStart);
})

//Lopping therough the all dragListItem to add event listers
dragListItem.forEach(item=>{
    item.addEventListener('dragover', dragOver)
    item.addEventListener('drop', dragDrop)
    item.addEventListener('dragenter', dragEnter)
    item.addEventListener('dragleave', dragLeave)
})

}
check.addEventListener('click', checkOrder)