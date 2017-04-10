// 正则表达式
var mailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
var passwordRegex = /^\S{6,16}$/;
var digitRegex = /\d/;
var alphaRegex = /[a-zA-Z]/;
var charRegex = /[^a-zA-Z0-9]/;
var telRegex = /^\d{11}$/;
var qqRegex = /^\d{5,15}$/;

//校验邮箱
function checkMail(mail) {
    return mail.match(mailRegex) ? true : false;
}
//校验密码,正确返回true,错误返回 提示
function checkPassword(pwd) {
 
    var charTypes = 0;
    if (pwd.match(digitRegex)) {
        charTypes++;
    }
    if (pwd.match(alphaRegex)) {
        charTypes++;
    }
    if (pwd.match(charRegex)) {
        charTypes++;
    }
    var isPassword = (pwd.match(passwordRegex) ? true : false);
    if (isPassword) 
        return true;
    else
        return '请输入6-16位字符的密码';
}

//校验手机号
function checkPhone(tel) {
    return tel.match(telRegex) ? true : false;
}

