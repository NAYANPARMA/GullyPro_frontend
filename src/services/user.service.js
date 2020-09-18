import { apiService, storageService } from '../services';
import { func } from 'prop-types';

export const userService = {
    login,
    otpAuthenticate,
    registerOtpUser,
    logout,
    register,
    getProfiledetails,
    updateProfile,
    helpdesk,
    uploadPan,
    bankVarification
};

function login(mobile) {
    return apiService.post('users/sendVerifyDeviceOTP', { mobile: mobile })
}

function otpAuthenticate(params) {
    return apiService.post('users/authenticate', { mobile: storageService.get('mobile'), otp: params.otp })
        .then(res => {
            if (res.data.status == 'success') {
                storageService.set('user', res.data);
                storageService.set('TGG', res.headers.aut_sess_tok);
            }
            return res.data;
        });
}

function registerOtpUser(params) {
    // let username = data.username;
    let referral = '';
    if (params.hasOwnProperty('referred_by')) {
        referral = params.referred_by
    }
    return apiService.post('users/createUser', { mobile: params.mobile, name: params.name, username: params.username, otp: params.otp, email: params.email, dob: params.dob, gender: params.gender, lat: params.lat, long: params.long, referred_by: referral })
        .then(user => {
            if (user.data.status == 'success') {
                storageService.set('user', user.data);
                storageService.set('TGG', user.headers.aut_sess_tok);
            }
            return user.data;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(params) {
    return apiService.post('users/sendVerifyDeviceOTP', { mobile: params.mobile })
}

function getProfiledetails() {
    return apiService.get('userProfile')
}

function updateProfile(email, name) {
    return apiService.post('updateProfile', { name: name, email: email })
        .then(response => {
            return response
        })
}
function helpdesk(params) {
    return apiService.post('helpDesk', { name: params.name, email: params.emailid, message: params.message })
}

function uploadPan(data) {
    return apiService.postmultipart('panUpload', data)
}

function bankVarification(data) {
    return apiService.post('bankAccountVerification', data)
} 