document.addEventListener('DOMContentLoaded', function(){ 
    $('<div id="filter-56-title">SELECT</div>').insertAfter( '#dropdown-category-filter-56 .fal.fa-filter' )
    let last_selector = localStorage.getItem('data-filter-category-id')
    if(!last_selector){
        $('#dropdown-category-filter-56').click() 
    } 
} )

document.addEventListener('DOMContentLoaded', function(){ 
    $('<div id="filter-56-title">SELECT SERVICE</div>').insertAfter( '#dropdown-category-filter-77 .fal.fa-filter' )
    let last_selector = localStorage.getItem('data-filter-category-id')
    if(!last_selector){
        $('#dropdown-category-filter-77').click() 
    } 
} )

document.addEventListener('DOMContentLoaded', function(){ 
    initClasses()
    headerRatePer()
    let scr_name = get('name')
    if(!!scr_name) scrollToElement( scr_name.replaceAll('_', " ") )
    roundCurrentAll()
    menuSameTab()
    goToReg()
    init_lang_menu()
    $('.sidebar-block__left-menu  [target="_blank"]').attr({'target':''})
})

function get(name){
    if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
       return decodeURIComponent(name[1]);
 }

function scrollToElement(content){
    $("html, body").animate({
        scrollTop: $(`.w-100:contains("${content}")`).offset().top - 100
    }, {
        duration: 370,   
        easing: "linear" 
    });  
}

function headerRatePer(){
    $('.header-label-Rate').text('Rate per 1')
}

async function roundCurrentAll(){
    let select 
    // if($('[data-label="Rate per 1000"] span').length==0){
    //     select = $('[data-label="Rate per 1000"]')
    // }else{
    //     select = $('[data-label="Rate per 1000"] span')
    // }
    select = $('.data-label-Rate')
    
    await select.each(function(){
        let val = roundCurrent( $(this).text() )
        $(this).text(val)  
    })

    $('#service-tbody').addClass('rended')
}

function devide(val, dev){
    let rec = /[0-9/,]+/
    let result = Number((val.match(rec)[0]).replace(',','.'))/dev
    result = result.toString().replace('.',',')
    result = val.split(rec)[0] + result + val.split(rec)[1]
    return result
}

function roundCurrent(value){
    value = devide(value, 1000)
    value = value.replace('≈','')
    val_arr = value.split(',')
    point_part = val_arr[val_arr.length-1].split(' ')[0]
    let right_sumbol =  val_arr[val_arr.length-1].split(' ')[1]
    point_part = `0.${point_part}`
    point_part = Number(point_part).toFixed(5).split('.')[1]
    if(!!right_sumbol) point_part=point_part+' '+right_sumbol
    val_arr[val_arr.length-1] = point_part
    value = val_arr[0]+','+val_arr[1]
    return value
}

function menuSameTab(){
    $('.navbar-nav a').each(function(){
        $(this).attr({'target':'_self'})
    })
}

function goToReg(){
    if($('.block-signin-text__sign-up-link').length>0){
        let lasLink_arr = document.referrer.split('/')
        if(lasLink_arr[lasLink_arr.length-1]=='services'){
            let params = new URLSearchParams(document.location.search); 
            let value =  params.get('service')
            if(!!value){
                value = `service=${value}`
                window.location.replace(`https://user.youtikins.com/signup?${value}`)
            }else{
                return false 
            }
        }
    }else{
        return false
    }
}

function isLogin(){
    if( $(`[href="/logout"]`).length > 0 ){
        return true
    }else{
        return false
    }
}

function initClasses(){
    if(isLogin()){ 

        $('body').addClass('login') 

        $('.services-list__table .table th:nth-child(2)').addClass('header-label-ID')
        $('.services-list__table .table th:nth-child(3)').addClass('header-label-Service')
        $('.services-list__table .table th:nth-child(4)').addClass('header-label-Rate')
        $('.services-list__table .table th:nth-child(5)').addClass('header-label-Min')
        $('.services-list__table .table th:nth-child(6)').addClass('header-label-Max')
        $('.services-list__table .table th:nth-child(7)').addClass('header-label-Description')

        $('#service-tbody tr [data-label]:nth-child(1)').addClass('data-label-Favorite') 
        $('#service-tbody tr [data-label]:nth-child(2)').addClass('data-label-ID')  
        $('#service-tbody tr [data-label]:nth-child(3)').addClass('data-label-Service') 
        $('#service-tbody tr [data-label]:nth-child(4)').addClass('data-label-Rate') 
        $('#service-tbody tr [data-label]:nth-child(5)').addClass('data-label-Min') 
        $('#service-tbody tr [data-label]:nth-child(6)').addClass('data-label-Max') 
        $('#service-tbody tr [data-label]:nth-child(7)').addClass('data-label-OrderBtn') 

    }else{ 

        $('body').addClass('logout') 

        $('.services-list__table .table th:nth-child(1)').addClass('header-label-ID')
        $('.services-list__table .table th:nth-child(2)').addClass('header-label-Service')
        $('.services-list__table .table th:nth-child(3)').addClass('header-label-Rate')
        $('.services-list__table .table th:nth-child(4)').addClass('header-label-Min')
        $('.services-list__table .table th:nth-child(5)').addClass('header-label-Max')
        $('.services-list__table .table th:nth-child(6)').addClass('header-label-Description')

        $('#service-tbody tr [data-label]:nth-child(1)').addClass('data-label-ID')  
        $('#service-tbody tr [data-label]:nth-child(2)').addClass('data-label-Service') 
        $('#service-tbody tr [data-label]:nth-child(3)').addClass('data-label-Rate') 
        $('#service-tbody tr [data-label]:nth-child(4)').addClass('data-label-Min') 
        $('#service-tbody tr [data-label]:nth-child(5)').addClass('data-label-Max') 
        $('#service-tbody tr [data-label]:nth-child(6)').addClass('data-label-OrderBtn') 
        
    }
}

function init_lang_menu(){
    $('.navbar-languages').clone().insertAfter($('.component-footer__public'))
    $($('.navbar-languages')[0]).remove()
    $('.navbar-dropdown__container.dropdown-menu').wrap('<div class="wrap_list"></div>')
    $('.navbar-dropdown__container.dropdown-menu>li').wrapAll('<div class="scroll_listt"></div>')
    $('.navbar-languages').css({'display':'flex'})


}