const calendar = document.getElementById('calendar');//entire calendar div
const popup = document.getElementById('pop');//popup menu
const popupclose = document.getElementById('close-popup');//button to close popup
const monthele = document.getElementById('month');//month element
const bookbutton = document.getElementById('bookbutton');//button to book 
const closebooked = document.getElementById('closebooked');//button to close book menu
const clearbooked = document.getElementById('clearbooked');//button to clear booked data
const calendarEL = document.querySelectorAll('.day');//each day element
const storedname = document.getElementById('outputname');//name stored in LS
const bookedstart = document.getElementById('bookedstart');//start stored in LS
const bookedend = document.getElementById('bookedend');//end stored in LS
const nameinput = document.getElementById('name-input');//name inputed in book menu


const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
const days = ["Sun", "Mon", "Tue", "Wed", "thu", "Fri", "Sat"]


let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let currentHours = today.getHours();
let currentMinutes = today.getMinutes();

//start time 
let placeholderhours = 8;
let placeholderminutes = 0;
//end time
let placeholderhours2 = 8;
let placeholderminutes2 = 0;

const checkstoreddata = () =>{
    if (localStorage.getItem(`eventname:`) === null){

    }else{
        const on = 1;
        addCalendarElements();
    }
}
const addCalendarElements = (index) =>{
    for(let i = 0; i < 42; i++){
        const day = document.createElement('div');
        day.classList.add('day');
        
        const dayText = document.createElement('p');
        dayText.classList.add('dayText');
        dayText.innerHTML = days[i % 7];//print out the day names

        const dayNumber = document.createElement('p');
        dayNumber.classList.add('dayNumber');

        const eventName = document.createElement('p');
        eventName.classList.add('eventName');
        
        day.appendChild(dayText);
        day.appendChild(dayNumber);
        day.appendChild(eventName);
        calendar.appendChild(day);
        
        day.onclick = () => {
        if (!day.classList.contains('dot')){
          handleClick(i);    
        }
        } 
    }   
} 

const updateCalenderinfo = (month, year) =>{
    const dayElements = document.querySelectorAll('.day');

    const dayOne = new Date();
    dayOne.setDate(1);
    dayOne.setMonth(month);
    dayOne.setYear(year);
    
    const dayOneOfWeek = dayOne.getDay();
    console.log(dayOneOfWeek);
    const monthname = months[month];
    
    const monthAndyear = `${year} - ${monthname}`;
    monthele.innerHTML = monthAndyear;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    let dateCount = 1;
        for (let i = 0; i<= dayElements.length; i++){
            const thedate = dayElements[i];
            const dayNumber = thedate.querySelector('.dayNumber');
            if (i >= dayOneOfWeek && dateCount <= daysInMonth){
                //every time the calendar is updated check if any dates are booked based on the objects stored in the events array
                const thisdate = new Date(year, month, dateCount);//store booked data in an array events
                dayNumber.innerHTML = dateCount;
                dateCount++;
            }else {
                dayNumber.innerHTML ='';
            }
            }     
    
}

const addPopupElements = () => {//add elements to the popup menu
    const starttime = document.getElementById('srttime');
    starttime.innerHTML = `${placeholderhours}:${0}${0}`;
    //add end time
    const endtime = document.getElementById('ndtime');
    endtime.innerHTML = `${placeholderhours}:${0}${0}`;
}

const updatePopupInfo = (hours, minutes) =>{//change start time
    const startT = document.getElementById('srttime');
    if (minutes >= 10){
        startT.innerHTML = `${hours}:${minutes}`;
            
    }else{
        startT.innerHTML = `${hours}:${0}${minutes}`;
    } 
}
const updatePopupInfo2 = (hours, minutes) =>{//change end time
    const endT = document.getElementById('ndtime');
    if (minutes >= 10){
        endT.innerHTML = `${hours}:${minutes}`;
            
    }else{
        endT.innerHTML = `${hours}:${0}${minutes}`;
    } 
}

