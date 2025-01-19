import data from './tasks.json' with { type: 'json' };

const addHigh = document.getElementById('addHighTaskButton');
const addLow = document.getElementById('addLowTaskButton');
const highTaskText = document.getElementById('addHighTask');
const lowTaskText = document.getElementById('addlowTask');
const highList = document.querySelector(".highlist");
const lowList = document.querySelector(".lowList");
const exTask = document.querySelector(".item");

let tasks = data.list;
console.log(tasks);

render();

function render(){
    const oldElems = document.querySelectorAll('.item');
    for(let i = 0; i < oldElems.length; i++){
        oldElems[i].remove();
    }

    for(let i = 0; i < tasks.length; i++){
        const newTask = exTask.cloneNode(true);
        newTask.querySelector(".taskText").textContent = tasks[i].name;
        newTask.style.display = "";
        if(tasks[i].status === 'done'){
            newTask.querySelector('.itemCheck').checked = true;
        }
        if(tasks[i].priority === 'low'){
            lowList.appendChild(newTask);
        }
        else{
            highList.appendChild(newTask);
        }
    }
    highTaskText.value = '';
    lowTaskText.value = '';
}

function addTask(event, taskName, taskPriority, taskStatus){
    event.preventDefault();
    try{
        if(taskName.length > 3 && taskName.length < 30){
            tasks.push({name: taskName, priority: taskPriority, status: taskStatus});
        }
        else{
            throw new Error();
        }
    }
    catch(error)
    {
        alert("Длина строки должна быть больше 3 и меньше 30 символов");
    }
    render();
}

function deleteTask(event) {
    const but = event.target.closest('.deleteTaskButton');
    const check = event.target.closest('.itemCheck');
    if(but){
        let delText = but.closest('.item').querySelector('.taskText').textContent;
        for(let i = 0; i < tasks.length; i++){
            if(tasks[i].name === delText){
                tasks.splice(tasks.indexOf(tasks[i]), 1);
            }
        }
    }
    if(check){
        let addCheck = check.closest('.item').querySelector('.taskText').textContent;

        for(let i = 0; i < tasks.length; i++){
            if(tasks[i].name === addCheck && tasks[i].status === 'todo'){
                tasks[i].status = 'done';
            }
            else if(tasks[i].name === addCheck && tasks[i].status === 'done'){
                tasks[i].status = 'todo';
            }
        }
    }
    render();
}




addLow.addEventListener('click', (event) => addTask(event, lowTaskText.value, 'low', 'todo'));
addHigh.addEventListener('click', (event) => addTask(event, highTaskText.value, 'high', 'todo'));
highList.addEventListener('click', (event) => deleteTask(event));
lowList.addEventListener('click', (event) => deleteTask(event));