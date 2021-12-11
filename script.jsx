/**
 * 1. Initialize an XMLHttpRequest constructor
 * 2. Open a GET request, set the headers and response type
 * 3. Output successful response
 * 4. Output error state
 * 5. Combine with an event listener (button)
 * 6. Adjust UI states accordingly
 * 7. Bonus: change button CTA to indicate if it's the first joke or a "next" one
 */

const buttonSelector = document.getElementById('button');
const buttonCtaSelector = document.getElementById('cta');
const jokeSelector = document.getElementById('joke');
const errorSelector = document.getElementById('error-message');
const errorContainerSelector = document.getElementById('error-container');
const loaderSeletor = document.getElementById('loader');

const API_ENDPOINT = 'https://icanhazdadjoke.com/';
const XHR = new XMLHttpRequest();

function setDisablesUiState(isDisabled) {
  setLoaderState(isDisabled);
  setButtonState(isDisabled);
}

function showJoke(joke) {
  setDisablesUiState(false);
  jokeSelector.innerHTML = joke;
}
function showError(error) {
  setUiState(false);
  errorSelector.innerHTML = error;
  errorContainerSelector.style.display = 'block';
};
function setLoaderState(isVisible) {
  const displayState = isVisible ? 'block' : 'none'
  loaderSeletor.style.display = displayState;
}

function setButtonState(isDisabled) {
  if (isDisabled) {
    buttonSelector.setAttribute('disabled', 'disabled');
  } else {
    buttonSelector.removeAttribute('disabled');
  }

  const buttonCtaState = isDisabled ? 'none' : 'block';
  buttonCtaSelector.style.display = buttonCtaState;
}

function setButtonCta(isError) {
  const buttonCta = isError ? 'Try Again' : 'Get another one';
  buttonCtaSelector.innerHTML = buttonCta;
}

function getJoke() {
  XHR.open('GET', API_ENDPOINT);

  XHR.setRequestHeader('Accept', 'application/json');
  XHR.responseType = 'json';

  XHR.onload = function () {
    showJoke(XHR.response.joke)
    setButtonCta(false)
  };

  XHR.onerror = function () {
    showJoke('An error occured, please try again')
    setButtonCta(true)
  }

  XHR.send();
}

buttonSelector.addEventListener('click', function () {
  setDisablesUiState(true);
  getJoke()
});