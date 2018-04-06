
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