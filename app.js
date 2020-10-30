
//class
//class for convert date english to date persian
class Convert{
    ConvertDate(){
        let datePersian = new Date().toLocaleDateString('fa-IR');
        var
        persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
        arabicNumbers  = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
        fixNumbers = function (str)
        {
          if(typeof str === 'string')
          {
            for(var i=0; i<10; i++)
            {
              str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
            }
          }
          return str;
        };
        let dateEnglishComplet = fixNumbers(datePersian);
        let yearsEnglish = dateEnglishComplet.slice(0 , 4);
        return yearsEnglish;
    }
}
//class for add date to input year procuct
class Add{
    Addyears(){
let ObjectConvert = new Convert();
let max = ObjectConvert.ConvertDate();
let min = max - 20;
for (let i = max; max > min; max--) {
    let year = document.querySelector("#year");
    let option = document.createElement("option");
    option.innerText = max;
    year.appendChild(option);
}
    }
}
//class for create message and show it
class Message{
    ShowMessage(err , className){
        let p = document.createElement("p");
        p.classList.add(className);
        p.innerText = err;
        console.log(p)
        result.appendChild(p);
        setTimeout(() => {
            document.querySelector(".error").remove();
        }, 3000);
    }
}
//class for canculate Insurance 
class canculate{
    canculateInsurance(make,year,level){
        let ObjectCar = new Car();
        let price = ObjectCar.CarModel(make);
        let ObjectOff = new Off();
        let off = ObjectOff. OffYears(year);
        price = price - price * ((off*3)/100);
        let ObjectLevel = new Level();
        price = ObjectLevel.CanculateLevel(level,price);
        if(make.value == 1){
            make = "پراید"
        }else if(make.value == 2){
            make = "اپتیما"
        }else if(make.value == 3){
            make = "پورشه"
        }
        if(level.value == "basic"){
            level = "ساده - شخص ثالث"
        }else if(level.value == "complete"){
            level = "کامل - شخص ثالث با بیمه بدنه"
        }
        let div = document.createElement("div");
        div.innerHTML = `
        <br>
        <p>نوع خودرو : ${make}</p>
        <p>سال ساخت : ${year.value}</p>
        <p>نوع بیمه : ${level}</p>
        <p>قیمت نهایی : ${price}</p>
        <br>
        `
        spinner.style.display = "block";
        setTimeout(() => {
        spinner.style.display = "none";
        result.appendChild(div);
        }, 3000);
    }
}
//class for canculate Insurance by type car 
class Car{
    CarModel(make){
        let price;
        let base = 2500000
        if(make.value == 1){
            price = base*1.3
        }
        else if(make.value == 2){
            price = base*1.5
        }
        else if(make.value == 3){
            price = base*1.80
        }
        return price;
    }
}
//class for canculate off 
class Off{
    OffYears(year){
        let ObjectConvert = new Convert();
        let max = ObjectConvert.ConvertDate();
        let off = max - year.value;
        return off;
    }
}
//class for canculate Insurance by type Insurance
class Level{
    CanculateLevel(level,price){
        if(level.value == "basic"){
            price = price*1.3;
        }
        else if(level.value == "complete"){
            price = price*1.5;
        }
        return price;
    }
}
// variabls
let form = document.querySelector("#request-quote");
let result = document.querySelector("#result");
let spinner = document.querySelector("#loading img");
let body = document.querySelector("body");

// addEventListeners
// addEventListeners for load page
document.addEventListener("DOMContentLoaded" , function(){
    let ObjectAdd = new Add();
    ObjectAdd.Addyears();
    let p = document.createElement("p");
        p.classList.add("present");
        p.innerText = "طراحی و اجرا توسط محمود کریمی";
        body.appendChild(p);
        setTimeout(() => {
            document.querySelector(".present").remove();
        }, 5000);
})
// addEventListeners for canculate insurance and show it
form.addEventListener("submit" , function(e){
    e.preventDefault();
    let make = document.querySelector("#make");
    let year = document.querySelector("#year");
    let level = document.querySelector("input[name ='level']:checked")
    if(make.value == ""){
        let ObjectMessage = new Message();
        ObjectMessage.ShowMessage("لطفا نوع خودرو خود را انتخاب کنید","error");
    }
    else{
        let resultDiv = document.querySelector("#result div");
        if(resultDiv !== null){
            resultDiv.remove();
        }
        let Objectcanculate = new canculate();
        Objectcanculate.canculateInsurance(make,year,level);
    }
})