// 函数中的参数分别为 cookie 的名称、值以及过期天数
// function setCookie(c_name, value, expiredays) {
//   var exdate = new Date();
//   exdate.setDate(exdate.getDate() + expiredays);
//   document.cookie =
//     c_name +
//     "=" +
//     escape(value) +
//     (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
// }
// setCookie("name", "zzyn", 1); // cookie过期时间为1天。

// 如果要设置过期时间以秒为单位
export function setCookie(c_name, value, expireseconds) {
    var exdate = new Date();
    exdate.setTime(exdate.getTime() + expireseconds * 1000);
    document.cookie =
        c_name +
        "=" +
        escape(value) +
        (expireseconds == null ? "" : ";expires=" + exdate.toGMTString());
}

export function getCookie(name) {
    var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); //正则匹配
    if ((arr = document.cookie.match(reg))) {
        return unescape(arr[2]);
    } else {
        return null;
    }
}
export function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}