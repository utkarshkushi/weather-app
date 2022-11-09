console.log("hello from weather app")

const wrapper = document.querySelector('.wrapper');
inputPart = wrapper.querySelector('.input-part');
infoTxt = inputPart.querySelector('.info-txt');
inputField = inputPart.querySelector('input');
locationBtn = inputPart.querySelector('button');
wIcon = document.querySelector('.weather-part img')
arrowBack = wrapper.querySelector('header i')

inputField.addEventListener('keyup', e=>{
    // if user pressed enter btn and input value is empty
    if(e.key == 'Enter' && inputField.value != ''){
        requestApi(inputField.value)
    }
})

locationBtn.addEventListener('click', ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }
    else{
        alert("your browser doesn't allow geolocation api")
    }
})

const onSuccess = (position) => {
    const {latitude, longitude} = position.coords;
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=397ee8b0af062ac6278ed5b4be9e37be`;
    fetchData(api);
}

const onError = (error) => {
    infoTxt.innerText = error.message
    infoTxt.classList.add("error")
}

const requestApi = (city) =>{
    // console.log(city);
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=397ee8b0af062ac6278ed5b4be9e37be`;
    fetchData(api);
}

const fetchData = (api) =>{
    infoTxt.innerText = "Getting weather details...."
    infoTxt.classList.add('pending')
    //fetching the data
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

const weatherDetails = (result) => {
    if(result.cod === '404'){
        infoTxt.classList.replace('pending', 'error');
        infoTxt.innerText = `${inputField.value} isn't a vaild city`
    }
    else{
        // getting the data required from result
        const city = result.name;
        const country = result.sys.country;
        const {description, id} = result.weather[0];
        const {feels_like, humidity, temp} = result.main;

        console.log(typeof(id));

        //setting the picture
        if(id === 800){
            wIcon.src = './/Weather Icons//clear.svg'
        }else if(id >= 200 && id <= 232){
            wIcon.src = './/Weather Icons//storm.svg'
        }else if(id >= 600 && id <= 622){
            wIcon.src = './/Weather Icons//snow.svg'
        }else if(id >= 701 && id <= 781){
            wIcon.src = './/Weather Icons//haze.svg'
        }else if(id >= 801 && id <= 804){
            wIcon.src = './/Weather Icons//cloud.svg'
        }else if((id >= 300 && id <= 321) || (id >= 500 && id <= 531)){
            wIcon.src = './/Weather Icons//rain.svg'
        }

        //let's pass these values to the html elements
        wrapper.querySelector('.temp .numb').innerText = temp;
        wrapper.querySelector('.weather').innerText = description;
        wrapper.querySelector('.location span').innerText = `${city}, ${country}`;
        wrapper.querySelector('.temp .numb-2').innerText = feels_like;
        wrapper.querySelector('.humidity span').innerText = `${humidity}%`;


        infoTxt.classList.remove('pending', 'error');
        wrapper.classList.add('active');
    }
    console.log(result);
}

arrowBack.addEventListener('click', ()=>{
    wrapper.classList.remove('active');
})