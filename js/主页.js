let container = document.getElementsByClassName("container")[0];
let container2 = document.getElementsByClassName("container2")[0];
//nav
let cityname = document.getElementById("cityname");
//第一栏天气信息
let air = document.getElementById("til");
let airqua = document.getElementById("value");
let temperature = document.getElementsByClassName("temp")[0];
let weather0 = document.getElementsByClassName("weather0")[0];
let weadetail = document.getElementsByClassName("wea-detail")[0];
let saying = document.getElementsByClassName("little-trick")[0];
//第二栏
let temp2 = document.getElementsByClassName("temprature");
let weather2 = document.getElementsByClassName("weather");
let logo = document.getElementsByClassName("logo");
//第三栏
let txttime = document.getElementsByClassName("txt-time");
let txtdegree = document.getElementsByClassName("txt-degree");
let hourwea = document.getElementById("hour-weather");
let houricon = hourwea.getElementsByClassName("icon");

//第四栏

let days = document.getElementsByClassName("day");
let dates = document.getElementsByClassName("date");
let ctday = document.getElementsByClassName("ct-daytime")[0];
let weathers1 = ctday.getElementsByClassName("weather");
let myDate = new Date();
let myhour = myDate.getHours();//获取当前小时数
let wind = document.getElementsByClassName("wind");
let lswea = document.getElementById("ls-days");
let lsicon = lswea.getElementsByClassName("icon");

//第五栏
let content = document.getElementsByClassName("content");
let title = document.getElementsByClassName("title");


//搜索页面

//搜索栏
let sousuoyemian = document.getElementsByClassName("sousuoyemian")[0];
let topnav = document.getElementsByClassName("topnav")[0];
let return0 = document.getElementById("return0");
let sousuo = document.getElementById("suosou");
let dangqianP = document.getElementsByClassName("dangqianP")[0];
let sousuoimg = document.getElementById("sousuoimg");
let lishi = document.getElementsByClassName("lishisousuo")[0];
let searchres0 = document.getElementsByClassName("searchres")[0];
let searchres = document.getElementsByClassName("searchres")[0];
let remensities = document.getElementsByClassName("remencities");
let his = document.getElementsByClassName("history");
function airqu(air) {
  let airquality;
  if (air > 0 && air <= 50) {
    airquality = "优";
  } else if (air <= 100) {
    airquality = "良";
  } else if (air <= 150) {
    airquality = "轻度污染";
  } else if (air <= 200) {
    airquality = "中度污染";
  } else if (air <= 300) {
    airquality = "重度污染";
  } else if (air <= 500) {
    airquality = "严重污染";
  }
  return airquality;
}
function weatherpic(weather) {
  let pic0;
  if (weather == "yu") {
    pic0 = encodeURIComponent("../images/day/yu.png");
  } else if (weather == "yin") {
    pic0 = encodeURIComponent("../images/day/yin.png");
    ;
  } else if (weather == "yun") {
    pic0 = encodeURIComponent("../images/day/yun.png");
    ;
  } else if (weather == "qing") {
    pic0 = encodeURIComponent("../images/day/qing.png");
    ;
  }
  return pic0;
}
function imgpic(weatherimg) {
  if (weatherimg == "晴") {
    return "qing";
  } else if (weatherimg == "多云") {
    return "yun";
  } else if (weatherimg == "雨") {
    return "yu";
  } else if (weatherimg == "阴") {
    return "yin"
  }

}



