
//一番大事な関数
//TODO
function calculate() {
  const souShotoku = document.getElementById("総所得金額").value -0;
  calculateShotokuzei(souShotoku);
  calculateJuuminzei(souShotoku);
}
function calculateShotokuzei(souShotoku){
  const shakaiKoujo = document.getElementById("社会保険料控除").value -0;
  const huyouKoujo_shotoku = document.getElementById("扶養控除-所得税").value -0;
  const haiguushaKoujo_shotoku = document.getElementById("配偶者控除-所得税").value -0;

  let kazeiShotoku_shotoku = souShotoku;
  //控除していく
  kazeiShotoku_shotoku -= shakaiKoujo;
  kazeiShotoku_shotoku -= huyouKoujo_shotoku;
  kazeiShotoku_shotoku -= haiguushaKoujo_shotoku;

  kazeiShotoku_shotoku = Math.max(0,kazeiShotoku_shotoku); //マイナスチェック
  const kisoKoujo_shotoku = Math.min(kazeiShotoku_shotoku,480000);
  document.getElementById("基礎控除-所得税").value = kisoKoujo_shotoku;
  kazeiShotoku_shotoku -= kisoKoujo_shotoku;
  kazeiShotoku_shotoku = Math.floor(kazeiShotoku_shotoku/1000)*1000//1000未満切り捨て
  document.getElementById("課税所得-所得税").value = kazeiShotoku_shotoku;

  const shotokuzei = shotokuzeiwomotomeru(kazeiShotoku_shotoku);
  const hukkouTokubetsuShotokuzei = Math.floor(shotokuzei * 0.021);
  const sumShotokuzei = Math.floor((shotokuzei + hukkouTokubetsuShotokuzei) /100) * 100;
  document.getElementById("所得税").value = shotokuzei;
  document.getElementById("復興特別所得税").value = hukkouTokubetsuShotokuzei;
  document.getElementById("所得税・復興特別所得税").value = sumShotokuzei;
}
function shotokuzeiwomotomeru(kazeishotoku) {
    if(kazeishotoku < 1950000){
      return Math.floor(kazeishotoku*0.05);
    }else if(kazeishotoku < 3300000){
      return Math.floor(kazeishotoku*0.1) - 97500;
    }else if(kazeishotoku < 6950000){
      return Math.floor(kazeishotoku*0.2) - 427500;
    }else if(kazeishotoku < 9000000){
      return Math.floor(kazeishotoku*0.23) - 636000;
    }else if(kazeishotoku < 18000000){
      return Math.floor(kazeishotoku*0.33) - 1536000;
    }else if(kazeishotoku < 40000000){
      return Math.floor(kazeishotoku*0.40) - 2796000;
    }else {
      return Math.floor(kazeishotoku*0.45) - 4796000;
    }
}
function calculateJuuminzei(souShotoku) {
  const shakaiKoujo = document.getElementById("社会保険料控除").value -0;
  const huyouKoujo_juumin = document.getElementById("扶養控除-住民税").value -0;
  const haiguushaKoujo_juumin = document.getElementById("配偶者控除-住民税").value -0;

  let kazeiShotoku_juumin = souShotoku;
  //控除していく
  kazeiShotoku_juumin -= shakaiKoujo;
  kazeiShotoku_juumin -= huyouKoujo_juumin;
  kazeiShotoku_juumin -= haiguushaKoujo_juumin;

  kazeiShotoku_juumin = Math.max(0,kazeiShotoku_juumin); //マイナスチェック
  const kisoKoujo_juumin = Math.min(kazeiShotoku_juumin,430000);
  document.getElementById("基礎控除-住民税").value = kisoKoujo_juumin;
  kazeiShotoku_juumin -= kisoKoujo_juumin;
  kazeiShotoku_juumin = Math.floor(kazeiShotoku_juumin/1000)*1000;//1000未満切り捨て
  document.getElementById("課税所得-住民税").value = kazeiShotoku_juumin;

  const juuminzei = Math.floor(kazeiShotoku_juumin * 0.1) + 2500;
  document.getElementById("住民税").value = juuminzei;

}
// 給与所得入力によって、給与所得控除を決定
function inputKyuuyo(){
  const salary = document.getElementById("給与収入").value;
  const ksk = calcKyuuyoShotokuKoujo(salary);
  document.getElementById("給与所得控除").value = ksk;
  const souShotoku = salary - ksk;
  document.getElementById("総所得金額").value = souShotoku;

  const kousei = calcKousei(salary);
  document.getElementById("厚生年金保険料控除").value = kousei;
  const kenkou = calcMiyagiKenkou(salary);
  document.getElementById("健康保険料控除").value = kenkou;
  const koyou = calcKoyou(salary);
  document.getElementById("雇用保険料控除").value = koyou;
  const shakaikoujo = kousei + kenkou + koyou;
  document.getElementById("社会保険料控除").value = shakaikoujo;
}

