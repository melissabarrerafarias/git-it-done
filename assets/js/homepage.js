// added variables to referece the <form> (#user-form) and the <input> (#username)
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
// variables to reference the <span> ("#repo-search-term") and empty <div> ("#repos-container")
var repoSearchTerm = document.querySelector("#repo-search-term");
var repoContainerEl = document.querySelector("#repos-container");

// this function will be executed upon a form submission browser event
var formSubmitHandler = function (event) {
    event.preventDefault();

    // gets value from the input element
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    }
    else {
        alert("Please enter the Github username");
    }
    console.log(event);
};
// event.preventDefault() does this: it stops the browser from performing the default action the event wants to it to do. In the case of submitting the form, it prevents the browser
// from sending the form's input data to a URL, as we'll handle what happens with the form input data ourselves

var getUserRepos = function (user) {
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    fetch(apiUrl).then(function (response) {
        // handles potential errors if user searches for non-existent username
        if (response.ok) {
            response.json().then(function (data) {
                displayRepos(data, user);
            });
        } 
        else {
            alert("Error: " + response.statusText);
        }
    })
    .catch(function(error) {
        // Notice this `.catch()` getting chained onto the end of the `.then()` method
        alert("Unable to connect to Github");
    });
};


var displayRepos = function (repos, searchTerm) {
    // check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }

    // clear old content
    repoContainerEl.textContent = "";
    // display search name 
    repoSearchTerm.textContent = searchTerm;

    // (reference notes if confused)
    // loop over repos 
    for (var i = 0; i < repos.length; i++) {
        
        //format repo name 
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //create a container for each repo
        var repoEl =  document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        // this is linking to the single-repo.hmtl so when you click on a repo, itll take you to the open issues
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

        // create a span element to hold repository name 
        var titleEl = document.createElement("span");
        titleEl.textContent  = repoName;

        // append to container 
        repoEl.appendChild(titleEl);

        // creates a status element
        var statusEl =  document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = 
            "<i class = 'fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        }
        else {
            statusEl.innerHTML = 
            "<i class = 'fas fa-check-square status-icon icon-success'></i>";
        }

        //append status to container
        repoEl.appendChild(statusEl);

        // append to container to the dom (check the variables at the top to see where it was appended)
        repoContainerEl.appendChild(repoEl);
    }
    console.log(repos);
    console.log(searchTerm);
}


userFormEl.addEventListener("submit", formSubmitHandler);


// fetch("https://api.github.com/users/octocat/repos").then(function(response) {
//   console.log("inside", response);
// });
// console.log("outside");

// in the console, the second console would print first. This is an example of asynchronous behavior. This kind of asycnhronous behavior if often reffered to as AJAX, 
// which stands for Asynchronous JavaScript and XML. The XML in this term refers to an old-fashiones way of formatting data. Its been replaced by JSON (for the most part). 



// var getUserRepos = function() {
//     fetch("https://api.github.com/users/octocat/repos").then(function(response) {
//     response.json().then(function(data) {
//     console.log(data);
//     })
// });
// };

// this would show an array in the console. Notice the response object in the fetch() logic has a method called json(). This method formats the response as JSON. The json() methos returns
// another Promise, hence the extra then() method, whose callback function captures the actual data. Here we tested a server-side API with hardcoded values (like the Ocotocat username) to
// verify that the API will work at all. Now that we know we can get the data from GitHub, we can update the function to request any user's repos. 



// var getUserRepos = function(user) {
//     // format the github api url
//     var apiUrl = "https://api.github.com/users/" + user + "/repos";

//     // make a request to the url
//     fetch(apiUrl).then(function(response) {
//       response.json().then(function(data) {
//         console.log(data);
//       });
//     });
//   };

// we added a paramater (date) to the getUserRepos() function and inserted the parameter into the GitHub API URL. We then use the newly formatted URL in the subsequent fetch() request. 



// var formSubmitHandler = function(event) {
//     event.preventDefault();

//     // gets value from the input element
//     var username = nameInputEl.value.trim();

//     if (username) {
//         getUserRepos(username);
//         nameInputEl.value = "";
//     }
//     else {
//         alert("Please enter the Github username");
//     }
//     console.log(event);
// };

// in this function we got the value from the input element and sent it over to the getUserRepos() function. We stored the value in its own variable called username. The .trim()
// gets rid of any white space. The we check in the if statement that there is actually a value in that username variable. If there is, we pass that data to getUserRepos() as an argument.
// Then, to clear the form, we clear out the <input> element's value.


// var displayRepos = function(repos, searchTerm) {
//     console.log(repos);
//     console.log(searchTerm);
// }

// This function is set up so that when the response data is converted to JSON, it will be sent from getUserRepos() to displayRepos(). That's what we see happening in getUserRepo()
// displayRepos(data, user). 



// this is the for loop in the displayRepos() : 
// loop over repos
// for (var i = 0; i < repos.length; i++) {
        
//     //format repo name 
//     var repoName = repos[i].owner.login + "/" + repos[i].name;

//     //create a container for each repo
//     var repoEl =  document.createElement("div");
//     repoEl.classList = "list-item flex-row justify-space-between align-center";

//     // create a span element to hold repository name 
//     var titleEl = document.createElement("span");
//     titleEl.textContent  = repoName;

//     // append to container 
//     repoEl.appendChild(titleEl);

//     // append to container to the dom (check the variables at the top to see where it was appended)
//     repoContainerEl.appendChild(repoEl);
// }

// In the for loop, we're taking each repository (repos [i]) and writing some of its data to the page. First we format the appearance of the name and repository name. Next we create
// and style a <div> element. Then we create a <span> to hold the formatted repository name. We add that to the <div> we created and add the entire <div> to the container on the HTML. 



// 404, 200, and 500 statuses
// A status code in the 200's means that the HTTP request was successful. Any status code in the 400's indicates that the server received the HTTP request but there's an issue with how
// we made the request, such as missing information. Status codes in the 500's indicate an error with the server we're making a request to or the lack of an internet connection 
// to make the request.



// The .catch() method is the Fetch API's way of handling network errors. When we use the fetch() to create a request, the request might go one of two wways: the request may find its
// destination URL and attempt to get the data in question, which would get returned into the .then() method; or if the request fails, that error will be sent to the .catch() method.




// query parameters - strings appended to the end of URL's - to define actions, pass information, or specify content to the webpage or API endpoint. The ? symbol at the end of the URL
// identifies the parameters. They are assigned valuess in a "key=value" format. ex: https://www.google.com/search?q=javascript. "www.google.com/search" being the URL and "q=javascript"
// being the query parameter.