async function start0(str) {
  res0 = await fetch(
    "https://v0.yiketianqi.com/free/day?appid=55235952&appsecret=94jjkd54&city=" + str,
    {
      method: "get",
    }
  );
  data0 = await res0.json();

  res1 = await fetch(
    "https://www.yiketianqi.com/free/week?appid=55235952&appsecret=94jjkd54&cityid=" + data0.cityid,
    {
      method: "get",
    }
  );
  data1 = await res1.json();

  //第一栏天气信息

  cityname.innerHTML = data0.city;
  air.innerHTML = data0.air;
  airqua.innerHTML = airqu(data0.air);
  temperature.innerHTML = data0.tem + "°";
  weather0.innerHTML = data0.wea;
  weadetail.innerHTML = data0.win + "&nbsp" + data0.win_speed;
  // saying.innerHTML = data2.daily[5].text;

  console.log(data0)
  console.log(data1)
  // console.log(data4);
  console.log(myDate.getDay());

  //第二栏今明两天天气
  temp2[0].innerHTML = data1.data[0].tem_day + "/" + data1.data[0].tem_night + "°";
  temp2[1].innerHTML = data1.data[1].tem_day + "/" + data1.data[1].tem_night + "°";
  weather2[0].innerHTML = data1.data[0].wea;
  weather2[1].innerHTML = data1.data[1].wea;
  logo[0].src = weatherpic(data1.data[0].wea_img);
  logo[1].src = weatherpic(data1.data[1].wea_img);




  //第三栏逐小时天气预报
  start1(data0);
  //第五栏天气指数
  start2(data0);
  //第四栏7天天气情况
  for (let i = 4; i < 7; i++) {
    if ((myDate.getDay() + i - 1) % 7 == 0) {
      days[i].innerHTML = "周日";
    } else if ((myDate.getDay() + i - 1) % 7 == 1) {
      days[i].innerHTML = "周一";
    } else if ((myDate.getDay() + i - 1) % 7 == 2) {
      days[i].innerHTML = "周二";
    } else if ((myDate.getDay() + i - 1) % 7 == 3) {
      days[i].innerHTML = "周三";
    } else if ((myDate.getDay() + i - 1) % 7 == 4) {
      days[i].innerHTML = "周四";
    } else if ((myDate.getDay() + i - 1) % 7 == 5) {
      days[i].innerHTML = "周五";
    } else if ((myDate.getDay() + i - 1) % 7 == 6) {
      days[i].innerHTML = "周六";
    }
  }


  for (let i = 0; i < 7; i++) {
    wind[i * 2].innerHTML = String(data1.data[i].win);
    wind[i * 2 + 1].innerHTML = data1.data[i].win_speed;
    lsicon[i].src = weatherpic(data1.data[i].wea_img)
    dates[i + 2].innerHTML = data1.data[i].date.match(/2023-(\S*)/)[1];
  }
}
//天气字符处理
function strfind(str) {
  let ind1 = str.indexOf("市");
  let ind2 = str.indexOf(" ");
  if (ind1 == str.length - 1) {
    return str.slice(ind2 + 1, ind1);
  } else {
    return str.slice(0, ind1);
  }
}
async function start1(data0) {
  res3 = await fetch(
    "https://devapi.qweather.com/v7/weather/24h?location=" + data0.cityid + "&key=6e5a51389e4f4ed294d6e34cf66ff8fc",
    {
      method: "get",
    }
  );
  data3 = await res3.json();
  //第三栏逐小时天气预报
  console.log(data3);
  for (let i = 0; i < 10; i++) {
    houricon[i].innerHTML = data3.hourly[i].text;
    if (myhour + i < 10) {
      txttime[i].innerHTML = "0" + String(myhour + i) + ":00";
    } else {
      txttime[i].innerHTML = String(myhour + i) + ":00";
    }

    txtdegree[i].innerHTML = data3.hourly[myhour + i].temp + "°";
  }
}

async function start2(data0) {
  res2 = await fetch(
    "https://devapi.qweather.com/v7/indices/1d?type=3,13,9,2,1,16,4,6,8&location=" + data0.cityid + "&key=6e5a51389e4f4ed294d6e34cf66ff8fc",
    {
      method: "get",
    }
  );
  data2 = await res2.json();
  //第五栏天气指数
  content[0].innerHTML = data2.daily[2].category;
  content[1].innerHTML = data2.daily[7].category;
  content[2].innerHTML = data2.daily[6].category;
  content[3].innerHTML = data2.daily[1].category;
  content[4].innerHTML = data2.daily[0].category;
  content[5].innerHTML = data2.daily[8].category;
  content[6].innerHTML = data2.daily[3].category;
  content[7].innerHTML = data2.daily[4].category;
}

