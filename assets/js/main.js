
function toggleMenu() {
  let button = document.querySelector(".nav-button");
  let navigation = document.querySelector(".main-nav");

  if (navigation.className.includes("toggle-on")) {
    button.innerHTML = "<i class=\"icon-menu\"></i>";
    navigation.className = "navigation main-nav";
  } else {
    button.innerHTML = "<i class=\"icon-cancel\"></i>";

    navigation.animate([
      { opacity: 0 },
      { opacity: 1 }
    ], 400);
    navigation.className = "navigation main-nav toggle-on";
  }
}

window.onscroll = () => {
  if (window.innerWidth > 480) {
    toggleFixedBeerCrate()
  } else {
    toggleFixedBeerCrateMobile()
  }
};

let fixedOffset = null;
let fixedMobileOffset = null;

/**
 * Listener for fixed beer crate sidebar when scrolling
 */
function toggleFixedBeerCrate() {
  let beerCrateSidebar = document.getElementById("beer-crate-sidebar");

  if (beerCrateSidebar === null) {
    return
  }

  if (beerCrateSidebar.className !== 'fixed') {
    fixedOffset = beerCrateSidebar.offsetTop;
  }

  if (window.pageYOffset >= fixedOffset + 100) { // added 100px offset so the page does not jump
    beerCrateSidebar.classList.add("fixed");
  } else {
    beerCrateSidebar.classList.remove("fixed");
  }
}

function toggleFixedBeerCrateMobile() {
  let beerCrateSidebar = document.getElementById("beer-crate-sidebar");
  let beerList = document.getElementById("beer-list-container");

  if (beerList === null) {
    return
  }

  if (beerCrateSidebar.className !== 'fixed') {
    fixedMobileOffset = beerList.offsetTop;
  }

  if (window.pageYOffset >= fixedMobileOffset) {
    beerCrateSidebar.classList.add("fixed");
  } else {
    beerCrateSidebar.classList.remove("fixed");
  }
}
