
function InitAction(){
    if ( !(this instanceof InitAction)){
        return new InitAction();
    }

    let _old = false;
    let _oldColor = false;

    // this.link()

    let url = 'pages/home.html'
    let self = this;

    let links = document.querySelectorAll('.js-link');

    for (let link of links){

        link.addEventListener('click', jsLinken, false)


        function jsLinken(e){
            e.preventDefault();
            console.log('linkkkk',link.getAttribute('href'))

            let ala = link.getAttribute('href')

            self.ajax(ala);
            if (_old !== false){
                _old.style.color = _oldColor;
            }

            _oldColor = link.style.color;
            link.style.color = 'yellow'
            _old = link;

        }

    }





}



InitAction.prototype.ajax = function (url){
    if (url ){
        fetch(url)
            .then(res => res.text())
            .then(html => {
                // this.obietnica(JSON.parseparse(html))
                this.obietnica(html)
            }).catch(err => {
            console.warn('Something went wrong.', err)
        })
    }
}




InitAction.prototype.obietnica = function (html){
    console.log('html', html)

    let action = document.getElementById('action')

    action.innerHTML = html

}

document.addEventListener('DOMContentLoaded', () => {

    InitAction();
})

InitAction.prototype.link = function (){
    let url = 'pages/home.html'
    let self = this;

    let links = document.querySelectorAll('.js-link');

    for (let link of links){

        link.addEventListener('click', jsLinken, false)


        function jsLinken(e){
            e.preventDefault();
            console.log('linkkkk',link)

            self.ajax(url);

        }

    }


}