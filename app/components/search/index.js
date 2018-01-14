class SearchComponentController {

    constructor($scope, $timeout) {
        this.$timeout = $timeout;
        this.$scope = $scope;
    }

    searchUser() {
        console.log(this);
        this.onUpdate({'username': this.content});
    }
}

SearchComponentController.$inject = ['$timeout'];

export default {
    controllerAs: 'SearchBar',
    controller: SearchComponentController,
    template: `
    <div> {{SearchBar.content}}</div>
    <input type="text" name="username" ng-model="SearchBar.content"
        ng-minlength="3" ng-maxlength="100"></input>
        <button
            class="btn btn-primary"
            ng-click="SearchBar.searchUser()">
            Search For Github User
        </button> `,
    bindings: {
        onUpdate: '&',
        content: '<'
    }
}