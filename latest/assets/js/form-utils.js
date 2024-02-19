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
    return 'xxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function replaceAll(inputString, searchValue, replaceValue) {
    return inputString.replace(new RegExp(searchValue, 'g'), replaceValue);
  }

  function toggleHelp(id) {
    document.getElementById(`comp-helptext-${id}`).classList.toggle("show");
  }

  function render_curly_brackets(obj,template){
    let new_template = template;
    Object.keys(obj).forEach((element)=>{
        new_template = replaceAll(new_template,`{{${element}}}`,`${obj[`${element}`]}`);
    });
    return new_template;
  }