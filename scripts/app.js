const form = document.querySelector('form')
const details = document.querySelector('.details')
const card = document.querySelector('.card')
const time = document.querySelector('.time')
const icon = document.querySelector('.icon img')

const updateUI = async (data) => {
    const { cityDetails, weather } = data

    console.log(cityDetails, weather)
    details.innerHTML = `
            <h5 class="my-3">${cityDetails.EnglishName}</h5>
            <div class="my-3">${weather.WeatherText}</div>
            <div class="display-4 my-4">
                <span>${weather.Temperature.Metric.Value}</span>
                <span>&deg;C</span>
            </div>
        `
    // update images and icon ui

    let iconSrc = `/img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute('src', iconSrc)

    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg'
    time.setAttribute('src', timeSrc)

    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none')
    }
}

const updateCity = async (city) => {
    console.log(city)

    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key)

    return { cityDetails, weather }
}

form.addEventListener('submit', e => {
    e.preventDefault()
    const city = form.city.value.trim()
    form.reset()

    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err))
})