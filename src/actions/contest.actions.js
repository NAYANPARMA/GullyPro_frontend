import { contestConstants } from '../constants';
import { contestService, storageService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';
import { notify } from '../common/Toast/toast';
import { createTeamActions } from './createteam.action';



const resetState = () => {
    return{
        type:contestConstants.RESET,
    } 
}

export const contestActions = {
    getContestList,
    submitPrivateContest,
    resetState
}

function getContestList(matchId) {
    return dispatch => {
        dispatch(request({ matchId: matchId, loading: true }));

        contestService.contestList(matchId)
        .then(
            contest => {
                // console.log(contest);
                dispatch(success(contest,matchId));
            },
            error => {
                dispatch(failure(error.toString()));
                notify(error.toString());
            }
        )
    }

    function request(matchId) { return { type: contestConstants.GET_CONTEST_REQUEST, matchId } }
    function success(contest) { return { type: contestConstants.GET_CONTEST_SUCCESS, contest,matchId,loading:false } }
    function failure(error) { return { type: contestConstants.GET_CONTEST_ERROR, error } }
}

function submitPrivateContest(matchId, contest){
    return dispatch => {
        // console.log(contest.matches, matchId);
        let matches = contest.matches;
        let contestData = contest.contest;
        // let createdTeams = contest.matches[matchId].created_teams, teamsAllowed = contestData.team_allowed;
        dispatch(request({ contest, loading: true}));

        contestService.createPrivateContest(matchId, contestData)
        .then(
            contest => {
                if(contest.data.status == 'success'){
                    dispatch(success(contest));
                    notify(contest.data.message);
                    history.replace('/contests/share-contest/'+matchId+'/'+contest.data.contest_code, {matches: matches});
                }

            },
            error => {
                dispatch(failure(error.toString()));
                notify(error.toString());
            }
        )
    }

    function request(contest) { return { type: contestConstants.CREATE_CONTEST_REQUEST, contest } }
    function success(contest) { return { type: contestConstants.CREATE_CONTEST_SUCCESS, contest } }
    function failure(error) { return { type: contestConstants.CREATE_CONTEST_ERROR, error } }
}