// weather widget script
// fa5d040af9254b09862fe801f0e26f5f
// 18a14438c1564f54830311ea69473030
const apiKey = "18a14438c1564f54830311ea69473030";

document.querySelector('#search_input').addEventListener('keydown', function(e){
  let userInput = document.querySelector("#search_input").value;
  const weatherApiUrl = `https://api.weatherbit.io/v2.0/current?&city=${userInput}&units=I&key=${apiKey}`;
  if(e.key ==='Enter'){
    fetch(weatherApiUrl)
      .then((response) => response.json())
      .then((data) => {

        // grab the weather image, temp, and description from API
        const location_input = data.data[0]["city_name"];
        const temp = data.data[0].temp;
        const icon = data.data[0].weather.icon;
        const desc = data.data[0].weather.description;
        document.getElementById("location").innerText = location_input;
        document.querySelector(
          ".icon"
        ).src = `https://www.weatherbit.io/static/img/icons/${icon}.png`;

        //Select the elements and apply css properties and update value
        const tempDivChild = document.getElementById("temp_info");
        tempDivChild.innerText = `${temp}°F`;
        tempDivChild.classList.add("weather_text_style");
        tempDivChild.style.cssText = "visibility : visible";
        
        // reset text field to blank
        document.querySelector("#search_input").value = "";
    });
  }
});