import { userConstants } from '../constants';
import { userService, storageService } from '../services';
import { history } from '../helpers';
import { notify } from '../common/Toast/toast';
import { wallet } from '../common/Header/Header';

export const userActions = {
    login,
    logout,
    register,
    otpAuthenticate,
    registerUser,
    resendOTP
};

function login(mobile, redirectTo) {
    return dispatch => {
        dispatch(request({ mobile }));

        userService.login(mobile, redirectTo)
            .then(
                user => { 
                    // console.log('useraction',redirectTo);
                    if(user.data.user_exists == 1){
                        storageService.set('mobile', mobile);
                        dispatch(success(user, {mobile: mobile}));
                        history.push({pathname:'/otp', state: {mobile: mobile, redirectTo: redirectTo}});
                    } else {
                        storageService.set('mobile', mobile);
                        dispatch(success(user, {mobile: mobile}));
                        history.push({pathname:'/register', state: {mobile: mobile, redirectTo: redirectTo}});
                    }
                    notify(user.data.message);
                    // dispatch(alertActions.success(user.data.message));


                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                    notify(error.toString());
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user, mobile) { return { type: userConstants.LOGIN_SUCCESS, user, mobile } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function otpAuthenticate(params, redirectTo) {
    // console.log('otp', params);
    let otp = params.otp;
    return dispatch => {
        dispatch(request({ params }));

        userService.otpAuthenticate(params)
        .then(
            user => {
                // console.log('useraction', user);
                if(user.status == 'success'){
                    dispatch(success(user));
                    wallet(user.data.total_balance);
                    // history.push('/');
                    // history.go(-2);
                    history.replace(redirectTo);
                    // dispatch(alertActions.success(user.data.message));
                    // notify(user.data.message);
                } else {
                    dispatch(failure(user));
                    // dispatch(alertActions.error(user.data.message));
                    notify(user.message);
                }
            },
            error => {
                dispatch(failure(error.toString()));
                // dispatch(alertActions.error(error.toString()));
                notify(error.toString());
            }
        );
    };

    function request(user) { return { type: userConstants.OTP_REQUEST, user } }
    function success(user, mobile) { return { type: userConstants.OTP_SUCCESS, user, mobile } }
    function failure(error) { return { type: userConstants.OTP_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function registerUser(params, redirectTo) {
    return dispatch => {
        dispatch(request(params));
        userService.registerOtpUser(params)
        .then(
            user => {
                // console.log(redirectTo);
                if(user != undefined){
                    if(user.status == 'success'){
                    dispatch(success(user));
                    // history.push('/');
                        if(redirectTo != undefined && redirectTo!='/login' && redirectTo !='/register'){
                            // console.log(1, redirectTo);
                            history.replace(redirectTo);
                        } else {
                            // console.log('register', user, redirectTo);
                            history.replace('/dashboard');
                        }
                        // dispatch(alertActions.success(user.data.message));
                        notify(user.message);
                    } else {
                        dispatch(failure(user));
                        // dispatch(alertActions.error(user.data.message));
                        notify(user.message);
                    }
                }
            },
            error => {
                dispatch(failure(error.toString()));
                // dispatch(alertActions.error(error.toString()));
                notify(error.toString());
            }
        );
    };

    function request(user) { return { type: userConstants.OTP_REQUEST, user } }
    function success(user, mobile) { return { type: userConstants.OTP_SUCCESS, user, mobile } }
    function failure(error) { return { type: userConstants.OTP_FAILURE, error } }
}

function register(user) {
    // console.log(user);
    return dispatch => {
        dispatch(request(user));
        let userData = user
        userService.register(user)
            .then(
                user => { 
                    // console.log('actions', user);
                    if(user.data.status == 'success'){
                        dispatch(success());
                        storageService.set('registerData', JSON.stringify(userData));
                        storageService.set('mobile', userData.mobile);
                        // history.push({pathname:'/otp', state: {isRegister: true}});
                        // dispatch(alertActions.success(user.data.message));
                        notify(user.data.message);
                    } else {
                        dispatch(failure(user));
                        // dispatch(alertActions.error(user.data.message));
                        notify(user.message);
                    }
                    
                },
                error => {
                    // console.log('error');
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                    notify(error.toString());
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function resendOTP(mobile) {
    return dispatch => {
        dispatch(request({ mobile }));

        userService.login(mobile)
            .then(
                user => { 
                    storageService.set('mobile', mobile);
                    dispatch(success(user, {mobile: mobile}));
                    // dispatch(alertActions.success(user.data.message));
                    notify(user.data.message);
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                    notify(error.toString());
                    
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user, mobile) { return { type: userConstants.LOGIN_SUCCESS, user, mobile } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}