
function debagLinkOrderLanguges(){
    if(!isLogin()){
        $('[data-service-id]').on('click', function(){
            $("#createQuickOrder").attr("onclick", "").unbind("click")
            let servisId = $(this).attr('data-service-id')
            $("#createQuickOrder").on('click', function(){
                let lang = urlLang[$("html").attr("lang")]
                let url = `https://user.youtikins.com/${lang}/signup?service=${servisId}`
                window.location.href = url;
            })
        })
    }
}

