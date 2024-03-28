// TODO Backend form kontrolüne hidden alanlarda eklenecek
// TODO Hidden alanlar form genel ayarlarından ekleneblir

// Seçili element
var selected_element;
// For select-default
var options_dragula;
var prodseen_selects = [];

// Düzenlenen form elemanları
var result_element = {};
var result_form = {
    settings: {},
    elements: {},
    interact: {},
};

window.addEventListener("load", () => {
    // form_elements.js içerisinden gelen
    // Tüm form elemanlarını döndürüyoruz
    Object.keys(form_elements).forEach(el => {
        // Her elemanı bir liste elemanı içerisine ekleyeceğiz
        const obj = document.createElement("li"),
            img = document.createElement("img");
        img.src = `assets/img/elements/${el}.svg?v=${Date.now()}`;
        // Liste içine ikonu ekledik
        obj.appendChild(img);
        // Form elemanı ismini de ikonun sonrasına ekledik
        obj.innerHTML = `${obj.innerHTML} ${form_elements[`${el}`]["name"]}`;
        // Form elemanı id'sini ("boolean","text","select",vs.)
        // bu liste elemanının id'sine verdik
        obj.id = el;
        // 'elements' id'li div içerisine ekledik
        document.getElementById("elements").appendChild(obj);
    });
});

