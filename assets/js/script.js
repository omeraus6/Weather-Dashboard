
var cityname = document.querySelector("#cityname");
var btn = document.querySelector(".btn");




//search button 
btn.addEventListener("click",function(event){
  event.preventDefault();
  startnewsearch();
  var city= cityname.value;
  
  getApiData(city);
  
});

//git weather data api from openweathermap 
function getApiData(city)
{

  var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city +'&appid=a9f48eaca2ef1bc28989582adf1daa56';
 
  fetch(requestUrl)
    .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);

    var requestUrl2 = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + data[0].lat +'&lon=' + data[0].lon +
                     '&appid=a9f48eaca2ef1bc28989582adf1daa56&units=imperial';
    fetch(requestUrl2)
       .then(function (response) {
             return response.json();
         })
       .then(function (data) {
            console.log(data);

            for(var i=0;i<=5;i++)
            {
              var forecast = document.querySelector("#Forecast-"+ (i+2));
              var text2= document.createElement("p");

              var da= JSON.stringify(data.list[i*8].main.humidity);
              var da2= JSON.stringify(data.list[i*8].main.temp);
              var da3= JSON.stringify(data.list[i*8].wind.speed);
              var da5= dayjs(data.list[i*8].dt_txt).format('DD/MM/YYYY');  //JSON.stringify(data.list[i-1].dt_txt);

              text2.innerHTML = da5 + "<img src=http://openweathermap.org/img/w/" + data.list[i*8].weather[0].icon +".png>"
                       +"\r\nhumidity: " + da +"\r\ntemp: " 
                      + da2 + "\r\nspeed: " + da3;
              text2.style= "margin: 10px ; font-size: 20px; color: black"; 

              if(i==0)
              {
                var forecast1 = document.querySelector(".first-day");
                var text= document.createElement("p");
                var da4= data.city.name;
                text.innerHTML = da4 + " " + da5 + "<img src=http://openweathermap.org/img/w/" + data.list[0].weather[0].icon 
                       +".png>" +"\r\nhumidity: " + da +"\r\ntemp: " + da2 + "\r\nspeed: " + da3; 
                text.style= "margin: 10px ; font-size: 20px; color: black"; 
                forecast1.appendChild(text);
              }

              forecast.appendChild(text2);


            }
         });

  });
  
}


//clear data and start new one
function startnewsearch()
{
  for(var i=1;i<=6;i++)
  {
    var forecast = document.querySelector("#Forecast-"+ (i));
    while (forecast.firstChild) 
    {
      forecast.removeChild(forecast.lastChild);
    }
  }
  
}

function savecityname()
{
  
}



 

