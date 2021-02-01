
// 給与所得入力によって、給与所得控除を決定
function inputKyuuyo(kyuuyo){
  const ksk = calcKyuuyoShotokuKoujo(kyuuyo);
  document.getElementById("給与所得控除").value=ksk;

  document.getElementById("総所得金額").value=(kyuuyo - ksk);
}
function calcKyuuyoShotokuKoujo(kyuuyo){
  if(kyuuyo < 0){
    return NaN;
  }else if(kyuuyo < 1625000){
    return Math.min(kyuuyo,550000);
  }else if (kyuuyo < 1800000) {
    return Math.floor(kyuuyo*0.4 - 100000);
  }else if (kyuuyo < 3600000) {
    return Math.floor(kyuuyo*0.3 + 80000);
  }else if (kyuuyo < 6600000) {
    return Math.floor(kyuuyo*0.2 + 440000);
  }else if (kyuuyo < 8500000) {
    return Math.floor(kyuuyo*0.1 + 1100000);
  }else{
    return 1950000;
  }
}