// drag&drop kütüphanesi, purejs kütüphanesidir
var drake = dragula(
    [
        // elements üzerinden
        document.getElementById("elements"),
        // preview div'i üzerine sürükleme işlemi yapılacak
        document.getElementById("preview"),
    ],
    {
        // Sadece elements kaynağından kopyalama işlemi yapılabilir.
        copy: (el, source) => {
            return source.id === "elements";
        },
        // 'elements' div'i üzerine yapılan
        // sürükleme işlemlerine izin verilmeyecek
        accepts: (el, target, source, sibling) => {
            return target !== document.getElementById("elements");
        },
        // Boşluğa bırakılan elemanlar yok olacaktır
        // 'elements' copy özelliğine sahip olduğu için onda çalışmayacaktır
        // sadece düzenlenen form elemanları boşluğa sürükleyince silinecektir
        removeOnSpill: true,
    }
)
    // Eleman sürükleme eventi
    .on("drag", (element) => {
        // Eğer 'id' değeri içerisinde '-' var ise
        // 'preview' üzerinden yapılan bir sürükleme
        // işlemi anlamına gelir
        if (element.id.includes("-")) {
            // Bu sürükleme işlemlerinde sürüklenen elementi seç
            selectForEdit(element);
        }
    })
    // Eleman bırakma eventi
    .on("drop", (element, target, source) => {
        // Eğer 'id' değeri içerisinde '-' yok ise
        // 'elements' üzerinden yapılan bir sürükleme
        // işlemi anlamına gelir
        if (!element.id.includes("-")) {
            // Boş bir div oluştur
            const div = document.createElement("div");
            // 'form-edit' class'ını ekle
            div.classList.add("form-edit");
            // randomID() metodu ile 16 haneli bir
            // rastgele id üretiyoruz
            let uts = randomID();

            // Her eleman için oluşturulan obje
            const element_object = {
                id: `${uts}`, // randomID()
                order: -1, // Order ilk eklenen "-1" hemen sonra sıralama tekrar yapılacak
                type: element.id, // form_elements key değeri direkt type olarak gelecektir
                width: "100%", // Eleman ilk yatay uzunluk değeri 100 olarak gelecektir
                name: `name-${uts}`, // Geçici bir isim
                label: form_elements[element.id]["name"], // form_elements name değeri ilk etiket olarak belirlenir
                helptext: false, // helptext başlangıçta kapalı
                helptext_visible: "display:none;", // visible değeri başlangıçta kapalı
                required: true, // Zorunlu değeri ilk değer true
                class: "",
                css: "",
                condition: 0, // Aktif - Pasif - Ekle - Düzenle

                placeholder: "",
                validation: false,

                default: form_elements[element.id]["default"],
                endpoint: false,
                attr: "",
                options: false,
                min: false,
                max: false,
                rows: 2,
                multiple: false,
            };

            // result_element dizisine yeni eleman eklenir
            result_element[`${uts}`] = element_object;

            // form_elements içerisinden elemanın
            // ["template"] değerini çekiyoruz
            // render_curly_brackets() metodu ile obje içerisindeki
            // key değerleri eşleşir ve karşılık gelen değer yerleştirilir
            const template = render_curly_brackets(
                element_object,
                form_elements[element.id]["template"]
            );

            // Yeni element id değeri
            // içerideki input ile karışmaması için
            // değeri güncelledik
            element.id = `${element.id}-li-${uts}`;
            element.classList.add("form-element");
            element.style.width = element_object.width;

            // Sol üstteki butonlar
            // "SİL","ARTIR","MANUEL ARTIR","EKSİLT"
            const buttons = `
            <button class="increase-button" id="inc-${element.id}" onclick="changeWidth('${element.id}','inc',this);" disabled="">
              +
            </button>
            <input type="number" class="width-input no-spin" min="20" max="100" step="10" onclick="this.select();" onblur="changeWidth('${element.id}',this.value,this);" id="width-${element.id}" value="100" />
            <button class="decrease-button" id="dec-${element.id}" onclick="changeWidth('${element.id}','dec',this);">
              -
            </button>
            <button class="cancel-button" onclick="deleteComponent('${element.id}');">
              <img src="assets/img/cancel.svg" />
            </button>`;

            // Butonlar ve render edilmiş template birleştirildi
            div.innerHTML = `${buttons} ${template}`;
            element.innerHTML = div.outerHTML;

            // Liste elementi click eventi
            // tetiklenirse mevcut elementi
            // seçme işlemi için selectForEdit() metodu çağırılır
            element.addEventListener("click", () => {
                selectForEdit(element);
            });

            // defaultElement içerideki asıl elementi seçiyoruz
            const defaultElement = document.getElementById(
                `real-component-${uts}`
            );
            // Içerideki asıl elementin tipi
            const tagName = defaultElement.tagName.toLowerCase();

            // Tip bunlardan biri ise
            if (
                tagName == "input" ||
                tagName == "textarea" ||
                tagName == "select"
            ) {
                if (tagName.includes("select")) {
                    addOption(uts, "Seçim 1", "0");
                    addOption(uts, "Seçim 2", "1");
                }
                // Bu kısımda eklenen form elemanının "default" değerini render ettikten sonra
                // formdaki asıl component'in default değeri haline getiriyoruz
                // farklı element tiplerindeki özel durumlar için switch ile kontrol gerçekleştirdik
                switch (defaultElement.type) {
                    case "boolean":
                        defaultElement.removeAttribute("checked");
                        defaultElement.setAttribute("checked", "");
                        break;
                    case "checkbox":
                        defaultElement.removeAttribute("checked");
                        defaultElement.setAttribute("checked", "");
                        break;
                    case "date":
                        defaultElement.type = "text";
                        rome(defaultElement, {
                            weekStart: 0,
                            time: false,
                        });
                        break;
                    case "datetime":
                        defaultElement.type = "text";
                        rome(defaultElement, { weekStart: 0 });
                        break;
                    case "time":
                        defaultElement.type = "text";
                        rome(defaultElement, { time: true, date: false });
                        break;
                    // Genel tip value ile değer aldığı için
                    // switch içerisinde default altına yerlerştirdik
                    default:
                        defaultElement.value =
                            form_elements[element_object.type]["default"];
                        break;
                }
            }

            // Required değeri hem editor, hem editables alanında bu metod ile güncellenecektir
            changeRequire(`${uts}`, { checked: element_object["required"] });
        }
        // Sıralama metodu
        // bırakma işleminde her zaman çalışacaktır
        // bu sayede form içerisinde elemanlar arası düzenlemede "order" değerleri anlık olarak güncellenir
        reOrder();
    })
    .on("remove", (el, container, source) => {
        document.getElementById("edit-component").innerHTML = "";
        tabs.change("tab-elements");
        selected_element = null;
    });

// Yeniden dizme metodu
function reOrder() {
    // preview içerisindeki tüm childNode'ları aldık
    // yani "li" içeren tüm elemanlar
    const lis = document.getElementById("preview").childNodes;
    // sayaç
    let cnt = 0;
    // Liste içerisindeki tüm elemanları döndür
    lis.forEach((element) => {
        // id değerini bul
        let id = element.id.split("-")[2];
        // Bulunan id değerine sahip listenin "order" değerini
        // o anki sayaç değerine güncelle
        result_element[`${id}`]["order"] = cnt;
        // sayacı artır
        cnt++;
    });
    // Önizleme metodu
    rebuild();
}

