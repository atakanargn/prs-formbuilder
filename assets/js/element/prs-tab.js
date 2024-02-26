class ProdseenTab {
    #tabs;
    #class_name;

    constructor() {
        this.#class_name = "prs-tab";
        this.#add_styles();
        this.#find_and_select();
    }

    #add_styles() {
        let style = document.createElement("style");
        style.innerHTML = style.innerHTML + `
        
      .prs-tab {
        list-style-type: none;
        padding: 0 !important;
        margin: 0 !important;
      }

      .prs-tab > li {
        display: inline-block;
        border: 1px groove #CCC;
        border-radius: 4px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-bottom: none;
        margin: 0 !important;
        padding: 6px;
        cursor: pointer;
      }

      .prs-tab > .selected {
        font-weight: bolder;
        background-color: #EEE;
        border-bottom: none;
        cursor: auto;
      }

      .prs-tabs {
        border-top: 1px groove #EEE;
        background-color: #EEE;
        margin-top: 0 !important;
        padding-top: 0 !important;
      }
      `;
        document.head.appendChild(style);
    }

    #find_and_select() {
        let tabs = Array.from(
            document.getElementsByClassName(this.#class_name)
        );

        tabs.forEach((elem) => {
            this.#tabs = Array.from(elem.getElementsByTagName("li"));
            let not_selected = true;
            this.#tabs.forEach((element) => {
                document.getElementById(
                    element.getAttribute("to")
                ).style.display = "none";
                const self = this;
                element.addEventListener("click", () => {
                    self.select(element);
                });
                let classes = element.classList;
                classes.forEach((_cl) => {
                    if (_cl == "selected")
                        document.getElementById(
                            element.getAttribute("to")
                        ).style.display = "block";
                });
            });
            if (not_selected) {
                document.getElementById(
                    this.#tabs[0].getAttribute("to")
                ).style.display = "block";
                this.#tabs[0].classList.add("selected");
            }
        });
    }

    select(el) {
        let elem = el.parentNode;
        this.#tabs = Array.from(elem.getElementsByTagName("li"));
        let not_selected = true;
        this.#tabs.forEach((element) => {
            element.classList.remove("selected");
            document.getElementById(element.getAttribute("to")).style.display =
                "none";
        });
        el.classList.add("selected");
        document.getElementById(el.getAttribute("to")).style.display =
            "block";
    }

    change(tab) {
        let el = document.getElementById(tab);
        let selected_tab;
        let selected_tabs;
        let tabs = Array.from(
            document.getElementsByClassName(this.#class_name)
        );
        tabs.forEach((elem) => {
            Array.from(elem.getElementsByTagName("li")).forEach((element) => {
                if (element.getAttribute("to") == tab) {
                    selected_tabs = elem;
                    selected_tab = element;
                };
            });
        });
        Array.from(selected_tabs.getElementsByTagName("li")).forEach((element) => {
            element.classList.remove("selected");
            document.getElementById(
                element.getAttribute("to")
            ).style.display = "none";
        });
        selected_tab.classList.add("selected");
        el.style.display = "block";
    }
}
