export default class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  // -- Maths methods -- //

  // Adds a point
  add(p: Point): Point {
    return new Point(this.x + p.x, this.y + p.y);
  }

  // Subtracts a point
  sub(p: Point): Point {
    return new Point(this.x - p.x, this.y - p.y);
  }

  // Multiplies by a scalar
  smult(s: number): Point {
    return new Point(this.x * s, this.y * s);
  }

  // Divides by a scalar
  sdiv(s: number): Point {
    return new Point(this.x / s, this.y / s);
  }

  // Multiplies by a Point
  pmult(p: Point): Point {
    return new Point(this.x * p.x, this.y * p.y);
  }

  // Divides by a Point
  pdiv(p: Point): Point {
    return new Point(this.x / p.x, this.y / p.y);
  }

  // Interpolates with another point
  interpolate(p: Point, f: number): Point {
    return this.add(p.sub(this).smult(f));
  }

  // -- Geometry methods -- //

  scale(s: Point, o: Point = new Point(0, 0)): Point {
    return this.sub(o).pmult(s).add(o);
  }
}