function rebuild() {
    document.getElementById("tab2-preview").innerHTML = "";
    new ProdseenFormBuilder("tab2-preview", result_element);
}

// Form elemanı seçim metodu
function selectForEdit(el) {
    // Eğer mevcutta seçili eleman zaten tıklanan eleman değilse
    if (selected_element != el) {
        // Preview içerisindeki tüm elemanları listeye aldık
        const elements = document.querySelectorAll("#preview li");
        // Tüm elemanları döndürdük
        elements.forEach((element) => {
            // Elemanların classList'i içerisinden "select-for-edit" class'ını sildik
            // unselected gösterdik elemanı
            element.classList.remove("select-for-edit");
        });
        // Sadece bizim tıkladığımız elemana
        // "select-for-edit" class'ını ekledik
        el.classList.add("select-for-edit");
        // Seçim işlemi gerçekleştikten sonra
        // otomatik "Düzenleme" tabını aktif ettik
        tabs.change("tab-edit");
        // selected_element'i tıklanan elemente eşitledik
        selected_element = el;
        // "Düzenleme" tabı içerisindeki editable alanları render ettik
        renderEditor(selected_element);
    }
}

// Quick action : Delete button
function deleteComponent(id) {
    // id'si verilen elemeanı bulduk
    // preview içerisinden sildik
    document.getElementById(id).remove();
    // Form elemanları tab'ına geçiş yaptık
    // selected_element değerini de null yaptık

    // TODO : setTimeout kaldırılacak
    // Buradaki sorun : El ile silme butonuna tıklayınca
    // önce silme metodu yani bu metod çalışıyor,
    // sonrasında ise selectForEdit() çalışıyor
    setTimeout(() => {
        document.getElementById("edit-component").innerHTML = "";
        tabs.change("tab-elements");
        selected_element = null;
    }, 2);
}
// * Şarkı önerisi
// * https://www.youtube.com/watch?v=SsKT0s5J8ko

// Change minimum func
function changeMin(id, el) {
    if (el.value == "") result_element[`${id}`]["min"] = false;
    else result_element[`${id}`]["min"] = el.value;
}

// Change max func
function changeMax(id, el) {
    if (el.value == "") result_element[`${id}`]["max"] = false;
    else result_element[`${id}`]["max"] = el.value;
}

// Change element's attribute
function changeAttr(id, el) {
    // Component attr değeri güncellenir
    result_element[`${id}`]["attr"] = el.value.trim();
    result_element[`${id}`]["attr"].split(" ").forEach((attr) => {
        if (attr.includes("="))
            document
                .getElementById(`real-component-${id}`)
                .setAttribute(`${attr.split("=")[0]}`, `${attr.split("=")[1]}`);
        else
            document
                .getElementById(`real-component-${id}`)
                .setAttribute(`${attr}`, `${attr.split("=")[0]}`);
    });
}

// Change rows in textarea
function changeRows(id, el) {
    result_element[`${id}`]["rows"] = el.value.trim();
    document
        .getElementById(`real-component-${id}`)
        .setAttribute("rows", result_element[`${id}`]["rows"]);
}

// TODO Multiple func
function changeMultiple(id, el) {
    result_form[`${id}`].multiple = true;
}

// Change endpoint
function changeEndpoint(id, el) {
    result_element[`${id}`]["endpoint"] = false;
    let input_type = selected_element
        .querySelectorAll(`#real-component-${id}`)[0]
        .tagName.toLowerCase();
    switch (input_type) {
        case "select":
            result_element[`${id}`]["endpoint"] = el.value;
            break;
    }
}

// Test endpoint
function testEndpoint(id, el) {
    let error_msg = el.parentNode.querySelectorAll(
        ".endpoint-error-message"
    )[0];
    var xhr = new XMLHttpRequest();
    xhr.open("GET", result_element[`${id}`]["endpoint"], true);
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                var jsonResponse = JSON.parse(xhr.responseText);
            } catch (err) {
                error_msg.innerHTML = `Sayfadan dönen format bu alan için uygun değil!`;
                error_msg.style.color = "red";
                error_msg.style.display = "block";
            }

            let input_type = selected_element
                .querySelectorAll(`#real-component-${id}`)[0]
                .tagName.toLowerCase();
            switch (input_type) {
                case "select":
                    prodseen_selects.forEach((elem) => {
                        if (elem.getId() == id) {
                            elem.add(jsonResponse);
                        }
                    });
                    break;
            }

            error_msg.innerHTML = `Dönen değerler başarıyla eklendi!`;
            error_msg.style.color = "green";
            error_msg.style.display = "block";
        } else {
            error_msg.innerHTML = `Bir hata oluştu : ${xhr.status}`;
            error_msg.style.color = "red";
            error_msg.style.display = "block";
        }
    };
    xhr.onerror = function () {
        error_msg.innerHTML = `Bir hata oluştu!`;
        error_msg.style.color = "red";
        error_msg.style.display = "block";
    };
    xhr.send();
}

