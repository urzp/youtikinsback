
document.addEventListener('DOMContentLoaded', function(){
    window.onload = function() { 
        
        $('.balance-dropdown__item').click(userSelected)
        if(localStorage.getItem('userCurrency')!='yes') getCurrency()
        setTimeout( userSelectFilter, 300)
        setTimeout( userSelectCurrency(), 300)
        //getCurrency()
    }
});

async function  getCurrency(){
    let lang = $("html").attr("lang")
    selectCurrency(lang)
}

function selectCurrency(lang){
    let code = currencies[lang]
    let f_curr = 'no find'
    $('.balance-dropdown__container #currencies-item').each(function(){
        if( $(this).text().includes(code) ){ f_curr=$(this).text(); setTimeout( ()=>{$(this).click()} , 500 ) }
        localStorage.setItem('userCurrency', 'no')
    })
    //alertData(lang, code, f_curr, localStorage.getItem('userCurrency') )
}

function userSelected(){
    localStorage.setItem('userCurrency', 'yes')
}

function alertData(lan, curr, find_curr, user){
    alert(`
        Lang: ${lan}
        Currency: ${curr}
        Find currency: ${find_curr},
        user set: ${user}
    `)
}

function userSelectFilter(){
    $('[data-filter-category-id]').click(function(){
        localStorage.setItem('data-filter-category-id', $(this).attr('data-filter-category-id') )
    })

    let last_selector = localStorage.getItem('data-filter-category-id')
    if(!!last_selector){
        $(`[data-filter-category-id="${last_selector}"]`).click()
        localStorage.removeItem('data-filter-category-id')
    }
}

function userSelectCurrency(){
    $('#currencies-list [data-rate-key]').click(function(){
        if(!isLogin()){ localStorage.setItem('firest-data-rate-key', $(this).attr('data-rate-key') ) }
    })

    let first_selector_currncy = localStorage.getItem('firest-data-rate-key')
    if(!!first_selector_currncy&&isLogin()){
        $(`[data-rate-key="${first_selector_currncy}"]`).click()
        localStorage.removeItem('firest-data-rate-key')
    }
}

    

