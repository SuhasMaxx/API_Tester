let $error, $spinner, $outputDiv, $outputArea, $optionsArea, $addOptionsButton; 

function loadElements(){
    $error = document.getElementById("error");
    $spinner = document.getElementById("spinner");
    $outputDiv = document.getElementById("output");
    $outputArea = document.getElementById("output-area");
    $optionField = document.getElementsByClassName("field")[0];
    $optionValue = document.getElementsByClassName("value")[0];
    $optionsArea = document.getElementById('options-area');
    $addOptionsButton = document.getElementById('add-options-btn');
}

function addOptions(){
    const optsTemplate = document.getElementById('options-template').innerHTML;
    const $optionsDiv = document.createElement('div');
    $optionsDiv.classList.add('optional');
    $optionsDiv.innerHTML = optsTemplate;
    $optionsArea.insertBefore($optionsDiv, $addOptionsButton);
}

function showError(errTxt){
    finishedLoad();
    $error.style.display = 'block';
    $error.innerHTML = errTxt ? errTxt : 'Invalid URL or data!';
}

function startLoad(){
    $spinner.style.display = 'inline-block';
}

function finishedLoad(){
    $spinner.style.display = 'none';
}

function clearState(){
    /* $outputDiv.visibility = 'hidden'; */
    $outputDiv.style.display = 'none';
    $outputArea.innerHTML = '';
    $error.style.display = 'none';
    $error.innerHTML = '';
}

function removeBlock(event){
    event.target.parentElement.remove();
}

function getOptionalHeaders(){
    var $optionals = document.getElementsByClassName('optional');
    var optHeaders = {};
    if($optionals.length){
        for(let index = 0; index < $optionals.length; index++){
            const $optional = $optionals[index];
            const attrib = $optional.getElementsByClassName('field')[0].value.trim();
            const value = $optional.getElementsByClassName('value')[0].value.trim();
            if(attrib && value){
                optHeaders[attrib] = value;
            }
        }
    }   
    return optHeaders;
}

function callApi(){
    clearState();
    startLoad();
    let headers = {};
   const strUrl = document.getElementsByName('url')[0].value;
   if(strUrl.trim() === ""){
       showError('Please enter URL');
       return;
   }

   headers = {...headers, ...getOptionalHeaders()}
   /* if($optionField.value && $optionValue.value){
    headers[$optionField.value] = $optionValue.value;
    //headers = {...headers, 'Access-Control-Allow-Origin':'*'}
   } */

   // var myHeaders = new Headers();
   // myHeaders.append("Accept-Language", "EN");
   // myHeaders.append("Authorization", "Basic c29tZXVzZXI6cHN3");
   // myHeaders.append("Cookie", "JSESSIONID=76EBB6061DED825E64C4DD4661D9C6AB");

    // var formdata = new FormData();

    /* var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://localhost:8080/locations/", requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        $outputDiv.style.display = 'block';
       $outputArea.innerHTML = JSON.stringify(result, null, 4)
    })
    .catch(error => console.log('error', error)); */

   fetch(strUrl,{
       headers: headers,
       mode: 'cors',
   })
   .then(response => response.json())
   .then(data => {
       finishedLoad();
       $outputDiv.style.display = 'block';
       $outputArea.innerHTML = JSON.stringify(data, null, 4)
       console.log(data);
   })
   .catch(error => {
    showError();
   });
}