function changeWidth(li_id, value, elem) {
    let li = document.getElementById(li_id);
    if (li == null) {
        Array.from(
            document.getElementById("preview").querySelectorAll("li")
        ).forEach((elem) => {
            if (elem.id.includes(li_id)) {
                li_id = elem.id;
                li = document.getElementById(li_id);
            }
        });
    }

    value = `${value}`;
    if (value == "dec") {
        value = roundToTen(
            parseInt(li.style.width.replace("%", "")) - 20,
            20,
            100,
            10
        );
        if (value < "20") {
            value = "20";
        }
    } else if (value == "inc") {
        value = roundToTen(
            parseInt(li.style.width.replace("%", "")) + 20,
            20,
            100,
            10
        );
        if (value > "100") {
            value = "100";
        }
    } else {
        value = roundToTen(value.replace("%", ""), 20, 100, 10);
    }

    li.style.width = `${value}%`;

    // Eğer yeni değer "20%"den büyük ise
    if (li.style.width.replace("%", "") == 100) {
        // Artırma butonunu disabled yapıyoruz
        selected_element
            .querySelector(`#inc-${li_id}`)
            .setAttribute("disabled", "");
    } else if (
        li.style.width.replace("%", "") > 20 &&
        li.style.width.replace("%", "") < 100
    ) {
        // Artırma butonunu enabled yapıyoruz
        selected_element
            .querySelector(`#inc-${li_id}`)
            .removeAttribute("disabled");
        // Azaltma butonunu enabled yapıyoruz
        selected_element
            .querySelector(`#dec-${li_id}`)
            .removeAttribute("disabled");
    } else if (li.style.width.replace("%", "") == 20) {
        // Azaltma butonunu disabled yapıyoruz
        selected_element
            .querySelector(`#dec-${li_id}`)
            .setAttribute("disabled", "");
    }

    // width input değerini ise tekrar güncelliyoruz
    let width_input = document.getElementById(`width-${li_id}`);
    let width2_input = document.getElementById(`width2-${li_id}`);
    width_input.value = li.style.width.replace("%", "");
    width2_input.value = li.style.width.replace("%", "");
}

// Component Edit Functions
function addOption(id, text, value) {
    if (text.trim() == "" || value.trim() == "") return;

    let ao_table;
    let new_option = new Option(text, value);

    document.getElementById(`real-component-${id}`).add(new_option);
    refreshOptionTable(id);
}

function delOption(id, el) {
    let selected_element = null;
    document
        .getElementById(`real-component-${id}`)
        .querySelectorAll("option")
        .forEach((element) => {
            if (
                element.value ==
                el.parentNode.querySelectorAll("td")[2].textContent.trim()
            ) {
                selected_element = element;
                el.parentNode.remove();
            }
        });
    selected_element.remove();
    refreshOptionTable(id);
}

// Select tipi alanlar için changeDefault
function selectDefault(id, value) {
    result_element[`${id}`]["default"] = value;
    document.getElementById(`real-component-${id}`).value = value;
    refreshOptionTable(id);
}

