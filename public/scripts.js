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

// weather widget script
// API_KEY = "fa5d040af9254b09862fe801f0e26f5f";
// API_KEY = "18a14438c1564f54830311ea69473030";

//API KEY to access weatherbit API
const API_KEY = "18a14438c1564f54830311ea69473030";
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

const socket = io.connect('http://localhost:8080/');
  socket.on("server-message", message => {
  addMessages(message);
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

function addMessages(userInput) {
  const chat_paragraph = document.createElement("p");
  chat_paragraph.textContent = userInput;
  chat_box.appendChild(chat_paragraph);
  chat_paragraph.classList.add("chat_content");
  const thisDate = document.createElement("p");
  thisDate.innerText = currentDate;
  chat_paragraph.after(thisDate);
}

function openNav() {
  if (document.documentElement.clientWidth > 1300) {
    document.getElementById("myNav").style.width = "23%";
  } else {
    document.getElementById("myNav").style.width = "30%";
  }
}

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
              const stickers = document.createElement("img");
              stickers.classList.add("gif_stickers");
              stickers.setAttribute("src", url);
              gif_popover_content.appendChild(stickers);
              const chat_cont = document.getElementById("chat_box");
              function addGifToContainer() {
                chat_cont.appendChild(stickers);
                const thisDate = document.createElement("p");
                thisDate.innerText = currentDate;
                stickers.after(thisDate);
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
            const stickers = document.createElement("p");
            stickers.innerText = emoji
            stickers.classList.add("emoji_stickers");
            emoji_popover_content.appendChild(stickers);
            const chat_cont = document.getElementById("chat_box");
            function addEmojiToContainer() {
              chat_cont.appendChild(stickers);
              const thisDate = document.createElement("p");
              thisDate.innerText = currentDate;
              stickers.after(thisDate);
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
  const date = new Date();

  const currentDate = date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
