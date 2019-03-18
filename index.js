'use strict'


function getNews(){
    let userName = $("#js-search-term").val();
    let url='https://api.github.com/users/' + userName + '/repos'
    fetch(url)
    .then(response=>{
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error =>{
        $('#js-error-message').text(`Something went wrong: ${error.message}`);
    })
}


function displayResults(responseJson){
    for(let i=0; i<responseJson.length; i++){
    $("#results-list").append(
        `<li><h3>${responseJson[i].name}</h3></li>
        <li><a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a>`)
    }
    removeHiddenClass();
}

function removeHiddenClass(){
    $("#results").removeClass("hidden");
}

function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      $("#results-list").empty();
      $("#js-error-message").empty();
      getNews()
    });
  }


  
  $(watchForm);
