
if(document.location.pathname.includes('test.html')) {
    let name = getCookie('name');
    let mail = getCookie('mail');

    if(name == undefined || mail == undefined || !validateEmail(mail)) {
        window.location.replace('index.html'); 
    }

    document.querySelector('#name').textContent = name;
    document.querySelector('#mail').textContent = mail;


    function sendMyForm() {

        let data = '';
        let count = 0;
        let radios = document.querySelectorAll('input[type="radio"]');
        for (let radio of radios) {
            if (radio.checked) {
                count++;
                data = data + `${count};${radio.nextElementSibling.textContent}\r\n`;
            }
        }

        if(document.getElementsByClassName('answer').length > count) {
            alert('Укажите все ответы!');
            return false;
        } else {
            
            (async () => {
                let response = await fetch('save.php', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: 'name='+encodeURIComponent(name)+'&data='+encodeURIComponent(data)
                  });
                let serverAnswer = await response.text();
                if(serverAnswer=='ok') {

                    document.querySelector('.fixedName').style.display = 'none';
                    document.querySelector('.submitForm').style.display = 'none';

                    let elements = document.querySelectorAll('.question');

                    for (let elem of elements) {
                        elem.style.display = 'none';
                    }


                    let a = document.createElement('a');
                    let linkText = document.createTextNode("Скачать ваши результаты");
                    a.appendChild(linkText);
                    a.href = "./result/"+name+".csv";
                    a.style.textAlign = 'center';
                    a.style.fontSize = '30px';
                    a.style.marginTop = '40px';
                    document.querySelector('.content').appendChild(a);

                } else {
                    alert('Ошибка: ' + serverAnswer);
                }
              })();
            
        }

    }


} else {

function validateMyForm() {

        if(Name.value!='' && Mail.value!='') {
            if(!validateEmail(Mail.value)) {
                Mail.classList.add('error');
                return false;
            }
            setCookie('name', Name.value);
            setCookie('mail', Mail.value);
            window.location.replace('test.html'); 
        } else {
            alert('Заполните все поля!');
        }

        return false;
}

Mail.addEventListener("click", ()=>{Mail.classList.remove('error');});

}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  
  function setCookie(name, value, options = {}) {
  
    options = {
      path: '/',
      ...options
    };
  
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
  
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
  
    document.cookie = updatedCookie;
  }
  
  
  function deleteCookie(name) {
    setCookie(name, "", {
      'max-age': -1
    })
  }

  function validateEmail(email) {
    var pattern  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern .test(email);
  }