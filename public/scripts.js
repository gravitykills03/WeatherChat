//popover menus for the GIF and EM buttons
const popoverTriggerList = document.querySelectorAll(
  '[data-bs-toggle="popover"]'
);
const popoverList = [...popoverTriggerList].map(
  (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
);
const popover1 = new bootstrap.Popover(document.getElementById("gif_icon_box"), {
  container: 'body',
  html: true,
  content: document.getElementById("gif_search"),
})
const popover2 = new bootstrap.Popover(document.getElementById("emoji_icon_box"), {
  container: 'body',
  html: true,
  content: document.getElementById("emoji_search"),
})

//API KEY to access weatherbit API
// API_KEY = "fa5d040af9254b09862fe801f0e26f5f";
const API_KEY = "18a14438c1564f54830311ea69473030";
// Geoapify API script
var requestOptions = {
  method: 'GET',
};
fetch("https://api.geoapify.com/v1/ipinfo?&apiKey=4a33cf2ac7a847d0b4d55c8d52efcd1e", requestOptions)
  .then(response => response.json())
  .then((result) => {
    const location = result.city.name;
    const geoAPI = `https://api.weatherbit.io/v2.0/current?&city=${location}&units=I&key=${API_KEY}`;
    fetch(geoAPI)
        .then((response) => response.json())
        .then((data) => {
          
          // select the weather image, temp, and description elements and update values from API
          document.getElementById("location").innerText = data.data[0]["city_name"];
          document.querySelector(
            ".icon"
          ).src = `https://www.weatherbit.io/static/img/icons/${data.data[0].weather.icon}.png`;
          document.getElementById("temperature_info").innerText = `${data.data[0].temp}°F`;
          document.getElementById("weather_description").innerText = data.data[0].weather.description;
      });
});
  
// weatherbit API script script
document
  .querySelector("#search_input")
  .addEventListener("keydown", function (e) {
    let userInput = document.querySelector("#search_input").value;
    const API_URL = `https://api.weatherbit.io/v2.0/current?&city=${userInput}&units=I&key=${API_KEY}`;
    if (e.key === "Enter") {
      fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
          
          // select the weather image, temp, and description elements and update values from API
          document.getElementById("location").innerText = data.data[0]["city_name"];
          document.querySelector(
            ".icon"
          ).src = `https://www.weatherbit.io/static/img/icons/${data.data[0].weather.icon}.png`;
          document.getElementById("temperature_info").innerText = `${data.data[0].temp}°F`;
          document.getElementById("weather_description").innerText = data.data[0].weather.description;

          // reset text field to blank
          document.querySelector("#search_input").value = "";
        });
    }
});

// connect to server
const socket = io.connect('https://we-chat-2022.herokuapp.com/');
// listen for server messages
socket.on("server-message", message => {
  if(message.startsWith("https://media")){
    const chat_cont = document.getElementById("chat_box");
    let gif = document.createElement("img");
    gif.classList.add("gif_stickers");
    gif.setAttribute("src", message);
    chat_cont.appendChild(gif);
    const thisDate = document.createElement("p");
    thisDate.innerText = currentDate();
    chat_cont.appendChild(thisDate);
  }
  else{
  addMessages(message);
  }
});

// If the user presses 'Enter' key to submit the mesage
document.querySelector('form').onsubmit = ev => {
ev.preventDefault();
const input = document.getElementById('user_textbox').value;
addMessages(input);
socket.emit("client-message", input);
user_input_form.reset();
};

// If the user clicks 'Send' button
send_button.addEventListener("click", myFunction);
function myFunction() {
  const input = document.getElementById('user_textbox').value;
  addMessages(input);
  socket.emit("client-message", input);
  user_input_form.reset();
};

// transform text to paragraph and append to container
function addMessages(userInput) {
  const chat_paragraph = document.createElement("p");
  chat_paragraph.textContent = userInput;
  chat_box.appendChild(chat_paragraph);
  chat_paragraph.classList.add("chat_content");
  const thisDate = document.createElement("p");
  thisDate.innerText = currentDate();
  chat_paragraph.after(thisDate);
}

// open nav animation
function openNav() {
  if (document.documentElement.clientWidth < 500) {
    document.getElementById("myNav").style.width = "55%";
  } else {
    document.getElementById("myNav").style.width = "33%";
  }
}

// open nav animation
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

//Gif API
  gif_form_container.addEventListener("submit", (eObjContainer) => {
    eObjContainer.preventDefault();
    const userInput = gif_search_term.value;
    const apiKey = "FfIXQ8Uxt33G5cmUMeonTO30sa8k5CzW";
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${userInput}&limit=15`;
    if (userInput.length != 0) {
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          clearOutput();
          json.data
            .map((gif) => gif.images.fixed_height.url)
            .forEach((url) => {
              const stickers_cont = document.createElement("div")
              stickers_cont.classList.add("stickers_cont");
              const stickers = document.createElement("img");
              stickers.classList.add("gif_stickers");
              stickers.setAttribute("src", url);
              gif_popover_content.appendChild(stickers);
              const chat_cont = document.getElementById("chat_box");
              function addGifToContainer() {
                chat_cont.appendChild(stickers_cont);
                stickers_cont.appendChild(stickers);
                socket.emit("client-message", stickers.src);
                const thisDate = document.createElement("p");
                thisDate.innerText = currentDate();
                stickers.after(thisDate);
                popover1.hide();
                clearOutput();
              }
              stickers.onclick = addGifToContainer;
              gif_form_container.reset();
            });
        });
    }
  });
  function clearOutput() {
    gif_popover_content.innerText = "";
  }
  emoji_form_container.addEventListener("submit", (eObjContainer) => {
  eObjContainer.preventDefault();
  const userInput = emoji_search_term.value;
  const url = `https://api.emojisworld.fr/v1/search?&q=${userInput}&limit=25`;
  if (userInput.length != 0) {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        emojiClearOutput();
        json.results
          .map((emoji) => emoji.emoji)
          .forEach((emoji) => {
            const stickers_cont = document.createElement("div")
            stickers_cont.classList.add("stickers_cont");
            const stickers = document.createElement("p");
            stickers.innerText = emoji
            stickers.classList.add("emoji_stickers");
            emoji_popover_content.appendChild(stickers);
            const chat_cont = document.getElementById("chat_box");
            function addEmojiToContainer() {
              chat_cont.appendChild(stickers_cont);
              stickers_cont.appendChild(stickers);
              socket.emit("client-message", stickers.innerText);
              const thisDate = document.createElement("p");
              thisDate.innerText = currentDate();
              stickers.after(thisDate);
              popover2.hide();
              emojiClearOutput();
            }
            stickers.onclick = addEmojiToContainer;
            emoji_form_container.reset();
          });
      });
   }
});

function emojiClearOutput() {
  emoji_popover_content.innerText = "";
}
function currentDate() {
  const date = new Date();
  const dateString = date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }); 
  return dateString;
}

