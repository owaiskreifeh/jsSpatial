import "./styles.css";
import {
  initSpatialNavigation,
  trackFocusables,
  clearFocusalbes
} from "./navigation/navigation.js";

// init methods
document.getElementById("btn-init").onclick = init;

// Init naviagtion
const onFocus = (elm) => {
  elm.classList.add("focused");
};

const onBlur = (elm) => {
  elm.classList.remove("focused");
};

initSpatialNavigation({
  onFocusElement: onFocus,
  onUnfocusElement: onBlur,
  straightOnly: true
});

function init() {
  const num = document.getElementById("input-box-count").value;
  document.querySelector(".container").innerHTML = "";
  clearFocusalbes();
  // Init boxes
  for (let index = 0; index < num; index++) {
    const el = document.createElement("div"),
      sizes = ["sm", "sm", "md", "md", "md", "lg", "full"];
    el.classList.add("box");

    el.classList.add(sizes[Math.floor(Math.random() * sizes.length)]);

    document.querySelector(".container").appendChild(el);
  }

  trackFocusables("box");
}
