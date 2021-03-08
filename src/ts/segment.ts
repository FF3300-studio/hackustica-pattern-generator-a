import Point from "./point";

export default class Segment {
  points: Array<Point>;

  constructor(points: Array<Point> = []) {
    this.points = points;
  }

  // -- Utility methods -- //

  // Adding a point
  push(p: Point): void {
    this.points.push(p);
  }

  // Number of points
  length(): number {
    return this.points.length;
  }

  // First point
  pfirst(): Point {
    return this.points[0];
  }

  // Last point
  plast(): Point {
    return this.points[this.points.length - 1];
  }

  // Flips the array
  flip(): Segment {
    const flipped = new Segment();
    for (var i = this.length() - 1; i >= 0; i--) {
      flipped.push(this.points[i]);
    }
    return flipped;
  }

  // -- Geometry methods -- //

  // Translate
  translate(t: Point): Segment {
    return new Segment(this.points.map((p: Point) => p.add(t)));
  }

  // Scale
  scale(s: Point, o: Point = new Point(0, 0)): Segment {
    return new Segment(this.points.map((p: Point) => p.scale(s, o)));
  }
}
