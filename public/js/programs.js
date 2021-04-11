
window.addEventListener('load', function () {

    // document.getElementById().innerHTML = "Start";
    document.body.addEventListener('click', fmouse, false  )

    function fmouse(e){
        // console.dir(e)

         // console.log("docucmentElement",document.documentElement);
        window.epage = document.getElementById('page');
        // window.epager= epage.documentElement;
        console.dir(epage)
    }



    let rolling = document.getElementById('rolling');
    let vertican_nav = document.querySelector('.vertical-nav');
    let layout = vertican_nav.closest('.layout');



    rolling.addEventListener('click', rolLingn, false );


    function rolLingn(e) {
        if (vertican_nav.classList.contains('hidden')){
            vertican_nav.classList.remove('hidden');
            layout.classList.remove('hidden');
            vertican_nav.style.marginLeft = '0'
        }else{
            vertican_nav.classList.add('hidden')
            layout.classList.add('hidden')
            vertican_nav.style.marginLeft = '-290px'
        }
    }



},false);

