import GitHubAction from './github';


export default angular.module('AngularTestApp.actions', [])
.service('GitHubAction', GitHubAction)
.name