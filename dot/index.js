// import fs from "fs";

console.log("start");
const writeFileUrl = "./output/test.csv";
let result = "";
let beforeRow = 1;

const imgElement = document.querySelector("#tgt-img");
imgElement.crossOrigin = ""; // デモ用に外部から画像を取得するため

let context = null;
imgElement.onload = () => {
  console.log("onload");
  // canvas 要素に画像を描画
  const canvas = document.createElement("canvas");
  canvas.width = imgElement.width;
  canvas.height = imgElement.height;
  context = canvas.getContext("2d");
  context.drawImage(imgElement, 0, 0, imgElement.width, imgElement.height);
  // 初期化時、画像クリック時に画像中の色情報を取得する関数を実行
  const width = imgElement.width;
  const height = imgElement.height;
  console.log("width", width, "height", height);
  for (let r = 1; r < height / 10; r++) {
    for (let i = 1; i < width / 10; i++) {
      getColor(10 * i, 10 * r, r);
    }
  }
  console.log("result", result);
  imgElement.addEventListener("click", (e) => outPut());
};

function getColor(x = 1, y = 1, row) {
  console.log("getColor", x, y, row);
  // canvas 中の座標を指定して該当部の色情報を取得
  const imgData = context.getImageData(x, y, 1, 1);
  console.log("imgData", imgData);
  // 取得した情報を画面に伝達
  // document.querySelector("#xy-txt").innerText = `(${x},${y})`;
  // document.querySelector("#rgba-txt").innerText = `rgba(${imgData.data.join(
  //   ","
  // )})`;
  // document.querySelector(
  //   ".cell"
  // ).style.backgroundColor = `rgba(${imgData.data.join(",")})`;
  if (row == beforeRow) {
    result += `"rgba(${imgData.data.join(",")})",`;
  } else {
    beforeRow = row;
    result += `"rgba(${imgData.data.join(",")})"\n`;
  }
}

const writeFile = (data) => {
  try {
    fs.writeFileSync(writeFileUrl, data, "utf-8");
  } catch (err) {
    console.log(err);
  }
};

function outPut() {
  console.log("outPut");
  let blob = new Blob([result], { type: "text/csv" }); // テキスト形式でBlob定義
  let link = document.createElement("a"); // HTMLのaタグを作成
  link.href = URL.createObjectURL(blob); // aタグのhref属性を作成
  link.download = "test.csv"; // aタグのdownload属性を作成
  link.click(); // 定義したaタグをクリック（実行）
}
