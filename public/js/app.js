const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msgOne')
const msg2 = document.querySelector('#msgTwo')
const msg3 = document.querySelector('#msgThree')
const msg4 = document.querySelector('#msgFour')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value

    const url = 'http://localhost:3000/weather?address=' + location

    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    msg3.textContent = ''
    msg4.textContent = ''

    fetch(url).then((response) => {
        response.json().then((data)=>{
            if(data.error){
                msg1.textContent = data.error
            }
            else{
                msg1.textContent = 'Location : ' + data.Location
                msg2.textContent = 'Weather Description : ' + data.Weather_Description[0] 
                msg3.textContent = 'Temperature : ' + data.Temperature + ' °C'
                msg4.textContent = 'Humidity : ' + data.Humidity + ' %'
            }
        })
    })

    
})
