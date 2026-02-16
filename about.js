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

const mainCard = document.getElementById("about-content");

async function writeProduct() {
  try {
    const cards = await getInfo();

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const currentMovie = cards.find((item) => item.id === id);

    if (!currentMovie) return;

    const cardElement = document.createElement("div");

    cardElement.classList.add("about-card");

    cardElement.style.backgroundImage = `url(${currentMovie.primaryImage?.url})`;
    cardElement.style.backgroundSize = "cover";
    cardElement.style.backgroundPosition = "top center";

    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");

    const textWrapper = document.createElement("div");
    textWrapper.className = "relative z-10 flex flex-col text-white gap-[20px]";

    const title = document.createElement("h1");
    title.textContent = currentMovie.primaryTitle;
    title.className = "mb-4 text-2xl font-bold sm:text-3xl md:text-5xl";

    const infoContent = document.createElement("div");
    infoContent.classList.add("infoContent");

    const year = document.createElement("p");
    year.textContent = currentMovie.startYear || "";
    year.className = "text-sm font-bold text-gray-300 sm:text-base";

    const genres = document.createElement("p");
    genres.textContent = currentMovie.genres?.join(", ") || "";
    genres.className = "text-xl font-bold text-gray-300";

    const desc = document.createElement("p");
    desc.textContent = currentMovie.plot || "";
    desc.className =
      "text-sm sm:text-base md:text-lg text-gray-300 max-w-[90%] sm:max-w-[500px] break-words";

    const btnLink = document.createElement("a");
    btnLink.href = `https://www.imdb.com/title/${currentMovie.id}/`;
    btnLink.target = "_blank";

    const aboutBtn = document.createElement("button");
    aboutBtn.textContent = "Watch now";
    aboutBtn.classList.add("btn-trial");


    btnLink.appendChild(aboutBtn)

    infoContent.appendChild(year);
    infoContent.appendChild(genres);
    textWrapper.appendChild(title);
    textWrapper.appendChild(infoContent);
    textWrapper.appendChild(desc);
    textWrapper.appendChild(btnLink);

    cardElement.appendChild(wrapper);
    cardElement.appendChild(textWrapper);

    mainCard.appendChild(cardElement);
  } catch (err) {
    console.log("err", err);
  }
}

writeProduct();
