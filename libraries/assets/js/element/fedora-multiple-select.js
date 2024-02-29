class FedoraSelect {
    #options = [];
    #settings = {};
    #uts;
    #select;
    #searchInput;
    #optionsList;
    #multipleselect;
    #selectedList = {};

    constructor(
        id,
        settings = {
            width: '400px',
            search: false,
            placeholder: ''
        },
        options = []) {
        this.#settings = settings;
        this.#uts = Math.floor(new Date().getTime() / 1000);
        this.#set_stylesheet();

        this.#select = document.getElementById(id.replace("#", ""));
        this.#select.style.display = 'none';
        this.#select.setAttribute("multiple", "");

        const customSelect = document.createElement('div');
        customSelect.classList.add(`fedora-select-${this.#uts}`);

        this.#multipleselect = document.createElement('div');
        this.#multipleselect.classList.add(`fedora-multiple-select-${this.#uts}`);
        customSelect.appendChild(this.#multipleselect);

        this.#searchInput = document.createElement("input");
        this.#searchInput.type = 'text';
        this.#searchInput.classList.add(`fedora-select-search-${this.#uts}`);
        this.#searchInput.placeholder = this.#settings.placeholder == undefined ? '' : this.#settings.placeholder;

        if (!this.#settings.search)
            this.#searchInput.style.display = 'none';

        this.#optionsList = document.createElement('ul');
        this.#optionsList.classList.add(`fedora-select-options-${this.#uts}`);

        this.#optionsList.innerHTML = '';

        this.#optionsList.appendChild(this.#searchInput);
        customSelect.appendChild(this.#optionsList);
        this.#select.insertAdjacentElement('afterend', customSelect);

        this.#addEventListeners(customSelect);

        const selectOptions = this.#select.querySelectorAll("option");
        selectOptions.forEach((element) => {
            this.add({
                "text": element.textContent,
                "value": element.value
            });
        });

        this.add(options);

        if (this.#options.length > 0) {
            this.#add_options();
        }

        this.#selectedList = [];
    }

    add(options) {
        if (Array.isArray(options)) {
            if (!this.#validate_options(options)) {
                return;
            }

            this.#options = this.#options.concat(options);
            this.#add_options();
        } else {
            if (!this.#validate_option(options)) {
                return;
            }

            this.#options.push(options);
            this.#add_options();
        }
    }

    clear() {
        this.#options = [];
        this.#select.innerHTML = '';
        this.#clean_options_list();
        this.#searchInput.value = '';
        this.#select.value = '';
    }

    removeByIndex(value = undefined) {
        if (value !== undefined) {
            this.#options.splice(value, 1);
            this.#add_options();
        }
    }

    removeByText(value = undefined) {
        if (value !== undefined) {
            this.#options = this.#options.filter(option => option.text !== value);
            this.#add_options();
        }
    }

    removeByValue(value = undefined) {
        if (value !== undefined) {
            this.#options = this.#options.filter(option => option.value !== value);
            this.#add_options();
        }
    }

    #removeByText(value = undefined) {
        if (value !== undefined) {
            this.#options = this.#options.filter(option => option.text !== value);
            this.#add_options();
        }
    }

    #add_filter(options) {
        this.#clean_options_list();
        for (let i = 0; i < options.length; i++) {
            const optionData = options[i];
            const li = document.createElement('li');
            const img = document.createElement('img');
            if (optionData.image != null && optionData.image != "" && optionData.image != undefined) {
                img.src = optionData.image;
                img.alt = optionData.text;
                img.height = '24';
                img.width = '24';
                li.appendChild(img);
            }

            const span = document.createElement('span');
            span.textContent = optionData.text;

            const self = this;
            li.addEventListener('click', function () {
                self.#set_selected(optionData.text, optionData.value, optionData.image, i);
            });

            li.appendChild(span);
            this.#optionsList.appendChild(li);
        }
    }

    #filter_options() {
        const searchText = this.#searchInput.value;
        const filteredOptions = this.#options.filter(option =>
            option.text.toLowerCase().includes(searchText.toLowerCase())
        );
        return filteredOptions;
    }

    #update_options() {
        const filteredOptions = this.#filter_options();
        this.#add_filter(filteredOptions);
    }

    #addEventListeners(element) {
        if (this.#settings.search)
            this.#searchInput.addEventListener('input', () => {
                this.#update_options();
            });

        element.addEventListener('click', () => {
            this.#optionsList.style.display = 'block';
            this.#searchInput.focus();
        });

        document.addEventListener("click", (event) => {
            if (!element.contains(event.target) && (event.target.classList[0] != `fedora-item-${this.#uts}` && event.target.classList[1] != `fedora-item-${this.#uts}`)) {
                this.#optionsList.style.display = 'none';
            }
        });
    }

    #set_selected(text, value, image, index) {
        this.#select.querySelectorAll("option").forEach((element) => {
            if (element.value == value) {
                element.setAttribute("selected", "");
            } else {
                element.removeAttribute("selected");
            }
        });
        this.#select.value = value;

        const span = document.createElement("span");
        span.classList.add(`fedora-multiple-selected-${this.#uts}`);
        span.classList.add(`fedora-item-${this.#uts}`);
        let imagesrc;
        if (image !== undefined && image !== "" && image !== null) {
            imagesrc = document.createElement("img")
            imagesrc.src = image;
            span.appendChild(imagesrc);
        } else {
            image = "";
        }

        span.innerHTML += `${text}`;
        this.#multipleselect.appendChild(span);
        this.#selectedList.push({ text: text, image: image, value: value });

        span.addEventListener("click", (event) => {
            this.add({ text: text, image: image, value: value });
            this.#selectedList = this.#selectedList.filter(option => option.text !== text);
            span.remove();
            this.#add_options();
        });

        this.removeByIndex(index);
    }

    #validate_options(options) {
        var state = true;
        if (!Array.isArray(options)) {
            console.error("FedoraSelect : Options must be an Array!");
            return false;
        }

        for (let i = 0; i < options.length; i++) {
            state = this.#validate_option(options[i], i);
        }
        return state;
    }

    #validate_option(object, i) {
        const option = object;

        if (!option.hasOwnProperty('text') || !option.hasOwnProperty('value')) {
            console.error(`FedoraSelect: Text and value properties must be strings at index ${i}.`);
            return false; // Gerekli özelliklerden biri veya her ikisi eksikse hatalı
        }

        if (typeof option.text !== 'string' || typeof option.value !== 'string') {
            console.error(`FedoraSelect: Text and value properties must be strings at index ${i}.`);
            return false;
        }
        try {
            if (option.hasOwnProperty('image')) {
                if (typeof option.image !== 'string') {
                    console.error(`FedoraSelect: Invalid image path at index ${i}.`);
                    return false;
                }
            }
        } catch (err) {

        }

        return true;
    }

    #add_options() {
        // this.#optionsList.style.display = 'none';
        this.#clean_options_list();

        for (let i = 0; i < this.#options.length; i++) {
            const optionData = this.#options[i];

            const li = document.createElement('li');
            li.classList.add(`fedora-item-${this.#uts}`);
            const img = document.createElement('img');
            img.classList.add(`fedora-item-${this.#uts}`);

            const selectOption = document.createElement("option");

            if (optionData.image != null && optionData.image != "" && optionData.image != undefined) {
                img.src = optionData.image;
                img.alt = optionData.text;
                img.height = '24';
                img.width = '24';
                li.appendChild(img);
            }

            const span = document.createElement('span');
            span.textContent = optionData.text;
            span.classList.add(`fedora-item-${this.#uts}`);
            selectOption.textContent = optionData.text;
            selectOption.value = optionData.value;

            const self = this;
            li.addEventListener('click', function () {
                self.#set_selected(optionData.text, optionData.value, optionData.image, i);
            });

            li.appendChild(span);
            this.#optionsList.appendChild(li);
            this.#select.appendChild(selectOption);
        }

        for (let i = 0; i < this.#selectedList.length; i++) {
            const optionData = this.#selectedList[i];
            const selectOption = document.createElement("option");
            selectOption.textContent = optionData.text;
            selectOption.value = optionData.value;
            selectOption.setAttribute("selected", "");
            this.#select.appendChild(selectOption);
        }
    }

    #clean_options_list() {
        this.#select.innerHTML = '';
        this.#optionsList.querySelectorAll("li").forEach((element) => {
            element.remove();
        });
    }

    #set_stylesheet() {
        let stylesheet = `
        .fedora-select-${this.#uts} {
            position: relative;
            width: ${this.#settings.width};
            height:32px;
            padding: 6px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-family: 'Poppins', sans-serif;
            font-size:14px;
        }

        .fedora-multiple-select-${this.#uts}{
            overflow-x: auto;
            white-space: nowrap;
        }

        .fedora-multiple-selected-${this.#uts}{
            border: 1px solid #999;
            border-radius:2px;
            margin-left:1px;
            margin-right:1px;
            padding-left: 4px;
            padding-right: 4px;
            font-size:14px;
            display: inline-block;
            text-align: center;
            height:32px;
            line-height:32px;
            justify-content:start;
            cursor:pointer;
        }

        .fedora-multiple-selected-${this.#uts}:hover{
            background-color:#AAA;
        }

        .fedora-multiple-selected-${this.#uts} img{
            position:relative;
            margin:0;
            padding:0;
            height:24px;
            width:24px;
            line-height:24px;
        }
        
          .fedora-select-search-${this.#uts} {
            font-family: 'Poppins', sans-serif;
            font-size:14px;
            width:99%;
            padding:0;
            margin:0;
            left:0;
            position: relative;
          }
        
          .fedora-select-options-${this.#uts} {
            list-style: none;
            padding: 2px;
            margin: 0;
            position: relative;
            width: 100%;
            background-color: #fff;
            border: 1px solid #ccc;
            border-top: none;
            border-radius: 0 0 4px 4px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            z-index:100000000000;
            font-family: 'Poppins', sans-serif;
            font-size:14px;
            left:-4px;
            top:8px;
          }
        
          .fedora-select-options-${this.#uts} li {
            height:24px;
            padding: 4px;
            cursor: pointer;
            font-family: 'Poppins', sans-serif;
            font-size:14px;
          }

          .fedora-select-options-${this.#uts} li > img {
            margin-right:4px;
            font-family: 'Poppins', sans-serif;
            font-size:14px;
          }
        
          .fedora-select-options-${this.#uts} li:hover {
            background-color: #16bbee;
            color:#FFF;
            font-family: 'Poppins', sans-serif;
            font-size:14px;
          }`;

        if (document.getElementsByTagName("style").length > 0) {
            document.getElementsByTagName("style")[0].innerHTML = document.getElementsByTagName("style")[0].innerHTML + this.stylesheet;
        } else {
            var style_node = document.createElement('style');
            style_node.innerHTML = stylesheet;
            document.getElementsByTagName("head")[0].appendChild(style_node);
        }

        let fonts_0 = document.createElement("link");
        fonts_0.setAttribute("rel", "preconnect");
        fonts_0.setAttribute("href", "https://fonts.googleapis.com");

        let fonts_1 = document.createElement("link");
        fonts_1.setAttribute("rel", "preconnect");
        fonts_1.setAttribute("href", "https://fonts.gstatic.com");
        fonts_1.setAttribute("crossorigin", "");

        let fonts_2 = document.createElement("link");
        fonts_2.setAttribute("rel", "stylesheet");
        fonts_2.setAttribute("href", "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap");
        document.getElementsByTagName("head")[0].appendChild(fonts_0);
        document.getElementsByTagName("head")[0].appendChild(fonts_1);
        document.getElementsByTagName("head")[0].appendChild(fonts_2);
    };
}

const options = [
    { text: 'Test', value: "Val test", image: "" },
    { text: 'Fedora', value: "Fed test", image: './assets/img/icon.png' },
    { text: 'AtmPoint', value: "test atm", image: './assets/img/atmpoint_icon.png' },
];

const fedoraSelect = new FedoraSelect("#select_test",
    {
        width: "400px",
        placeholder: "Arama",
        search: true
    });

fedoraSelect.add(options);


fedoraSelect.add({
    text: "Atakan",
    value: "Ati",
    image: "https://avatars.githubusercontent.com/u/12297738?v=4"
})
