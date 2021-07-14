// ==UserScript==
// @name         YandexBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://www.pulslive.com/*
// @icon         https://www.google.com/s2/favicons?domain=htmlbook.ru
// @grant        none
// ==/UserScript==

let yandexInput = document.getElementsByName("text")[0];
let buttonCol = document.getElementsByClassName("button mini-suggest__button button_theme_search button_size_search i-bem button_js_inited")[1];

if(buttonCol != undefined){ // Проверяем, что мы на главной странице
    yandexInput.value = "пульс лайф"; // Пишем фразу в поисковую строку
    setTimeout(function(){
        buttonCol.click();// Клик по кнопке поиска
    }, 1000);
}else if(location.hostname === "https://yandex.ru/"){ // Если страница с поисковой выдачей
    let links = document.links; // Собираем коллекцию ссылок
    let goNext = true;
    for(let i=0; i<links.length; i++){ // Перебираем ссылки
        let link = links[i];
        if(link.href.indexOf("pulslive") != -1){ // Ищем ссылку с нужным сайтом
            setTimeout(function(){
                link.click(); // Кликаем по ссылке с нужным сайтом
            }, 3000);
            goNext = false; // запрещаем идти дальше по страницам поисковика
            break; // Останавливаем цикл
        }
    }
  if(goNext){ // Проверяем, можно ли идти далее по страницам поисковика
        let yanext = document.getElementsByClassName("link link_theme_none link_target_serp pager__item pager__item_kind_next i-bem link_js_inited"); // Находим кнопку "Следующая"
        setTimeout(function(){
            yanext.click(); // Кликаем по кнопке следующая
        }, 3000);
    }
}else{ // Любой другой сайт
    let links = document.links; // Коллекция ссылок
    let randomIndex = getIntRandom(0, links.length);
    let link = links[randomIndex];
    if(link.href.indexOf(location.hostname) != -1){ // Если переход внутри сайта
        setTimeout(function(){
            links[randomIndex].click();
        }, 2000);
    }else{ // Если переход на другой сайт, то мы ссылаем браузер на главную страницу нашего сайта
        location.href = "https://www.pulslive.com/";
    }
}

function getIntRandom(min, max){
    return Math.floor(Math.random()*(max-min)+min);
}
