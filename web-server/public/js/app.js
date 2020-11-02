const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationText = document.querySelector('#location')
const forecastText = document.querySelector('#forecast')
const error = document.querySelector('#error')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    fetch('/weather?address=' + location).then((res) => {
    res.json().then((data) => {
        if (data.error) {
            error.textContent = data.error
            locationText.textContent = ''
            forecastText.textContent = ''
        } else {
            error.textContent = ''
            locationText.textContent = 'Location:' + data.location 
            forecastText.textContent = 'Forecast:' + data.forecast
        }
    })
})

})