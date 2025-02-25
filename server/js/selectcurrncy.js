
document.addEventListener('DOMContentLoaded', function(){
    window.onload = function() { 
        
        $('.balance-dropdown__item').click(userSelected)
        if(localStorage.getItem('userCurrency')!='yes') getCurrency()
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
    

