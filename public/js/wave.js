granular.wave = (function(){

    var ctx = granular.getCtx(),
        currentPos = 0.1,
        mouseDown = false,
        parentElem = document.getElementById('wave-container'),
        params,
        waveSurfer;

    var obj = {
        initWaveSurfer: initWaveSurfer,
        loadSound: loadSound,
        setPositionParams: setPositionParams
    }

    //////////////////////////////

    function initWaveSurfer() {

        waveSurfer = Object.create(WaveSurfer);

        var options = {
            container     : parentElem,
            waveColor     : 'violet',
            progressColor : 'purple',
            cursorColor   : 'navy',
            minPxPerSec   : 100,
            scrollParent  : true
        };

        waveSurfer.init(options);
        
        if (waveSurfer.enableDragSelection) {
            waveSurfer.enableDragSelection({
                color: 'rgba(0, 255, 0, 0.1)'
            });
        }

        waveSurfer.on('ready', seekToPosition);

        addMouseEventListeners();
    }

    function loadSound(url) {
        if (waveSurfer) waveSurfer.load(url);
    }

    function setPositionParams(positionParams) {
        params = positionParams;
    }

    function updateCurrentPosition(e) {
        if (!mouseDown) return;
        currentPos = e.offsetX / parentElem.offsetWidth;
        seekToPosition();  
    }

    function seekToPosition() {
        waveSurfer.seekTo(currentPos);
        params.value = waveSurfer.getCurrentTime();
    }

    function addMouseEventListeners() {
        parentElem.onmouseup = disableMove;
        parentElem.onouseleave = disableMove;
        parentElem.onmousemove = updateCurrentPosition;
        parentElem.onmousedown = function(e) {
            mouseDown = true;
            updateCurrentPosition(e);
        }

        function disableMove() {
            mouseDown = false;
        }
    }


    return obj;

})();