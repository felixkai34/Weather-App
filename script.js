const API_KEY = "8c8e88c78effc16ed1c20c1ba86b7771";
const cityinput = document.querySelector("#cityinput");
const invalidcityname = document.querySelector("#invalidcityname");
const cityname = document.querySelector("#cityname");
const temp = document.querySelector("#temp");
const minmax = document.querySelector("#minmax");
const Humidity  = document.querySelector("#Humidity");
const Feelslike = document.querySelector("#Feelslike");
const WindSpeed = document.querySelector("#WindSpeed");
const Visibility = document.querySelector("#Visibility");


//Get Weather Data
getdata =  async (city) => {

    const FULL_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`    

    let Response = await fetch(FULL_URL);
    let data = await Response.json();

    if(data.message === "city not found"){
        return "error";
    }else{
        return data;
    }
}

//Search City
searchCity = (cityinput = "yangon") => {

    getdata(cityinput) 
    .then((response)=>{
        if (response === "error") {
            invalidcityname.textContent = "City not found"
            cityinput.value="";
        } else {
            invalidcityname.textContent = ""
            cityname.textContent=cityinput.toUpperCase();
            temp.textContent = (response.main.temp).toFixed(1) + "°C"
            minmax.textContent = `${response.main.temp_max} / ${response.main.temp_min}`
            Humidity.textContent = `${response.main.humidity} %`
            Feelslike.textContent = `${response.main.feels_like} °C`
            WindSpeed.textContent = `${(response.wind.speed.toFixed(1))} m/h`
            Visibility.textContent = `${response.visibility} m`
            console.log(response)
        }
    })
}

//Search City From Input Data
cityinput.addEventListener("keyup",(e)=>{
    if(e.key == "Enter"){
        searchCity(e.target.value.toLowerCase())
    }
})