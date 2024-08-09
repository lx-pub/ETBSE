
chrome.runtime.onConnectExternal.addListener((port)=>{
    port.onMessage.addListener(message => {
        console.log(message)
        port.postMessage({res: 'hello too'})
    })
})

chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse)=>{
    sendResponse({test: 'message: external'})
})