import paper from "paper";
import { Config, getConfig } from "./getConfig";
import { tile_wave } from "./tiles/wave";
import { tile_peak } from "./tiles/peak";
import { tile_line } from "./tiles/line";
import rwc from "random-weighted-choice";
import { noise } from "@chriscourses/perlin-noise";
import { interpolate_values } from "./tiles/interpolation";
import { choice } from "pandemonium";

function createCanvas(width: number, height: number): HTMLCanvasElement {
  //
  const parent_selector: string = ".output";
  const canvas_id: string = "canvas";

  // Removing old one if present
  const canvas_old: HTMLElement = document.getElementById(canvas_id);
  if (canvas_old) {
    canvas_old.remove();
  }

  // Creating canvas
  const canvas = <HTMLCanvasElement>document.createElement("CANVAS");
  canvas.id = canvas_id;
  canvas.width = width;
  canvas.height = height;

  // Appending canvas
  document.querySelector(parent_selector).appendChild(canvas);

  return canvas;
}

function getGridConfig(
  canvas_wdt: number,
  canvas_hgt: number,
  grid_col_num: number,
  grid_row_num: number,
  cell_ratio: number
): {
  origin: { x: number; y: number };
  cell: { width: number; height: number };
} {
  // Getting the ratios of the two rectangles
  const canvas_ratio = canvas_wdt / canvas_hgt;
  const grid_ratio = (grid_col_num * cell_ratio) / grid_row_num;

  // Defining cell variables
  let cell_wdt;
  let cell_hgt;

  // Also, we need to know grid placing
  let grid_x;
  let grid_y;

  // Calculating cell size and grid placing
  if (canvas_ratio > grid_ratio) {
    //
    cell_hgt = canvas_hgt / grid_row_num;
    cell_wdt = cell_hgt * cell_ratio;
    //
    grid_x = (canvas_wdt - cell_wdt * grid_col_num) / 2;
    grid_y = 0;
  }
  //
  else {
    cell_wdt = canvas_wdt / grid_col_num;
    cell_hgt = cell_wdt / cell_ratio;
    //
    grid_x = 0;
    grid_y = (canvas_hgt - cell_hgt * grid_row_num) / 2;
  }

  return {
    origin: {
      x: grid_x,
      y: grid_y,
    },
    cell: {
      width: cell_wdt,
      height: cell_hgt,
    },
  };
}

export function draw() {
  // Getting data from html input
  const config = getConfig();

  // Calculating grid properties
  const gridConfig = getGridConfig(
    config.canvas.width,
    config.canvas.height,
    config.grid.columns,
    config.grid.rows,
    config.grid.cell_ratio
  );

  const canvas = createCanvas(config.canvas.width, config.canvas.height);

  // Drawing
  paper.setup(canvas);

  // Total probability
  const table = [
    { weight: config.tiles.line.density, id: "line" },
    { weight: config.tiles.wave.density, id: "wave" },
    { weight: config.tiles.peak.density, id: "peak" },
  ];

  for (let c = 0; c < config.grid.columns; c++) {
    for (let r = 0; r < config.grid.rows; r++) {
      const x = gridConfig.origin.x + c * gridConfig.cell.width;
      const y = gridConfig.origin.y + r * gridConfig.cell.height;

      const rect = new paper.Rectangle(
        new paper.Point(x, y),
        new paper.Size(gridConfig.cell.width, gridConfig.cell.height)
      );
      // const rect_path = new paper.Path.Rectangle(rect);
      // rect_path.strokeColor = "red";

      let path;
      let tile = rwc(table);
      if (tile == "line") {
        path = tile_line(rect);
      } else if (tile == "wave") {
        path = tile_wave(rect, choice([-1, 1]), 0.5);
      } else if (tile == "peak") {
        path = tile_peak(rect, choice([-1, 1]), 0.56);
      }

      const noise_f = 0.1;
      // const tck_f = interpolate_values(
      //   config.thickness.min,
      //   config.thickness.max,
      //   noise(c, r, Math.random())
      // );
      // const tck_f = interpolate_values(
      //   config.thickness.min,
      //   config.thickness.max,
      //   Math.random()
      // );
      const tck_f = choice(config.thickness);

      path.strokeColor = "black";
      path.strokeWidth = gridConfig.cell.width * tck_f;
    }
  }

  // -- Paperjs draw -- //
  (paper.view as any).draw();
}
