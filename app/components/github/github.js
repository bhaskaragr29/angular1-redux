class GitHubComponentController {
    
    constructor($scope, $ngRedux, GitHubAction) {
        this.loadUsers = GitHubAction.loadUsers;
        this.ngRedux = $ngRedux;

        let unsubscribe = this.ngRedux.connect(this.mapStateToThis)(this);
        $scope.$on('$destroy', unsubscribe);
    }

    $onChanges(changes) {
        if(changes.content.currentValue!== null && 
          changes.content.currentValue != changes.content.previousValue) {
            
           this.loadUsers(changes.content.currentValue);
        }
    };

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
    controllerAs: 'githubcomponent',
    controller: GitHubComponentController,
    template: `
    <div>
      <div
        ng-show="githubcomponent.error"
        class="alert alert-danger">
        An error occured: {{ githubcomponent.error | json }}
      </div>
      <ul class="list-inline">
        <li>
          <button
            class="btn btn-primary"
            ng-class="{'btn-disabled': githubcomponent.isFetching}"
            ng-disabled="githubcomponent.isFetching"
            ng-click="githubcomponent.loadUsers()">
            Request Posts
            <img
              ng-show="githubcomponent.isFetching"
              src="http://jxnblk.com/loading/loading-spin.svg" />
          </button>
        </li>
      </ul>
      <p class="lead" ng-if="githubcomponent.data.length <= 0">No posts loaded.</p>
      <ol ng-if="githubcomponent.data.length > 0">
        <li ng-repeat="post in githubcomponent.data">
          {{ post.login }}
        </li>
      </ol>
    </div>
    `,
    bindings: {
      content: '<'
  }
};
