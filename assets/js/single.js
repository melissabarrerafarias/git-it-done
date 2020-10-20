var issuesContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");

var getRepoName = function() {
    var queryString = document.location.search;
    var repoName = queryString.split("=")[1];
    getRepoIssues(repoName);
    repoNameEl.textContent = repoName;
}

var getRepoIssues = function(repo) {
    console.log(repo);
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function (response) {
        //request was successful
        if (response.ok) {
            response.json().then(function (data) {
                // pass response data to dom function 
                displayIssues(data);

                //check if api has paginated issues 
                if (response.headers.get("Link")) {
                    displayWarning(repo);
                }
            });
        }
        else {
            alert("There was a problem with your request!");
        }
    });
};

// reference notes
var displayIssues = function(issues) {

    if (issues.length === 0) {
        issuesContainerEl.textContent = "This repo has no open issues!";
        return;
    }

    for (var i = 0; i < issues.length; i++) {
        // create a link element to take users to the issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        //create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        //append to container 
        issueEl.appendChild(titleEl);

        //create a type element
        var typeEl = document.createElement("span");

        //check if issue is an actual issue or a pull request 
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        }
        else {
            typeEl.textContent = ("Issue");
        }

        //append to container 
        issueEl.appendChild(typeEl);

        // append to html 
        issuesContainerEl.appendChild(issueEl);
    }
};

// in case there are 30+ issues
var displayWarning = function(repo) {

    // add text to warning container 
    limitWarningEl.textContent = "To see more than 30 issues, visit ";

    var linkEl = document.createElement("a");
    linkEl.textContent = "See More issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    //append to warning container 
    limitWarningEl.appendChild(linkEl);
};

getRepoIssues();
getRepoName();
// var getRepoIssues = function(repo) {
//     console.log(repo);
//     var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

//     fetch(apiUrl);
// };

// Using the endpoint listed in the documentation, we can format the URL as we just did. We appended the ?direction=asc to the end of the query URL to specify the sort order. By default, 
// Github returns the request results in descending order, meanign we see the newer issues first. The ?direction=asc option reverses order to return older issues first. The fetch() made
// the request.




// fetch(apiUrl).then(function (response) {
//     //request was successful
//     if (response.ok) {
//         response.json().then(function (data) {
//             console.log(data);
//         });
//     }
//     else {
//         alert("There was a problem with your request!");
//     }
// });

// we used the then() to actually recieve and handle the server's response. The (response.ok) indicates a successful request. 




// var displayIssues = function(issues) {
//     for (var i = 0; i < issues.length; i++) {
//         // create a link element to take users to the issue on github
//         var issueEl = document.createElement("a");
//         issueEl.classList = "list-item flex-row justify-space-between align-center";
//         issueEl.setAttribute("href", issues[i].html_url);
//         issueEl.setAttribute("target", "_blank");
//     }
// };

// This will loop over the response data and create an <a> element for each issue. Similar to what we did in homepage.js, the biggest difference being the data we're working with.
// Issue objects have an html_url property, which links to the full issue on GitHub. We also added a target="_blank" attribute to each <a> element, to open the link in a new tab instead
// of replacing the current webpage. 