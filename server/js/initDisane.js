document.addEventListener('DOMContentLoaded', function(){ 
    $('<div id="filter-56-title">SELECT</div>').insertAfter( '#dropdown-category-filter-56 .fal.fa-filter' )
    $('#dropdown-category-filter-56').click() 
} )

document.addEventListener('DOMContentLoaded', function(){ 
    $('<div id="filter-56-title">SELECT SERVICE</div>').insertAfter( '#dropdown-category-filter-77 .fal.fa-filter' )
    $('#dropdown-category-filter-77').click() 
} )

document.addEventListener('DOMContentLoaded', function(){ 
    let scr_name = get('name')
    if(!!scr_name) scrollToElement( scr_name.replaceAll('_', " ") )
    roundCurrentAll()
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

function roundCurrentAll(){
    $('[data-label="Rate per 1000"] span').each(function(){
        let val = roundCurrent( $(this).text() )
        $(this).text(val)  
    })
}

function roundCurrent(value){
    val_arr = value.split(',')
    point_part = val_arr[val_arr.length-1].split(' ')[0]
    let right_sumbol =  val_arr[val_arr.length-1].split(' ')[1]
    point_part = `0.${point_part}`
    point_part = Number(point_part).toFixed(2).split('.')[1]
    if(!!right_sumbol) point_part=point_part+' '+right_sumbol
    val_arr[val_arr.length-1] = point_part
    value = val_arr[0]+','+val_arr[1]
    return value
}