const tool = {
    //取登录cookie
    getCookie:function (name) {
        let cookieArr = document.cookie.split('; ');
        for (let i = 0; i < cookieArr.length; i++) {
            let cookieArr2 = cookieArr[i].split('=');
            if (cookieArr2[0] === name) {
                return cookieArr2[1]
            }
        }
        return ''
    },
}
export default tool;

