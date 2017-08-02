/**
 * 画布共创选色器
 * 
 * @authors xiezuobing(948466)
 * @date    2017-07-31 15:03:43
 * @version v1.0
 */
(function(windwo) {
    function ColorPicker() {
        this.colors = {
            0x0: 'ff74cc',
            0x1: 'd91934', 
            0x2: 'ffb61a', 
            0x3: 'fff71a', 
            0x4: '01ff70', 
            0x5: '0c861a', 
            0x6: '52dcff', 
            0x7: '0000ff', 
            0x8: '7324a5', 
            0x9: '000000', 
            0xA: '959595', 
            0xB: 'ffffff'
        };
        this.color = this.colors[0xB];
    }
    $.extend(ColorPicker.prototype, {
    	getColor: function(code) {
    		return this.color = this.colors[code];
    	}
    });
    window.ColorPicker = ColorPicker;
}(window));