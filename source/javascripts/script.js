(function(global){

    "use strict";

    global.Color = new Values('rgb(255, 0, 0)');

    var colorFormats = {
        UI : {
            hex: document.querySelector('.js-hex'),
            rgb: document.querySelector('.js-rgb'),
            hsl: document.querySelector('.js-hsl'),
            wrapper: document.querySelector('.wrapper'),
            links: document.querySelectorAll('.footer a'),
            body: document.body
        },

        init : function() {
            this.UI._links = [].slice.call(this.UI.links, 0);
            this.bindEvents();
        },

        bindEvents : function() {
            addEvent(this.UI.hex, "keyup", function(event) {
                if (Values.Utils.isHEX(this.value)) {
                    Color.setColor( this.value );
                    colorFormats.updateUIColors();
                    colorFormats.UI.rgb.value = Color.rgb;
                    colorFormats.UI.hsl.value = Color.hsl;
                    return true;
                }

                colorFormats.UI.rgb.value = '';
                colorFormats.UI.hsl.value = '';
                return false;
            });

            addEvent(this.UI.rgb, "keyup", function(event) {
                if (Values.Utils.isRGB(this.value)) {
                    Color.setColor( this.value );
                    colorFormats.updateUIColors();
                    colorFormats.UI.hex.value = Color.hex;
                    colorFormats.UI.hsl.value = Color.hsl;
                    return true;
                }

                colorFormats.UI.hex.value = '';
                colorFormats.UI.hsl.value = '';
                return false;
            });

            addEvent(this.UI.hsl, "keyup", function(event) {
                // if ( colorFormats.HSLRegExp.test(this.value) ) {
                //     Color.setColor( this.value );
                //     colorFormats.updateUIColors();
                //     colorFormats.UI.hex.value = Color.getColor().hex;
                //     colorFormats.UI.rgb.value = Color.getColor().rgb.text;
                //     return true;
                // }

                // colorFormats.UI.hex.value = '';
                // colorFormats.UI.rgb.value = '';
                return false;
            });
        },

        updateUIColors : function() {
            var bgClr   = Color.hex,
                txtClr  = Color.brightness > 50 ?
                    Color.lightness( -40 ) :
                    Color.lightness( 40 ),
                rgb     = txtClr._rgb.r+','+txtClr._rgb.g+','+txtClr._rgb.b;

            this.UI.body.style.backgroundColor = bgClr;
            this.UI.body.style.color = txtClr.hex;
            this.UI.wrapper.style.borderBottomColor = 'rgba('+rgb+', 0.5)';
            this.UI._links.forEach(function(e, i) {
                console.log(e)
                e.style.color = txtClr.hex;
            });
        }
    };

    var addEvent = function (obj, type, fn) {
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

    var triggerEvent = function (el, type) {
        if ((el[type] || false) && typeof el[type] == 'function') {
            el[type](el);
        }
    };

    colorFormats.init();

})(window);
