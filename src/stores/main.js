import {defineStore} from 'pinia';

import {ElMessage} from 'element-plus'

export const useConfigStore = defineStore('config', {
  state: ()=>{
    let data = {
      default: 'setting',
    }
    try { data = JSON.parse(localStorage.getItem('__data')) }
    catch (e){ console.warn('localStorage["__data"] 不是合法的 json') }

    return { data,  }
  },
  getters: {

  },
  actions: {
    test(){ ElMessage.success(JSON.stringify(this.data, null,2)) }
  }
})


import { ref, computed } from 'vue'
