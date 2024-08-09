<script setup>

import localforage from 'localforage'
import {ref,watchEffect} from 'vue'
import * as XLSX from 'xlsx'
let upload_ref = ref(), upload_data = ref()
let js = ref([]), js_select = ref([]), select = ref()
let preview = ref({data: '', show: false})

let on_change = ()=>{
  let sel = js.value[select.value]
  console.log(sel)

  let inputs = document.getElementsByTagName('input')
  for (let i = 0; i < inputs.length; i++) {
    let inp = inputs[i]
    let placeholder = inp.getAttribute('placeholder')
    if (placeholder != null){
      // inp.setAttribute('value', 123)

      if (placeholder === '统一社会信用代码/纳税人识别号') inp.setAttribute('value', sel['统一信用代码'])
      if (placeholder === '居民身份证号码/手机号码/用户名') inp.setAttribute('value', sel['实名账号'])
      if (placeholder === '个人用户密码') inp.setAttribute('value', sel['密码'])

      let evt = document.createEvent('HTMLEvents')
      evt.initEvent('input', true, true)
      inp.dispatchEvent(evt)
    }
  }
}

let on_exceed_up = (files, uploadFiles)=>{
  upload_ref.value.handleRemove(uploadFiles[0])
  upload_ref.value.handleStart(files[0])
}
let on_preview_up = async ()=>{
  let wb = XLSX.read(await upload_data[0].raw.arrayBuffer())
  let ws = wb.Sheets[wb.SheetNames[0]]
  preview.value.data = XLSX.utils.sheet_to_html(ws)
  preview.value.show = true
}
let on_change_up = async (uploadFile, uploadFiles)=>{
  let wb = XLSX.read(await uploadFile.raw.arrayBuffer())
  let ws = wb.Sheets[wb.SheetNames[0]]
  js.value = XLSX.utils.sheet_to_json(ws)
  js_select.value = XLSX.utils.sheet_to_json(ws).map(v =>{
    let w = {}
    w.value = v['__rowNum__']-1
    w.label = v['公司名称']
    return w
  })
  // console.log(js, js_select)
}

</script>

