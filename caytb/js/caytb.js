// window.addEventListener("DOMContentLoaded", caytbInit, false);
window.addEventListener("load", caytbInit, false);

function caytbInit() {
    YtbVideo({
        id: 'yt'
    });
}


function YtbVideo(param) {
    if (!(this instanceof YtbVideo)) {
        return new YtbVideo(param);
    }


    this.inithtml(param.id)
    this.init_travel(param.id);


}


YtbVideo.prototype.init_travel = function () {
    let _animation;
    let self = this;
    let data_buttons = document.querySelectorAll('[data-videocode]')

    for (let data_button of data_buttons) {

        data_button.addEventListener('click', buttonisclick, false);

        function buttonisclick(e) {

            let modal_id = document.getElementById('box-yt');
            // console.log('e========', e);
            console.log('data_button', data_button);
            self.initModal()
            // let ala = self.runYoutube(data_button);

            let _animation = data_button.dataset.animation;
            document.body.classList.add(_animation);


            self.runYoutube(data_button);
            self.closeE(_animation);
            self.closeX(_animation);

            // self.close(modal_id);

            // document.body.classList.remove(_animation);

        }
    }

}

YtbVideo.prototype.initModal = function () {


    let finder = document.createElement('div');
    finder.setAttribute('id', 'cafinder');
    document.body.appendChild(finder);


    function ala(e) {
        finder.style.opacity = '' + e / 100;
    }
    this.odlicznik(0, 80, 10, 10, ala);

    finder.style.backdropFilter = "blur(10px)";

    let modal = document.getElementById('box-yt');
    modal.classList.add('display-block');
    modal.classList.add('active');
    modal.classList.remove('opoacity0');


}



//
//
// YtbVideo.prototype.close = function (modal_id) {
//
//
//     console.log('modal id', modal_id)
//     // if (this.close_id !== false) return;
//     let self = this;
//
//     modal_id.addEventListener('click', closededModal, false);
//
//     function closededModal() {
//         modal_id.style.background = 'yellow'
//                         modal_id.removeFilterBlur;
//         semodal_id.removeFilterBlur();
//         modal_id.style.display = "none";
//
//         modal_id.classList.add('opoacity0');
//         // modal_id.classList.remove('opoacity1');
//         setTimeout(function () {
//             modal_id.classList.remove('display-block')
//         }, 40)
//
//         let body = document.querySelector("body");
//         body.style.overflow = 'inherit';
//
//     }
//
//     // close.onclick = function (event) {
//     // console.log('ecent', event)
//     //         if (event.target === self.modal_id) {
//     //                 self.removeFilterBlur();
//     //                 self.modal_id.style.display = "none";
//     //                 let body = document.querySelector("body");
//     //                 body.style.overflow = 'inherit';
//     //         }
//     // }
// }

// function close(){
YtbVideo.prototype.closeE = function(_animation) {
    let self = this;
    let mod_id = document.getElementById('box-yt');
    mod_id.addEventListener('click', closededModal, false);
    function closededModal(){
        // alert(33)

        let finder = document.getElementById('cafinder');
        function ala(e) {
            let wynik = '' + (.8 - e / 100);
            // console.log( 'finder ', wynik )
            // console.log( 'finder e ', e )
            finder.style.opacity = wynik;
            if (wynik === '0'){
                let modal = document.getElementById('box-yt');
                modal.classList.remove('display-block');
                modal.classList.remove('active');
                modal.classList.add('opoacity0');

                finder.remove();
                document.body.classList.remove(_animation);

                console.log('self', self);
                console.log('this', this);

                window.player.pauseVideo();
            }



        }
        self.odlicznik(0, 80, 10, 10, ala);


    }
}

YtbVideo.prototype.closeX = function(_animation) {
    let self = this;
    let x = document.getElementById('close-yt');
    x.addEventListener('click', closededModalX, false);
    function closededModalX(){
        let finder = document.getElementById('cafinder');
        function ala(e) {
            let wynik = '' + (.8 - e / 100);
            // console.log( 'finder ', wynik )
            // console.log( 'finder e ', e )
            finder.style.opacity = wynik;
            if (wynik === '0'){
                let modal = document.getElementById('box-yt');
                modal.classList.remove('display-block');
                modal.classList.remove('active');
                modal.classList.add('opoacity0');

                finder.remove();
                document.body.classList.remove(_animation);

                window.player.stopVideo();
            }



        }
        self.odlicznik(0, 80, 10, 10, ala);
    }
}



// function  runYoutube(button) {
YtbVideo.prototype.runYoutube = function(button) {



    let video;
    if (window.innerWidth <= button.dataset.width) {
        button.dataset.height = window.innerWidth / button.dataset.width * button.dataset.height;
        button.dataset.width = window.innerWidth;
    }
    let id_cmodal = document.getElementById('content-' + 'yt');
    id_cmodal.style.width = (button.dataset.width || 460) + 'px';
    id_cmodal.style.height = (button.dataset.height || 320) + 'px';
    video = button.dataset.videocode;
    let youtubeScriptId = 'youtube-api';
    let youtubeScript = document.getElementById(youtubeScriptId);
    if (youtubeScript === null) {
        let tag = document.createElement('script');
        let firstScript = document.getElementsByTagName('script')[0];
        tag.src = 'https://www.youtube.com/iframe_api';
        tag.id = youtubeScriptId;
        firstScript.parentNode.insertBefore(tag, firstScript);
    } else {
        if (this.old_video_id !== video) {
            window.player.loadVideoById({'videoId': video});
        }
        window.player.playVideo();
    }
    let video_ai = video;


    // window.player.removeEventListener(event:String, listener:String):Void
    this.old_video_id = video;
    window.onYouTubeIframeAPIReady = function () {
        window.player = new window.YT.Player('player', {
            height: '100%',
            width: '100%',
            videoId: video,
            events: {'onReady': onPlayerReady}
        });
    };

    function onPlayerReady(event) {
        event.target.playVideo();
    }


}


YtbVideo.prototype.inithtml = function (id) {


    let cms = document.createElement('div');
    cms.setAttribute('id', 'box-' + id);
    cms.setAttribute('class', 'yt box opoacity0');
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
    hspan.setAttribute('id', 'close-yt' );
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


    // let finder = document.createElement('div');
    // finder.setAttribute('id', 'cafinder');
    // document.body.appendChild(finder);

}


YtbVideo.prototype.odlicznik = function (start, stop, time, step, fn) {
    let n = start;
    odlicznik();

    function odlicznik() {
        fn(n)
        n += step;
        {
            if (n <= stop) {
                setTimeout(function () {
                    odlicznik();
                }, time)
            }
        }
    }
}