// Select türündeki inputlar için gelen seçim ekleme bölümünü
// yenilemeye yarayan metod
function refreshOptionTable(id) {
    if (
        document
            .getElementById(`real-component-${id}`)
            .tagName.toLowerCase()
            .includes("select")
    ) {
        let ao_table;
        try {
            ao_table = document.getElementById("table-add-option");
            ao_table.innerHTML = "";

            document
                .getElementById(`real-component-${id}`)
                .querySelectorAll("option")
                .forEach((element) => {
                    let is_default =
                        element.value ==
                            document.getElementById(`real-component-${id}`).value
                            ? "default-class"
                            : "";

                    ao_table.innerHTML =
                        ao_table.innerHTML +
                        `
          <tr onclick="selectDefault('${id}','${element.value
                        }');" class="${is_default}">
            <td class="delete-option" onclick="delOption('${id}',this);">
                [-]
            </td>
            <td>
              ${element.innerHTML.trim()}
            </td>
            <td>
              ${element.value}
            </td>
          </tr>
                `;
                });

            document.getElementById("table-add-options").innerHTML = `
          <tr id="add-option">
            <td class="add-option" onclick="addOption('${id}',this.parentNode.getElementsByTagName(\`input\`)[0].value,this.parentNode.getElementsByTagName(\`input\`)[1].value);">
                [+]
            </td>
            <td>
                <input type="text" style="width:100%;" />
            </td>
            <td>
                <input type="text" style="width:100%;" />
            </td>
          </tr>
        `;

            try {
                options_dragula.destroy();
            } catch (err) { }

            options_dragula = dragula(
                [document.getElementById("table-add-option")],
                {
                    copy: false,
                    // 'elements' div'i üzerine yapılan
                    // sürükleme işlemlerine izin verilmeyecek
                    accepts: (el, target, source, sibling) => {
                        return el.id != "add-option";
                    },
                }
            ).on("drop", (el) => {
                let opts = document
                    .getElementById("table-add-option")
                    .querySelectorAll("tr");

                document.getElementById(`real-component-${id}`).innerHTML = "";
                opts.forEach((element) => {
                    let is_selected =
                        element.querySelectorAll("td")[2].textContent.trim() ==
                            result_element[`${id}`]["default"]
                            ? "selected"
                            : "";
                    document.getElementById(`real-component-${id}`).innerHTML =
                        document.getElementById(`real-component-${id}`).innerHTML +
                        `<option value="${element
                            .querySelectorAll("td")[2]
                            .textContent.trim()}" ${is_selected}>${element
                                .querySelectorAll("td")[1]
                                .textContent.trim()}</option>`;
                });
            });
        } catch (err) { }

        result_element[`${id}`]["options"] = document.getElementById(
            `real-component-${id}`
        ).innerHTML;

        let index = -1;
        prodseen_selects.forEach((el) => {
            if (el.getId() == id) {
                el.destroy();
                index = prodseen_selects.indexOf(el);
            }
        });

        if (index > -1) {
            prodseen_selects.splice(index, 1);
        }

        prodseen_selects.push(
            new ProdseenSelect(`#real-component-${id}`, {
                search: true,
                placeholder: result_element[`${id}`]["placeholder"],
                width: "100%",
                custom_id: `${id}`,
            })
        );
    }
}

// Required alanında herhangi bir değişiklik olursa
// bu metod çağırılır
function changeRequire(id, el) {
    // form elemanı required özelliğine sahip mi?
    if (
        document
            .getElementById(`form-component-${id}`)
            .getElementsByClassName("comp-required").length != 0
    ) {
        // required alanı açık ise
        if (el.checked) {
            // required sembolü gösterilecek
            document.getElementById(`component-required-${id}`).style.display =
                "block";
        } else {
            // required sembolü gösterilmeyecek
            document.getElementById(`component-required-${id}`).style.display =
                "none";
        }
        // Sonuç istenen id'ye sahip form elemanı bulunup güncellenir
        result_element[id]["required"] = el.checked;
    }
}

// Koşul değiştirme
function changeCondition(id, el) {
    // Direkt option değerlerini alacaktır
    // 0 - 1 - 2 - 3
    // Aktif - Pasif - Ekle - Düzenle
    result_element[`${id}`]["condition"] = el.value;
}

// Etiket değiştirme metodu
function changeLabel(id, el) {
    // Form elemanı label özelliğine sahip mi?
    if (
        document
            .getElementById(`form-component-${id}`)
            .getElementsByClassName(`form-edit-label`).length != 0
    ) {
        // Label boşluklar temizlendikten sonra yerine yerleştirilir
        document.getElementById(`component-label-${id}`).innerHTML =
            el.value.trim();
        // Sonuç istenen id'ye sahip form elemanı bulunup güncellenir
        result_element[id]["label"] = el.value.trim();
    }
}

