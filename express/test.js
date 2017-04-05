function SuperType() {
    this.property = true;
}

SuperType.prototype.getSuperValue = function() {
    return this.property;
};

// SuperType继承了SuperType

function SubType() {
    this.subproperty = false;
}

SubType.prototype = new SuperType;

SubType.prototype.getSubValue = function() {
    return this.subproperty;
}

var instance = new SubType();
alert(instance.getSuperValue()); // true