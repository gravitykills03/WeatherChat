//know when the search button is clicked, grab what is in the form input
//use it to create a paragraph element, put the paragraph inside of the div
user_input_form.addEventListener("submit", (eObjForm) => {
  eObjForm.preventDefault();
  const userInput = search_term.value;
  user_input_form.reset();
  const newButton = document.createElement("button");
  newButton.textContent = userInput;
  btns_container.appendChild(newButton);
  newButton.classList.add("btns_to_click");
});

btns_container.addEventListener("click", (eObjContainer) => {
  const buttonInput = eObjContainer.target.textContent;
  const apiKey = "FfIXQ8Uxt33G5cmUMeonTO30sa8k5CzW";
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${buttonInput}&limit=15`;
  if (eObjContainer.target.classList.contains("btns_to_click")) {
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
            card_container.appendChild(stickers);
            const gif_cont = document.getElementById("gif_container");
            function addGifToContainer() {
              gif_cont.appendChild(stickers);
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
  card_container.innerText = "";
}
