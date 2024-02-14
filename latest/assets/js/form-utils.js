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

function roundToTen(deger,min,max,step) {
    var yuvarlanmisDeger = Math.round(deger / step) * step;
    
    if (deger < min) {
        return min;
    } else if (deger > max) {
        return max;
    } else {
        return yuvarlanmisDeger;
    }
}