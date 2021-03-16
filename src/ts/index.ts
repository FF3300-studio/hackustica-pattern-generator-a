import paper from "paper";
import { tile_wave } from "./tiles/wave";
import { tile_peak } from "./tiles/peak";
import { tile_line } from "./tiles/line";

export function drawGrid(canvas: HTMLCanvasElement) {
  // Create an empty project and a view for the canvas:
  paper.setup(canvas);

  // -- Paperjs draw -- //
  (paper.view as any).draw();
}
