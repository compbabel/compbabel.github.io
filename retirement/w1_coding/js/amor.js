var elem_price;
var elem_rate;
var elem_downperc;
var elem_textdown;
var elem_textdown35k;
var elem_textmonthly;

function amorInit() {
    elem_price = document.getElementById("price");
    elem_rate = document.getElementById("rate");
    elem_downperc = document.getElementById("downperc");
    elem_textdown = document.getElementById("labdown");
    elem_textdown35k = document.getElementById("labdown35k");
    elem_textmonthly = document.getElementById("labmonthly");

    elem_price.value = 600;
    elem_rate.value = 2.8;
    elem_downperc.value = 18;           
    amorCalculate();
}

function amorCalculate() {
    price = getNumber(elem_price, 3) * 1000;
    rate = getNumber(elem_rate, 3) / 100.0;
    downperc = getNumber(elem_downperc, 2) / 100.0;

    downpay = (price * downperc) | 0;
    down35k = (downpay - 35000) | 0;
    monthly = amor(price - downpay, rate / 12.0);
    monthly = Math.round(monthly) | 0;

    // Create our number formatter.
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        // These options are needed to round to whole numbers if that's what you want.
        minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)            
    });

    downpay = formatter.format(downpay);
    down35k = formatter.format(down35k);
    monthly = formatter.format(monthly);

    elem_textdown.innerHTML = "Down Payment: " + downpay;
    elem_textdown35k.innerHTML = "Down - 35k: " + down35k;
    elem_textmonthly.innerHTML = "Monthly Payment: " + monthly;
}

function getNumber(elem, n) {
    v = elem.options[elem.selectedIndex].text.substring(0, n);
    return v;
}

function amor(p, i) {
    num = i * Math.pow(1.0 + i, 360);
    den = Math.pow(1.0 + i, 360) - 1.0;
    return p * num / den;
}