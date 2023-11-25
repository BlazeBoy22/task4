let index=0;
const submit = document.getElementById('done');
const textInput = document.getElementById('input1');
const lists = document.getElementById('lists');
const clear = document.getElementById('clear');
const trash = document.getElementsByClassName('fa-trash');
 


window.onload = renderList();

console.log(localStorage);
function renderList(){
    for(var i=0;i<localStorage.length;i++)
    {
        const tasktext = localStorage.getItem(localStorage.key(i));
        const taskText=document.createTextNode(tasktext);
        const para = document.createElement('p');
        const diviWrap = document.createElement('div');
        para.appendChild(taskText);
        para.setAttribute('id',localStorage.key(i));
        diviWrap.appendChild(para);
        const divi = document.createElement('button');
       
        divi.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        divi.addEventListener('click',updateList);
        diviWrap.appendChild(divi);
        const divi1 = document.createElement('button');
        divi1.innerHTML = '<i class="fa-solid fa-trash"></i>';
        diviWrap.appendChild(divi1);
        lists.appendChild(diviWrap);
        divi.setAttribute('class',localStorage.key(i));
        divi1.addEventListener('click',deleteList);
        console.log('divi ka attribute ',divi);
    }
   
}

function updateList(e){
    const clas = e.target.parentElement.getAttribute('class');
    console.log(clas);
        const upd = document.getElementById(clas);
    if((upd.getAttribute('contenteditable'))==='true')
    {
        localStorage[clas]=upd.innerText;
        console.log('ye to sahi hai');
        upd.setAttribute('contenteditable',false);
    }
    else
    {
        
        upd.setAttribute('contenteditable',true);
        console.log(upd.getAttribute('contenteditable'));
    }
   
    
}
function createList(event){
    if(textInput.value!=="")
    {
        event.preventDefault();
        
        const task = textInput.value;
        const uniqueKey = 'task_' + new Date().getTime();
        localStorage.setItem(uniqueKey,task);
        
        
       
        index+=1;
        
        // const taskText=document.createTextNode(task);
        // const para = document.createElement('p');
        // para.appendChild(taskText);
        // lists.appendChild(para);
        textInput.value="";
        renderList();
        
    }
    window.location.reload();
   
}
function clearStorage(){
    localStorage.clear();
    window.location.reload();

}
function deleteList(e){
    console.log(e);
    console.log('e.target',e.target);
    console.log('e.target.value',e.target.value);
    console.log('parent',e.target.parentElement.parentElement);
    // console.log('sibling',e.target.parent.previousSibling);
    console.log('sibling',e.target.parentElement.previousSibling);

    const divToErase = e.target.parentElement.parentElement;
    const taskToErase = e.target.parentElement.parentElement.childNodes[0].getAttribute('id');
    localStorage.removeItem(taskToErase);
    console.log(taskToErase);
    divToErase.remove();

}
// console.log(trash); 
// trash.addEventListener('click',deleteList);
if(localStorage)
{
    submit.addEventListener('click',createList);
    
    clear.addEventListener('click',clearStorage);
}
else{
    alert('local storage not available');
}