// Yardım yazısı güncelleme
function changeHelpText(id, el) {
    // Eleman özelliğe sahip mi?
    if (
        document
            .getElementById(`form-component-${id}`)
            .getElementsByClassName("helptext-button").length != 0
    ) {
        // Yardım kutusundan gelen değerin uzunluğu '0' değil ise
        if (el.value.trim().length != 0) {
            // data-hint attribute'ünü güncelliyoruz
            // hint.js kütüphanesi data-hint özelliği olan objeler
            // hint box özelliğini otomatik olarak eklemektedir
            document
                .getElementById(`helptext-button-${id}`)
                .setAttribute("data-hint", `${el.value.trim()}`);
            // Buton görünürlüğü
            document.getElementById(`helptext-button-${id}`).style.display =
                "block";
            // Form elemanı içerisindeki değeri de güncelliyoruz
            result_element[`${id}`]["helptext"] = el.value.trim();
        } else {
            // data-hint attribute'ünü siliyoruz
            document
                .getElementById(`helptext-button-${id}`)
                .removeAttribute("data-hint");
            // Buton görünürlüğü
            document.getElementById(`helptext-button-${id}`).style.display =
                "none";
            // Form elemanı içerisindeki değeri de güncelliyoruz
            result_element[`${id}`]["helptext"] = "";
        }
    }
}

// Class değeri güncelleme
function changeClass(id, el) {
    // Component class değeri güncellenir
    // Direkt üst div'i aldık, template'e en uygun güncelleme yöntemi bu şekidle olacaktır
    document
        .getElementById(`form-component-${id}`)
        .setAttribute("class", el.value.trim());
    // Form elemanında da güncelleme sağladık
    result_element[`${id}`]["class"] = el.value.trim();
}

// Placeholder değeri güncelleme metodu
function changePlaceholder(id, el) {
    // inputları bulup placeholder değerlerini güncelledik
    document
        .getElementById(`real-component-${id}`)
        .setAttribute("placeholder", el.value.trim());
    // Form elemanında da güncelleme sağladık
    result_element[`${id}`]["placeholder"] = el.value.trim();
}

// CSS direkt input'a uygulanacaktır
function changeCSS(id, el) {
    // sağ-sol boşluklar temizlendi.
    // \n karakterleri temizlendi.
    let up_css = el.value.trim().replaceAll("\n", "");
    // style attribute'ü silinir
    document
        .getElementById(`real-component-${id}`)
        .removeAttribute("style");
    // \n değerleri var ise temizlenerek tekrar güncel css değerleri ile tekrar eklenir
    document
        .getElementById(`real-component-${id}`)
        .setAttribute("style", up_css);
    // Form elemanında da güncelleme sağladık
    result_element[`${id}`]["css"] = up_css;
}

// name değeri güncelleme
function changeName(id, name) {
    // name değeri boş değil ise
    if (name.trim() != "") {
        // name error message kutusu görünürlüğü kapatılacaktır
        document.getElementsByClassName(
            "name-error-message"
        )[0].style.display = "none";
        // içerideki mesaj da boşaltılacaktır
        document.getElementsByClassName("name-error-message")[0].textContent =
            "";
        // Form elemanı değeri de güncellenir
        result_element[`${id}`]["name"] = name.trim();
        // result_element içerisindeki tüm elemanlar
        // yani eklenmiş tüm form elemanları döndürülür
        Object.keys(result_element).forEach((el) => {
            // Dönen eleman mevcut eleman ile aynı değilse
            if (el != id) {
                // name değerlerini karşılaştır
                // girilen name değeri ile aynı değer daha önce girildiyse
                if (result_element[el]["name"] == name) {
                    // name-error-message hatası eklendi
                    document.getElementsByClassName(
                        "name-error-message"
                    )[0].innerHTML =
                        "Bu isim başka form elemanına ait!<br/>Lütfen başka bir isim belirle!";
                    // name-error-message görünür hale getirildi
                    document.getElementsByClassName(
                        "name-error-message"
                    )[0].style.display = "block";
                }
            }
        });
    }
}

// Validation regex değeri
function changeRegex(id, el) {
    // Regex ifadesi boş değil ise
    if (el.value.trim() != "") {
        // Yeni regex değeri geldiyse ve validation son değeri 'false' ise
        if (result_element[`${id}`]["validation"] == false) {
            // boş nesneye dönüştür
            result_element[`${id}`]["validation"] = {};
        }
        // Regex ifadesini içeriye yerleştir
        result_element[`${id}`]["validation"]["regex"] = el.value;
        // Boşsa validation false değerine düşecektir
    } else {
        result_element[`${id}`]["validation"] = false;
    }
}

