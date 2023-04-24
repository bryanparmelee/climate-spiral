let data;
let months;

function preload() {
  data = loadTable("./giss-data-042323.csv", "csv", "header");
}

function setup() {
  createCanvas(600, 600);

  months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let row = data.getRow(0);
  // console.log(row.get("Year"));
  // console.log(row.get("Jan"));
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  stroke(255);
  strokeWeight(2);
  noFill();
  circle(0, 0, 100);
  fill(255);
  noStroke();
  text("0°", 64, 0);

  stroke(255);
  strokeWeight(2);
  noFill();
  circle(0, 0, 300);
  fill(255);
  noStroke();
  text("1°", 164, 0);

  stroke(255);
  strokeWeight(2);
  noFill();
  circle(0, 0, 500);

  for (let i = 0; i < months.length; i++) {
    noStroke();
    fill(255);
    textAlign(CENTER);
    textSize(24);
    let angle = map(i, 0, months.length, 0, TWO_PI);
    push();
    let x = 264 * cos(angle);
    let y = 264 * sin(angle);
    translate(x, y);
    rotate(angle + PI / 2);
    text(months[i], 0, 0);
    pop();
  }
}
