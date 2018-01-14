class GitHubContainerController {
    constructor($timeout) {
        this.searchInput = null;
    }

    updateuser(username) {
        this.searchInput = username.username;
    }

};

//GitHubContainerController.$inject = ['$scope'];

export default {
    controller: GitHubContainerController,
    template: `
        <div class = "github-container">
            <p class="lead">Latest Github Users</p>
            <search-bar content="$ctrl.searchInput" on-update="$ctrl.updateuser({username: username});"></search-bar> 
            <git-hub-list content ="$ctrl.searchInput"></git-hub-list>
        </div>
    `
};