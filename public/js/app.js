const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msgOne')
const msg2 = document.querySelector('#msgTwo')
const msg3 = document.querySelector('#msgThree')
const msg4 = document.querySelector('#msgFour')
const msg5 = document.querySelector('#msg5')
const msg6 = document.querySelector('#msg6')
const msg7 = document.querySelector('#msg7')
const msg8 = document.querySelector('#msg8')
const msg9 = document.querySelector('#msg9')
const msg10 = document.querySelector('#msg10')
const msg11 = document.querySelector('#msg11')
const msg12 = document.querySelector('#msg12')
const msg13 = document.querySelector('#msg13')
const msg14 = document.querySelector('#msg14')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value

    const url = '/weather?address=' + location

    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    msg3.textContent = ''
    msg4.textContent = ''
    msg5.textContent = ''
    msg6.textContent = ''
    msg7.textContent = ''
    msg8.textContent = ''
    msg9.textContent = ''
    msg10.textContent = ''
    msg11.textContent = ''
    msg12.textContent = ''
    msg13.textContent = ''
    msg14.textContent = ''

    fetch(url).then((response) => {
        response.json().then((data)=>{
            if(data.error){
                msg1.textContent = data.error
            }
            else{
                msg1.textContent = 'Location : ' + data.Location
                msg2.textContent = 'Latitude : ' + data.lat
                msg3.textContent = 'Longitude : ' + data.lon
                msg4.textContent = 'Local Time : ' + data.localtime
                msg5.textContent = 'Time Zone : ' + data.timezone_id
                msg6.textContent = 'Weather Description : ' + data.Weather_Description[0] 
                msg7.textContent = 'Temperature : ' + data.Temperature + ' °C'
                msg8.textContent = 'Feels Like : ' + data.feelslike + ' °C'
                msg9.textContent = 'Humidity : ' + data.Humidity + ' %'
                msg10.textContent = 'Wind Speed : ' + data.wind_speed
                msg11.textContent = 'Wind Direction : ' + data.wind_dir
                msg12.textContent = 'Pressure : ' + data.pressure + ' bar'
                msg13.textContent = 'Precipitation : ' + data.precip + ' %'
                msg14.textContent = 'UV Index : ' + data.uv_index
            }
        })
    })

    
})
