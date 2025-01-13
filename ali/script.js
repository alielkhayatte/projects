const headServ = [...document.querySelector(".services").children];
//this function show elements in borwser smothly
function EvenOrOdd(arr) {
  arr.forEach((elm, index) => {
    elm.style.setProperty("--sing", `${index % 2 != 0 ? 1 : -1}`);
  });
}
function showsmothly(array) {
  let observer = new IntersectionObserver((elms) => {
    elms.forEach((elm) => {
      elm.target.classList.toggle("show-smothly", elm.isIntersecting);
    });
  });
  array.forEach((elm) => {
    observer.observe(elm);
  });
}
showsmothly(headServ);
showsmothly([...document.querySelector(".foods").children]);
//this DOMContentLoaded is do this code after finishing load the dom
document.addEventListener("DOMContentLoaded", () => {
  const navBar = document.querySelector(".nav-bar");
  const btnBar = document.querySelector(".nav  .icon :first-child");
  const btnDelate = document.querySelector(".icon :last-child");
  btnBar.addEventListener("click", () => {
    btnBar.classList.add("disabled");
    navBar.classList.toggle("show-bar");
    btnDelate.classList.remove("disabled");
  });
  btnDelate.addEventListener("click", () => {
    navBar.classList.add("hide");
    btnBar.classList.remove("disabled");
    btnDelate.classList.add("disabled");
    setTimeout(() => {
      navBar.classList.toggle("show-bar");
      navBar.classList.remove("hide");
    }, 500);
  });
});
//change the color of navbar when i scroll
window.addEventListener("scroll", () => {
  const section = document.querySelector(".main").nextElementSibling;
  const btnBar = document.querySelector(".nav");
  if (
    section.getBoundingClientRect().top <= btnBar.getBoundingClientRect().height
  ) {
    if (!btnBar.classList.contains("icon-black"))
      btnBar.classList.add("icon-black");
  } else btnBar.classList.remove("icon-black");
});
//show the food chosen
const typeFoods = document.querySelectorAll(".type-foods-inner  > .food");
const meals = [...document.querySelector(".meals-cards").children];
let filterArray = () => meals.map((elm) => elm);
let textArray = () =>
  filterArray().map((elm) => elm.lastElementChild.lastElementChild);
