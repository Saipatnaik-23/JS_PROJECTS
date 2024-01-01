let days=document.querySelector("#days");
let hours=document.querySelector("#hours");
let minutes=document.querySelector("#minutes");
let seconds=document.querySelector("#sec");

const newYear = "1 jan 2025";

function countdown()
{
    const newYearDate= new Date (newYear);
    // console.log(newYearDate);
    const currentDate= new Date ();
    // console.log(currentDate);

    let totalSec=(newYearDate-currentDate)/1000;//millisec to sec
    // console.log(totalSec);
    
    let dayEl= Math.floor(totalSec/3600/24);//3600(no.of sec into hours) 24 (no.of hours into day)
    // console.log(dayEl);
    let hoursEl= Math.floor(totalSec/3600)%24 // % used to finf remaining hours;
    // console.log(hoursEl);
    let minutesEl=Math.floor(totalSec/60)%60;
    // console.log(minutesEl);
    let secEl=Math.floor(totalSec)%60;
    // console.log(secEl);

    days.textContent=formatTime(dayEl);
    hours.textContent=formatTime(hoursEl);
    minutes.textContent=formatTime(minutesEl);
    seconds.textContent=formatTime(secEl);
}

function formatTime(time){
    return time<10?`0${time}`:time;
}

countdown();
setInterval(countdown, 1000);