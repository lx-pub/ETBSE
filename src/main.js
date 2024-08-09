// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
const app = createApp(App)


// (1) vue router
// import router from '@/plugins/router.js'
// app.use(router)
// (2) pinia
// import pinia from '@/plugins/pinia.ts'
// app.use(pinia)
// (3) element-plus
import ElementPlus from 'element-plus'
app.use(ElementPlus)
import 'element-plus/dist/index.css'
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// for (const [key, component] of Object.entries(ElementPlusIconsVue)){
//     app.component(key, component)
// }

const div = document.createElement('div')
div.id = 'myapp'



let debug = ()=>{
    let first = document.body.firstChild
    document.body.insertBefore(div, first)
    console.log(div)
    app.mount('#myapp')
}

let dist = ()=>{
    setTimeout(()=>{
        console.log('polling element...')
        let form = document.getElementsByClassName('el-input')[0]
        if (!form) return dist()
        // let first = form.firstChild
        // form.insertBefore(div, first)
        // console.log(div)

        document.querySelector('.el-form').insertAdjacentElement('beforebegin', div)
        app.mount('#myapp')
    },100)
}

// debug()
dist()
