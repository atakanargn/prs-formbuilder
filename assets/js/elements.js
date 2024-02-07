let select_type = document.getElementById("form_element_type");
let select_element = document.getElementById("form_element_name");
var latestPos = -1;

document.addEventListener("DOMContentLoaded", () => {
    select_type.value = "-1";
    select_type.setAttribute("disabled", "")
    select_element.value = "-1";
});

function selectType(val, type) {

    switch (type) {
        case "element":
            switch (val) {
                case "input":
                    select_type.innerHTML = "";
                    let options = ["-1", "checkbox", "color", "date", "datetime", "email", "file", "hidden", "number", "password", "radio", "range", "tel", "text", "time"];
                    for (var i = 0; i < options.length; i++) {
                        var option = document.createElement('option');
                        if (options[i] == "-1") {
                            option.text = "-- Tip seçin --";
                            option.value = options[i];
                            option.setAttribute("selected", "");
                        } else {
                            option.text = options[i];
                            option.value = options[i];
                        }
                        select_type.add(option);
                    }
                    select_type.removeAttribute("disabled");
                    break;
                case "-1":
                    select_type.innerHTML = "";
                    var option = document.createElement('option');
                    option.text = "-- Element Seçin --";
                    option.value = "-1";
                    select_type.add(option);
                    select_type.setAttribute("disabled", "");
                    select_type.value = "-1";
                    break;
                default:
                    select_type.innerHTML = "";
                    var option = document.createElement('option');
                    option.text = "-- Bu element için tip yok --";
                    option.value = "-1";
                    select_type.add(option);
                    select_type.setAttribute("disabled", "");
                    select_type.value = "-1";
                    break;
            }
            break;
        case "type":
            switch (val) {
                case "checkbox":
                    // default value : checked/unchecked
                    // label
                    // checkbox text
                    break;
                case "color":

                    break;
                case "date":

                    break;
                case "datetime":

                    break;
                case "email":

                    break;
                case "file":

                    break;
                case "hidden":

                    break;
                case "number":

                    break;
                case "password":

                    break;
                case "radio":

                    break;
                case "range":

                    break;
                case "tel":

                    break;
                case "text":

                    break;
                case "time":

                    break;
            }
            break;
    }
}

function addToTemplate(element) {
    let inputText = document.getElementById("element_template");
    let afterText = inputText.value.substring(latestPos.start);
    let newText = inputText.value.substring(0, latestPos.start) + element + afterText;
    inputText.value = newText;
}

function templateCursorPos(elem) {
    latestPos = getCursorPos(elem);
}

function renderTemplate() {
    var css = document.getElementById("element_template_css").value;
    var body = document.getElementById("element_template").value;
    var js = document.getElementById("element_template_js").value;
    document.getElementById("element_preview").setAttribute("srcdoc", `<html>
    <head>
        <style>${css}</style>
    </head>
    <body>
        ${body}
        <script>${js}</script>
    </body>
</html>`);
}

