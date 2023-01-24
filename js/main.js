
class Lift{
    constructor(actualFloor, floorAmount){
        this.actualFloor=actualFloor;
        this.floorAmount=floorAmount;
        this.clear();
        this.historyArray = [];
    }

    clear(){
        this.currentFloor= 0;
        this.currentFloorAmount = 0;
    }

    move(number){
        if(number>this.currentFloor){
            this.currentFloorAmount += (number-this.currentFloor);
        }else if(number<this.currentFloor){
            this.currentFloorAmount += (this.currentFloor - number); 
        }else{
            return;
        }
        this.currentFloor=number;
        this.historyArray.push(number);
    }

    updateDisplay(){
        this.actualFloor.innerText = this.currentFloor;
        this.floorAmount.innerText = this.currentFloorAmount;
    }
}


const employee = [
    {id : 4536,
    name : "Juan",
    age : 45,
    calle : "Sarmiento 4456"}
    ,
    {id : 4537,
    name : "Micaela",
    age : 29,
    calle : "Av. Libertad 354"}
    ,
    {id : 4538,
    name : "Franco",
    age : 19,
    calle : "Francia 321"}
];


const employeeform = document.querySelector('#employeeform');
const floor = document.querySelector('#floor');
const floorcount = document.querySelector('#floorcount');
const name = document.querySelector('#name');

const numberButtons = document.querySelectorAll('[data-number]');
const actualFloor = document.querySelector('[data-actual-floor]');
const floorAmount = document.querySelector('[data-floor-amount]');
const history = document.querySelector('#history');


if (employeeform) {
    employeeform.addEventListener('submit', (e) => {
        e.preventDefault()
        validate()
    });
}

function validate(){
    const employeenum = document.querySelector('#employeenum').value;

    const find = employee.find(element =>{
    return element.id == employeenum;
    });

    if(find!=undefined){
        location.href = "./pages/lift.html";
    }else{
        alert("el empleado no existe");
    }
}  

const lift = new Lift(actualFloor,floorAmount);

numberButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        lift.move(parseInt(button.innerText));
        lift.updateDisplay();
    })
})


document.addEventListener('DOMContentLoaded', () => {
    lift.historyArray = JSON.parse(localStorage.getItem("history"));
    if(!lift.historyArray){
        lift.historyArray = []
    }
    showHistory();
});

history.addEventListener("click", () => {
    showHistory();
});

const showHistory = () =>{
    const modalBody = document.querySelector('.modal .modal-body')
    modalBody.innerHTML="";
    if(modalBody){
        lift.historyArray.forEach((number)=>{
            const numbers=number;
            modalBody.innerHTML += `
            <div class="modal-contenedor">
            <p>${numbers}</p>
            </div>
            `
        })
    }

    SaveStorage();
}



function SaveStorage() {
    localStorage.setItem("history" ,JSON.stringify(lift.historyArray))
} 
