
console.log('loaded')
chrome.cookies.getAll({domain: 'localhost'}).then(res => console.log(res))

// (1) 已安装
chrome.runtime.onInstalled.addListener(() => {
    console.log('installed')

    let arr = ['page','frame','selection','link','editable','image','video','audio','browser_action','page_action','action']
    arr.forEach((v,i)=>{
        chrome.contextMenus.create({
            id: `${i}`,
            title: `item ${v}`,
            type: ['normal','checkbox','radio','separator'][Math.floor(Math.random()*4)],
            contexts: [v]
        })
    })

    chrome.contextMenus.create({
        id: 'openSidePanel',
        title: 'open side panel',
        contexts: ['all']
    })
    chrome.contextMenus.onClicked.addListener((info, tab)=>{
        if (info.menuItemId === 'openSidePanel'){
            chrome.sidePanel.open({windowId: tab.windowId})
        }
    })

    chrome.commands.getAll().then(res => console.log(res))
    chrome.commands.onCommand.addListener((command, tab)=>{
        // console.log(command,tab)
        switch (command){
            case 'lx-cmd':
                chrome.sidePanel.open({windowId: tab.windowId})
                break
        }
    })
})

// (2) message
chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    sendResponse({test: 'message: normal'})
})
chrome.runtime.onUserScriptMessage.addListener((message, sender, sendResponse)=>{
    sendResponse({test: 'message: user script'})
})
chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse)=>{
    sendResponse({test: 'message: external'})
})


chrome.action.onClicked.addListener((tab)=>{
    chrome.action.setTitle({title: `${new Date().getTime()}`, tabId: tab.id})
    chrome.storage.local.get({signed: false}, ({signed})=>{
        if (signed){
            chrome.action.setPopup({popup: 'popup/signed.html'})
                .then(()=>chrome.action.openPopup({windowId: tab.id}))
        }else {
            chrome.action.setPopup({popup: 'popup/un_signed.html'})
                .then(()=>chrome.action.openPopup({windowId: tab.id}))
        }
    })

})

chrome.contextMenus.onClicked.addListener((info, tab)=>{
    console.log(info, tab)
})

chrome.omnibox.onInputEntered.addListener((text, disposition)=>{
    console.log(text,disposition)
    let url = `https://www.google.com/search?q=${encodeURIComponent(text)}`
    // chrome.tabs.create({ url: url })
})

