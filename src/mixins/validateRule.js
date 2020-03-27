

/*校验手机号码*/
const mobile = (rule, value, callback) => {
    const reg = new RegExp('^[1][3,4,5,7,8][0-9]{9}$');
    if (typeof (value) === 'undefined' || value === '') {
        callback('手机号码输入为空');
    } else {
        if (reg.test(value) === false) {
            callback('手机号码输入格式错误');
        }
    }
    callback();
},

/*校验邮箱*/
const email = (rule, value, callback) => {
    const reg = /^[a-z0-9A-Z]+[-|a-z0-9A-Z._]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-z]{2,}$/
    if (typeof(value) === 'undefined' || value === '') {
        callback('邮箱输入为空');
    } else {
        if (reg.test(value) === false) {
            callback('邮箱输入格式错误');
        }
    }
    callback();
}

export default {
  mobile,
  email
}
