import paper from "paper";
import { interpolate_points } from "../geometry/interpolation";
import { Line, line_from_p_a } from "../geometry/line";

export function curve_squaring_handles(
  p0: paper.Point,
  p1: paper.Point,
  a0: number,
  a1: number,
  s: number
): Array<paper.Point> {
  // We need to calculate the intersection point between the two handles
  // So we can apply the squaring

  // Lines
  const l0: Line = line_from_p_a(p0, a0);
  const l1: Line = line_from_p_a(p1, a1);

  // Getting the intersection
  const pI = l0.intersect(l1);

  // Getting the handles
  const p0h: paper.Point = interpolate_points(p0, pI, s);
  const p1h: paper.Point = interpolate_points(p1, pI, s);

  return [p0h, p1h];
}

export function wave_v_half_base(
  p1: paper.Point,
  a: number,
  s: number,
  t: number
): paper.Path {
  try {
    if (p1.quadrant != 1) throw "The point must be positive!";

    // P0 is the origin
    const p0 = new paper.Point(0, 0);

    // We have to extend points according to thickness
    // So we define some translation vector
    const t0 = new paper.Point(t / 2, 0);
    const t1 = new paper.Point(t / 2.1, 0).rotate(
      a - 90,
      new paper.Point(0, 0)
    );

    // Points on the inner side
    const p0_i = p0.add(t0);
    const p1_i = p1.add(t1);

    // Getting the inner handles
    const [p0_ih, p1_ih] = curve_squaring_handles(p0_i, p1_i, 90, a, s);

    // The angle between the line that connects p0_i–p1_i
    // and any internal handle should be > 0
    if (p1_i.subtract(p0_i).angle > p0_ih.subtract(p0_i).angle) {
      throw new Error("The flesso angle should be smaller!");
    }

    // Points on the outer side
    const p0_o = p0.subtract(t0);
    const p1_o = p1.subtract(t1);

    // Getting outer handles
    const [p0_oh, p1_oh] = curve_squaring_handles(p0_o, p1_o, 90, a, s);

    // Drawing
    const path = new paper.Path();
    path.moveTo(p0_i);
    path.cubicCurveTo(p0_ih, p1_ih, p1_i);
    path.lineTo(p1_o);
    path.cubicCurveTo(p1_oh, p0_oh, p0_o);
    path.closePath();

    return path;
  } catch (error) {
    throw new Error(error);
  }
}

export function wave_v_half(
  p0: paper.Point,
  p1: paper.Point,
  a: number,
  s: number,
  t: number
): paper.Path {
  // We calculate the vector between p0 and p1
  const v = p1.subtract(p0);
  // And we make it absolute
  const v_abs = v.abs();

  // We call the base shape function
  const path = wave_v_half_base(v_abs, a, s, t);

  // We flip it accordingly to signs
  path.scale(Math.sign(v.x), Math.sign(v.y), new paper.Point(0, 0));
  // And then we translate it to the origin
  path.translate(p0);

  return path;
}

export function wave_v(
  p0: paper.Point,
  w: number,
  h: number,
  a: number,
  s: number,
  t: number
): paper.Path {
  // Calculating the halfway anchor
  const p1 = p0.add(new paper.Point(w, h / 2));
  // Calculating the flesso point
  const pI = interpolate_points(p0, p1, 0.5);

  // Getting the two halves
  const half_0 = wave_v_half(p0, pI, a, s, t);
  const half_1 = wave_v_half(p1, pI, a, s, t);

  // Merging them
  const wave_top = half_0.unite(half_1);

  // Copying it and flipping it
  const wave_bot = <paper.Path>wave_top.clone();
  wave_bot.scale(1, -1, p1);

  return <paper.Path>wave_top.unite(wave_bot);
}

export function tile_wave_v(
  o: paper.Point,
  w: number,
  h: number,
  d: number,
  t: number = 0.25,
  a: number = 0,
  s: number = 0.56
): paper.Path {
  // Calculating starting point
  const p = new paper.Point(o.x + w / 2, o.y);
  // Calculating thickness
  const tck = (t * w) / 2;

  // Check angle
  return wave_v(p, (d * w) / 4, h, a, s, tck);
}
