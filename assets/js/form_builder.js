let form_elements = {
    "boolean": {
        "type": "boolean",
        "template": `<div
        class="form-group component-edit pt-1 pb-2"
        id="component-edit-0"
        type="boolean"
        onclick="selectComponent(this.id);">
        <label class="form-label" >
            Boolean
        </label>
        <select class="form-select">
          <option>Evet</option>
          <option>Hayır</option>
        </select>
      </div>`
    },
    "textarea": {
        "type": "textarea",
        "template": `<div
        class="form-group component-edit pt-1 pb-2"
        id="component-edit-0"
        type="textarea"
        onclick="selectComponent(this.id);">
        <label for="input-textarea" class="form-label" >
            TextArea
        </label>
        <textarea class="form-control" id="input-textarea" rows="2"></textarea>
      </div>`
    },
    "text": {
        "type": "text",
        "template": `<div
        class="form-group component-edit pt-1 pb-2"
        id="component-edit-0"
        type="text"
        onclick="selectComponent(this.id);">
        <label for="input-text" class="form-label" >
            Metin Girdisi
        </label>
        <input type="text" class="form-control" id="input-text" />
      </div>`
    },
    "select": {
        "type": "select",
        "template": `<div
        class="form-group component-edit pt-1 pb-2"
        id="component-edit-0"
        type="select"
        onclick="selectComponent(this.id);">
        <label for="input-select" class="form-label" >
            <img src="./assets/img/dragdrop.svg" width="16"
            id="component-select"
            draggable="true" ondragstart="dragElement(event)"
            /> Seçim
        </label>
        <select id="input-select" class="form-select">
          <option>Seçim 1</option>
          <option>Seçim 2</option>
          <option>Seçim 3</option>
        </select>
      </div>`,

    }
};

let form_elements_;
var xhr = new XMLHttpRequest();
xhr.open('GET', "/assets/json/form_elements.json", true);
xhr.responseType = 'json';
xhr.onload = function () {
    var status = xhr.status;
    if (status === 200) {
        form_elements_ = xhr.response;
    } else {
        form_elements_ = false;
    }
};
xhr.send();

let preview_form = [addButtonGenerator(0, "first")];

let result = [];

let holder;
let preview = false;
let order, status;
let selected = null;

renderForm();

function allowDrop(event) {
    event.preventDefault();
}

function dragElement(event) {
    holder = event.srcElement.id.replaceAll("component-", "");
}

function addButtonGenerator(id, position) {
    return `<div class="col d-grid gap-2 add-button add-button-${position}"
    id="button-${id}"
    ondrop="dropElement(event)"
    ondragover="dragOver(event,this.id)"
    ondragleave="dragLeave(this.id)"
    status="${position}">
        -- EKLE --
    </div>`;
}

function formElementRender(type) {
    eval(form_elements_[type]["setup"].join(""));
    return `<div
    class="form-group component-edit pt-1 pb-2"
    id="component-edit-0"
    type="boolean"
    onclick="selectComponent(this.id);">
    <label class="form-label" >
        Boolean
    </label>
    ${template.outerHTML}
    </div>`;
}

function dropElement(event) {
    event.preventDefault();
    document.getElementById("preview-form").classList.remove("bg-secondary");
    switch (status) {
        case "first":
            if (preview_form.length == 1) {
                preview_form.splice(order + 1, 0, addButtonGenerator(preview_form.length, "last"));
            } else {
                preview_form.splice(order + 1, 0, addButtonGenerator(preview_form.length, "middle"));
            }

            preview_form.splice(order + 1, 0, form_elements[holder]["template"]);
            break;
        case "middle":
            preview_form.splice(order, 0, form_elements[holder]["template"]);
            preview_form.splice(order, 0, addButtonGenerator(preview_form.length, "middle"));
            break;
        case "last":
            preview_form.splice(order, 0, form_elements[holder]["template"]);
            preview_form.splice(order, 0, addButtonGenerator(preview_form.length, "middle"));

            break;
    }
    renderForm();
    holder = "";
    preview = false;
}

function dragOver(event, id) {
    event.preventDefault();
    if (preview) return;
    status = document.getElementById(event.target.id).getAttribute("status");
    order = event.target.id.split("-")[1];
    document.getElementById(id).innerHTML = form_elements[holder]["template"];
    document.getElementById(id).classList.remove("add-button");
    preview = true;
}

function dragLeave(id) {
    document.getElementById(id).classList.add("add-button");
    document.getElementById(id).innerHTML = "--EKLE--";
    renderForm();
    preview = false;
}

function renderForm() {
    let selected_ok = false;
    for (let i = 0; i < preview_form.length; i++) {
        let buttonRegex = /button-(\d+)/;
        let compRegex = /component-edit-(\d+)/;
        preview_form[i] = preview_form[i].replace(buttonRegex, `button-${i}`);
        preview_form[i] = preview_form[i].replace(compRegex, `component-edit-${i}`);
        console.log(selected, i)
        if (selected == i)
            selected_ok = true;
    }

    if (preview_form.length == 1) {
        preview_form[0] = preview_form[0].replace(" add-button-first", "");
    } else {
        preview_form[0] = preview_form[0].replace("add-button", "add-button add-button-first");
    }

    document.getElementById("preview-form").innerHTML = preview_form.join("");

    if (selected_ok)
        document.getElementById(`component-edit-${selected}`).classList.add("bg-info");
}

function selectComponent(id) {
    selected = id.split("-")[2];

    renderForm();
}