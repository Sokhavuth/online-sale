// static/scripts/navigate.js
class Navigate{
    constructor(){
        this.page = 0
    }

    async getItem(page){
        $('.pagination .home').attr('src','/images/loading.gif')
        if(page !== 0){
            this.page += page
            if(this.page < 0){
                this.page = 0
            }
        }else{
            this.page = page
        }

        const body = {
            page: this.page,
        }

        $.post('/',body,function(data, status){
            if(data.items.length === 0){
                navigate.page -= 1
                $('.pagination .home').attr('src','/images/home.png')
            }else{
                navigate.generateHmtl(data.items)
            }
        })
    }

    async generateHmtl(items){
        let html = ''

        for(let item of items){
            html += `<li class="item">`
                html += `<a class="thumb" href="/post/${item.id}">`
                    html += `<img src="${item.thumb}" />`
                    if((item.video)&&(item.video !== '[]')){
                        html += `<img class="play-icon" src="/images/play.png"/>`
                    }
                html += `</a>`
                html += `<div>`
                    html += `<a class="title" href="/post/<%= item.id %>">`
                                html += item.title
                    html += `</a>`
                    html += `<p class="price">$${item.price}</p>`
                    html += `<p class="postdate">${(new Date(item.postdate)).toLocaleDateString('it-IT')}</p>`
                html += `</div>`
            html += `</li>`
        }

        $('.Content .newest').html(html)
        $('.pagination .home').attr('src','/images/home.png')
    }
}

const navigate = new Navigate()