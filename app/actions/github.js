import * as GITHUB_CONSTANTS from '../constants/github';
import {bindActionCreators} from 'redux';
import {CONFIG} from '../config';
/**
 * 
 * @param {*}  
 */
export default function GitHubAction($ngRedux, BaseApi) {
    
    const loadUsers = () => dispatch => {
        
        dispatch({
            type: GITHUB_CONSTANTS.GET_GITHUB_USER_REQUEST,
        })
        BaseApi.get({path: CONFIG.API.GITHUB.USERS})
        .then(data => {
            dispatch({
                type: GITHUB_CONSTANTS.GET_GITHUB_USER_SUCCESS,
                data
            });
        })
        .catch(response => {
            dispatch({
                type: GITHUB_CONSTANTS.GET_GITHUB_USER_FAIL,
                response
            });

            return $http.reject(response);
        });
    }
    
    let actionCreator = {
        loadUsers
      };
      return bindActionCreators(actionCreator, $ngRedux.dispatch);
    
}
GitHubAction.$inject = ['$ngRedux', 'BaseApi'];