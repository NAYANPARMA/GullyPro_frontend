import { teampreveiwconstant } from '../constants'
const initialState = {
    play:{},
    type:'teampreveiw',
    State:{}
};

export const teampreview = (state = initialState, action) => {
     
    switch (action.type){
        case teampreveiwconstant.SET_TEAMPREVEIW :
            return{
                ...state,
                play:{ ...action.play } ,
                type:action.typ,
                State:{ ...action.State }
            }
        case teampreveiwconstant.RESETTEAMPREVEIW:
            return{
                ...state,
                play:{},
                type:null,
                State:{}
            }
        default:
            return state
    }
}