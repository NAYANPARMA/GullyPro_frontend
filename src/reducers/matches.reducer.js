import {Matchconstant}  from '../constants'

const initialState = {
    matches:[],
    recommended_contests:[],
    live:[],
    error:false,
    loader:false
    
};
export const upcoming=(state=initialState,action)=>{
    
     switch(action.type){
        case  Matchconstant.SET_MATCHES:
            return{
                ...state,
                matches:action.matches,
                recommended_contests:action.recommended_contests,
                live:action.live,
                loader:false
            }
        case Matchconstant.REQUEST_API:
            return{
                ...state,
                loader:true
            }
        case Matchconstant.STOP_LOADDER:
                return{
                    ...state,
                    loader:false
                }
        default:
                return state  
    }    
}