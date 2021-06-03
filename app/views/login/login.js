/* eslint-disable no-undef */
$(function(){
  loginSubmitHandler();
  cancelButtonHandler();
});

const loginForm = $('#login-form');
function loginSubmitHandler() {
  loginForm.on('submit', (event) => {
    $formData = $('#login-form').serializeArray();
    console.log($formData);   
    event.preventDefault();
  })
}