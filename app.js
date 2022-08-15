(() => {

    let btns = document.querySelectorAll('.lang-btns')
    let mainContainer = document.querySelector('.printHere');

    let lang = 'es'
    changeLang(lang)
    document.documentElement.setAttribute("lang", lang)

    btns.forEach(function (btns) {
        btns.addEventListener('click', function () {
            lang = btns.getAttributeNode('data-lang').value;
            changeLang(lang)
        })
    })

    function changeLang(lang) {
        let body = document.querySelector('body');
        if (lang === 'es') {
            document.documentElement.setAttribute("lang", lang);
            body.style.backgroundColor = "red";
            loadJson(lang);
        } else if (lang === 'en') {
            document.documentElement.setAttribute("lang", lang);
            body.style.backgroundColor = "green";
            loadJson(lang);
        } else if (lang === 'fr') {
            document.documentElement.setAttribute("lang", lang);
            body.style.backgroundColor = "orange";
            loadJson(lang);
        }
    }
    function loadJson(lang) {

        fetch(`./lang/${lang}.json`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                appendData(data);
            })
            .catch(function (err) {
                console.log('error: ' + err);
            });


        function appendData(data) {
            for (let i = 0; i < data.length; i++) {
                let section = document.createElement("section");
                section.innerHTML = '<h1> ' + data[i].lang + '</h1><h2> ' + data[i].text + '</h2><p>' + data[i].contenido + '</p>';

                mainContainer.replaceChildren(section);
            }
        }
    }
    loadJson(lang);

    //scroll top btn
    const srlTop = () => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    }
    document.querySelector('.btn-to-top').addEventListener('click', srlTop)

})();