/*
 * @Author: 鲁遥
 * @Date: 2021-03-30 16:29:40
 * @LastEditTime: 2021-03-31 19:54:52
 * @LastEditors: your name
 * @Description:
 * @FilePath: /waterMark/index.js
 */


let watermark = {}
let setWatermark = (displaytext, cansWidth, cansHeight, cansRotate, cansFont, cansfillBG, cansfillTextAlign, uniqueId) => {
    let id = uniqueId;

    if (document.getElementById(id) !== null) {
        document.body.removeChild(document.getElementById(id));
    }

    //创建一个画布
    let can = document.createElement('canvas');
    //设置画布的长宽
    can.width = cansWidth || 300;
    can.height = cansHeight || 180;

    let cans = can.getContext('2d');
    //旋转角度
    cans.rotate(cansRotate * Math.PI / 180);
    cans.font = `${cansFont}px Vedana`;
    //设置填充绘画的颜色、渐变或者模式
    cans.fillStyle = cansfillBG;
    //设置文本内容的当前对齐方式
    cans.textAlign = cansfillTextAlign;
    //设置在绘制文本时使用的当前文本基线
    cans.textBaseline = 'Middle';
    //在画布上绘制填色的文本（输出的文本，开始绘制文本的X坐标位置，开始绘制文本的Y坐标位置）
    cans.fillText(typeof displaytext == 'string' ? displaytext : displaytext.toString(), can.width / 4, can.height / 2);

    let div = document.createElement('div');
    div.id = id;
    div.style.pointerEvents = 'none';
    div.style.top = '30px';
    div.style.left = '0px';
    div.style.position = 'fixed';
    div.style.zIndex = '100000';
    div.style.width = document.documentElement.clientWidth + 'px';
    div.style.height = document.documentElement.clientHeight + 'px';
    div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat';
    document.body.appendChild(div);
    return id;
}

// 该方法只允许调用一次
/**
 * @description: 
 * @param {*} displaytext 展示的水印文字
 * @param {*} cansWidth 单位画布宽
 * @param {*} cansHeight 单位画布高
 * @param {*} cansRotate 旋转角度
 * @param {*} cansFont 文字fonsSize
 * @param {*} cansfillBG 填充背景颜色
 * @param {*} cansfillTextAlign 文字对齐方式
 */
let hostname = location.hostname;
watermark.set = ({ displayText = hostname, cansWidth = 300, cansHeight = 180, cansRotate = -15, cansFont = 20, cansfillBG = 'rgba(200, 200, 200, 0.20)', cansfillTextAlign = 'left', uniqueId = '98765432.8765432.765432' } = {}) => {
    // let { displayText = hostname, cansWidth = 300, cansHeight = 180, cansRotate = -15, cansFont = 20, cansfillBG = 'rgba(200, 200, 200, 0.20)', cansfillTextAlign = 'left' } = obj;
    let id = setWatermark(displayText, cansWidth, cansHeight, cansRotate, cansFont, cansfillBG, cansfillTextAlign);
    setInterval(() => {
        if (document.getElementById(id) === null) {
            id = setWatermark(displayText, cansWidth, cansHeight, cansRotate, cansFont, cansfillBG, cansfillTextAlign, uniqueId);
        }
    }, 500);
    window.onresize = () => {
        setWatermark(displayText, cansWidth, cansHeight, cansRotate, cansFont, cansfillBG, cansfillTextAlign, uniqueId);
    };
}

export default watermark;