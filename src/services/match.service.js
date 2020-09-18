import { apiService, storageService } from '../services';

export const matchService = {
    dashboard,
}

function dashboard(){
    return apiService.get('dashboard')
    .then( matches => {
        // console.log(matches);
        return matches;
    });
}