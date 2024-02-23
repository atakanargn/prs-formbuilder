var form_elements = {
    spacer: {
        name: "Spacer",
        template:
            `
            <div class="form-component" id="form-component-{{id}}">
                <hr id="real-component-{{id}}" style="border:none;" />
            </div>
        `,
        editor: ["css", "class"],
        default: ""
    },
    boolean: {
        name: "Boolean",
        template:
            `
            <div class="form-component {{class}}" id="form-component-{{id}}" style="width:{{width}} !important;">
                <button id="helptext-button-{{id}}" data-hint="{{helptext}}" class="helptext-button" style="{{helptext_visible}}float:left;">?</button>
                <span id="component-required-{{id}}" class="comp-required" style="{{required}}margin-right:4px;">*</span>
                <label class="toggle">
                    <input class="toggle-checkbox" type="checkbox" id="real-component-{{id}}" name="{{name}}">
                        <div class="toggle-switch"></div>
                    <span class="toggle-label form-edit-label" id="component-label-{{id}}">{{label}}</span>
                </label>
            </div>
        `,
        editor: ["required", "label", "help-text", "hr", "condition", "name", "checkbox-default"],
        default: "checked"
    },
    textarea: {
        name: "Textarea",
        template:
            `
            <div class="form-component" id="form-component-{{id}}" style="width:{{width}} !important;">
                <label id="component-label-{{id}}" class="form-edit-label" style="float:left;margin-right:4px;">{{label}}</label>
                <button id="helptext-button-{{id}}" data-hint="{{helptext}}" class="helptext-button" style="{{helptext_visible}}float:left;">?</button>
                <span id="component-required-{{id}}" class="comp-required" style="{{required}}margin-right:4px;">*</span>
                <textarea id="real-component-{{id}}" name="{{name}}"></textarea>
            </div>
        `,
        editor: ["required", "label", "help-text", "class", "css", "rows", "hr", "condition", "name", "default", "placeholder", "hr", "validation"]
        , default: ""
    },
    text: {
        name: "Metin girdisi",
        template:
            `
            <div class="form-component" id="form-component-{{id}}" style="width:{{width}} !important;">
                <label id="component-label-{{id}}" class="form-edit-label" style="float:left;margin-right:4px;">{{label}}</label>
                <button id="helptext-button-{{id}}" data-hint="{{helptext}}" class="helptext-button" style="{{helptext_visible}}float:left;">?</button>
                <span id="component-required-{{id}}" class="comp-required" style="{{required}}margin-right:4px;">*</span>
                <input type="text" id="real-component-{{id}}" name="{{name}}" />
            </div>
        `,
        editor: ["required", "label", "help-text", "class", "css", "hr", "condition", "name", "default", "placeholder", "hr", "validation"],
        default: ""
    },
    select: {
        name: "Seçim",
        template:
            `
            <div class="form-component" id="form-component-{{id}}">
                <label id="component-label-{{id}}" class="form-edit-label" style="float:left;margin-right:4px;">{{label}}</label>
                <button id="helptext-button-{{id}}" data-hint="{{helptext}}" class="helptext-button" style="{{helptext_visible}}float:left;">?</button>
                <span id="component-required-{{id}}" class="comp-required" style="{{required}}margin-right:4px;">*</span>
                <select id="real-component-{{id}}">

                </select>
            </div>
        `,
        default: "0",
        editor: ["required", "label", "help-text", "class", "css", "hr", "condition", "name", "hr", "select-options", "endpoint"]
    },
    "float": {
        "name": "Sayı",
        "template": `<div class="form-component" id="form-component-{{id}}">
            <label id="component-label-{{id}}" class="form-edit-label" style="float:left;margin-right:4px;">{{label}}</label>
            <button id="helptext-button-{{id}}" data-hint="{{helptext}}" class="helptext-button" style="{{helptext_visible}}float:left;">?</button>
            <span id="component-required-{{id}}" class="comp-required" style="{{required}}margin-right:4px;">*</span>
            <input type="text" onkeypress="restrict_floatInput(event)" id="real-component-{{id}}" />
    </div>`,
        default: 0,
        editor: ["required", "label", "help-text", "class", "css", "hr", "condition", "name", "hr", "default", "min", "max"]
    },
    "integer": {
        "name": "Tamsayı",
        "template": `<div class="form-component" id="form-component-{{id}}">
            <label id="component-label-{{id}}" class="form-edit-label" style="float:left;margin-right:4px;">{{label}}</label>
            <button id="helptext-button-{{id}}" data-hint="{{helptext}}" class="helptext-button" style="{{helptext_visible}}float:left;">?</button>
            <span id="component-required-{{id}}" class="comp-required" style="{{required}}margin-right:4px;">*</span>
            <input type="number" id="real-component-{{id}}" />
    </div>`,
        default: 0,
        editor: ["required", "label", "help-text", "class", "css", "hr", "condition", "name", "hr", "default", "min", "max"]
    },
    "checkbox": {
        "name": "Checkbox",
        "template": `<div class="form-component" id="form-component-{{id}}">
            <label>
                <input type="checkbox"  id="real-component-{{id}}" />
                {{label}}
            </label>
    </div>
    `,
        default: "checked",
        editor: ["required", "label", "help-text", "class", "css", "hr", "condition", "name", "hr", "default"]
    },
    "html": {
        "name": "HTML",
        "template": `<div class="form-component" id="form-component-{{id}}">
            <div id="real-component-{{id}}" class="html-input">
                {{default}}
            </div>
    </div>
    `,
        default: "&nbsp;",
        editor: ["editor-default", "hr", "css", "hr", "condition", "name"]
    },
    "date": {
        "name": "Tarih",
        "template": `<div class="form-component" id="form-component-{{id}}">
            <label id="component-label-{{id}}" class="form-edit-label" style="float:left;margin-right:4px;">{{label}}</label>
            <button id="helptext-button-{{id}}" data-hint="{{helptext}}" class="helptext-button" style="{{helptext_visible}}float:left;">?</button>
            <span id="component-required-{{id}}" class="comp-required" style="{{required}}margin-right:4px;">*</span>
            <input type="date" id="real-component-{{id}}" value="{{default}}" />
    </div>
    `,
        default: formatDate(Date.now()),
        editor:["required","label", "help-text","class","css","hr","condition","name","hr","default"]
    },
    "datetime": {
        "name": "Tarih Saat",
        "template": `<div class="form-component" id="form-component-{{id}}">
            <label id="component-label-{{id}}" class="form-edit-label" style="float:left;margin-right:4px;">{{label}}</label>
            <button id="helptext-button-{{id}}" data-hint="{{helptext}}" class="helptext-button" style="{{helptext_visible}}float:left;">?</button>
            <span id="component-required-{{id}}" class="comp-required" style="{{required}}margin-right:4px;">*</span>
            <input type="datetime" id="real-component-{{id}}" value="{{default}}" />
    </div>
    `,
        default: formatDate(Date.now()),
        editor:["required","label", "help-text","class","css","hr","condition","name","hr","default"]
    },
    "time": {
        "name": "Saat",
        "template": `<div class="form-component" id="form-component-{{id}}">
            <label id="component-label-{{id}}" class="form-edit-label" style="float:left;margin-right:4px;">{{label}}</label>
            <button id="helptext-button-{{id}}" data-hint="{{helptext}}" class="helptext-button" style="{{helptext_visible}}float:left;">?</button>
            <span id="component-required-{{id}}" class="comp-required" style="{{required}}margin-right:4px;">*</span>
            <input type="time" id="real-component-{{id}}" value="{{default}}" />
    </div>
    `,
        default: formatDate(Date.now()),
        editor:["required","label", "help-text","class","css","hr","condition","name","hr","default"]
    },
    "table": {
        "name": "Tablo",
        "template": `<div class="form-component" id="form-component-{{id}}">
            <label id="component-label-{{id}}" class="form-edit-label" style="float:left;margin-right:4px;">{{label}}</label>
            <button id="helptext-button-{{id}}" data-hint="{{helptext}}" class="helptext-button" style="{{helptext_visible}}float:left;">?</button>
            <span id="component-required-{{id}}" class="comp-required" style="{{required}}margin-right:4px;">*</span>
            <input type="text" id="real-component-{{id}}" value="{{default}}" />
    </div>
    `,
    },
    "file": {
        "name": "Dosya",
        "template": `<div class="form-component" id="form-component-{{id}}">
            <label id="component-label-{{id}}" class="form-edit-label" style="float:left;margin-right:4px;">{{label}}</label>
            <button id="helptext-button-{{id}}" data-hint="{{helptext}}" class="helptext-button" style="{{helptext_visible}}float:left;">?</button>
            <span id="component-required-{{id}}" class="comp-required" style="{{required}}margin-right:4px;">*</span>
            <input type="file" />
    </div>
    `,
    },
    "city": {
        "name": "İl",
        "template": `<div class="form-component" id="form-component-{{id}}">
            <label id="component-label-{{id}}" class="form-edit-label" style="float:left;margin-right:4px;">{{label}}</label>
            <button id="helptext-button-{{id}}" data-hint="{{helptext}}" class="helptext-button" style="{{helptext_visible}}float:left;">?</button>
            <span id="component-required-{{id}}" class="comp-required" style="{{required}}margin-right:4px;">*</span>
            <input type="text" />
    </div>
    `,
    },
    "district": {
        "name": "İlçe",
        "template": `<div class="form-component" id="form-component-{{id}}">
            <label>
            Ilçe
            </label>
            <input type="text" />
    </div>
    `,
    },
    "neighborhood": {
        "name": "Mahalle",
        "template": `<div class="form-component" id="form-component-{{id}}">
            <label>
                Mahalle
            </label>
            <input type="text" />
    </div>
    `,
    },
    "multiple-select": {
        "name": "Çoklu Seçim",
        "template": `<div class="form-component" id="form-component-{{id}}">
            <label>
            Çoklu Seçim
            </label>
            <select multiple>
                <option>Seçim 1</option>
                <option>Seçim 2</option>
                <option>Seçim 3</option>
                <option>Seçim 4</option>
            </select>
    </div>
    `,
    },
    "search-select": {
        "name": "Aramalı Seçim",
        "template": `<div class="form-component" id="form-component-{{id}}">
            <label>
            Aramalı Seçim
            </label>
            <select>
                <option>Seçim 1</option>
                <option>Seçim 2</option>
            </select>
    </div>
    `,
    },
    "phone": {
        "name": "Telefon",
        "template": `<div class="form-component" id="form-component-{{id}}">
            <label id="component-label-{{id}}" class="form-edit-label" style="float:left;margin-right:4px;">{{label}}</label>
            <button id="helptext-button-{{id}}" class="helptext-button" style="{{helptext_visible}}float:left;">?</button>
            <span id="component-required-{{id}}" class="comp-required" style="margin-right:4px;">*</span>
            <div id="comp-helptext-{{id}}" class="popover-content">{{helptext}}</div>
            <input type="tel" />
    </div>
    `,
    },
    "email": {
        "name": "E-Posta",
        "template": `<div class="form-component" id="form-component-{{id}}">
            <label id="component-label-{{id}}" class="form-edit-label" style="float:left;margin-right:4px;">{{label}}</label>
            <button id="helptext-button-{{id}}" class="helptext-button" style="{{helptext_visible}}float:left;">?</button>
            <span id="component-required-{{id}}" class="comp-required" style="margin-right:4px;">*</span>
            <div id="comp-helptext-{{id}}" class="popover-content">{{helptext}}</div>
            <input type="email" id="real-component-{{id}}" />
    </div>
    `,
    },
    "radio": {
        "name": "Radio Seçim",
        "template": `<div class="form-component" id="form-component-{{id}}">
            <label>
                <input type="radio" />
                Radio Seçim
            </label>
    </div>
    `,
    },
    "datalist": {
        "name": "Datalist",
        "template": `<div class="form-component" id="form-component-{{id}}">
            <label id="component-label-{{id}}" class="form-edit-label" style="float:left;margin-right:4px;">{{label}}</label>
            <input type="text" onclick="alert('datalist açılacak');" />
    </div>
    `,
    },
    "map": {
        "name": "Harita",
        "template": `<div class="form-component" id="form-component-{{id}}">
            <label id="component-label-{{id}}" class="form-edit-label" style="float:left;margin-right:4px;">{{label}}</label>
            <button id="helptext-button-{{id}}" class="helptext-button" style="{{helptext_visible}}float:left;">?</button>
            <span id="component-required-{{id}}" class="comp-required" style="margin-right:4px;">*</span>
            <div id="comp-helptext-{{id}}" class="popover-content">{{helptext}}</div>
            <div class="map">MAP</div>
    </div>
    `,
    },
}

