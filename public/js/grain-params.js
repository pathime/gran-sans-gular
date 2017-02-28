granular.grainParams = (function(){

    var GRAIN_PARAMS = [
        
        {
            name: 'position',
            label: 'Position',
            value: 0,
            hasSlider: false
        },
        {
            name: 'length',
            label: 'Grain Size',
            value: 0.4,
            min: 0,
            max: 0.8,
            hasSlider: true
        },
        {
            name: 'density',
            label: 'Denisity',
            value: 48,
            min: 1,
            max: 24,
            hasSlider: true
        },
        {
            name: 'randLength',
            label: 'Random Length',
            value: 0.05,
            hasSlider: false
        },
        {
            name: 'interval',
            label: 'Gap',
            value: 0,
            min: 0,
            max: 1,
            hasSlider: true
        },
        {
            name: 'randPosition',
            label: 'Dispersal',
            value: 0,
            min: 0,
            max: 0.6,
            hasSlider: true
        },
        {
            name: 'lfoAmt',
            label: 'Movement',
            value: 0,
            min: 0,
            max: 1,
            hasSlider: false
        },
        {
            name: 'pitch',
            label: 'Pitch',
            value: 1,
            hasSlider: false
        },
        {
            name: 'randPitch',
            label: 'Pitch Deviation',
            value: 0,
            min: 0,
            max: 1,
            hasSlider: true
        },
        {
            name: 'stereoSpread',
            label: 'Stereo Spread',
            value: 0,
            min: 0,
            max: 1,
            hasSlider: true
        }
    ];

    return GRAIN_PARAMS;

})();