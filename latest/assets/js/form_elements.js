var form_elements = {
    spacer:{
        name:"Spacer",
        template:
        `
            <div class="form-component" id="form-component-{{id}}">
                <hr id="real-component-{{id}}" />
            </div>
        `,
        editor:["css","class"]
    },
    boolean: {
        name: "Boolean",
        template:
        `
            <div class="form-component" id="form-component-{{id}}">
                <!--div id="resize"></div--!>
                <button id="helptext-button-{{id}}" class="helptext-button" onclick="toggleHelp('{{id}}')" style="display:none;float:left;">?</button>
                <span id="component-required-{{id}}" class="comp-required" style="margin-right:4px;">*</span>
                <div id="comp-helptext-{{id}}" class="popover-content"></div>
                <label class="toggle">
                        <input class="toggle-checkbox" type="checkbox">
                            <div class="toggle-switch"></div>
                        <span class="toggle-label form-edit-label" id="component-label-{{id}}">Boolean</span>
                </label>
            </div>
        `,
        editor:["required", "label", "help-text","css", "hr", "condition","name"]
    },
    textarea: {
        name: "Textarea",
        template:
        `
            <div class="form-component" id="form-component-{{id}}">
                <label id="component-label-{{id}}" class="form-edit-label" style="float:left;margin-right:4px;">
                    Textarea
                </label>
                <button id="helptext-button-{{id}}" class="helptext-button" onclick="toggleHelp('{{id}}')" style="display:none;float:left;">?</button>
                <span id="component-required-{{id}}" class="comp-required" style="margin-right:4px;">*</span>
                <div id="comp-helptext-{{id}}" class="popover-content"></div>
                <textarea id="real-component-{{id}}"></textarea>
            </div>
        `,
        editor:["required", "label", "help-text","class","css", "hr", "condition","name","placeholder","hr","validation"]
    },
    text: {
        name: "Metin girdisi",
        template:
        `
            <div class="form-component" id="form-component-{{id}}">
                <label id="component-label-{{id}}" class="form-edit-label" style="float:left;margin-right:4px;">
                    Metin girdisi
                </label>
                <button id="helptext-button-{{id}}" class="helptext-button" onclick="toggleHelp('{{id}}')" style="display:none;float:left;">?</button>
                <span id="component-required-{{id}}" class="comp-required" style="margin-right:4px;">*</span>
                <div id="comp-helptext-{{id}}" class="popover-content"></div>
                <input type="text" id="real-component-{{id}}" />
            </div>
        `,
        editor:["required", "label", "help-text","class","css", "hr", "condition","name","placeholder","hr","validation"]
    },
    select: {
        name: "Seçim",
        template:
        `
            <div class="form-component" id="form-component-{{id}}">
                <label id="component-label-{{id}}" class="form-edit-label" style="float:left;margin-right:4px;">
                    Seçim
                </label>
                <select id="real-component-{{id}}">
                    <option>Seçim 1</option>
                    <option>Seçim 2</option>
                    <option>Seçim 3</option>
                </select>
            </div>
        `,
        editor:["required", "label", "help-text","class","css", "hr", "condition","name","hr","select-options"]
    },
    "float": {
        "name": "Sayı",
        "template": `<div class="form-component" id="form-component-{{id}}">
            <label>
                Sayı
            </label>
            <input type="text" onkeypress="restrict_floatInput(event)" />
    </div>
    <div class="form-component" id="form-edit-{{id}}" style="display:none;">
        EDITOR
    </div>`,
    },
    "integer": {
        "name": "Tamsayı",
        "template": `<div class="form-component" id="form-component-{{id}}">
            <label>
                Sayı
            </label>
            <input type="number" />
    </div>
    <div class="form-component" id="form-edit-{{id}}" style="display:none;">
        EDITOR
    </div>`,
    },
    "checkbox": {
        "name": "Checkbox",
        "template": `<div class="form-component" id="form-component-{{id}}">
            <label>
                <input type="checkbox" />
                Checkbox
            </label>
    </div>
    <div class="form-component" id="form-edit-{{id}}" style="display:none;">
        EDITOR
    </div>`,
    },
    "hidden": {
        "name": "Gizli alan",
        "template": `<div class="form-component" id="form-component-{{id}}">
            <label>
                Gizli alan (Değer : '')
            </label>
            <input type="hidden" value="" />
    </div>
    <div class="form-component" id="form-edit-{{id}}" style="display:none;">
        EDITOR
    </div>`,
    },
    "title": {
        "name": "Başlık",
        "template": `<div class="form-component" id="form-component-{{id}}">
            <h2>
                Başlık
            </h2>
    </div>
    <div class="form-component" id="form-edit-{{id}}" style="display:none;">
        EDITOR
    </div>`,
    },
    "date": {
        "name": "Tarih",
        "template": `<div class="form-component" id="form-component-{{id}}">
            <label>
                Tarih
            </label>
            <input type="date" />
    </div>
    <div class="form-component" id="form-edit-{{id}}" style="display:none;">
        EDITOR
    </div>`,
    },
    "datetime": {
        "name": "Tarih - Saat",
        "template": `<div class="form-component" id="form-component-{{id}}">
            <label>
                Tarih - Saat
            </label>
            <input type="datetime-local" />
    </div>
    <div class="form-component" id="form-edit-{{id}}" style="display:none;">
        EDITOR
    </div>`,
    },
    "table": {
        "name": "Tablo",
        "template": `<div class="form-component" id="form-component-{{id}}">
            <label>
                Tablo
            </label>
            <input type="datetime-local" />
    </div>
    <div class="form-component" id="form-edit-{{id}}" style="display:none;">
        EDITOR
    </div>`,
    },
    "file": {
        "name": "Dosya",
        "template": `<div class="form-component" id="form-component-{{id}}">
            <label>
                Dosya
            </label>
            <input type="file" />
    </div>
    <div class="form-component" id="form-edit-{{id}}" style="display:none;">
        EDITOR
    </div>`,
    },
    "city": {
        "name": "İl",
        "template": `<div class="form-component" id="form-component-{{id}}">
            <label>
                İl
            </label>
            <input type="text" />
    </div>
    <div class="form-component" id="form-edit-{{id}}" style="display:none;">
        EDITOR
    </div>`,
    },
    "district": {
        "name": "İlçe",
        "template": `<div class="form-component" id="form-component-{{id}}">
            <label>
            Ilçe
            </label>
            <input type="text" />
    </div>
    <div class="form-component" id="form-edit-{{id}}" style="display:none;">
        EDITOR
    </div>`,
    },
    "neighborhood": {
        "name": "Mahalle",
        "template": `<div class="form-component" id="form-component-{{id}}">
            <label>
                Mahalle
            </label>
            <input type="text" />
    </div>
    <div class="form-component" id="form-edit-{{id}}" style="display:none;">
        EDITOR
    </div>`,
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
    <div class="form-component" id="form-edit-{{id}}" style="display:none;">
        EDITOR
    </div>`,
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
    <div class="form-component" id="form-edit-{{id}}" style="display:none;">
        EDITOR
    </div>`,
    },
    "time": {
        "name": "Saat",
        "template": `<div class="form-component" id="form-component-{{id}}">
            <label>
            Saat
            </label>
            <input type="time" />
    </div>
    <div class="form-component" id="form-edit-{{id}}" style="display:none;">
        EDITOR
    </div>`,
    },
    "phone": {
        "name": "Telefon",
        "template": `<div class="form-component" id="form-component-{{id}}">
            <label>
            Telefon
            </label>
            <input type="tel" />
    </div>
    <div class="form-component" id="form-edit-{{id}}" style="display:none;">
        EDITOR
    </div>`,
    },
    "email": {
        "name": "E-Posta",
        "template": `<div class="form-component" id="form-component-{{id}}">
            <label>
            E-Posta
            </label>
            <input type="email" />
    </div>
    <div class="form-component" id="form-edit-{{id}}" style="display:none;">
        EDITOR
    </div>`,
    },
    "radio": {
        "name": "Radio Seçim",
        "template": `<div class="form-component" id="form-component-{{id}}">
            <label>
                <input type="radio" />
                Radio Seçim
            </label>
    </div>
    <div class="form-component" id="form-edit-{{id}}" style="display:none;">
        EDITOR
    </div>`,
    },
    "datalist": {
        "name": "Datalist",
        "template": `<div class="form-component" id="form-component-{{id}}">
            <label>
                Datalist
            </label>
            <input type="text" onclick="alert('datalist açılacak');" />
    </div>
    <div class="form-component" id="form-edit-{{id}}" style="display:none;">
        EDITOR
    </div>`,
    },
    "map": {
        "name": "Harita",
        "template": `<div class="form-component" id="form-component-{{id}}">
            <label>
                Harita üzerinden seçim
            </label>
            <div class="map">MAP</div>
    </div>
    <div class="form-component" id="form-edit-{{id}}" style="display:none;">
        EDITOR
    </div>`,
    },
}

