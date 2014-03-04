(function(global){

    "use strict";

    // instance of Values.js
    global.Color = new Values('rgb(255, 0, 0)');

    var colorFormats = {
        UI : {
            hex: document.querySelector('.js-hex'),
            rgb: document.querySelector('.js-rgb'),
            hsl: document.querySelector('.js-hsl'),
            wrapper: document.querySelector('.main-container--inner'),
            links: document.querySelectorAll('.footer a'),
            body: document.body
        },

        init : function init() {
            this.UI._links = [].slice.call(this.UI.links, 0);
            this.hash = global.location.hash;
            this.bindEvents();

            if (Values.Utils.isHEX(this.hash)) {
                this.UI.hex.value = this.hash;
                this.updateFromHex(this.hash);
            } else global.location.hash = '';

            return this;
        },

        bindEvents : function bindEvents() {
            addEvent(this.UI.hex, "keyup", this.hexKeyUpEvent);
            addEvent(this.UI.rgb, "keyup", this.rgbKeyUpEvent);
            return this;
        },


        hexKeyUpEvent : function hexKeyUpEvent() {
            if (Values.Utils.isHEX(this.value)) {
                colorFormats.updateFromHex(this.value);
                return true;
            }

            colorFormats.UI.rgb.value = '';
            colorFormats.UI.hsl.value = '';
            return false;
        },

        rgbKeyUpEvent : function rgbKeyUpEvent () {
            if (Values.Utils.isRGB(this.value)) {
                colorFormats.updateFromRGB(this.value);
                return true;
            }

            colorFormats.UI.hex.value = '';
            colorFormats.UI.hsl.value = '';
            return false;
        },

        updateFromHex : function updateFromHex (value) {
            Color.setColor(value);
            this.updateUIColors();
            this.UI.rgb.value = Color.rgba;
            this.UI.hsl.value = Color.hsl;
            this.updateHash(Color.hex);
            value = null;
        },

        updateFromRGB : function updateFromRGB (value) {
            Color.setColor(value);
            this.updateUIColors();
            this.UI.hex.value = Color.hex;
            this.UI.hsl.value = Color.hsl;
            this.updateHash(Color.hex);
            value = null;
        },

        updateHash : function updateHash (value) {
            this.hash = value;
            global.location.hash = this.hash;
        },

        updateUIColors : function updateUIColors() {
            var bgClr   = Color.hex,
                txtClr  = (Color.brightness > 50) ? Color.lightness(-40) : Color.lightness(40);

            this.UI.body.style.backgroundColor = bgClr;
            this.UI.body.style.color = txtClr.hex;
            this.UI.wrapper.style.borderBottomColor = Values.Utils.RGBA(Color.hex, '0.5');

            this.UI._links.forEach(function(el) {
                el.style.color = txtClr.hex;
            });
            bgClr = txtClr = null;
            return this;
        }
    };

    var addEvent = function addEvent(obj, type, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(type, fn, false);
        } else if (obj.attachEvent) {
            obj['e' + type + fn] = fn;
            obj[type + fn] = function() {
                obj['e' + type + fn](window.event);
            };
            obj.attachEvent("on" + type, obj[type + fn]);
        }
    };

    // init the thing
    colorFormats.init();

})(window);
