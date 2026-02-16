const menuBtnElement = document.getElementById("menuBtn");
const menuInfoElement = document.getElementById("menu-bar");
const menuLine1Element = document.querySelector(".line1");
const menuLine2Element = document.querySelector(".line2");
const menuLine3Element = document.querySelector(".line3");
const body = document.body;

menuBtnElement.addEventListener("click", () => {
  menuLine1Element.classList.toggle("rotate-45");
  menuLine1Element.classList.toggle("translate-y-1.5");

  menuLine2Element.classList.toggle("opacity-0");

  menuLine3Element.classList.toggle("w-[39px]");
  menuLine3Element.classList.toggle("-rotate-45");
  menuLine3Element.classList.toggle("-translate-y-1.5");

  menuInfoElement.classList.toggle("-translate-x-full");

  if (menuInfoElement.classList.contains("-translate-x-full")) {
    body.classList.remove("no-scroll");
  } else {
    body.classList.add("no-scroll");
  }
});

const mobileLinks = document.querySelectorAll("#menu-bar a");

mobileLinks.forEach(link => {
  link.addEventListener("click", () => {
    menuInfoElement.classList.add("-translate-x-full");

    menuLine1Element.classList.remove("rotate-45", "translate-y-1.5");
    menuLine2Element.classList.remove("opacity-0");
    menuLine3Element.classList.remove("w-[39px]", "-rotate-45", "-translate-y-1.5");

    body.classList.remove("no-scroll");
  });
});

async function getInfo() {
  try {
    const res = await fetch("https://api.imdbapi.dev/titles");
    const data1 = await res.json();
    const cards = data1.titles;
    return cards;
  } catch (err) {
    console.error("err", err);
  }
}

const movieCards = document.getElementById("Movies");
const seriesCards = document.getElementById("Series");

async function writeProduct() {
  try {
    const cards = await getInfo();

    cards.forEach((element) => {
      if (element.type === "movie") {
        const cardElement = document.createElement("div");
        cardElement.className =
          "cursor-pointer hover:transition-transform hover:-translate-y-1.5";
        const newImg = document.createElement("img");

        newImg.src = element.primaryImage.url;
        newImg.alt = element.primaryTitle;
        newImg.classList.add("w-[220px]", "h-[290px]");

        cardElement.appendChild(newImg);
        movieCards.appendChild(cardElement);
        cardElement.addEventListener("click", () =>{
         window.location.href = `about.html?id=${element.id}`;

        })
      } else if (
        element.type === "tvSeries" ||
        element.type === "tvMiniSeries"
      ) {
        const cardElement = document.createElement("div");
        cardElement.className =
          "cursor-pointer hover:transition-transform hover:-translate-y-1.5";
        const newImg = document.createElement("img");

        newImg.src = element.primaryImage.url;
        newImg.alt = element.primaryTitle;
        newImg.classList.add("w-[220px]", "h-[290px]");

        cardElement.appendChild(newImg);
        seriesCards.appendChild(cardElement);

        cardElement.addEventListener("click", () =>{
        window.location.href = `about.html?id=${element.id}`;

        })
        console.log();
      }
    });
  } catch (err) {
    console.error("err", err);
  }
}

writeProduct();


