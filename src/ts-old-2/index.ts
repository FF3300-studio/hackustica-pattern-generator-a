// import paper from "paper";
// import { line_from_p_a } from "./geometry/line";
// import { interpolate_points } from "./geometry/interpolation";
// import {
//   curve_squaring_handles,
//   wave_v_half,
//   wave_v,
//   wave_v_half_base,
//   tile_wave_v,
// } from "./tiles/wave";

// // -- Paperjs setup -- //

// // Selecting canvas
// const canvas = <HTMLCanvasElement>document.getElementById("canvas");

// // Create an empty project and a view for the canvas:
// paper.setup(canvas);

// // const p1 = new paper.Point(200, 50);
// // const p2 = new paper.Point(200, 350);
// // const w = 400;
// // const h = 400;

// // const bg = new paper.Path.Rectangle(new paper.Rectangle(p1.x, p1.y, w, h));
// // bg.fillColor = "pink";
// // const wave = tile_wave_v(p1, w, h, 1, 1, 40);
// // // wave.translate(new paper.Point(100, 100));
// // wave.fillColor = "white";

// const f = 0.5;

// // const p0 = new paper.Point(0, 0);
// // const p1 = new paper.Point(150, 320);
// // const p0h = p0.add(new paper.Point(0, p1.y * f));
// // const p1h = p1.add(new paper.Point(0, -p1.y * f));

// // const path = new paper.Path();
// // path.moveTo(p0);
// // path.cubicCurveTo(p0h, p1h, p1);
// // path.strokeColor = "red";
// // path.strokeWidth = 120;

// const p0 = new paper.Point(100, 100);
// const w = 100;
// const h = 256;
// const p1 = p0.add(new paper.Point(w, h / 2));
// const p2 = p0.add(new paper.Point(0, h));
// const pM = p0.add(new paper.Point(0, h / 2));

// const s = 0.56;
// const p0h = interpolate_points(p0, pM, s);
// const p1h = interpolate_points(p1, pM, s);
// const p2h = interpolate_points(p2, pM, s);

// const path = new paper.Path();
// path.moveTo(p0);
// path.cubicCurveTo(p0h, p1h, p1);
// path.cubicCurveTo(p1h, p2h, p2);
// path.strokeColor = "red";
// path.strokeWidth = 100;

// // -- Paperjs draw -- //
// (paper.view as any).draw();
