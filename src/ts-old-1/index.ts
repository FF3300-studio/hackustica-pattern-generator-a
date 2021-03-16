import paper from "paper";
import Path from "./geometry/path";
import Point from "./geometry/point";
import pathRenderer from "./geometryRenderer/pathRenderer";
import { strokeWave } from "./tiles/wave";

// -- Paperjs setup -- //

// Selecting canvas
const canvas = <HTMLCanvasElement>document.getElementById("canvas");

// Create an empty project and a view for the canvas:
paper.setup(canvas);

// Point

const p1 = new Point(100, 0);
const p2 = new Point(250, 200);
const p3 = new Point(300, 100);
const p4 = new Point(300, 10);

const wave: Path = strokeWave(p1, 200, 400, 0.5);
const wr: paper.Path = pathRenderer(wave);
wr.strokeColor = "teal";

const t = 50;

const w_left: paper.Path = pathRenderer(wave.translate(new Point(-t / 2, 0)));
w_left.strokeColor = "red";

const w_right: paper.Path = pathRenderer(wave.translate(new Point(t / 2, 0)));
w_right.strokeColor = "red";

// -- Paperjs draw -- //
(paper.view as any).draw();
