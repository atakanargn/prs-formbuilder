let select_type = document.getElementById("form_element_type");
let select_element = document.getElementById("form_element_name");
var latestPos = -1;

let TEMPLATE_VARS = [
    { "name": "Element ID", "template": "{{ID}}" },
    { "name": "Etiket", "template": "{{LABEL}}" },
    { "name": "Varsayılan", "template": "{{VALUE}}" },
    { "name": "Placeholder", "template": "{{PLACEHOLDER}}" },
    { "name": "Minimum", "template": "{{MIN}}" },
    { "name": "Maximum", "template": "{{MAX}}" },
    { "name": "Genişlik", "template": "{{WIDTH}}" },
    { "name": "Attr", "template": "{{ATTR}}" },
    { "name": "Yardım Kutucuğu", "template": "{{HELP_TEXT}}" }
];

document.addEventListener("DOMContentLoaded", () => {
    select_type.value = "-1";
    select_type.setAttribute("disabled", "")
    select_element.value = "-1";
    // startup();
});

function selectType(val, type) {

    switch (type) {
        case "element":
            switch (val) {
                case "input":
                    select_type.innerHTML = "";
                    let options = ["-1",
                        "checkbox",
                        "date",
                        "datetime", "email", "file", "hidden",
                        "number", "password", "radio", "range",
                        "tel", "text", "time"];
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
                    startup();
                    break;
                default:
                    select_type.innerHTML = "";
                    var option = document.createElement('option');
                    option.text = "-- Bu element için tip yok --";
                    option.value = "-1";
                    select_type.add(option);
                    select_type.setAttribute("disabled", "");
                    select_type.value = "-1";
                    startup();
                    break;
            }
            break;
        case "type":
            switch (val) {
                case "checkbox":
                    showElement("first_section");
                    showElement("fourth_section");
                    let buttons = document.getElementById("template_usable").getElementsByTagName("button");
                    TEMPLATE_VARS = [
                        { "name": "ID", "template": "{{ID}}" },
                        { "name": "Etiket", "template": "{{LABEL}}" },
                        { "name": "Varsayılan", "template": "{{VALUE}}" },
                        { "name": "Class", "template": "{{CLASS}}" },
                        { "name": "Genişlik", "template": "{{WIDTH}}" },
                        { "name": "Attr", "template": "{{ATTR}}" },
                        { "name": "Yardım Kutucuğu", "template": "{{HELP_TEXT}}" }
                    ];
                    renderVariables();
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
    let afterText = inputText.value.substring(latestPos);
    let newText = inputText.value.substring(0, latestPos) + element + afterText;
    inputText.value = newText;
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

document.getElementById("element_template").addEventListener("input", () => {
    latestPos = document.getElementById("element_template").selectionStart;
});

document.getElementById("element_template").addEventListener("click", () => {
    latestPos = document.getElementById("element_template").selectionStart;
});

document.getElementById("element_template").addEventListener("blur", () => {
    latestPos = document.getElementById("element_template").selectionStart;
});


function renderVariables() {
    document.getElementById("template_usable").innerHTML = "";

    for (let i = 0; i < TEMPLATE_VARS.length; i++) {
        document.getElementById("template_usable").innerHTML = document.getElementById("template_usable").innerHTML +
            `<button
        type="button"
        class="btn btn-primary m-1"
        onclick="addToTemplate('${TEMPLATE_VARS[i]['template']}');"
      >
        ${TEMPLATE_VARS[i]['name']}<br/>${TEMPLATE_VARS[i]['template']}
      </button>`;
    }
}

function validationState(elem) {
    let state = document.getElementById("validation_checkbox").checked;
    if (state) {
        document.getElementById("validation_regex").removeAttribute("disabled");
        document.getElementById("validation_message").removeAttribute("disabled");
    } else {
        document.getElementById("validation_regex").setAttribute("disabled", "");
        document.getElementById("validation_message").setAttribute("disabled", "");
    }
}

function startup() {
    let sections = ["first_section", "second_section", "third_section", "fourth_section"]
    sections.forEach(elem => {
        hideElement(elem);
    });
}

function saveElement() {
    var form_element = {};
    const element_id = document.getElementById("element_id").value.trim();

    form_element[`${element_id.toLowerCase()}`] = {
        base: document.getElementById("form_element_name").value,
        type: document.getElementById("form_element_type").value,
        name: document.getElementById("element_name").value.trim(),
        template: document.getElementById("element_template").value,
        css: document.getElementById("element_template_css").value,
        js: document.getElementById("element_template_js").value,
        validation: document.getElementById("validation_checkbox").checked ? {
            active: document.getElementById("validation_checkbox").checked,
            regex: document.getElementById("validation_regex").value,
            message: document.getElementById("validation_message").value
        } : false,
        placeholder: document.getElementById("parameter_placeholder").checked,
        min: document.getElementById("parameter_min").checked,
        max: document.getElementById("parameter_max").checked,
        multiple: document.getElementById("parameter_multiple").checked,
        endpoint: false
    }
    return form_element;
}

