// weather widget script
// fa5d040af9254b09862fe801f0e26f5f
// 18a14438c1564f54830311ea69473030

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
  content: document.getElementById("gif_search")
})
const popover2 = new bootstrap.Popover(document.getElementById("emoji_icon_box"), {
  container: 'body',
  html: true,
  content: document.getElementById("emoji_search")
})

const apiKey = "18a14438c1564f54830311ea69473030";

document
  .querySelector("#search_input")
  .addEventListener("keydown", function (e) {
    let userInput = document.querySelector("#search_input").value;
    const weatherApiUrl = `https://api.weatherbit.io/v2.0/current?&city=${userInput}&units=I&key=${apiKey}`;
    if (e.key === "Enter") {
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

//send messege through ws
const ws = new WebSocket("ws://localhost:8080");

ws.addEventListener("message", (ev) => {
  ev.data.text().then(addMessages);
});

document.querySelector("form").onsubmit = (ev) => {
  ev.preventDefault();
  const input = document.getElementById("user_textbox");
  ws.send(input.value);
};

// UserInput Scripts
user_input_form.addEventListener("submit", (eObjForm) => {
  eObjForm.preventDefault();
  const userInput = user_textbox.value;
  user_input_form.reset();
  addMessages(userInput);
});

function addMessages(userInput) {
  const chat_paragraph = document.createElement("p");
  chat_paragraph.textContent = userInput;
  chat_box.appendChild(chat_paragraph);
  chat_paragraph.classList.add("chat_content");
  const thisDate = document.createElement("p");
  thisDate.innerText = currentDate;
  chat_paragraph.after(thisDate);
}

send_button.addEventListener("click", () => {
  const userInput = user_textbox.value;
  user_input_form.reset();
  const chat_paragraph = document.createElement("p");
  chat_paragraph.textContent = userInput;
  chat_box.appendChild(chat_paragraph);
  chat_paragraph.classList.add("chat_content");
  const thisDate = document.createElement("p");
  thisDate.innerText = currentDate;
  chat_paragraph.after(thisDate);
});

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
              stickers.classList.add("stickers");
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
            });
        });
    }
    if (eObjContainer.target.classList.contains("reset_button")) {
      clearOutput();
    }
  });
  function clearOutput() {
    gif_popover_content.innerText = "";
  }
  const date = new Date();

  const currentDate = date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
//   function insertAfter(newNode, existingNode) {
//     existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
//   }
