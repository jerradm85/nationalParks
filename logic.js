'use strict';

const apiKey = 'GT08v6bQTrtSV2ij9z0xJggYCDf4AULoc4T5lIQ5';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&'); 
}

function displayResults(responseJson) {
    console.log(responseJson.data);
    $("#results").removeClass("hidden");
    for(let i=0; i<responseJson.data.length; i++) {
        const item = responseJson.data[i];
        $("#results ul").append(`
        <div>
            <p>${item.name}</p>
        </div>
        `)
    }
}

function getParksData(searchTerm, maxResults) {
    console.log(searchTerm, maxResults);
    const query = formatQueryParams({
        api_key: apiKey,
        limit: maxResults,
        stateCode: searchTerm
    })
    fetch(searchURL+"?"+query)
    .then(res => res.json())
    .then(data => {
        displayResults(data);
    })
}

function watchForm() {
    $('#js-form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search').val();
        const maxResults = $('#js-max-results').val();
        getParksData(searchTerm, maxResults);
    });
}

$(watchForm);