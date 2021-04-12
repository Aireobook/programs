document.addEventListener('DOMContentLoaded', () => {
    InitAction();
})


function InitAction() {
    if (!(this instanceof InitAction)) {
        return new InitAction();
    }

    let parameter_url = this.getUrlParameters() || false;

    let _old = false;
    let _old_a = false;
    let _oldColor = false;
    let url = ''
    let self = this;
    const hostname = window.location.pathname;

    if (parameter_url) {
        url = 'pages/' + parameter_url + '.html';
        window.addEventListener('load', function () {
            htmlLink(url);
        }, false)
    }


    function htmlLink(url) {
        self.ajax(url);

        let url_par = self.getUrlParameters('page');
        let data_links = document.querySelectorAll('[data-link]')

        for (let data_link of data_links) {
            let data = data_link.dataset.link;

            let li = data_link.closest('.menu-li')
            if (li !== null) {
                let link_a = li.querySelector('.collapsible-a.active')
                link_a.classList.add('color-nav');
                _old_a = link_a;

            }

            if (url_par === data) {
                // data_link.style.color = 'whitesmoke';
                data_link.classList.add('color-nav');
                _old = data_link;
            }
        }
    }

    let links = document.querySelectorAll('.js-link');

    for (let link of links) {
        link.addEventListener('click', jsLinken, false)

        function jsLinken(e) {
            e.preventDefault();
            let ala = link.getAttribute('href')

            let button_link = link.dataset.link;
            window.history.replaceState({}, document.title, hostname + '?page=' + button_link);
            self.ajax(ala);

            if (_old !== false) {
                _old.style.color = 'inherit';
                _old.classList.remove('color-nav');
            }


            if (_old_a !== false) {
                _old_a.style.color = 'inherit';
                _old_a.classList.remove('color-nav');
            }


            let li = link.closest('.menu-li')
            if (li !== null) {
                let link_a = li.querySelector('.collapsible-a.active')
                link_a.classList.add('color-nav');
                _old_a = link_a;

            }

            _oldColor = link.style.color;
            // link.style.color = 'whitesmoke'
            link.classList.add('color-nav');
            _old = link;

        }
    }

}


InitAction.prototype.getUrlParameters = function (paramewter = 'page') {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(paramewter)
}

InitAction.prototype.ajax = function (url) {
    if (url) {
        fetch(url)
            .then(res => res.text())
            .then(html => {
                this.obietnica(html)
            }).catch(err => {
            console.warn('Something went wrong.', err)
        })
    }
}


InitAction.prototype.obietnica = function (html) {
    let action = document.getElementById('action')
    action.innerHTML = html

}

