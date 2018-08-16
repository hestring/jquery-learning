function bindEvent(obj, events, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(events, fn, false);
    } else {
        obj.attachEvent('on' + events, fn);
    }
}

function getByClass(oParent, sClass) {
    var arr = [];
    var elems = oParent.getElementsByTagName('*');
    for (var i = 0; i < elems.length; i++) {
        if (elems[i].className === sClass) {
            arr.push(elems[i]);
        }
    }
    return arr;
}
function toArray(elems) {
    var arr=[];
    for (var i=0;i<elems.length;i++){
        arr.push(elems[i]);
    }
    return arr;
}

function VQuery(vArg) {
    this.elements = [];  //选择元素的这样一个集合
    switch (typeof vArg) {
        case 'function':
            bindEvent(window, 'load', vArg);
            break;
        case 'string':
            switch (vArg.charAt(0)) {
                case '#':   //id
                    this.elements.push(document.getElementById(vArg.substring(1)));
                    break;
                case '.':   //class
                    this.elements = getByClass(document, vArg.substring(1));
                    break;
                default:  //tag
                    this.elements = toArray(document.getElementsByTagName(vArg));
                    break;
            }
            break;
        case 'object':
            this.elements=vArg;
    }
}

VQuery.prototype.css = function () {

};
VQuery.prototype.html = function (str) {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].innerHTML = str;
    }
};

function $(vArg) {
    return new VQuery(vArg);
}