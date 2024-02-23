class FedoraSelect {
    #options = [];
    #settings = {};
    #uts;
    #select;
    #searchInput;
    #optionsList;

    constructor(
        id,
        settings = {
            width: '400px',
            search: false,
            placeholder: '',
            data_url: '',
            custom_id: null
        },
        options = []) {
        this.#settings = settings;

        this.#uts = this.#settings.custom_id == null ? Math.floor(new Date().getTime() / 1000) : this.#settings.custom_id;
        this.#set_stylesheet();

        this.#select = document.getElementById(id.replace("#", ""));
        this.#select.style.display = 'none';

        const selectOptions = this.#select.querySelectorAll("option");

        selectOptions.forEach((element) => {
            this.#options.push({
                "text": element.textContent,
                "value": element.value
            });
        });

        const customSelect = document.createElement('div');
        customSelect.classList.add(`fedora-select-${this.#uts}`);

        this.#searchInput = document.createElement("input");
        this.#searchInput.type = 'text';
        this.#searchInput.classList.add(`fedora-select-search-${this.#uts}`);
        this.#searchInput.placeholder = this.#settings.placeholder == undefined ? '' : this.#settings.placeholder;

        if (!this.#settings.search)
            this.#searchInput.readOnly = true;

        this.#optionsList = document.createElement('ul');
        this.#optionsList.classList.add(`fedora-select-options-${this.#uts}`);

        customSelect.appendChild(this.#searchInput);
        customSelect.appendChild(this.#optionsList);
        this.#select.insertAdjacentElement('afterend', customSelect);

        this.#addEventListeners(this.#searchInput);

        this.add(options);

        if (this.#options.length > 0) {
            this.#add_options();
        }

        if (this.#settings.data_url != undefined && this.#settings.data_url != "") {
            this.#get_data();
        }
    }

    getId(){
        return this.#uts;
    }

    destroy() {
        this.#select.style.display = 'block';
        let el = document.getElementsByClassName(`fedora-select-${this.#uts}`)[0];
        el.parentNode.removeChild(el);
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
        this.#optionsList.innerHTML = '';
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

    #add_filter(options) {
        this.#optionsList.innerHTML = '';

        options.forEach(optionData => {
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
                self.#set_selected(optionData.text, optionData.value);
            });

            li.appendChild(span);
            this.#optionsList.appendChild(li);
        });
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

    #addEventListeners() {
        if (this.#settings.search)
            this.#searchInput.addEventListener('input', () => {
                this.#update_options();
            });

        this.#searchInput.addEventListener('focus', () => {
            this.#optionsList.style.display = 'block';
        });

        document.addEventListener("click", (event) => {
            if (!this.#searchInput.contains(event.target)) {
                this.#optionsList.style.display = 'none';
            }
        });
    }

    #set_selected(text, value) {
        this.#optionsList.style.display = 'none';
        this.#searchInput.value = text;
        this.#select.childNodes.forEach((element) => {
            try {
                if (element.tagName.toLowerCase() === "option" && element.value == value) {
                    element.setAttribute("selected", "");
                } else {
                    element.removeAttribute("selected");
                }

            } catch (err) { }
        });
        this.#select.value = value;
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

        if (option.hasOwnProperty('image')) {
            if (typeof option.image !== 'string') {
                console.error(`FedoraSelect: Invalid image path at index ${i}.`);
                return false;
            }
        }
        return true;
    }

    #add_options() {
        this.#optionsList.style.display = 'none';
        this.#optionsList.innerHTML = '';
        this.#select.innerHTML = '';

        let i = 0;
        this.#options.forEach(optionData => {
            const li = document.createElement('li');
            const img = document.createElement('img');

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
            selectOption.textContent = optionData.text;
            selectOption.value = optionData.value;

            const self = this;
            li.addEventListener('click', function () {
                self.#set_selected(optionData.text, optionData.value);
            });

            li.appendChild(span);
            this.#optionsList.appendChild(li);
            this.#select.appendChild(selectOption);
            i++;
        });
    }

    #set_stylesheet() {
        let stylesheet = `
        .fedora-select-${this.#uts} {
            position: relative;
            width: ${this.#settings.width};
            font-family: 'Poppins', sans-serif;
            font-size:14px;
        }
        
          .fedora-select-search-${this.#uts} {
            width: 100%;
            height:24px;
            padding: 4px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-family: 'Poppins', sans-serif;
            font-size:14px;
          }
        
          .fedora-select-options-${this.#uts} {
            list-style: none;
            padding: 4px;
            margin: 0;
            position: absolute;
            width: 100%;
            background-color: #fff;
            border: 1px solid #ccc;
            border-top: none;
            border-radius: 0 0 4px 4px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            z-index:100000000000;
            font-family: 'Poppins', sans-serif;
            font-size:14px;
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

    #get_data() {
        var xhr = new XMLHttpRequest();
        var url = this.#settings.data_url;

        xhr.open('GET', url, true);
        const self = this;
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                self.add(response);
            }
        };

        xhr.send();
    }
}