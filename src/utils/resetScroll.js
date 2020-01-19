let timer1, timer2;

/**
 * 滚动条纵向和横向动画复位
 */
export default function resetScroll() {
    clearInterval(timer1);
    clearInterval(timer2);
    // const html = document.documentElement;
    const html = document.getElementById('main');//滚动条所在元素
    if(html.scrollTop > 0) {
        timer1 = animate(html.scrollTop, 0, val => {
            html.scrollTop = val;
        });
    }
    if(html.scrollLeft > 0) {
        timer2 = animate(html.scrollLeft, 0, val => {
            html.scrollLeft = val;
        })
    }
}

/**
 * 在300ms之内，从指定的初始值变化到结束值
 * @param {*} start 
 * @param {*} end 
 * @param {*} callback 
 */
function animate(start, end, callback) {
    const tick = 16;//每隔16ms完成一次变化
    const total = 300;//总时间为300ms
    const times = Math.ceil(total / tick);//变化的总次数
    const dis = (end - start) / times;//每次运动的距离
    let curTimes = 0;//当前变化次数
    let timer = setInterval(() => {
        curTimes ++;
        if(curTimes === times) {
            start = end;
            clearInterval(timer);
        }
        start += dis;
        callback(start);
    }, tick);
    return timer;
}