function calcKyuuyoShotokuKoujo(salary){
  if(salary < 0){
    return NaN;
  }else if(salary < 1625000){
    return Math.min(salary,550000);
  }else if (salary < 1800000) {
    return Math.floor(salary*0.4 - 100000);
  }else if (salary < 3600000) {
    return Math.floor(salary*0.3 + 80000);
  }else if (salary < 6600000) {
    return Math.floor(salary*0.2 + 440000);
  }else if (salary < 8500000) {
    return Math.floor(salary*0.1 + 1100000);
  }else{
    return 1950000;
  }
}
function calcKousei(salary) {
  return Math.floor(salary * 0.183 / 2);
}
function calcMiyagiKenkou(salary) {
  const salaryPerMonth = Math.floor(salary/12);//月額報酬
  let premiumPerMonth; //月額保険料
  if (salaryPerMonth < 63000) {
    premiumPerMonth = 2917;
  }else if (salaryPerMonth < 73000) {
    premiumPerMonth = 3420;
  }else if (salaryPerMonth < 83000) {
    premiumPerMonth = 3923;
  }else if (salaryPerMonth < 93000) {
    premiumPerMonth = 4426;
  }else if (salaryPerMonth < 101000) {
    premiumPerMonth = 4929;
  }else if (salaryPerMonth < 107000) {
    premiumPerMonth = 5231;
  }else if (salaryPerMonth < 114000) {
    premiumPerMonth = 5533;
  }else if (salaryPerMonth < 122000) {
    premiumPerMonth = 5935;
  }else if (salaryPerMonth < 130000) {
    premiumPerMonth = 6337;
  }else if (salaryPerMonth < 138000) {
    premiumPerMonth = 6740;
  }else if (salaryPerMonth < 146000) {
    premiumPerMonth = 7142;
  }else if (salaryPerMonth < 155000) {
    premiumPerMonth = 7545;
  }else if (salaryPerMonth < 165000) {
    premiumPerMonth = 8048;
  }else if (salaryPerMonth < 175000) {
    premiumPerMonth = 8551;
  }else if (salaryPerMonth < 185000) {
    premiumPerMonth = 9054;
  }else if (salaryPerMonth < 195000) {
    premiumPerMonth = 9557;
  }else if (salaryPerMonth < 210000) {
    premiumPerMonth = 10060;
  }else if (salaryPerMonth < 230000) {
    premiumPerMonth = 11066;
  }else if (salaryPerMonth < 250000) {
    premiumPerMonth = 12072;
  }else if (salaryPerMonth < 270000) {
    premiumPerMonth = 13078;
  }else if (salaryPerMonth < 290000) {
    premiumPerMonth = 14084;
  }else if (salaryPerMonth < 310000) {
    premiumPerMonth = 15090;
  }else if (salaryPerMonth < 330000) {
    premiumPerMonth = 16096;
  }else if (salaryPerMonth < 350000) {
    premiumPerMonth = 17102;
  }else if (salaryPerMonth < 370000) {
    premiumPerMonth = 18108;
  }else if (salaryPerMonth < 395000) {
    premiumPerMonth = 19114;
  }else if (salaryPerMonth < 425000) {
    premiumPerMonth = 20623;
  }else if (salaryPerMonth < 455000) {
    premiumPerMonth = 22132;
  }else if (salaryPerMonth < 485000) {
    premiumPerMonth = 23641;
  }else if (salaryPerMonth < 515000) {
    premiumPerMonth = 25150;
  }else if (salaryPerMonth < 545000) {
    premiumPerMonth = 26659;
  }else if (salaryPerMonth < 575000) {
    premiumPerMonth = 28168;
  }else if (salaryPerMonth < 605000) {
    premiumPerMonth = 29667;
  }else if (salaryPerMonth < 635000) {
    premiumPerMonth = 31186;
  }else if (salaryPerMonth < 665000) {
    premiumPerMonth = 32695;
  }else if (salaryPerMonth < 695000) {
    premiumPerMonth = 34204;
  }else if (salaryPerMonth < 730000) {
    premiumPerMonth = 35713;
  }else if (salaryPerMonth < 770000) {
    premiumPerMonth = 37725;
  }else if (salaryPerMonth < 810000) {
    premiumPerMonth = 39737;
  }else if (salaryPerMonth < 855000) {
    premiumPerMonth = 41749;
  }else if (salaryPerMonth < 905000) {
    premiumPerMonth = 44264;
  }else if (salaryPerMonth < 955000) {
    premiumPerMonth = 46779;
  }else if (salaryPerMonth < 1005000) {
    premiumPerMonth = 49294;
  }else if (salaryPerMonth < 1055000) {
    premiumPerMonth = 51809;
  }else if (salaryPerMonth < 1115000) {
    premiumPerMonth = 54827;
  }else if (salaryPerMonth < 1175000) {
    premiumPerMonth = 57845;
  }else if (salaryPerMonth < 1235000) {
    premiumPerMonth = 60863;
  }else if (salaryPerMonth < 1295000) {
    premiumPerMonth = 63881;
  }else if (salaryPerMonth < 1355000) {
    premiumPerMonth = 66899;
  }else {
    premiumPerMonth = 69917;
  }

  return premiumPerMonth * 12;
}
function calcKoyou(salary) {
  return Math.floor(salary * 0.003);
}
function calcHuyou() {
  const ippan = document.getElementById("huyou-ippan").value;
  const tokutei = document.getElementById("huyou-tokutei").value;
  const doukyoroushin = document.getElementById("huyou-doukyoroushin").value;
  const roujin = document.getElementById("huyou-roujin").value;

  const huyouShotoku = ippan*380000 + tokutei*630000
                        + doukyoroushin*580000 + roujin*480000;
  const huyouJuumin  = ippan*330000 + tokutei*450000
                        + doukyoroushin*450000 + roujin*380000;

  document.getElementById("扶養控除-所得税").value = huyouShotoku;
  document.getElementById("扶養控除-住民税").value = huyouJuumin;
}
//TODO
function calcHaiguusha(){
  if(document.getElementById("総所得金額").value >= 10000000){
    return;
  }

}
