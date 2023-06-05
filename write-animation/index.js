const animate = new Vivus("text", {
  type: "delayed",
  duration: 200,
  animTimingFunction: Vivus.EASE_OUT,
  start: "manual",
});

$(window).on("load", function () {
  $("#splash").delay(1500).fadeOut("slow"); //ローディング画面を1.5秒（1500ms）待機してからフェイドアウト
  $("#splash_logo").delay(1500).fadeOut("slow"); //ロゴを1.5秒（1500ms）待機してからフェイドアウト
  animate.play(); //SVGアニメーションの実行
});
