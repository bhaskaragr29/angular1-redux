class GitHubComponentController {
    
    constructor($scope, $ngRedux, GitHubAction) {

        this.loadUsers = GitHubAction.loadUsers;
        this.ngRedux = $ngRedux;

        let unsubscribe = this.ngRedux.connect(this.mapStateToThis)(this);
        $scope.$on('$destroy', unsubscribe);
    }

    /**
     * Maps state properties to this controller
     * @method mapStateToThis
     * @param {Object} state - state of the application
     * @returns {Object} state to fill the component
     */
    mapStateToThis(state) {
      
      return {
        isFetching: state.githubReducer.isFetching,
        error: state.githubReducer.error,
        data: state.githubReducer.map
      };
    }
};

GitHubComponentController.$inject = ['$scope', '$ngRedux', 'GitHubAction'];

export default {
    controllerAs: 'gitHubContainer',
    controller: GitHubComponentController,
    template: `
    <div>
      <p class="lead">Latest Github Users</p>
      <div
        ng-if="gitHubContainer.error"
        class="alert alert-danger">
        An error occured: {{ gitHubContainer.error | json }}
      </div>
      <ul class="list-inline">
        <li>
          <button
            class="btn btn-primary"
            ng-class="{'btn-disabled': gitHubContainer.isFetching}"
            ng-disabled="gitHubContainer.isFetching"
            ng-click="gitHubContainer.loadUsers()">
            Request Posts
            <img
              ng-show="gitHubContainer.isFetching"
              src="http://jxnblk.com/loading/loading-spin.svg" />
          </button>
        </li>
      </ul>
      <p class="lead" ng-if="gitHubContainer.data.length <= 0">No posts loaded.</p>
      <ol ng-if="gitHubContainer.data.length > 0">
        <li ng-repeat="post in gitHubContainer.data">
          {{ post.login }}
        </li>
      </ol>
    </div>
    `
};
