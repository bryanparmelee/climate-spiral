let data;
let months;

let zeroRadius = 125;
let oneRadius = 200;

let currentRow = 0;
let currentMonth = 0;

function preload() {
  data = loadTable("./giss-data-042323.csv", "csv", "header");
}

function setup() {
  createCanvas(600, 600);

  months = [
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
    "Jan",
    "Feb",
  ];

  let row = data.getRow(0);
  // console.log(row.get("Year"));
  // console.log(row.get("Jan"));
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  textAlign(CENTER, CENTER);
  textSize(16);
  stroke(255);
  strokeWeight(2);
  noFill();
  circle(0, 0, zeroRadius * 2);
  fill(255);
  noStroke();
  text("0°", zeroRadius + 10, 0);

  stroke(255);
  strokeWeight(2);
  noFill();
  circle(0, 0, oneRadius * 2);
  fill(255);
  noStroke();
  text("1°", oneRadius + 10, 0);

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

  let year = data.getRow(currentRow).get("Year");
  textSize(35);
  text(year, 0, 0);

  beginShape();
  noFill();
  stroke(255);

  for (let j = 0; j < currentRow; j++) {
    let row = data.getRow(j);
    let totalMonths = months.length;
    if (j == currentRow - 1) {
      totalMonths = currentMonth;
    }

    for (let i = 0; i < totalMonths; i++) {
      let anomaly = row.get(months[i]);
      if (anomaly !== "***") {
        let angle = map(i, 0, months.length, 0, TWO_PI) - PI / 3;
        let r = map(anomaly, 0, 1, zeroRadius, oneRadius);

        let x = r * cos(angle);
        let y = r * sin(angle);
        vertex(x, y);
      }
    }
  }
  endShape();

  currentMonth = currentMonth + 1;
  if (currentMonth == months.length) {
    currentMonth = 0;
    currentRow = currentRow + 1;
    if (currentRow == data.getRowCount()) {
      noLoop();
    }
  }
}
