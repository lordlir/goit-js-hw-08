import _throttle from 'lodash.throttle';

const formSub = document.querySelector('.feedback-form');
const emailInput = document.querySelector('.feedback-form input');
const messageInput = document.querySelector('.feedback-form textarea');
const LOCAL_KEY_STORAGE = 'feedback-form-state';

let formData = {};

populateTextAreaInput();

formSub.addEventListener('input', _throttle(onTextAreaInput, 500));

formSub.addEventListener('submit', onFormSubmit);

function onTextAreaInput(e) {
  formData = JSON.parse(localStorage.getItem(LOCAL_KEY_STORAGE)) || {};
  formData[e.target.name] = e.target.value;
  localStorage.setItem(LOCAL_KEY_STORAGE, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(LOCAL_KEY_STORAGE);
  console.log(formData);
}

function populateTextAreaInput() {
  formData = JSON.parse(localStorage.getItem(LOCAL_KEY_STORAGE));
  if (!formData) return;

  emailInput.value = formData.email || '';
  messageInput.value = formData.message || '';
}
