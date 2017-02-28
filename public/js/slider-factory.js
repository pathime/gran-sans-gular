granular.sliderFactory = (function(){

    var ctx = granular.getCtx();

    var obj = {
        createSlider: createSlider
    }

    //////////////////////////////

    function createSlider(params, parentElem, callback) {
        return new Slider(params, parentElem, callback);
    }

    function Slider(params, parentElem, callback) {
        this.ctx = ctx;
        this.params = params;
        this.parentElem = parentElem;
        if (callback) this.callback = callback;

        this.renderHTML();
    }

    Slider.prototype = {
        renderHTML() {
            var div = document.createElement("DIV"),
                label = document.createElement("LABEL"),
                input = document.createElement("INPUT");

            label.innerHTML = "<span>" + this.params.label + "</span>"
            input.setAttribute("type", "range");
            input.value = this.params.value;
            input.min = this.params.min;
            input.max = this.params.max;
            input.step = "0.01";

            div.appendChild(label);
            div.appendChild(input);
            this.parentElem.appendChild(div);

            this.addMouseEventListeners(input);
        },

        addMouseEventListeners(elem) {
            elem.oninput = handleChange.bind(this);
            elem.onchange = handleChange.bind(this);

            function handleChange() {
                this.params.value = parseFloat(elem.value);
                if (this.callback) this.callback(this.params.value);
            }
        }
    }

    return obj;

})();