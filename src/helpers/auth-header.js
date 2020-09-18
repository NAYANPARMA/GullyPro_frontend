import { storageService } from "../services";

export function authHeader(type='') {
    // return authorization header with jwt token
    let user = storageService.get('TGG');
    if(type  == 'multipart'){
        return { headers: {'Authorization': 'Bearer ' + user, withCredentials: true, 'Content-Type': 'multipart/form-data; boundary=--------------------------929662780281019903479970' }}
    } else {
        if (user) {
            return { headers: {'Authorization': 'Bearer ' + user, withCredentials: true}};
        } else {
            return { headers: {withCredentials: true}};
        } 
    }
}