
chrome.browserAction.onClicked.addListener(function(tab) {
   chrome.storage.sync.get('dictionary.enable', function(item) {
        console.log(item);
        message(`Dictionary ${!item}`);
    });
});

chrome.runtime.onInstalled.addListener(function (details){
    if(details.reason == 'install'){
        chrome.storage.sync.set({'dictionary.enable': true}, function() {
          message('Settings saved');
        });
    }
});
