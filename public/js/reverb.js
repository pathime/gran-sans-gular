granular.reverb = (function(){

    var ctx = granular.getCtx(),
        convolverNode = ctx.createConvolver(),
        gainNode = ctx.createGain(),
        buffer;

    var params = {
        name: 'reverb',
        label: 'Reverb',
        value: 0,
        min: 0,
        max: 2,
        hasSlider: true
    };

    var obj = {
        getParams: getParams,
        getInputNode: getInputNode,
        setOutputNodes: setOutputNodes,
        setValue: setValue,
        setImpulseResponseBuffer
    }

    init();

    //////////////////////////////

    function init() {
        gainNode.gain.value = params.value;
        convolverNode.connect(gainNode);
    }

    function getParams() {
        return params;
    }

    function getInputNode() {
        return convolverNode;
    }

    function setOutputNodes(outputNodes) {
        for (var i = 0; i < outputNodes.length; i++) {
            gainNode.connect(outputNodes[i]);
        }
    }

    function setImpulseResponseBuffer(audioBuffer) {
        convolverNode.buffer = audioBuffer;
    }

    function setValue(value) {
        gainNode.gain.value = value;
    }

    return obj;

})();