function isNullOrEmpty(value) {
    if (value == undefined) {
        return true;
    }
    if (value.trim() == "") {
        return true;
    }
    return false;
}

function getDateString(date) {
    return date.getDate() + "/" +
        (date.getMonth() + 1) + "/" +
        date.getFullYear() + " " +
        date.getHours() + ":" +
        date.getMinutes();
}

if (typeof Element.prototype.clearChildren === 'undefined') {
    Object.defineProperty(Element.prototype, 'clearChildren', {
        configurable: true,
        enumerable: false,
        value: function () {
            while (this.firstChild) this.removeChild(this.lastChild);
        }
    });
}