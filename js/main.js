const apiKey = 'f169182e855b51c0d4ec8b29896c2344';
const weatherLocation = 'Buenos Aires, Argentina';
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Buenos%20Aires,Argentina&appid=${apiKey}`;

fetch(weatherUrl, {mode: 'cors'})
.then(response => response.json())
.then(data => {
    const city = data.name;
    const temperature = data.main.temp;
    const weatherDescription = data.weather[0].description;

    const temperatureInCelsius = temperature - 273.15;
    document.querySelector('#temperature').innerHTML = temperatureInCelsius.toFixed(2) + "°C";

    document.querySelector('#location').innerHTML = city;
    document.querySelector('#weather-description').innerHTML = weatherDescription;
})
.catch(error => {
    console.error('Error fetching weather data:', error);
});

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
        this.historyArray.push({
            date: DateTime.local().toLocaleString(DateTime.DATETIME_SHORT),
            number: number
        });
    }

    updateDisplay(){
        this.actualFloor.innerText = this.currentFloor;
        this.floorAmount.innerText = this.currentFloorAmount;
    }
}
var DateTime = luxon.DateTime;


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
        lift.historyArray.forEach((historyItem)=>{
            const number = historyItem.number;
            const date = historyItem.date;
            modalBody.innerHTML += `
            <div class="modal-contenedor">
            <p> ${date} - ${number} </p>
            </div>
            `
        })
    }

    SaveStorage();
}



function SaveStorage() {
    localStorage.setItem("history" ,JSON.stringify(lift.historyArray))
} 


