import { draw } from "./draw";

window.onload = (event) => {
  (window as any).draw = draw;

  const is = document.querySelectorAll("input");
  is.forEach((input) => {
    input.oninput = draw;
  });

  draw();
};
