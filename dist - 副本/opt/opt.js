let el = (id)=>document.getElementById(id)

let update = ()=>{
    chrome.storage.local.get(({ signed, b_text, b_color, b_bg_color })=>{
        if (signed){
            chrome.action.setPopup({popup: 'popup/signed.html'})
        }else {
            chrome.action.setPopup({popup: 'popup/un_signed.html'})
        }
        console.log(signed, b_text, b_color, b_bg_color)
        chrome.action.setBadgeText({text: b_text})
        chrome.action.setBadgeTextColor({color: b_color})
        chrome.action.setBadgeBackgroundColor({color: b_bg_color})
    })
}

document.addEventListener('DOMContentLoaded', () => {
    update()
    chrome.storage.local.get(
        { signed: false, b_text: 'badge', b_color: '#000000', b_bg_color: '#ffffff' },
        ({ signed, b_text, b_color, b_bg_color }) => {
            el('signed').checked = signed
            el('b_text').value = b_text
            el('b_color').value = b_color
            el('b_bg_color').value = b_bg_color
        }
    )
    // el('configure').onclick = ()=>chrome.runtime.openOptionsPage()
    el('configure').onclick = ()=>window.open(chrome.runtime.getURL('opt/opt.html'))

    el('save').onclick = ()=>{
        chrome.storage.local.set(
            {
                signed: el('signed').checked,
                b_text: el('b_text').value,
                b_color: el('b_color').value,
                b_bg_color: el('b_bg_color').value,
            }, () => {
                el('status').textContent = 'Options saved.'
                setTimeout(() => el('status').textContent = '', 600)
                update()
            }
        )
    }

    el('reload').onclick = ()=>location.reload()
    el('btn').onclick = ()=>{
        chrome.action.setIcon({path: '/favicon.ico'})
    }

})



