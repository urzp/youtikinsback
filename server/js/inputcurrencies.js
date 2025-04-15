let userCurrency 
let userSymbol
let dataExchange

document.addEventListener('DOMContentLoaded',  function(){
    return false //off the script
    getDataExchange()
    userCurrency = getUserCurrency()
    initInput() //converter in input
    setTitle()
})

function getDataExchange(){
    fetch('https://youtikinsback.su/php/getCurrencies.php')
    .then(response => response.json())
    .then(data => {
        dataExchange = data.response;
    })
    .catch(error => {
      console.error('Ошибка:', error);
    });    
}

function getUserCurrency(){
    let symbol = $('.balance-dropdown__name').text().replace(/[0-9]/g, '')
    symbol = symbol.replace(/[\s.,%]/g, '')
    symbol = symbol.replace('≈','')
    userSymbol = symbol
    let currency = currencies_symbols.find(item=>item.includes(symbol)).split(' ')[0]
    return currency
}

function setTitle(){
    let id_t = setInterval(function(){
        if(!!$('#amount_label').html()){
            clearInterval(id_t)
            $('#amount_label').text( $('#amount_label').text() + ' ' + userSymbol)
        }
    },300)
}

function initInput(){
    //$('#amount').clone().attr({'id':'amount-currency'}).prependTo( "#amount-fields>div" )
    $('#amount').before($('#amount').clone().attr({'id':'amount-currency'}))
    $('#amount').addClass('hiden')
    $('#amount-currency').attr({type:'number', min:'1', step:'0.01'})
    $('#amount-currency').on('input', function() {
        let value = $(this).val()
        if( value < 0 ) { value = value * (-1); $(this).val(value) }
        //value = fx(value).from(userCurrency).to("RUB")
        value = Number((value/dataExchange[userCurrency]).toFixed(2))
        $('#amount').val(value)
    })
    $('#amount-currency').on('change', function(){
        //let min_currency =  fx(minAmount).from("RUB").to(userCurrency)
        let min_currency =  Number( (minAmount * dataExchange[userCurrency]).toFixed(2) )
        //if( $(this).val() < min_currency ) { $(this).val(min_currency); $('#amount').val(minAmount) }   
        $('#amount-currency').attr( {min: min_currency} )
    })
}