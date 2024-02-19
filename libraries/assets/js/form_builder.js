var form_elements;
get_form_elements("./assets/json/form_elements.json");

let preview_form = [addButtonGenerator(0, "first")];

let result = [];

let holder;
let preview = false;
let order, status;
let selected = null;

let test = {
    "boolean": {
      "type": "boolean",
      "builder_template": `<div class="row">
      <div class="col component m-1">
        <div class="form-group mt-2 mb-2 p-0">
          <label for="input-boolean" class="form-label" >
              <img src="./assets/img/dragdrop.svg" width="16"
              id="component-boolean"
              draggable="true" ondragstart="dragElement(event)"
              /> Boolean
          </label>
          <select class="form-select" id="input-boolean">
            <option>Evet</option>
            <option>Hayır</option>
          </select>
        </div>
      </div>
    </div>`
    },
    "textarea": {
      "type": "textarea",
      "builder_template": `<div class="row">
      <div class="col component m-1">
        <div class="form-group mt-2 mb-2 p-0">
          <label for="input-textarea" class="form-label" >
              <img src="./assets/img/dragdrop.svg" width="16"
              id="component-textarea"
              draggable="true" ondragstart="dragElement(event)"
              /> TextArea
          </label>
          <textarea class="form-control" id="input-textarea" rows="2"></textarea>
        </div>
      </div>
    </div>`,
    "preview_template":`<div class="component-edit m-1">
      <div class="form-group mt-2 mb-2 p-0">
        <label for="input-textarea" class="form-label" >
            <img src="./assets/img/dragdrop.svg" width="16"
            id="component-textarea"
            draggable="true" ondragstart="dragElement(event)"
            /> TextArea
        </label>
        <textarea class="form-control" id="input-textarea" rows="2"></textarea>
      </div>
    </div>`
    },
    "text": {
      "type": "text",
      "builder_template": `<div class="row">
      <div class="col component m-1">
        <div class="form-group mt-2 mb-2 p-0">
          <img src="./assets/img/dragdrop.svg" width="16"
              id="component-text"
              draggable="true" ondragstart="dragElement(event)"
              />
          <label for="input-text" class="form-label" >
               Metin Girdisi  
          </label>
          <input type="text" class="form-control" id="input-text" />
        </div>
      </div>
    </div>`
    },
    "select": {
      "type": "select",
      "builder_template": `<div class="row">
      <div class="col component m-1">
        <div class="form-group mt-2 mb-2 p-0">
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
        </div>
      </div>
    </div>`
    }
  }
  
  

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

            preview_form.splice(order + 1, 0, form_elements[holder]["preview_template"]);
            break;
        case "middle":
            preview_form.splice(order, 0, form_elements[holder]["preview_template"]);
            preview_form.splice(order, 0, addButtonGenerator(preview_form.length, "middle"));
            break;
        case "last":
            preview_form.splice(order, 0, form_elements[holder]["preview_template"]);
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
    document.getElementById(id).innerHTML = form_elements[holder]["preview_template"];
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

function get_form_elements(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            form_elements = xhr.response;
            render_form_elements();
        } else {
            form_elements = false;
        }
    };
    xhr.send();
}

function render_form_elements() {
    Object.keys(form_elements).forEach(key => {
        document.getElementById("form_elements").innerHTML = document.getElementById("form_elements").innerHTML + `${form_elements[key]['builder_template']}`
    });
}