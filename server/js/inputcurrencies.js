let userCurrency 
let userSymbol

document.addEventListener('DOMContentLoaded',  function(){
    userCurrency = getUserCurrency()
    initInput()
    setTitle()
})

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
    $('#amount').clone().attr({'id':'amount-currency'}).appendTo( "#amount-fields>div" )
    $('#amount').addClass('hiden')
    $('#amount-currency').attr({type:'number', min:'10'})
    $('#amount-currency').on('input', function() {
        let value = $(this).val()
        if( value < 0 ) value = value * (-1)
        $(this).val(value) 
        value = fx(value).from(userCurrency).to("RUB")
        $('#amount').val(value)
    })
    $('#amount-currency').on('change', function(){
        let min_currency =  fx(minAmount).from("RUB").to(userCurrency)
        if( $(this).val() < min_currency ) { $(this).val(min_currency.toFixed(2)); $('#amount').val(minAmount) }    
    })
}