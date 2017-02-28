granular.grainFactory = (function(){

    var ctx = granular.getCtx(),
        params = granular.grainParams
        numberOfGrains = granular.getNumberOfGrains();

    var obj = {
        createGrain: createGrain
    }

    //////////////////////////////

    function createGrain(id, outputNodes) {
        return new Grain(id, outputNodes);
    }

    function Grain(id, outputNodes) {
        this.ctx = ctx;
        this.params = params;
        this.id = id;
        this.outputNodes = outputNodes;
        this.gainNode = this.ctx.createGain();
        this.panNode = this.ctx.createStereoPanner();
        this.playing = false;
        
        this.init();
    }

    Grain.prototype = {
        init: function() {
            this.loadParams();
            this.drawGraph();
        },

        setBuffer: function(audioBuffer) {
            this.buffer = audioBuffer;

        },

        loadParams: function() {
            for (var i = 0; i < this.params.length; i++) {
                this[params[i].name] = params[i];
            }
        },

        drawGraph: function() {
            this.panNode.connect(this.gainNode);
            for (var i = 0; i < this.outputNodes.length; i++) {
                this.gainNode.connect(this.outputNodes[i]);
            }
        },

        play: function() {
            if (!this.buffer) return;
            this.playing = true;

            var source = this.ctx.createBufferSource();
            source.buffer = this.buffer;
            source.onended = function() {
                if (this.playing) this.play();
            }.bind(this);
            source.playbackRate.value = this.pitch.value + calcRand(this.randPitch.value);
            source.connect(this.panNode);
                    
            var interval = Math.max(0, this.interval.value),
                position = Math.max(0, this.position.value + calcRand(this.randPosition.value)),
                length = Math.max(0, this.length.value + calcRand(this.randLength.value)),
                fade = Math.max(0.02, length / 4),
                gain = 1 - ( 0.6 * this.density.value / this.density.max);

            this.panNode.pan.value = (Math.random() * 2 - 1) * this.stereoSpread.value;
            this.gainNode.gain.value = 0;

            if (this.isVoiceOn()) {
                this.gainNode.gain.linearRampToValueAtTime(0, this.ctx.currentTime + interval);
                this.gainNode.gain.linearRampToValueAtTime(gain, this.ctx.currentTime + interval + fade);
                this.gainNode.gain.linearRampToValueAtTime(gain, this.ctx.currentTime + interval + length + fade);
                this.gainNode.gain.linearRampToValueAtTime(0, this.ctx.currentTime + interval + length + fade * 2);
            }
            source.start(this.ctx.currentTime + interval, position, length + fade * 2);

        },

        pause: function() {
            this.playing = false;
        },

        isVoiceOn: function() {
            if (!this.density) return false;
            var cutoff = this.density.value * numberOfGrains / this.density.max;
            return this.id < cutoff;
        }
    }

    function calcRand(randAmt) {
        return Math.random() * randAmt - (randAmt / 2);
    }

    return obj;

})();