import Point from "./point";
import Segment from "./segment";
import { strokeWaveTck } from "./tiles/wave";

// Point

const p1 = new Point(100, 100);
const p2 = new Point(200, 200);
const p3 = new Point(300, 100);

// Point test

// console.log("Sum test");
// console.log(p1.add(p2));

// console.log("Sub test");
// console.log(p1.sub(p2));

// console.log("smult");
// console.log(p1.smult(2));

// console.log("sdiv");
// console.log(p1.sdiv(2));

// console.log("interpolate");
// console.log(p1.interpolate(p2, 0.5));

// console.log("pmult");
// console.log(p2.pmult(new Point(2, -2)));

// console.log("pdiv");
// console.log(p2.pdiv(new Point(2, -2)));

// Segment

const s1 = new Segment([p1, p2, p3]);

// console.log("segment");
// console.log(s1);

// console.log("length");
// console.log(s1.length());

// console.log("first");
// console.log(s1.pfirst());

// console.log("last");
// console.log(s1.plast());

// console.log("translate");
// console.log(s1.translate(p1));

// console.log("translate - negative");
// console.log(s1.translate(new Point(10, -10)));

// console.log("scale");
// console.log(s1.scale(new Point(0.5, -0.5), new Point(200, 150)));

// console.log("flipped");
// console.log(s1.flip());

// Strokewave

const sw = strokeWaveTck(new Point(0, 0), -100, 200, 0.5, 50);
