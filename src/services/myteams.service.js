import { apiService, storageService } from '../services';

export const myteamsservice = {
    myteams,
}

function myteams(id){
    return apiService.get('myteams/'+id)
    .then( matches => {
        
        return matches;
    })
}