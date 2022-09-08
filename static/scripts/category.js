// static/scripts/category.js

class Navigate{
    constructor(){
        this.page = 0
    }

    async getItem(page,name){
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
            name: name,
        }
        
        $.post(`/navigate`,body,function(data, status){
            if(data.length === 0){
                navigate.page -= 1
                $('.pagination .home').attr('src','/images/home.png')
            }else{
                navigate.generateHmtl(data)
            }
        })
    }

    async generateHmtl(items){
        let html = ''

        for(let item of items){
            html += `<a href="/post/${item.id}">`
                html += `<img src="${item.thumb}" />`
                if((item.video)&&(item.video !== '[]')){
                    html += `<img class="play-icon" src="/images/play.png"/>`
                }
                html += `<p class="date">${(new Date(item.postdate)).toLocaleDateString('it-IT')}</p>`
                html += `<p>${item.title}</p>`
            html += `</a>`
        } 

        $('.Content .outer').html(html)
        $('.pagination .home').attr('src','/images/home.png')
    }
}

const navigate = new Navigate()