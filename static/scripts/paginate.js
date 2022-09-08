//static/scripts/paginate.js

let page = 0

function paginate(route){
    $('.pagination img').attr('src', '/images/loading.gif')
    page += 1
    
    $.post(`${route}/paginate`,{page:page},function(data, status){
        appendItem(data.items,route,data)
    })
}

function appendItem(items, route,data){
    let html = ''
    
    if(items){
        for(let item of items){
            html += `<li>`
                html += `<div class='thumb'>`
                    html += `<a href="/${data.type}/${item.id}">
                                <img src="${item.thumb}"/>`
                                if((item.video)&&(item.video !== '[]')){
                                    html += `<img class="play-icon" src="/images/play.png"/>`
                                }
                    html += `</a>`
                html += `</div>`
                html += `<div class="title">`
                    html += `<a href="/${data.type}/${item.id}">${item.title}</a>`
                    html += `<div>${new Date(item.postdate).toLocaleDateString('it-IT')}</div>`
                html += `</div>`
                html += `<div class="edit">`
                    html += `<a href="${route}/edit/${item.id}"><img src="/images/edit.png"/></a>`
                    html += `<a href="${route}/delete/${item.id}"><img src="/images/delete.png"/></a>`
                html += `</div>` 
            html += `</li>`
        }
    }
    $('.list').append(html)

    if(route === '/admin/user'){
        $('.Footer .list li').css({'grid-template-columns':'13% auto 25%'})
        $('.Footer .list li .thumb').css({'padding-top':'100%'})
        $('.Footer .list li .thumb img').css({'border-radius':'50%'})
    }

    $('.pagination img').attr('src', '/images/load-more.png')
}