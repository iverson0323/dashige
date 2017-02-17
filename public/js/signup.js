var loginReg = /\/user\/login/;
var signupReg = /\/user\/signup/;
var url = window.location.href;


var userModule = {
    signupInit: function () {
        this.handelSignupBtnClick();
    },
    loginInit: function () {
        this.handleLoginBtnClick();
    },
    handleLoginBtnClick: function () {
        $('.btn').on('click', function () {
            var resultObj = this.getLoginVal();
            if (resultObj.error == 1) {
                var classNameTag = $(`.${resultObj.className}`);
                classNameTag.siblings('.info').addClass('moveTxt').html(resultObj.msg);
                classNameTag.val('').focus();
                this.inputEvent();
            } else if (resultObj.error == 0) {
                this.ajax('post', '/user/login', (data)=> this.locationHref(data), resultObj.data);
            }
        }.bind(this));
    },
    getLoginVal: function () {
        var username = $('.username').val();
        var password = $('.password').val();
        if (!username) {
            return {
                error: 1,
                className: 'username',
                msg: '* 请填写用户名信息'
            };
        } else if (!password) {
            return {
                error: 1,
                className: 'password',
                msg: '* 请填写密码信息'
            };
        }
        return {
            error: 0,
            data: {
                username,
                password
            }
        }
    },
    handelSignupBtnClick: function () {
        $('.btn').on('click', function () {
            var resultObj = this.getSignupVal();
            if (resultObj.error == 1) {
                var classNameTag = $(`.${resultObj.className}`);
                classNameTag.siblings('.info').addClass('moveTxt').html(resultObj.msg);
                classNameTag.val('');
                if (resultObj.className == 'initial_password') {
                    $('.confirm_password').val('');
                }
                classNameTag.focus();
                this.inputEvent();
            } else if (resultObj.error == 0) {
                this.ajax('post', '/user/signup', (data)=> this.locationHref(data), resultObj.data);
            }
        }.bind(this));
    },
    locationHref: function (data) {
        if (data.error == 1) {
            window.location.href = data.redirectUrl;
        } else if (data.error == 0) {
            window.location.href = data.redirectUrl;
        }

    },
    inputEvent: function () {
        $('input').on('input', function (event) {
            var $curEle = $(event.target);
            var $nextEle = $curEle.siblings('.info');
            if ($nextEle.hasClass('moveTxt')) {
                $nextEle.removeClass('moveTxt');
            }
        });
    },
    getSignupVal: function () {
        var username = $('.username').val();
        var initialPassword = $('.initial_password').val();
        var confirmPassword = $('.confirm_password').val();
        var email = $('.email').val();
        if (!username) {
            return {
                error: 1,
                className: 'username',
                msg: '*请填写用户名信息'
            }
        } else if (!initialPassword) {
            return {
                error: 1,
                className: 'initial_password',
                msg: '*请填写您的密码'
            }
        } else if (initialPassword !== confirmPassword) {
            return {
                error: 1,
                className: 'initial_password',
                msg: '*两次密码不一样'
            }
        } else if (!email) {
            return {
                error: 1,
                className: 'email',
                msg: '*请填写您的邮箱'
            }
        }
        return {
            error: 0,
            data: {
                username: username,
                password: initialPassword,
                email: email
            }
        }

    },
    ajax: function (method, url, callback, data) {
        data = data || null;
        $.ajax({
            method,
            url,
            success: callback,
            data
        });
    }
};

$(document).ready(function () {
    if (signupReg.test(url)) {
        userModule.signupInit();
    } else if (loginReg.test(url)) {
        userModule.loginInit();
    }
    setTimeout(function () {
        document.querySelector('.username').focus();
    }, 300);
});