async function setData(str) {
  const data = await (
    await fetch(`json_files/${str || "breakfast"}.json`)
  ).json();
  filterArray().forEach((newElm, index) => {
    newElm.firstElementChild.style.background = `url(json_files/${data[index].img}) center/cover`;
  });
  textArray().forEach((newElm, index) => {
    newElm.firstElementChild.textContent = data[index].meal;
  });
  textArray().forEach((newElm, index) => {
    newElm.lastElementChild.textContent = data[index].price;
  });
}
function loadData() {
  typeFoods.forEach((elm, newIndex) => {
    elm.addEventListener("click", () => {
      let mealDay = elm.firstElementChild.classList[1];
      let lastIndex;
      typeFoods.forEach((newElm, index) => {
        if (newElm.classList.contains("show-under-line")) {
          newElm.classList.remove("show-under-line");
          lastIndex = index;
          return;
        }
      });
      elm.style.setProperty("--sing", `${lastIndex > newIndex ? 1 : -1}`);
      elm.classList.add("show-under-line");
      setData(mealDay);
    });
  });
}
EvenOrOdd(meals);
showsmothly(meals);
loadData();
setData();
// slider 3d services
const cardsServices = document.querySelector(".conainer-cards-service");
const next = document.querySelector(".rigth");
const prv = document.querySelector(".card-service >.left");
let count = 0;
let newCount;
function slide() {
  if (this.classList.contains("rigth") && count === 0) newCount = -1;
  count = this.classList.contains("left") ? ++count : --count;
  cardsServices.style.transform = ` perspective(800px) rotateY(${
    90 * count
  }deg)`;
  let totalCards = cardsServices.children.length;
  newCount = count;
}
next.addEventListener("click", slide);
prv.addEventListener("click", slide);
// cardsServices
showsmothly([next, prv]);
showsmothly([...cardsServices.children]);
let timeSmothly = () => {
  [...cardsServices.children].forEach((card, index, array) => {
    card.style.setProperty("--time", `${(array.length - index) / 4}s`);
  });
};
timeSmothly();
// section about
let timeInc = (obj, end) => {
  let count = 0;
  let time = setInterval(() => {
    obj.textContent = ++count;
    if (count == end) {
      clearInterval(time);
    }
  }, 250);
};
const numChefs = document.querySelector(
  ".dscription .content-about .chfs .num"
);
const miniCards = document.querySelectorAll(".dscription .content-about > *");
const numExp = document.querySelector(".dscription .content-about .exp .num");
const imgsAbout = document.querySelectorAll("section.about .imgs *>*");
EvenOrOdd(miniCards);
EvenOrOdd(imgsAbout);
showsmothly(
  document.querySelectorAll(".dscription >*:not(.content-about,.btn)")
);
showsmothly([document.querySelector(".dscription .btn")]);
showsmothly(miniCards);
showsmothly(imgsAbout);
timeInc(numExp, 10);
timeInc(numChefs, 20);
// section chefs
const cardsTeam = document.querySelector(".container-team > .cards-team");
const rigthTeam = document.querySelector(".container-team > .rigth-team");
const leftTeam = document.querySelector(".container-team > .left-team");
const numOfCards = cardsTeam.children.length;
let countTeam = 0;
function slider() {
  countTeam = this.classList.contains("left-team")
    ? countTeam + 1
    : countTeam - 1;
  cardsTeam.style.transform = `perspective(1000px) rotateY(${
    (360 / numOfCards) * countTeam
  }deg)`;
}
cardsTeam.style.setProperty("--num-items", `${numOfCards}`);
leftTeam.addEventListener("click", slider);
rigthTeam.addEventListener("click", slider);
[...cardsTeam.children].forEach((elm, index) => {
  elm.style.transition = `${index / 2}s`;
});
showsmothly([...cardsTeam.children]);
showsmothly([leftTeam, rigthTeam]);
showsmothly(document.querySelectorAll("section > .last"));
// section comments
const cardsComment = document.querySelectorAll("div.comments > *");
const btns = document.querySelectorAll(".slide-card *");
let widthParent = cardsComment[0].parentElement.getBoundingClientRect().width;
let widthCard = cardsComment[0].getBoundingClientRect().width;
let numOfCardInParent = Math.floor(widthParent / widthCard);
let gap = 5;
let resizeSlider = () => {
  widthParent = cardsComment[0].parentElement.getBoundingClientRect().width;
  widthCard = cardsComment[0].getBoundingClientRect().width;
  numOfCardInParent = Math.floor(widthParent / widthCard);
  let numOfBtn = numOfCardInParent - 1;
  if (numOfCardInParent == 1)
    [...cardsComment][0].style.setProperty("--trans", `${(gap *= 2)}px`);
  [...btns].reverse().forEach((elm) => {
    if (elm.classList.contains("remove")) elm.classList.remove("remove");
  });
  for (let elm of [...btns].reverse()) {
    if (numOfBtn-- == 0) break;
    elm.classList.add("remove");
  }
};
resizeSlider();
btns.forEach((btn, index, arr) => {
  btn.addEventListener("click", () => {
    arr.forEach((elm) => {
      if (elm.classList.contains("orange-btn")) {
        elm.classList.remove("orange-btn");
        return;
      }
    });
    btn.classList.add("orange-btn");
    let len = [...cardsComment].length - 1;
    cardsComment.forEach((card) => {
      const offset = -((index * widthParent) / numOfCardInParent - gap);
      card.style.transform = `translateX(${offset}px)`;
    });
  });
});
showsmothly([]);
document.addEventListener("DOMContentLoaded", () => {
  const footer = document.querySelector(".footer");
  footer.style.opacity = "0"; // Initial state
  setTimeout(() => {
    footer.style.opacity = "1"; // Fade in after a delay
  }, 500);
});