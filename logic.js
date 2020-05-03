'use strict';

const apiKey = 'GT08v6bQTrtSV2ij9z0xJggYCDf4AULoc4T5lIQ5';
const url = 'https://developer.nps.gov/api/v1/parks';


function displayResults(responseJson) {
    $("#results").html("");
    for(let i = 0; i < responseJson.data.length; i++){
        const item = responseJson.data[i];
        $("#results").append(`<h3>${item.name}</h3>
                <p>${item.description}</p>
                <img src=${item.images[0].url} alt="Image of Park"></img>
                <a href=${item.url} alt="Website URL">${item.url}</a>`)
    }
    $("#results").removeClass("hidden");
}

function getParksData(stateCode, limit) {

    const apiQuery = `${url}?stateCode=${stateCode}&limit=${limit}&api_key=${apiKey}`;

    fetch(apiQuery)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
}

function watchForm() {
    $('#form').submit(e => {
        e.preventDefault();
        const quantity = $("#js-max-results").val();
        const state = $("#js-search").val();
        getParksData(state, quantity);
    })
}

$(watchForm);