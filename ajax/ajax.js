
function InitAction(){
    if ( !(this instanceof InitAction)){
        return new InitAction();
    }


    let url = 'pages/home.html'

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

