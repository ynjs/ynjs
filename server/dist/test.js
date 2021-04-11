"use strict";
function Too(val) {
    if (!(this instanceof Too)) {
        return new Too(val);
    }
    this.val = val;
}
var Foo = function (val) {
    if (!(this instanceof Foo)) {
        return new FooConstructor(val);
    }
};
