import { teampreveiwconstant } from '../constants'
const setteampreveiw = (teampreveiw) =>{
    // console.log(teampreveiw);
    
    return {
        type:teampreveiwconstant.SET_TEAMPREVEIW,
        play:teampreveiw.players,
        typ:teampreveiw.type,
        State:teampreveiw
    }
}

const initTeamPreveiw = (teampreveiw) => {

    
    return dispatch => {
        //dispatch(resetTeamPreveiw())
        dispatch(setteampreveiw(teampreveiw))
    }
}

const resetTeamPreveiw = () => {
    return {
        type:teampreveiwconstant.RESETTEAMPREVEIW
    }
}

export const teampreveiwAction = {
    initTeamPreveiw,
    resetTeamPreveiw
}