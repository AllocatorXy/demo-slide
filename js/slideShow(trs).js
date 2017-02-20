function sldHr(id, ckTime) {
    const oBox = document.querySelector(id);
    const oWin = oBox.querySelector('.slide-window');
    oWin.appendChild(oWin.firstElementChild.cloneNode(true));
    oWin.insertBefore(oWin.lastElementChild.previousElementSibling.cloneNode(true), oWin.firstElementChild);
    const aTab = oWin.children;
    const oCataLog = oBox.querySelector('.slide-catalog');
    const aCl = oCataLog.children;
    const btnLeft = oBox.querySelector('.btn-left');
    const btnRight = oBox.querySelector('.btn-right');
    const oTabWidth = parseInt(getComputedStyle(aTab[0]).width);
    oWin.style.transform = 'translateX(' + -oTabWidth + 'px)';
    oWin.style.width = oTabWidth * aTab.length + 'px';
    oCataLog.curIndex = 0;

    if (ckTime) { // autoPlay
        oBox.timer = setInterval(toNxt, ckTime);
        oBox.onmouseover = function() {
            clearInterval(oBox.timer);
        };
        oBox.onmouseout = function() {
            oBox.timer = setInterval(toNxt, ckTime);
        };
    }
    btnLeft.onclick = toPre;
    btnRight.onclick = toNxt;

    function tab() { // 切换函数
        for (let i = 0; i < aCl.length; i++) {
            aCl[i].className = '';
        }
        oWin.style.transitionDuration = '.3s';
        oWin.style.transform = 'translateX(' + -(oCataLog.curIndex + 1) * oTabWidth + 'px)';
        aCl[oCataLog.curIndex].className = 'active';
    }
    for (let i = 0; i < aCl.length; i++) {
        aCl[i].index = i;
        aCl[i].onmouseover = CataLogEvent;
    }
    function CataLogEvent() {
        oCataLog.curIndex = this.index;
        tab();
    }
    function toNxt() {
        oCataLog.curIndex++;
        if (oCataLog.curIndex == aCl.length) { // reset
            oCataLog.curIndex = 0;
            oWin.style.transitionDuration = '0s';
            oWin.style.transform = 'translateX(' + 0 + 'px)';
            getComputedStyle(oWin).transform;
        }
        aCl[oCataLog.curIndex].className = 'active';
        tab();
    }
    function toPre() {
        oCataLog.curIndex--;
        if (oCataLog.curIndex == -1) { // reset
            oCataLog.curIndex = aTab.length - 3;
            oWin.style.transitionDuration = '0s';
            oWin.style.transform = 'translateX(' + -(aTab.length - 1) * oTabWidth + 'px)';
            getComputedStyle(oWin).transform;
        }
        aCl[oCataLog.curIndex].className = 'active';
        tab();
    }
}