async function startsearch() {
  res0 = await fetch(
    "https://v0.yiketianqi.com/free/day?appid=55235952&appsecret=94jjkd54&city=",
    {
      method: "get",
    }
  );
  data0 = await res0.json();
  dangqianP.innerHTML = data0.city;
  res10 = await fetch(
    "https://www.mxnzp.com/api/address/list?app_id=kkkommknqn1fgsvt&app_secret=YzRRM25wWXBRejgvQTRrRkp3N0xyQT09",
    {
      method: "get",
    }
  );
  data10 = await res10.json();
  console.log(data10);



}

async function startsearch2() {
  res1 = await fetch(
    "https://www.mxnzp.com/api/address/search?type=1&value=" + sousuo.value + "&app_id=kkkommknqn1fgsvt&app_secret=YzRRM25wWXBRejgvQTRrRkp3N0xyQT09",
    {
      method: "get",
    }
  );
  data1 = await res1.json();
  console.log(data1);
  if (data1.data.length == 0) {
    alert("没有相关城市信息");
  } else {
    searchres0.style.display = "block";
    searchres.innerHTML = data1.data[0].name + " " + data1.data[0].pchilds[0].name;

  }


}

cityname.onclick = function () {
  container.style.display = "none";
  container2.style.display = "block";
  sousuoyemian.style.display = "block"
  sousuoyemian.style.display = "flex"
  searchres0.style.display = "none";
  startsearch();

}

return0.onclick = function () {
  container.style.display = "block";
  container2.style.display = "none";
  searchres0.style.display = "none";
  sousuo.value = null;
}
//防抖
function debounce(fn, delay = 500) {
  // timer 是在闭包中的
  let timer = null;

  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      //fn.apply(this, arguments)
      fn()
      timer = null
    }, delay)
  }
}

let count = 0;
sousuoimg.addEventListener('click', debounce(function () {
  sousuoyemian.style.display = "none";
  // searchres0.style.display="block";
  startsearch2();
  if (count == 0) {
    his[0].style.display = "block";
    count++;
    his[0].innerHTML = sousuo.value;
  } else {
    let his0 = document.getElementsByClassName("history");
    if (count < 3) {
      let his = document.createElement("a");
      his.className = "history";
      lishi.insertAdjacentElement("afterend", his);
      count++;
      his.innerHTML = sousuo.value;
      his.onclick = function () {
        container.style.display = "block";
        container2.style.display = "none";
        searchres0.style.display = "none";
        sousuo.value = null;
        start0(his.innerHTML);
      }
    } else {
      his0[2].innerHTML = his0[1].innerHTML;
      his0[1].innerHTML = his0[0].innerHTML;
      his0[0].innerHTML = sousuo.value;

      his.onclick = function () {
        container.style.display = "block";
        container2.style.display = "none";
        searchres0.style.display = "none";
        sousuo.value = null;
        start0(his.innerHTML);
      }
    }
  }
}, 600))


dangqianP.onclick = function () {
  container.style.display = "block";
  container2.style.display = "none";
  searchres0.style.display = "none";
  sousuo.value = null;
  start0(dangqianP.innerHTML);
}

searchres.onclick = function () {
  container.style.display = "block";
  container2.style.display = "none";
  searchres0.style.display = "none";
  sousuo.value = null;
  start0(strfind(searchres.innerHTML));
}

for (let i = 0; i < his.length; i++) {
  his[i].onclick = function () {
    container.style.display = "block";
    container2.style.display = "none";
    searchres0.style.display = "none";
    sousuo.value = null;
    start0(his[i].innerHTML);
  }
}

for (let i = 0; i < 12; i++) {
  remensities[i].onclick = function () {
    container.style.display = "block";
    container2.style.display = "none";
    searchres0.style.display = "none";
    sousuo.value = null;
    start0(str = remensities[i].innerHTML);
  }
}
start0(str = "");
