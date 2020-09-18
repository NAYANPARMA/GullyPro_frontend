import { apiService, storageService } from '../services';

export const contestService = {
    contestList,
    createPrivateContest,
    leaderBoard,
    getTeamDetails,
    historyMatchList,
    getPrizeBreakup
}

function contestList(matchId, contestCode=''){
    if(contestCode.length > 0){
        return apiService.post('contests/list/'+matchId, {code: contestCode})
        .then(contest => {
            // console.log('contest', contest);
            return contest;
        });
    } else {
        return apiService.get('contests/list/'+matchId)
        .then( contests => {
            return contests;
        })
    }
}

function historyMatchList(){
    return apiService.get('history/')
    .then( matchList => {
        return matchList;
    })
}

function createPrivateContest(matchId = 1, params){
    // console.log(matchId, params)
    return apiService.post('createContest/'+matchId, params)
    .then( contest => {
        return contest;
    });
}

function leaderBoard(matchId, contestId){
    return apiService.get('leaderboard/'+matchId+'/'+contestId)
    .then( leaderBoardList => {
        return leaderBoardList;
    })
}

function getTeamDetails(matchId, teamId){
    return apiService.get('teamDetails/'+matchId+'/'+teamId)
    .then( team => {
        return team;
    })
}

function getPrizeBreakup(params){
    return apiService.post('prizeBreakup', params)
    .then(prizeBreakUp => {
        return prizeBreakUp;
    })
}