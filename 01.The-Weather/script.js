const timeEl = document.getElementById('time')
const dateEl = document.getElementById ('date')
const currentWeatherItemsEl = document.getElementById('current-weather-items')
const timezone = document.getElementById('time-zone')
const countryEl = document.getElementById('country')
const weatherForecastEl = document.getElementById('weather-forecast')
const currentTempEl = document.getElementById('current-temp')


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

//const API_KEY = '846f3ac73dd3a781d1b5eea5eb7cfa26'

setInterval(() => {
    const time = new Date()
    const month = time.getMonth()
    const date = time.getDate()
    const day = time.getDay()
    const hour = time.getHours()
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const formattedhours = hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat
    const minutes = time.getMinutes()
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = hoursIn12HrFormat + ':' + minutes + ' ' + '<span id="am-pm">' + ampm + '</span>'

    dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month]

}, 1000)

getWeatherData()
function getWeatherData(){
    navigator.geolocation.getCurrentPosition((position) => {

        const latitude = position.coords.latitude
        const longitude = position.coords.longitude 

        //fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${API_KEY}`).then(res => res.json()).then(data => {
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,rain,surface_pressure,wind_speed_10m&minutely_15=temperature_2m,rain&hourly=temperature_2m,rain&daily=sunrise,sunset&timezone=auto`).then(res => res.json()).then(data =>{
        console.log(data);
        })
        .catch(Error => {
            console.log('Error fetching data:', error)
        })
    })
}

function showWeatherData(data){
    let (humidity, pressure, sunrise, sunset, wind_speed) = data.current
}