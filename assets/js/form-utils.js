function restrict_floatInput(event) {
    const regex = /^\d+(\.\d{1,2})?$/;
    const inputChar = String.fromCharCode(event.charCode);

    let dotCount = 0;
    for (var i = 0; i < event.target.value.length; i++) {
        if (event.target.value[i] === ".") {
            dotCount++;
        }
    }

    if (inputChar == "." && event.target.value.length > 0 && dotCount == 0) {

    } else if (!regex.test(inputChar)) {
        event.preventDefault();
    }
}

function roundToTen(deger, min, max, step) {
    var yuvarlanmisDeger = Math.round(deger / step) * step;

    if (deger < min) {
        return min;
    } else if (deger > max) {
        return max;
    } else {
        return yuvarlanmisDeger;
    }
}

function randomID() {
    let n = Math.floor(Date.now() / 1000);
    const codeset = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const base = codeset.length;
    const pre = 10 - ((n.toString().slice(-1)) ? parseInt(n.toString().slice(-1)) : 4);
    n = parseInt(pre.toString() + n);
    let converted = "";

    while (n > 0) {
        converted = codeset.charAt(n % base) + converted;
        n = Math.floor(n / base);
    }

    let randomStart = codeset.charAt(Math.floor(Math.random() * base));
    let randomEnd = codeset.charAt(Math.floor(Math.random() * base));

    // Başına ve sonuna iki farklı rastgele karakter ekle
    while (randomStart === randomEnd) {
        randomEnd = codeset.charAt(Math.floor(Math.random() * base));
    }

    converted = randomStart + randomEnd + converted + randomStart + randomEnd;

    return converted;
}


function replaceAll(inputString, searchValue, replaceValue) {
    return inputString.replace(new RegExp(searchValue, 'g'), replaceValue);
}

function render_curly_brackets(obj, template) {
    let new_template = template;
    Object.keys(obj).forEach((element) => {
        new_template = replaceAll(new_template, `{{${element}}}`, `${obj[`${element}`]}`);
    });
    return new_template;
}

function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Ay sıfır ile başlamalı
    const day = String(d.getDate()).padStart(2, '0'); // Gün sıfır ile başlamalı
    return `${year}-${month}-${day}`;
}