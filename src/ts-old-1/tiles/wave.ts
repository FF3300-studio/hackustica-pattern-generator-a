import Point from "../geometry/point";
import Segment from "../geometry/segment";
import Path from "../geometry/path";

export function strokeWaveHalf(
  p: Point,
  w: number,
  h: number,
  f: number
): Path {
  // End point
  const q: Point = p.add(new Point(w, h));
  // P projection
  const pp: Point = p.add(new Point(0, h * f));
  // Q projection
  const qp: Point = q.add(new Point(0, -h * f));

  // Creating return path
  const path = new Path();
  path.lineTo(p);
  path.curveTo(pp, qp, q);
  return path;
}

export function strokeWave(p: Point, w: number, h: number, f: number): Path {
  // First strokeWaveHalf
  const w0: Path = strokeWaveHalf(p, w, h / 2, f);
  // Second strokeWaveHalf
  const w1: Path = strokeWaveHalf(w0.pointLast(), -w, h / 2, f);

  return w0.joinPath(w1, false);
}

export function strokeWaveTck(
  p: Point,
  w: number,
  h: number,
  f: number,
  t: number
) {
  // Getting middle strokeWave
  const wave = strokeWave(p, w, h, f);
  // // Getting left contour
  // const wL = wave.translate(new Point(-t / 2, 0));
  // // Getting right contour
  // const wL = wave.translate(new Point(-t / 2, 0));
}