const previousMonth = () =>{
    if (currentMonth == 0){
        currentMonth = 13;
        currentMonth--;
        previousYear();
    }
    //console.log(currentMonth + " prev");
    updateCalenderinfo(--currentMonth, currentYear);
}
const nextMonth = () =>{
    if (currentMonth == 11){
        currentMonth = -2;
        currentMonth++;
        nextYear();
    }
    updateCalenderinfo(++currentMonth, currentYear);
}
const nextYear = () =>{
    currentYear++;
}
const previousYear = () =>{
    currentYear--;
}
const timeUp = () =>{
    //if placeholder > 24 -> placeholder = 0 
    if (placeholderhours == 23){
        placeholderhours = -2;
        placeholderhours++;
    }
    updatePopupInfo(++placeholderhours, placeholderminutes);
}
const timeDown = () =>{
    // if placeholder < 0 -> placeholder = 24
    if (placeholderhours == 0){
        placeholderhours = 25;
        placeholderhours--;
    }
    updatePopupInfo(--placeholderhours, placeholderminutes);
}
const timeUp2 = () =>{
    //if placeholder > 24 -> placeholder = 0 
    if (placeholderhours2 == 23){
        placeholderhours2 = -2;
        placeholderhours2++;
    }
    updatePopupInfo2(++placeholderhours2, placeholderminutes);
}
const timeDown2 = () =>{
    // if placeholder < 0 -> placeholder = 24
    if (placeholderhours2 == 0){
        placeholderhours2= 25;
        placeholderhours2--;
    }
    updatePopupInfo2(--placeholderhours2, placeholderminutes);
}
//handle click when day element or close window of the popup menu buttons are clicked
function handleClick(i){
  
    //closebooked
    const storedend = document.getElementById('closebooked');
    popup.classList.add('open');
    placeholderhours = 8;
    placeholderhours2 = 8;
    updatePopupInfo(placeholderhours, placeholderminutes);
    updatePopupInfo2(placeholderhours2, placeholderminutes2);

    document.getElementById("name-input").value = "";
    popupclose.onclick = () =>{
        popup.classList.remove('open');//when tab is closed reset to placeholder val
    } 

    bookbutton.onclick = () =>{
        if (placeholderhours2 < placeholderhours){
            alert("invalid time entered");
        }else{
        //store the entered values into the local storeage
        const starttime = document.getElementById('srttime').textContent;//start time selected
        const endtime = document.getElementById('ndtime').textContent;//end time selected
        //write a for loop to display a certain storage item on certain day elements
        localStorage.setItem(`eventname:`, nameinput.value);
        localStorage.setItem(`start: ${i}`, starttime);
        localStorage.setItem(`end: ${i}`, endtime);
        //get daynumber, get daytext and start hours and put it into an array
        //add stored data to the booked menu
        const name = localStorage.getItem(`eventname:`);
        const start = localStorage.getItem(`start: ${i}`, starttime);
        const end = localStorage.getItem(`end: ${i}`, endtime);
        console.log(start);
        if (name == ``){
            storedname.innerHTML = `name: `;
        }else {
            storedname.innerHTML =`name: ` + name;
        }
        bookedstart.innerHTML = `start time:` + start;
        bookedend.innerHTML = `start time:` + end;
        popup.classList.remove('open'); 
        handleBooked(i);
        }
    } 
}
const handleBooked = (i) => {//handle when book button is pressed
    const dayEl = document.querySelectorAll('.day');
    const bookmenu = document.getElementById('book');
    const specificday = dayEl[i];

    specificday.classList.add(`dot`);//change colour of a booked date
    dayEl.forEach((button) => {
        button.addEventListener("click", () => {
          // Check if the clicked button has both 'day' and 'dot' classes
          if (button.classList.contains("day") && button.classList.contains("dot")) {
            bookmenu.classList.add('dot'); //show data of the booked date
            // console.log("Clicked button with both 'day' and 'dot' classes:", button);
            // Perform actions on this specific button
          } 
        });
      });
     
    clearbooked.addEventListener("click", () => {//when clear booked button is pressed
        specificday.classList.remove(`dot`);
        console.log(specificday);
        bookmenu.classList.remove('dot');
        popup.classList.add('open');
        document.getElementById("name-input").value = "";
        placeholderhours = 8;
        placeholderhours2 = 8;
        updatePopupInfo(placeholderhours, placeholderminutes);
        updatePopupInfo2(placeholderhours2, placeholderminutes2);
        localStorage.clear();
    });

    closebooked.addEventListener("click", () =>{//when close booked button is pressed
        placeholderhours = 8;
        placeholderhours2 = 8;
        updatePopupInfo(placeholderhours, placeholderminutes);
        updatePopupInfo2(placeholderhours2, placeholderminutes2);
        bookmenu.classList.remove('dot');
    });
}
window.addEventListener("DOMContentLoaded", () => {
    checkstoreddata();
    addCalendarElements();
    addPopupElements();
    updateCalenderinfo(currentMonth, currentYear);
    updatePopupInfo(currentHours, currentMinutes);
});

