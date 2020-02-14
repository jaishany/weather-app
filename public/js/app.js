console.log('Client side javascript file is loaded!')



const form = document.querySelector('form')


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = document.getElementById("location");
    const weather1 = document.querySelector("#weather-1")
    const weather2 = document.querySelector("#weather-2")

    weather1.textContent = 'Loading...'
    weather2.textContent = ''

    fetch('http://localhost:3000/weather?address='+location.value).then((responose) => {
        responose.json().then((data) => {
          
            if ( data.error)
            {
                weather1.textContent = data.error
                
            }
            else{
                weather1.textContent = data.location
                weather2.textContent = data.forecast
            }
        })
    }
    )
})