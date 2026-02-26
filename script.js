const apiKey="4c632c119febf27a6dd59e5c06ed3acf";
let chart;

async function getWeather(cityName){
const city=cityName||document.getElementById("city").value.trim();
if(!city)return;
try{
const res=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
if(!res.ok)throw new Error("City not found");
const data=await res.json();

drawChart(data);
saveHistory(city);
showHistory();
error.innerText="";
}catch(e){error.innerText=e.message}
}

function drawChart(d){
if(chart)chart.destroy();
chart=new Chart(document.getElementById("chart"),{
type:"bar",
data:{labels:["Temp","Feels","Min","Max"],datasets:[{label:"°C",data:[d.main.temp,d.main.feels_like,d.main.temp_min,d.main.temp_max]}]}
});
}

function saveHistory(city){
let h=JSON.parse(localStorage.getItem("weatherHistory"))||[];
if(!h.includes(city)){h.unshift(city);h=h.slice(0,5);} 
localStorage.setItem("weatherHistory",JSON.stringify(h));
}

function showHistory(){
const list=document.getElementById("history");
list.innerHTML="";
(JSON.parse(localStorage.getItem("weatherHistory"))||[]).forEach(c=>{
const li=document.createElement("li");
li.textContent=c;li.onclick=()=>getWeather(c);
list.appendChild(li);
});
}
showHistory();