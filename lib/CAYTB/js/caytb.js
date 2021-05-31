/*jshint esversion: 6 */

/**
 *  Youtube object elements
 */

let tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        playerVars: { 'autoplay': 0, 'controls': 1},
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}


function onPlayerReady(event) {
}

let done = false;
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING && !done) {

    }
}


function stopVideo() {
    player.stopVideo();
}
function pauseVideo() {
    player.pauseVideo();
}

function playVideo(){
    player.playVideo();
}


/**
 *  Start program
 */

window.addEventListener("DOMContentLoaded", caytbInit, false);

/**
 *  Run
 */
function caytbInit() {
    YtbVideo({
        id: 'yt'
    });
}

/**
 *
 * @param param
 * @returns {YtbVideo}
 * @constructor
 *
 * Main class
 */
function YtbVideo(param) {
    if (!(this instanceof YtbVideo)) {
        return new YtbVideo(param);
    }

    this.old_video = null;
    this.inithtml(param.id);
    this.init_travel(param.id);

}



/**
 *
 * @param button
 *
 * Core Youtube Player
 */
YtbVideo.prototype.runYoutube = function (button) {

    let hasTouchscreen = 'ontouchstart' in window;
    let orientation = screen.orientation.type;
    const modal_header = document.querySelector(".yt .caheader")

    modal_header.style.height = "40px";
    modal_header.style.opacity = "1";

    let screen_width = window.screen.width;
    let screen_height = window.screen.height;



    if (screen_height < 500){
        // position_modal.style.paddingTop = "0";
    }

    if (! hasTouchscreen){
        let id_cmodal = document.getElementById('content-' + 'yt');
        id_cmodal.style.width = (button.dataset.width || 460) + 'px';
        id_cmodal.style.height = (button.dataset.height || 320) + 'px';
    }else{
        if (orientation === "landscape-primary"){
            let id_cmodal = document.getElementById('content-' + 'yt');
            id_cmodal.style.width = (screen_width) + 'px';
            // id_cmodal.style.height = (  screen_width * button.dataset.height/button.dataset.width       ) + 'px';
            id_cmodal.style.height = ( screen_height  -40 ) + 'px';
        }else{
            let id_cmodal = document.getElementById('content-' + 'yt');
            id_cmodal.style.width = (screen_width) + 'px';
            id_cmodal.style.height = (  screen_width *  button.dataset.height/button.dataset.width   ) + 'px';
        }
    }


    window.addEventListener("orientationchange", () => {

        if (screen.orientation.type === "landscape-primary"){
            let screen_width = window.screen.width;
            const screen_height = window.screen.height;
            if (screen_height < 500){
                // position_modal.style.paddingTop = "0";
            }

            let contentyt = document.getElementById("content-yt");
            contentyt.style.width = (screen_width ) + "px";
            contentyt.style.height = ( screen_height  -40 ) + 'px';
        }
        else if (screen.orientation.type === "portrait-primary"){
            let screen_width = window.screen.width;
            const screen_height = window.screen.height;
            if (screen_height < 500){
                // position_modal.style.paddingTop = "0";
            }

            let contentyt = document.getElementById("content-yt");

            contentyt.style.width = (screen_width) + 'px';
            contentyt.style.height = (  screen_width *  button.dataset.height/button.dataset.width   ) + 'px';
        }

    }, false);


    let video = button.dataset.videocode;

    if (video === this.old_video){
        playVideo();
    }else{
        player.loadVideoById(video);
        playVideo();
        this.old_video = video;
    }
};


function adminHidden(){
    let adminmenumain = document.getElementById('adminmenumain');
    let wpadminbar = document.getElementById('wpadminbar');
    let position_modal = document.querySelector(".yt .travel ");
    const close = document.querySelector(".yt .close");

    if (adminmenumain !== null){
        adminmenumain.style.display = 'none';
        // close.style.top = "9px";
    }
    if (wpadminbar) {
        wpadminbar.style.display = 'none';
        position_modal.style.paddingTop = "0";
        close.style.top = "9px";
    }



}

function adminvisible(){
    let adminmenumain = document.getElementById('adminmenumain');
    const wpadminbar = document.getElementById('wpadminbar');
    const position_modal = document.querySelector(".yt .travel ");
    const close = document.querySelector(".yt .close");
    if (adminmenumain) {
        adminmenumain.style.display = 'inherit';
    }
    if (wpadminbar) {
        wpadminbar.style.display = 'inherit';
        position_modal.style.paddingTop = "inherit";
        close.style.top = "0px";
    }
}


function is_touch_enabled() {
    return ( 'ontouchstart' in window ) ||
        ( navigator.maxTouchPoints > 0 ) ||
        ( navigator.msMaxTouchPoints > 0 );
}


/**
 *
 * @returns {boolean}
 *
 * Search youtube buttons thumbs
 */
YtbVideo.prototype.init_travel = function () {
    const data_buttons = document.querySelectorAll('[data-videocode]');
    if (data_buttons) {

        for (const data_button of data_buttons) {
            const _animation = data_button.dataset.animation;

            data_button.addEventListener('click', () => {

                if (is_touch_enabled()){
                    adminHidden();
                }

                this.initModal();
                document.body.classList.add(_animation);
                this.runYoutube(data_button);
                this.closeE(_animation);
                this.closeX(_animation);
                this.closeEscape(_animation);
            }, false);
        }
    } else {
        return false;
    }
};


/**
 *  Darkening,  finder
 */
YtbVideo.prototype.initModal = function () {
    let finder = document.createElement('div');

    if (finder) {
        finder.setAttribute('id', 'cafinder');
        document.body.appendChild(finder);

        function slow(e) {
            finder.style.opacity = '' + e / 100;
        }

        this.odlicznik(0, 80, 10, 10, slow);

        finder.style.backdropFilter = "blur(10px)";

        let modal = document.getElementById('box-yt');
        modal.classList.add('display-block');
        modal.classList.add('active');
        modal.classList.remove('opoacity0');
    }
};


