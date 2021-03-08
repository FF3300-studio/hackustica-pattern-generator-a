import Point from "./point";
import Segment from "./segment";

export default class Path {
  segments: Array<Segment>;

  constructor() {
    this.segments = [];
  }

  // -- Drawing methods -- //

  lineTo(p: Point) {
    this.segments.push(new Segment([p]));
  }

  curveTo(p: Point, q: Point, r: Point) {
    this.segments.push(new Segment([p, q, r]));
  }

  // -- Geometry methods -- //

  translate(t: Point): Path {
    return;
  }
}
