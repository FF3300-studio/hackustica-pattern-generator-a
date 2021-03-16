function getInputIntegerValue(id) {
  const input = <HTMLInputElement>document.getElementById(id);
  return parseInt(input.value);
}

function getInputFloatValue(id) {
  const input = <HTMLInputElement>document.getElementById(id);
  return parseFloat(input.value);
}

function parseTck() {
  const input = <HTMLInputElement>document.getElementById("tck");
  const text_values = input.value.split(";");
  const values = text_values.map((value) => parseFloat(value));
  return values;
}

interface TileConfig {
  density: number;
}

export interface Config {
  canvas: {
    width: number;
    height: number;
  };
  grid: {
    rows: number;
    columns: number;
    cell_ratio: number;
  };
  tiles: {
    line: TileConfig;
    wave: TileConfig;
    peak: TileConfig;
  };
  thickness: Array<number>;
}

export function getConfig(): Config {
  return {
    canvas: {
      width: getInputIntegerValue("canvas_wdt"),
      height: getInputIntegerValue("canvas_hgt"),
    },
    grid: {
      rows: getInputIntegerValue("row_num"),
      columns: getInputIntegerValue("col_num"),
      cell_ratio: getInputFloatValue("cell_ratio"),
    },
    tiles: {
      line: {
        density: getInputIntegerValue("line_num"),
      },
      wave: {
        density: getInputIntegerValue("wave_num"),
      },
      peak: {
        density: getInputIntegerValue("peak_num"),
      },
    },
    thickness: parseTck(),
    // {
    // min: getInputFloatValue("tck_min"),
    // max: getInputFloatValue("tck_max"),
    // randomness: 0, //getInputFloatValue("tck_rnd"),
    // },
  };
}
