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

// UserInput Scripts
user_input_form.addEventListener("submit", (eObjForm) => {
    eObjForm.preventDefault();
    const userInput = user_textbox.value;
    user_input_form.reset();
    const chat_paragraph = document.createElement("p")
    chat_paragraph.textContent = userInput;
    chat_box.appendChild(chat_paragraph)
    chat_paragraph.classList.add("chat_content")
})
send_button.addEventListener("click", () => {
    const userInput = user_textbox.value;
    user_input_form.reset();
    const chat_paragraph = document.createElement("p")
    chat_paragraph.textContent = userInput;
    chat_box.appendChild(chat_paragraph)
    chat_paragraph.classList.add("chat_content")
})


// user_input_form.addEventListener("submit", (eObjForm) => {
//     eObjForm.preventDefault();
//     const userInput = search_term.value;
//     user_input_form.reset();
//     const newButton = document.createElement("button");
//     newButton.textContent = userInput;
//     btns_container.appendChild(newButton);
//     newButton.classList.add("btns_to_click");
//   });
  
//   btns_container.addEventListener("click", (eObjContainer) => {
//     const buttonInput = eObjContainer.target.textContent;
//     const apiKey = "FfIXQ8Uxt33G5cmUMeonTO30sa8k5CzW";
//     const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${buttonInput}&limit=15`;
//     if (eObjContainer.target.classList.contains("btns_to_click")) {
//       fetch(url)
//         .then((response) => response.json())
//         .then((json) => {
//           clearOutput();
//           json.data
//             .map((gif) => gif.images.fixed_height.url)
//             .forEach((url) => {
//               const stickers = document.createElement("img");
//               stickers.classList.add("stickers");
//               stickers.setAttribute("src", url);
//               card_container.appendChild(stickers);
//               const gif_cont = document.getElementById("gif_container");
//               function addGifToContainer() {
//                 gif_cont.appendChild(stickers);
//                 const thisDate = document.createElement("p");
//                 thisDate.innerText = currentDate;
//                 stickers.after(thisDate);
//                 clearOutput();
//               }
//               stickers.onclick = addGifToContainer;
//             });
//         });
//     }
//     if (eObjContainer.target.classList.contains("reset_button")) {
//       clearOutput();
//     }
//   });
//   function clearOutput() {
//     card_container.innerText = "";
//   }
//   const date = new Date();
  
//   const currentDate = date.toLocaleString("en-GB", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//     hour: "numeric",
//     minute: "2-digit",
//   });
//   function insertAfter(newNode, existingNode) {
//     existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
//   }