<template>
  <div class="bg-cyan-500">
    <el-upload v-model:file-list="upload_data" :auto-upload="false" :show-file-list="false"
               ref="upload_ref" :limit="1" accept=".xlsx,.xlsb,.xls"
               :on-exceed="on_exceed_up" :on-preview="on_preview_up" :on-change="on_change_up"
               class="flex flex-col"><el-button>上传文件</el-button></el-upload>

    <el-dialog v-model="preview.show">
      <div v-html="preview.data"></div>
    </el-dialog>

    <el-select-v2 :options="js_select" v-model="select" filterable @change="on_change"></el-select-v2>
    <!--    {{select}}-->

    <!--      <div class="bg-green-300">-->
    <!--        <form data-v-d2dabd3a="" class="el-form"><div data-v-d2dabd3a="" class="el-form-item is-required">&lt;!&ndash;&ndash;&gt;<div class="el-form-item__content"><div data-v-d2dabd3a="" class="el-row" style="width: 100%;"><div data-v-d2dabd3a="" aria-haspopup="listbox" role="combobox" aria-owns="el-autocomplete-10" class="el-autocomplete creditCode" style="width: 100%;"><div class="el-input">&lt;!&ndash;&ndash;&gt;<input type="text" autocomplete="off" valuekey="value" placeholder="统一社会信用代码/纳税人识别号" fetchsuggestions="function () { [native.json code] }" triggeronfocus="true" debounce="300" placement="bottom-start" popperappendtobody="true" class="el-input__inner" role="textbox" aria-autocomplete="list" aria-controls="id" aria-activedescendant="el-autocomplete-10-item&#45;&#45;1">&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;</div><div role="region" class="el-autocomplete-suggestion el-popper" style="display: none;"><div class="el-scrollbar"><div class="el-autocomplete-suggestion__wrap el-scrollbar__wrap" style="margin-bottom: -15px; margin-right: -15px;"><ul class="el-scrollbar__view el-autocomplete-suggestion__list" role="listbox" id="el-autocomplete-10"></ul></div><div class="el-scrollbar__bar is-horizontal"><div class="el-scrollbar__thumb" style="transform: translateX(0%);"></div></div><div class="el-scrollbar__bar is-vertical"><div class="el-scrollbar__thumb" style="transform: translateY(0%);"></div></div></div></div></div></div>&lt;!&ndash;&ndash;&gt;</div></div><div data-v-d2dabd3a="" class="el-form-item is-required">&lt;!&ndash;&ndash;&gt;<div class="el-form-item__content"><div data-v-d2dabd3a="" class="el-row" style="width: 100%;"><div data-v-d2dabd3a="" class="mobileInp el-input" style="width: 100%;">&lt;!&ndash;&ndash;&gt;<input type="text" autocomplete="off" placeholder="居民身份证号码/手机号码/用户名" class="el-input__inner">&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;</div></div>&lt;!&ndash;&ndash;&gt;</div></div>&lt;!&ndash;&ndash;&gt;<div data-v-d2dabd3a=""><div data-v-d2dabd3a="" class="el-form-item is-required" style="position: relative;">&lt;!&ndash;&ndash;&gt;<div class="el-form-item__content"><div data-v-59f7d852="" data-v-d2dabd3a="" class="caps_lock_container" style="position: absolute; top: -29px; left: 34px; display: none;"><img data-v-59f7d852="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAYZJREFUOE+tlLtLA0EQxr/ZSwSDhYj/gIUpFVFIYmEUI4KdkMbSRqIExN7SVrRITLCxUwRrwSTgo9AIitjG2k4kVYQkdyN7ee7e5XyQqZadvd9+M/vNEfoU1CcOPEGcXZgEKvMAgs0LS0DghhLXr7oAVxCfzI2jUk3DsBYBoZ2xGKZRQMCfpPW7txbQAeLjSBQWXwAYbd/KzZV6+gOC4rTxcCuzSor3V4MYei+CxbCSE7wGYkJdnHZ9wSCrjNpYmJLnJRWUCeVAFFMgUo2oTduaLP+z1lUGOE+Jx+U2iA9DExjEC5jknlqEVZ2xQWLgSWsyg5jxhakOKBvaBujAAbGV9ATJrFS10w1KA7T5T1DmZ5B3j1qKFFDv0sB7EABM2nWxsFaaV7PdfdRQozfb3s3OXgHmEmC/XCekj2SYdKY5jwEjT4n7zvPboNRKEP7PIhhOQzpBDEIZtZEwJS9VQ9qwo0gU4pcjYlGctlxGpFVLY2jrKRj1mPvQ+goI+LyHtrs1f/mNfAMWS6A71kzVHgAAAABJRU5ErkJggg=="><span data-v-59f7d852="" class="content">请注意：键盘大写已打开</span></div><div data-v-d2dabd3a="" class="el-row" style="width: 100%;"><div data-v-d2dabd3a="" class="pwdInp el-input el-input&#45;&#45;suffix" style="width: 100%;">&lt;!&ndash;&ndash;&gt;<input type="password" autocomplete="new-password" maxlength="20" placeholder="个人用户密码" class="el-input__inner">&lt;!&ndash;&ndash;&gt;<span class="el-input__suffix"><span class="el-input__suffix-inner"><img data-v-d2dabd3a="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAaCAYAAADfcP5FAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAoFJREFUSInt1ktoVVcUBuAv12hUREWi+MBHKaiD0kJFPJOIVRAUPaJWhAoOfJTjREqgOlBROiqKiHQQm2pAUMEHyo0oCrU4uykUaicdiCi+FQqhj9hQ8THY++pRk3tvoMaB+WHD2mv/Z+3/rrPOWpcBDGAA7xnqWoqlrfgNF/r78ixNXtgH2jvWYlM9vsW/2IBj/S0qilmDVjQUom8Y2rDkHYhJcRANUEB3PGvASazsRzFrcApDo6uzgC14Gh1DI6E5R3obaMBWHMHg6PsPmwv4DpmXmYK9uIjZb0HMLJwXareMf7AuS5Mj5Rr6AYvwEM+iby46hPc7+X8QMg2H8DPm5/z3sDBLk6OEGirjMr7Ck5yvgPVCWyhiOUb1QcQILEM7rmAdBr3Gac3SpFTe1LUUX9gfxwenVrnkNn4Rftkd3Mcf8awR4zEJE4TX80GVeF1Ym6XJ6bygj3BWSGsZuzEcX2BMlaC14i+h193ANoyM/m6szNLkfF1LsfQpTuDD3IPN2BftqdiEJszxZsqr4bFQNyWhHq9G/1IcF3og/I1VdS3F0jkszgX4Bjt7Cf6JUJiz4v5RXEOEj6FbaBflOruDFL/2Eu/zKKpcy9cLXqYN9lQQA9cwNrffgemYGdcMbMydjxMy1COyNDmFL3Ou0QXswo/YLjTJSliIKdF+IgzkTqGwH+BPocfcipwhWFApYJYmh4Qv+SdsrseluGrBZzn7En7vgdOFw0L2CK1ifxVRbcIsfaUPVUMjVuf2rRW4Z3J2E5LeiK+jL4JWCDVB+LvSUYF7FTdzd9Q8sPsiKD8+LuNuBW4Xjub2E2u9pL4PgtqEGTQKX9fA34d5kf99rZc8B6TXjZsSNMZNAAAAAElFTkSuQmCC" class="eyeAllClass">&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;</span>&lt;!&ndash;&ndash;&gt;</span>&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;</div></div>&lt;!&ndash;&ndash;&gt;</div></div><div data-v-d2dabd3a="" class="form-temp-tip" style="display: none;">请输入<span data-v-d2dabd3a="">个人</span>用户密码</div></div><div data-v-d2dabd3a="" class="el-form-item">&lt;!&ndash;&ndash;&gt;<div class="el-form-item__content"><div data-v-d2dabd3a="" class="el-row" style="width: 100%;"><div data-v-d2dabd3a="" class="el-col el-col-24"><div data-v-7b25fe37="" data-v-d2dabd3a="" class="drag"><div data-v-7b25fe37="" class="drag_bg animate" style="width: 0px;"></div><div data-v-7b25fe37="" class="drag_text">请按住滑块，拖动到最右边</div><div data-v-7b25fe37="" class="handler animate" style="left: 0px;"></div></div></div></div>&lt;!&ndash;&ndash;&gt;</div></div><div data-v-d2dabd3a="" class="el-row" style="width: 100%;"><div data-v-d2dabd3a="" class="el-col el-col-24"><button data-v-d2dabd3a="" type="button" class="el-button loginCls el-button&#45;&#45;primary">&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;<span>登录</span></button></div></div></form>-->
    <!--      </div>-->
  </div>
</template>

<style scoped>

</style>
