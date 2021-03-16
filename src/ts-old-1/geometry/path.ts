import Point from "./point";
import Segment from "./segment";

export default class Path {
  segments: Array<Segment>;
  closed: boolean;

  constructor() {
    this.segments = [];
    this.closed = false;
  }

  // -- Utility methods -- //

  addSegment(s: Segment) {
    this.segments.push(s);
  }

  addSegments(segments: Array<Segment>) {
    segments.forEach((s) => {
      this.segments.push(s);
    });
  }

  segmentFirst(): Segment {
    return this.segments[0];
  }

  segmentLast(): Segment {
    return this.segments[this.segments.length - 1];
  }

  pointFirst(): Point {
    return this.segmentFirst().pfirst();
  }

  pointLast(): Point {
    return this.segmentLast().plast();
  }

  length(): number {
    return this.segments.length;
  }

  // Reverses the order of points
  flip(): Path {
    const flipped = new Path();
    for (var i = this.length() - 1; i >= 0; i--) {
      flipped.addSegment(this.segments[i].flip());
    }
    return flipped;
  }

  copy(): Path {
    const c = new Path();
    // Adding all the segments
    c.addSegments(this.segments);
    return c;
  }

  // Should throw error if one of the two paths are closed?
  joinPath(p: Path, includeStart: boolean = true): Path {
    const joined = this.copy();
    if (includeStart) {
      joined.addSegment(new Segment([p.pointFirst()]));
    }
    joined.addSegments(p.segments.slice(1));
    return joined;
  }

  // -- Drawing methods -- //

  close() {
    this.closed = true;
  }

  lineTo(p: Point) {
    this.segments.push(new Segment([p]));
  }

  curveTo(p: Point, q: Point, r: Point) {
    this.segments.push(new Segment([p, q, r]));
  }

  // -- Geometry methods -- //

  translate(t: Point): Path {
    const path = new Path();
    this.segments.forEach((segment) => {
      path.addSegment(segment.translate(t));
    });
    return path;
  }

  scale(s: Point, o: Point = new Point(0, 0)): Path {
    const path = new Path();
    this.segments.forEach((segment) => {
      path.addSegment(segment.scale(s, o));
    });
    return path;
  }
}
