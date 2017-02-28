var granular = (function(){

    var ctx = new AudioContext(),
        numberOfGrains = 24,
        grains = [],
        sliderContainer;

    var obj = {
        init: init,
        getCtx: getCtx,
        getNumberOfGrains: getNumberOfGrains
    }

    //////////////////////////////

    function init() {
        sliderContainer = document.getElementById('slider-container');
        loadSliders();
        loadReverbBuffer();
        loadGrainBuffer();
        addEventListeners();
    }

    function getCtx() {
        return ctx;
    }

    function getNumberOfGrains() {
        return numberOfGrains;
    }

    function addEventListeners() {
        document.getElementById('play').onclick = play;
        document.getElementById('pause').onclick = pause;
    }

    function loadSliders() {
        for (var i = 0; i < granular.grainParams.length; i++) {
            if (granular.grainParams[i].hasSlider) 
                granular.sliderFactory.createSlider(granular.grainParams[i], sliderContainer);
        }
    }

    function loadWaveDisplay() {
        granular.wave.initWaveSurfer();
        granular.wave.loadSound('sounds/fallback.wav');
        granular.wave.setPositionParams(granular.grainParams[0]);
    }

    function getAudioBuffer(sound) {

        return new Promise(function(resolve, reject) {
            var req = new XMLHttpRequest();
            req.open('get', 'sounds/' + sound);
            req.responseType = "arraybuffer";
            req.onreadystatechange = function() {
                if (req.readyState == 4 && req.status == 200) {
                    ctx.decodeAudioData(req.response, function(audioBuffer) {
                        resolve(audioBuffer);
                    });
                }
            };
            req.send();
        });
    }

    function loadGrainBuffer() {
        getAudioBuffer('fallback.wav')
        .then(function(audioBuffer) {
            loadGrains(audioBuffer);
            loadWaveDisplay();
        });
    }

    function loadReverbBuffer() {
        getAudioBuffer('reverb1.wav')
        .then(function(audioBuffer) {
            loadReverb(audioBuffer);
        });
    }

    function loadGrains(audioBuffer) {
        var reverbInputNode = granular.reverb.getInputNode(),
            outputNodes = [ctx.destination, reverbInputNode];
        for (var i = 0; i < numberOfGrains; i++) {
            var grain = granular.grainFactory.createGrain(i, outputNodes);
            grain.setBuffer(audioBuffer);
            grains.push(grain);
        }
    }

    function loadReverb(audioBuffer) {
        var params = granular.reverb.getParams();
        granular.reverb.setImpulseResponseBuffer(audioBuffer);
        granular.reverb.setOutputNodes([ctx.destination]);
        granular.sliderFactory.createSlider(params, sliderContainer, granular.reverb.setValue);
    }

    function play() {
        for (var i = 0; i < grains.length; i++) 
            grains[i].play();
    }

    function pause() {
        for (var i = 0; i < grains.length; i++) 
            grains[i].pause();
    }

    return obj;

})();