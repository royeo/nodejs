function setFont() {
    var fontSize = (document.documentElement.clientWidth) / 6.4;
    fontSize = fontSize > 120?120:fontSize;
    document.querySelector('html').style.fontSize = fontSize + 'px';
}
setFont();
window.onresize = setFont;
