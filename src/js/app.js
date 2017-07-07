/*
 * Application
 */
  /* Home page */
  var phoneMask = ['+','7',' ', /[1-9]/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  var form = document.querySelector('.js-form');
  var form_button = form.querySelector('.js-send-btn');
  var form_group = document.querySelector('.js-phone');
  var myInput = form_group.querySelector('.form-group__input');
  var form_group_message = form_group.querySelector('.form-group__message');
  var form_group_status_icon = form_group.querySelector('.form-group__status-icon');
  $('input[type="tel"]').inputmask({"mask": "+9 (999) 999-99-99"});
  myInput.onchange = function() {
    var message = "Мы позвоним вам сегодня или завтра";
    if (!isInputValid(myInput)){
        form_group.classList.add("form-group_invalid");
        if (!isInputEmpty(myInput)){
            message = "Похоже, вы пропустили цифру в номере телефона";
        }else{
            message = "Оставьте номер телефона, чтобы мы могли с вами связаться";
        }
        form_group_message.innerHTML = message;
        form_group_status_icon.title = message;
    }
  };
  myInput.oninput = function() {
    var message = "Мы позвоним вам сегодня или завтра";
    if (isInputValid(myInput)){
        if (form_group.classList.contains("form-group_invalid")){
            form_group.classList.add("form-group_valid");
        }
        form_group.classList.remove("form-group_invalid");
        form_group_message.innerHTML = message;
        form_group_status_icon.title = message;
    }else{
        if (form_group.classList.contains("form-group_valid")){
            form_group.classList.remove("form-group_valid");
            form_group_message.innerHTML = message;
            form_group_status_icon.title = message;
        }
    }

  };

  function isInputValid(i){
    var valuePhoneClear = String(i.value);
      console.log(i.value);
    valuePhoneClear = valuePhoneClear.replace(/\+/g,'').replace(/\_/g,'').replace(/\)/g,'').replace(/\(/g,'').replace(/\-/g,'').replace(/ /g,'');  
      console.log(valuePhoneClear.length);
    if(valuePhoneClear.length == 11){
        return true;
    }else {
        return false;
    }         
    /*return i.value.toString().length == 16;*/
  }
  function isInputEmpty(i){
    return i.value.toString().length <= 3;
  }
  function sendForm(){
    if (isInputEmpty(myInput)){
        form_group.classList.add("form-group_invalid");
        message = "Оставьте номер телефона, чтобы мы могли с вами связаться";
        form_group_message.innerHTML = message;
        form_group_status_icon.title = message;
        return;
    }
    if (!isInputValid(myInput)){
        message = "Похоже, вы пропустили цифру в номере телефона";
        form_group.classList.add("form-group_invalid");
        return;
    }

    var formData = new FormData(document.forms.form);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "send.php", true);
    xhr.send(formData);
    form.classList.add("form_loading");
    form_button.disabled = true;

    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            alert( 'Упс, произошла ошибка при отправке формы. Убедитесь, что все обязательные поля заполнены и у вас работает интернет, и попробуйте снова. Если проблема возникает снова, напишите нам: info@provocationstudio.ru. Обязательно сообщите все известные вам подробности о проблеме на сайте и мы обязательно сделаем вам скидку! Информация об ошибке: ' + xhr.status + ': ' + xhr.statusText);
        } else {
            yaCounter35792800.reachGoal('contact');
            form.classList.add("form_success");
        }
        form.classList.remove("form_loading");
        form_button.disabled = false;
    }
  }

  var content = document.querySelector('.js-content'), 
    popup = document.querySelector('.js-popup');
  function openForm(){
    fadeOut(content);
    setTimeout(function(){fadeIn(popup)}, 0.15 * 1000);
  }
  function closeForm(){
    fadeOut(popup);
    setTimeout(function(){fadeIn(content)}, 0.15 * 1000);
    form.classList.remove("form_success");
    form.classList.remove("form_loading");
    form_group.classList.remove("form_invalid");
    form_group.classList.remove("form_valid");
    message = "Мы позвоним вам сегодня или завтра";
    form_group_message.innerHTML = message;
    form_group_status_icon.title = message;
    form.reset();
  }

  function fadeOut(element) {
    var op = 0.8;
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.7;
    }, 50);
}
function fadeIn(element) {
    var op = 0.2;
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.7;
    }, 10);
}
function autoGrowTextArea(element) {
    element.style.height = "96px";
    element.style.height = (element.scrollHeight)+"px";
}
$(document).ready(function(){    
    /* Scroll to up */
	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('#scrollup').fadeIn();
		} else {
			$('#scrollup').fadeOut();
		}
	});
	$('#scrollup').click(function(){
		$("html, body").animate({ scrollTop: 0 }, 600);
		return false;
	});   
    
});     