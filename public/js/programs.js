
window.addEventListener('load', function () {

    let rolling = document.getElementById('rolling');
    let vertican_nav = document.querySelector('.vertical-nav');




    rolling.addEventListener('click', rolLingn, false );


    function rolLingn(e) {
        if (vertican_nav.classList.contains('hidden')){
            vertican_nav.classList.remove('hidden')
            vertican_nav.style.marginLeft = '0'
        }else{
            vertican_nav.classList.add('hidden')
            vertican_nav.style.marginLeft = '-290px'
        }
    }



},false);

