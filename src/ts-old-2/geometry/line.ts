import paper from "paper";

export class Line {
  a: number;
  b: number;
  c: number;

  constructor(a: number, b: number, c: number) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  p_from_x(x: number): paper.Point {
    if (this.b == 0) {
      throw new Error(
        "Line is vertical! The line doesn't pass there or you get infinite points"
      );
    }
    //
    else {
      return new paper.Point(x, -(this.a * x + this.c) / this.b);
    }
  }

  p_from_y(y: number): paper.Point {
    if (this.a == 0) {
      throw new Error(
        "Line is horizontal! The line doesn't pass there or you get infinite points"
      );
    }
    //
    else {
      return new paper.Point(-(this.b * y + this.c) / this.a, y);
    }
  }

  get m(): number {
    if (this.b == 0) {
      throw new Error("Line is vertical, M is infinity");
    }
    //
    else {
      return -this.a / this.b;
    }
  }

  get q(): number {
    if (this.b == 0) {
      throw new Error("Line is vertical, there's no Q");
    }
    //
    else {
      return -this.c / this.b;
    }
  }

  intersect(line: Line): paper.Point {
    // See https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
    const a = this.b * line.c - line.b * this.c;
    const b = line.a * this.c - this.a * line.c;
    const c = this.a * line.b - line.a * this.b;
    if (c == 0) {
      throw new Error("Lines do not intersect!");
    }
    //
    else {
      return new paper.Point(a / c, b / c);
    }
  }
}

function radians(a: number): number {
  return (a / 180) * Math.PI;
}

function q_from_p_m(p: paper.Point, m: number): number {
  return p.y - m * p.x;
}

function line_from_p_m(p: paper.Point, m: number): Line {
  return new Line(-m, 1, -q_from_p_m(p, m));
}

export function line_from_p_a(p: paper.Point, a: number): Line {
  // Must have (a != 0) cause (0 % 90 == 0)
  if (a != 0 && a % 90 == 0) {
    return new Line(1, 0, -p.x);
  }
  //
  else {
    return line_from_p_m(p, Math.tan(radians(a)));
  }
}