// Validation test metodu
function testValidation(id, el) {
    // Girilen ifade çekilir
    const inputValue = el.value;
    // Regex çekilir ve Regex() nesnesine dönüştürülür
    const regex = new RegExp(
        result_element[`${id}`]["validation"]["regex"]
    );

    // ifade ile girilen değer uyuyor mu kontrol edilir
    if (regex.test(inputValue)) {
        // uyuyorsa Test isimli input arkaplanı yeşil olacaktır
        // yani geçerlidir
        el.classList.remove("invalid");
        el.classList.add("valid");
    } else {
        // uymuyorsa Test isimli input arkaplanı kırmızı olacaktır
        // yani geçersizdir, regex ifadeye uymamaktadır
        el.classList.remove("valid");
        el.classList.add("invalid");
    }

    // input boş ise arkaplan tekrar beyaz olacaktır
    if (inputValue === "") {
        el.classList.remove("valid", "invalid");
    }
}

// Varsayılan değer güncelleme
function changeDefault(id, el) {
    let tag = document
        .getElementById(`real-component-${id}`)
        .tagName.toLowerCase();
    if (tag == "input") {
        // element tipini aldık
        switch (el.type) {
            // checkbox tipinde ise
            case "checkbox":
                // checked değerini güncelledik
                result_element[id]["default"] = el.checked;
                document.getElementById(`real-component-${id}`).checked =
                    result_element[id]["default"];
                break;

            default:
                // Diğer durumlar genelde value ile çalışıyor
                // bu yüzden switch default case'i bu şekilde kalabilir
                // Özel durumlar üste eklenmeye devam edecektir
                result_element[id]["default"] = el.value;
                document.getElementById(`real-component-${id}`).value =
                    result_element[id]["default"];
                break;
        }
    } else if (tag == "div") {
        result_element[id]["default"] = el.innerHTML;
        document.getElementById(`real-component-${id}`).innerHTML =
            result_element[id]["default"];
    }
}

// Validation mesajı güncelleme
function changeValidationMessage(id, el) {
    // Eğer regex ifade tanımlı ise
    if (result_element[`${id}`]["validation"]["regex"] != undefined) {
        // Girilen değer boş değil ise
        if (el.value.trim() != "") {
            // Yeni değeri tanımla
            result_element[`${id}`]["validation"]["error"] = el.value;
        } else {
            result_element[`${id}`]["validation"]["error"] = "";
        }
    }
}

// Düzenleme alanındaki alanları otomatik oluşturan metod
function renderEditor(el) {
    let edit_component = document.getElementById("edit-component");
    // Alanı temizledik
    edit_component.innerHTML = "";

    // Form element, editor alanlarını çektik
    let editables = form_elements[el.id.split("-")[0]]["editor"];

    // Component ID aldık
    let el_id = selected_element.id.split("-")[2];

    // Ilgili editable için mevcut değerleri çektik
    let condition_selection = `condition_selected_${result_element[`${el_id}`]["condition"]
        }`;
    let render_obj = {
        required: result_element[`${el_id}`]["required"] ? 'checked=""' : "",
        id: el_id,
        label: result_element[`${el_id}`]["label"].trim(),
        helptext:
            result_element[`${el_id}`]["helptext"] == false
                ? ""
                : result_element[`${el_id}`]["helptext"],
        css: result_element[`${el_id}`]["css"],
        class: result_element[`${el_id}`]["class"],
        attr: result_element[`${el_id}`]["attr"],
        placeholder: result_element[`${el_id}`]["placeholder"],
        name: result_element[`${el_id}`]["name"],
        default: result_element[`${el_id}`]["default"],
        regex:
            result_element[`${el_id}`]["validation"]["regex"] != undefined
                ? result_element[`${el_id}`]["validation"]["regex"]
                : "",
        error:
            result_element[`${el_id}`]["validation"]["error"] != undefined
                ? result_element[`${el_id}`]["validation"]["error"]
                : "",
        min:
            result_element[`${el_id}`]["min"] == false
                ? ""
                : result_element[`${el_id}`]["min"],
        max:
            result_element[`${el_id}`]["max"] == false
                ? ""
                : result_element[`${el_id}`]["max"],
        endpoint:
            result_element[`${el_id}`]["endpoint"] != false
                ? result_element[`${el_id}`]["endpoint"]
                : "",
        width: result_element[`${el_id}`]["width"].replace("%", ""),
        width_id: `width2-${el.id}`,
        rows: result_element[`${el_id}`]["rows"],
        multiple: result_element[`${el_id}`]["multiple"] ? 'checked=""' : "",
    };
    render_obj[`${condition_selection}`] = "selected";

    // Tüm editable alanları döndürdük
    editables.forEach((editable) => {
        // render_curly_brackets() metodu ile istenenleri yukarıdaki objeye göre yerine yerleştirdik
        edit_component.innerHTML =
            edit_component.innerHTML +
            render_curly_brackets(render_obj, editor_elements[editable]);

        // condition alanı için özel durum
        // selected olmayan değerler için selected var ise
        // temizledik
        try {
            for (let j = 0; j < 3; j++) {
                if (result_element[`${el_id}`]["condition"] != j)
                    edit_component.innerHTML = document
                        .getElementById("edit-componenet")
                        .innerHTML.replaceAll(`{{condition_selected_${j}}}`, "");
            }
        } catch (err) { }
    });

    try {
        refreshOptionTable(el_id);
    } catch (err) { }

    try {
        renderQuillEditor();
    } catch (err) { }

    rebuild();
}

