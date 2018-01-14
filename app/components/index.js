import githubComponent from './github/github';
import searchBar from './search'
import githubContainer from './container/githubContainer';


export default angular.module('AngularTestApp.components', [])
    .component('githubContainer', githubContainer)
    .component('searchBar', searchBar)
    .component('gitHubList', githubComponent)
    .name;