const editor_elements = {
    required: `
        <div class="form-editor">
          <label class="toggle">
            <input class="toggle-checkbox" type="checkbox" oninput="changeRequire('{{id}}',this);" {{required}}>
            <div class="toggle-switch"></div>
            <span class="toggle-label">Zorunlu alan</span>
          </label>
        </div>`,
    label: `
        <div class="form-editor">
            <label>
                Etiket
            </label>
            <input type="text" oninput="changeLabel('{{id}}',this);" value="{{label}}" />
        </div>
        `,
    "help-text": `
        <div class="form-editor">
            <label>
                Yardım Metni
            </label>
            <input type="text" oninput="changeHelpText('{{id}}',this);" value="{{helptext}}" />
        </div>
      `,
    class: `
      <div class="form-editor">
        <label>
            Class
        </label>
        <input type="text" oninput="changeClass('{{id}}',this);" value="{{class}}" />
    </div>
      `,
    css: `
      <div class="form-editor">
        <label>
            CSS
        </label>
        <textarea rows="3" oninput="changeCSS('{{id}}',this);" >{{css}}</textarea>
    </div>
      `,
    placeholder: `
      <div class="form-editor">
        <label>
            Placeholder
        </label>
        <input type="text" oninput="changePlaceholder('{{id}}',this);" value="{{placeholder}}" />
    </div>
      `,
    validation: `
    <div class="form-editor">
      <label>
          Validasyon
      </label>
      <div class="form-editor">
        <label>
            Regex
        </label>
        <input type="text" oninput="changeRegex('{{id}}',this)" value="{{regex}}" />
        <label>
            Hata mesajı
        </label>
        <input type="text" oninput="changeValidationMessage('{{id}}',this)" value="{{error}}" />
        <label>
            Test
        </label>
        <input type="text" oninput="testValidation('{{id}}',this)" value="" />
        
      </div>
  </div>
    `,
    hr: `<hr style="border:1px solid #AAA;" />`,
    condition: `
      <div class="form-editor">
        <label>
            Koşul
        </label>
        <select onchange="changeCondition('{{id}}',this);" class="condition-select">
            <option value="0" {{condition_selected_0}}>Aktif</option>
            <option value="1" {{condition_selected_1}}>Pasif</option>
            <option value="2" {{condition_selected_2}}>Ekle</option>
            <option value="3" {{condition_selected_3}}>Düzenle</option>
        </select>
    </div>
      `,
    name: `
      <div class="form-editor">
        <label>
            Ad
        </label>
        <input type="text" oninput="changeName('{{id}}',this.value);" value="{{name}}" />
        <div class="name-error-message">

        </div>
    </div>
      `,
    "editor-default": `<div class="editor-default"></div>`
    ,
    "text-value": `
    <div class="form-editor">
      <label>
          Varsayılan
      </label>
      <input oninput="changeDefault('{{id}}',this);" type="text" value="{{default}}" />
    </div>
    `,
    "select-options": `
    <div class="form-editor">
      <label>
          Seçimler
      </label>
        <table class="option-table">
            <thead>
                <tr>
                    <td>
                    #
                    </td>
                    <td>
                        Anahtar
                    </td>
                    <td>
                        Değer
                    </td>
                </tr>
            </thead>
            <tbody id="table-add-option">

                
            </tbody>
            <tfoot id="table-add-options">
            
            </tfoot>
        </table>
    </div>
    `,
    min: `<div class="form-editor">
    <label>
        Minimum (Text ise karakter uzunluğu)
    </label>
    <input type="number" oninput="changeMin('{{id}}',this);" value="{{min}}" />
</div>`,
    max: `<div class="form-editor">
    <label>
        Maximum (Text ise karakter uzunluğu)
    </label>
    <input type="number" oninput="changeMax('{{id}}',this);" value="{{max}}" />
</div>`,
    attr: `<div class="form-editor">
    <label>
        Attributes
    </label>
    <input type="test" oninput="changeAttr('{{id}}',this.value);" value="{{attr}}" />
</div>`,
    endpoint: `<div class="form-editor">
    <label>
        Endpoint
    </label>
    <input type="text" oninput="changeEndpoint('{{id}}',this);" value="{{endpoint}}" />
    <button class="test-endpoint-button" onclick="testEndpoint('{{id}}',this);">Test Endpoint</button>
    <span class="endpoint-error-message"></span>
    </div>`,
    width: `<div class="form-editor">
    <label>
        Width
    </label>
    <input type="text" oninput="changeWidth('{{id}}',this);" value="{{width}}" />
</div>`,
    rows: `<div class="form-editor">
    <label>
        Rows
    </label>
    <input type="number" oninput="changeRows('{{id}}',this);" value="{{rows}}" min="1" max="6" />
</div>`,
    multiple: `<div class="form-editor">
    <label class="toggle">
      <input class="toggle-checkbox" type="checkbox" oninput="changeRequire('{{id}}',this);" {{multiple}}>
      <div class="toggle-switch"></div>
      <span class="toggle-label">Çoklu seçim</span>
    </label>
  </div>`,
    "checkbox-default": `<div class="form-editor">
  <label class="toggle">
    <input class="toggle-checkbox" type="checkbox" oninput="changeDefault('{{id}}',this);" {{default}}>
    <div class="toggle-switch"></div>
    <span class="toggle-label">Varsayılan</span>
  </label>
</div>`,
    "default": `<div class="form-editor">
<label>
    Varsayılan
</label>
<input type="text" oninput="changeDefault('{{id}}',this);" value="{{default}}" />
</div>`
};