function renderQuillEditor() {
    try {
        let my_editor = new Quill(".editor-default", {
            theme: "snow",
            height: "200px",
        });
    } catch (err) { }

    try {
        my_editor.on("text-change", () => {
            changeDefault(
                el_id,
                document.getElementsByClassName("ql-editor")[0]
            );
        });
    } catch (err) { }
}

function renderInteractive() {
    let interactives = document.getElementById("interactive-div");
    interactives.innerHTML = "";

    let lis = Array.from(
        document.getElementById("preview").querySelectorAll("li")
    );

    lis.forEach((element) => {
        let id = element.id.split("-")[2];
        let elem = document.getElementById(`real-component-${id}`);

        if (elem != null) {
            if (elem.tagName.toLowerCase() == "select") {
                let interact_table = document.createElement("table");
                let _t_head = document.createElement("thead");
                let interact_header = document.createElement("tr");

                let element_name = document.createElement("td");
                element_name.innerHTML = `${result_element[`${id}`]["name"]}`;
                interact_header.appendChild(element_name);

                let options = Array.from(elem.querySelectorAll("option"));
                let options_ok = false;
                if (options.length > 0) {
                    options.forEach((option) => {
                        let option_content = document.createElement("td");
                        option_content.innerHTML = `${option.textContent.trim()}`;
                        interact_header.appendChild(option_content);
                    });
                    _t_head.appendChild(interact_header);
                    interact_table.appendChild(_t_head);

                    lis.forEach((element_) => {
                        let element_id = element_.id.split("-")[2];

                        if (element_id != id && element_id != undefined) {
                            let interact_row = document.createElement("tr");
                            let interact_column = document.createElement("td");
                            interact_column.innerHTML = `${result_element[`${element_id}`]["name"]
                                }`;
                            interact_row.appendChild(interact_column);

                            for (let i = 0; i < options.length; i++) {
                                let interact_column_ = document.createElement("td");
                                let _select = `
                                <select onchange="setInteract('${element_id}','${options[i].value}',this.value);">
                                        <option selected="" value="-"></option>
                                        <option value="1">Göster</option>
                                        <option value="0">Gizle</option>
                                        <option value="2">Zorunlu</option>
                                </select>
                              `;
                                interact_column_.innerHTML =
                                    interact_column_.innerHTML + _select;
                                interact_row.appendChild(interact_column_);
                                interact_table.appendChild(interact_row);
                            }
                        }
                    });
                }

                interactives.appendChild(interact_table);
            }
        }
    });
}

function setInteract(element, option, value) {
    if (result_form["interact"][`${element}`] == undefined) {
        result_form["interact"][`${element}`] = {};
    }
    result_form["interact"][`${element}`][`${option}`] = value;
    if (value == "-") {
        delete result_form["interact"][`${element}`];
    }
}

function buildForm() {
    result_form.elements = result_element;
    return result_form;
}

// Form build işleminde validator sınıfı olacak ve her element için validation'ların tamamına bakacak : min,max,validation regex
// " " interaction sınıfı olacak ve interactionları kontrol edip durumları gerçekleştirecek
// Submit sınıfı içerisinde de alanlar validate, interact kontrolleri tamamlanıp submit edilebilir hale getirilecek

var tabs = new ProdseenTab();