/**
 *
 * @param _animation
 *
 * Close in finder
 */
YtbVideo.prototype.closeE = function (_animation) {

    const mod_id = document.getElementById('box-yt');
    if (mod_id) {
        mod_id.addEventListener('click', () => {

            if (is_touch_enabled()){
                adminvisible();
            }

            let finder = document.getElementById('cafinder');

            function ala(e) {
                let wynik = '' + (0.8 - e / 100);

                finder.style.opacity = wynik;
                if (wynik === '0') {
                    let modal = document.getElementById('box-yt');
                    modal.classList.remove('display-block');
                    modal.classList.remove('active');
                    modal.classList.add('opoacity0');
                    finder.remove();
                    document.body.classList.remove(_animation);

                    pauseVideo();
                }
            }

            this.odlicznik(0, 80, 10, 10, ala);
        }, false);
    }

};


/**
 *
 * @param _animation
 *
 * Close in button X
 */
YtbVideo.prototype.closeX = function (_animation) {
    let self = this;
    let x = document.getElementById('close-yt');

    x.addEventListener('click', () => {

        if (is_touch_enabled()){
            adminvisible();
        }

        let finder = document.getElementById('cafinder');
        // const wpadminbar = document.getElementById('wpadminbar');
        // wpadminbar.style.display = 'inherit';

        function ala(e) {
            let wynik = '' + (0.8 - e / 100);
            finder.style.opacity = wynik;
            if (wynik === '0') {
                let modal = document.getElementById('box-yt');
                modal.classList.remove('display-block');
                modal.classList.remove('active');
                modal.classList.add('opoacity0');

                finder.remove();
                document.body.classList.remove(_animation);
                // stopVideo();
                stopVideo();
            }
        }

        self.odlicznik(0, 80, 10, 10, ala);
    }, false);


};


/**
 *
 * @param animation
 *
 * Close in ESC key
 */
YtbVideo.prototype.closeEscape = function (animation) {

    document.addEventListener('keydown', (e) => {

        if (e.key === "Escape") {

            let finder = document.getElementById('cafinder');

            let ala = (e) => {
                let wynik = '' + (0.8 - e / 100);
                finder.style.opacity = wynik;
                if (wynik === '0') {
                    let modal = document.getElementById('box-yt');
                    modal.classList.remove('display-block');
                    modal.classList.remove('active');
                    modal.classList.add('opoacity0');

                    finder.remove();
                    document.body.classList.remove(animation);
                    // pauseVideo();
                }
            };
            this.odlicznik(0, 80, 10, 10, ala);

        }
    });

};



/**
 *
 * @param id
 *
 * Create Html modal code
 */
YtbVideo.prototype.inithtml = function (id) {

    let cms = document.createElement('div');
    cms.setAttribute('id', 'box-' + id);
    cms.setAttribute('class', 'yt box cayt opoacity0');
    document.body.appendChild(cms, document.body.firstChild);

    let cs = document.createElement('div');
    cs.setAttribute('id', 'wrapper-' + id);
    cs.setAttribute('class', 'wrapper');
    cms.appendChild(cs);

    let mcs = document.createElement('div');
    mcs.setAttribute('id', 'travel-' + id);
    mcs.setAttribute('class', 'travel');
    cs.appendChild(mcs);

    let mhs = document.createElement('div');
    mhs.setAttribute('id', 'header-' + id);
    mhs.setAttribute('class', 'caheader');
    mcs.appendChild(mhs);

    let title = document.createElement('div');
    title.setAttribute('id', 'title-' + id);
    title.setAttribute('class', 'title');
    mhs.appendChild(title);

    let buttons_cont = document.createElement('div');
    buttons_cont.setAttribute('id', 'control-' + id);
    buttons_cont.setAttribute('class', 'control');
    mhs.appendChild(buttons_cont);
    let x = document.createTextNode('✕');
    let hspan = document.createElement('span');
    hspan.setAttribute('id', 'close-yt');
    hspan.setAttribute('class', 'close');
    hspan.appendChild(x);
    mhs.appendChild(hspan);


    /* main*/
    let mbs = document.createElement('div');
    mbs.setAttribute('id', 'content-' + id);
    mbs.setAttribute('class', 'content');
    mcs.appendChild(mbs);

    let player = document.createElement('div');
    player.setAttribute('id', 'player');  /* ! player dla youtube*/
    player.setAttribute('class', 'player');
    mbs.appendChild(player);

    let mfs = document.createElement('div');
    mfs.setAttribute('id', 'mfooter-' + id);
    mfs.setAttribute('class', 'mfooter');
    mcs.appendChild(mfs);
    let mfc = document.createElement('div');
    mfc.setAttribute('id', 'aifooter');
    mfc.setAttribute('class', 'aifooter ');
    mfs.appendChild(mfc);
    let t = document.createElement('span');
    t.setAttribute('id', 'infor');
    t.setAttribute('class', 'infor');
    mfc.appendChild(t);
    let b = document.createElement('div');
    b.setAttribute('id', 'contener-button');
    b.setAttribute('class', 'container-button');
    mfc.appendChild(b);
};


/**
 *
 * @param start
 * @param stop
 * @param time
 * @param step
 * @param fn
 *
 *  Slowly function
 */
YtbVideo.prototype.odlicznik = function (start, stop, time, step, fn) {
    let n = start;
    odlicznik();

    function odlicznik() {
        fn(n);
        n += step;
        {
            if (n <= stop) {
                setTimeout(function () {
                    odlicznik();
                }, time);
            }
        }
    }
};


