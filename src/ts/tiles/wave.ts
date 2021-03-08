import Point from "../point";
import Segment from "../segment";
import Path from "../path";

function strokeWaveHalf(
  p: Point,
  w: number,
  h: number,
  f: number
): Array<Point> {
  // End point
  const q: Point = p.add(new Point(w, h));
  // P projection
  const pp: Point = p.add(new Point(0, h * f));
  // Q projection
  const qp: Point = q.add(new Point(0, -h * f));

  return [pp, qp, q];
}

function strokeWave(p: Point, w: number, h: number, f: number): Path {
  // First strokeWaveHalf
  const w0: Array<Point> = strokeWaveHalf(p, w, h / 2, f);
  // Next starting point
  const q = w0[w0.length - 1];
  // Second strokeWaveHalf
  const w1: Array<Point> = strokeWaveHalf(q, -w, h / 2, f);

  // Creating return path
  const path = new Path();
  path.lineTo(p);
  path.curveTo(w0[0], w0[1], w0[2]);
  path.curveTo(w1[0], w1[1], w1[2]);
  return path;
}

export function strokeWaveTck(
  p: Point,
  w: number,
  h: number,
  f: number,
  t: number
): Path {
  // Getting middle strokeWave
  const wave = strokeWave(p, w, h, f);
  // Getting left contour
  const wL = wave.console.log(wave);
}
