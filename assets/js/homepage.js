var getUserRepos = function(user) {
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
};
getUserRepos();


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