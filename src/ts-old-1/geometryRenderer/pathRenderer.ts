import paper from "paper";
import Path from "../geometry/path";

export default function pathRenderer(p: Path): paper.Path {
  // Creating paper path
  const ppath = new paper.Path();

  // Moving to first point
  ppath.moveTo(new paper.Point(p.pointFirst()));

  // Now we iterate on the other segments
  p.segments.slice(1).forEach((segment) => {
    // If segment has just one point, it's a line
    if (segment.length() == 1) {
      ppath.lineTo(new paper.Point(segment.pfirst()));
    }
    // If segment has three points, it's a bezier
    else if (segment.length() == 3) {
      ppath.cubicCurveTo(
        new paper.Point(segment.points[0]),
        new paper.Point(segment.points[1]),
        new paper.Point(segment.points[2])
      );
    }
    //
    else {
      console.log("Strange formatted segment:  ", segment);
    }
  });

  // Lastly, we close the path if
  if (p.closed) {
    ppath.closePath();
  }

  return ppath;
}
