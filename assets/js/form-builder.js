var ffb;

class ProdseenFormBuilder {
    #form_object = [];
    #form_element;

    constructor(id, form_object) {
        this.#form_element = document.getElementById(id);
        const sortedData = Object.values(form_object).sort((a, b) => a.order - b.order);
        this.#form_object = sortedData;
        this.#build_form(this.#form_object);
    }

    #get_element_templates() {

    }

    #build_form(form_object) {
        for (let i = 0; i < form_object.length; i++) {
            let element = form_object[i];
            this.#build_element(element);
        }
    }

    #build_element(element_object) {
        let new_element;
        new_element = render_curly_brackets(element_object, form_elements[element_object.type]["template"])

        // Elemanı ekle
        this.#form_element.innerHTML = this.#form_element.innerHTML + new_element;


        switch (element_object.type) {
            case "boolean":
                document.getElementsByName(element_object.name).checked = element_object.default;
                break;
            case "textarea":

                break;
            case "spacer":

                break;
            case "text":

                break;
            case "select":

                break;
        }

    }
}

var test_form = {
    "7931f7d6c99a0ab4": {
        "cid": "7931f7d6c99a0ab4",
        "order": 0,
        "type": "boolean",
        "width": "40%",
        "name": "bool1",
        "label": "Is open?",
        "helptext": "Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test ",
        "required": true,
        "class": "",
        "css": "",
        "condition": 0,
        "placeholder": "",
        "validation": false,
        "default": false,
        "endpoint": false,
        "attr": "",
        "options": false
    },
    "667d15527a1a7e24": {
        "cid": "667d15527a1a7e24",
        "order": 1,
        "type": "text",
        "width": "60%",
        "name": "info1",
        "label": "Info 1",
        "helptext": "Test metni",
        "required": true,
        "class": "",
        "css": "",
        "condition": 0,
        "placeholder": "",
        "validation": false,
        "default": false,
        "endpoint": false,
        "attr": "",
        "options": false
    },
    "39c15d7b001d7bd2": {
        "cid": "39c15d7b001d7bd2",
        "order": 2,
        "type": "textarea",
        "width": "100%",
        "name": "info2",
        "label": "Info 2",
        "helptext": false,
        "required": true,
        "class": "",
        "css": "",
        "condition": 0,
        "placeholder": "",
        "validation": false,
        "default": false,
        "endpoint": false,
        "attr": "",
        "options": false
    },
    "aa8ac0d9bdf0a0ad": {
        "cid": "aa8ac0d9bdf0a0ad",
        "order": 3,
        "type": "spacer",
        "width": "100%",
        "name": "",
        "label": "",
        "helptext": false,
        "required": true,
        "class": "",
        "css": "border:1pxdotted#888;",
        "condition": 0,
        "placeholder": "",
        "validation": false,
        "default": false,
        "endpoint": false,
        "attr": "",
        "options": false
    },
    "4484cf5c75ec06b5": {
        "cid": "4484cf5c75ec06b5",
        "order": 4,
        "type": "select",
        "width": "100%",
        "name": "select1",
        "label": "Seçim",
        "helptext": false,
        "required": true,
        "class": "",
        "css": "",
        "condition": 0,
        "placeholder": "",
        "validation": false,
        "default": false,
        "endpoint": false,
        "attr": "",
        "options": false
    },
    "08a83864cb1bee67": {
        "cid": "08a83864cb1bee67",
        "order": 5,
        "type": "float",
        "width": "100%",
        "name": "",
        "label": "Sayı",
        "helptext": false,
        "required": true,
        "class": "",
        "css": "",
        "condition": 0,
        "placeholder": "",
        "validation": false,
        "default": false,
        "endpoint": false,
        "attr": "",
        "options": false
    },
    "aeb6ce4de4f19699": {
        "cid": "aeb6ce4de4f19699",
        "order": 5,
        "type": "integer",
        "width": "100%",
        "name": "number1",
        "label": "Tamsayı",
        "helptext": false,
        "required": true,
        "class": "",
        "css": "",
        "condition": 0,
        "placeholder": "",
        "validation": false,
        "default": false,
        "endpoint": false,
        "attr": "",
        "options": false
    }
};

