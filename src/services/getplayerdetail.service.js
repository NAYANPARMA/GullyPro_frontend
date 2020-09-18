import { apiService, storageService } from '../services';

export const playerdetailService = {
    getplayerdetail,
}

function getplayerdetail(match_id,player_id){
    return apiService.get('getPlayerDetails/'+match_id+'/'+player_id)
    .then( player => {
        return player;
    })
}