const editor_elements = {
    required: `
        <div class="form-editor">
          <label class="toggle">
            <input class="toggle-checkbox" type="checkbox" onchange="changeRequire('{{id}}',this);">
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
            <input type="text" oninput="changeHelpText('{{id}}',this);" />
        </div>
      `,
    class: `
      <div class="form-editor">
        <label>
            Class
        </label>
        <input type="text" oninput="changeClass('{{id}}',this);" />
    </div>
      `,
    css: `
      <div class="form-editor">
        <label>
            CSS
        </label>
        <textarea rows="3" oninput="changeCSS('{{id}}',this);"></textarea>
    </div>
      `,
    placeholder: `
      <div class="form-editor">
        <label>
            CSS
        </label>
        <input type="text" oninput="changePlaceholder('{{id}}',this);" />
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
        <input type="text" oninput="changePlaceholder('{{id}}',this);" />
        <label>
            Hata mesajı
        </label>
        <input type="text" oninput="changePlaceholder('{{id}}',this);" />
        <label>
            Test
        </label>
        <input type="text" oninput="changePlaceholder('{{id}}',this);" />
      </div>
  </div>
    `,
    hr: `<hr style="border:1px solid #AAA;" />`,
    condition: `
      <div class="form-editor">
        <label>
            Koşul
        </label>
        <select id="component-condition-{{id}}">
            <option value="Aktif">Aktif</option>
            <option value="Pasif">Pasif</option>
            <option value="">Ekle</option>
            <option value="">Düzenle</option>
        </select>
    </div>
      `,
    name: `
      <div class="form-editor">
        <label>
            Ad
        </label>
        <input id="component-name-input-{{id}}" type="text" />
    </div>
      `,
    "text-value": `
    <div class="form-editor">
      <label>
          Varsayılan
      </label>
      <input oninput="changeValue('{{id}}',this);" type="text" />
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
            <tbody>
                <tr>
                    <td class="delete-option">
                        [-]
                    </td>
                    <td>
                        Seçim 1
                    </td>
                    <td>
                        option0
                    </td>
                </tr>
                <tr>
                    <td class="delete-option">
                        [-]
                    </td>
                    <td>
                        Seçim 2
                    </td>
                    <td>
                        option1
                    </td>
                </tr>
                <tr>
                    <td class="delete-option">
                        [-]
                    </td>
                    <td>
                        Seçim 3
                    </td>
                    <td>
                        option2
                    </td>
                </tr>
                <tr>
                    <td class="add-option" onclick="addOption('{{id}}',this);">
                        [+]
                    </td>
                    <td>
                        <input type="text" style="width:100%;" />
                    </td>
                    <td>
                        <input type="text" style="width:100%;" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    `
  };