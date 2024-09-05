// Background service workers have to be JS files, so no TS :(
import { createBookmarkSyncFile } from './bookmark_helpers.js'

chrome.runtime.onMessage.addListener(
    (message, _, sendResponse) => {
        switch (message.message) {
            case 'createBookmarkSyncFile':
                let startTime = performance.now()
                createBookmarkSyncFile().then((response) => {
                    if (response.hasOwnProperty('error')) {
                        sendResponse({ 'errorMessage': response.error.message })
                    } else {
                        sendResponse(true)
                    }
                    console.log(`Bookmark sync file created in ${((performance.now() - startTime) / 1000).toFixed(2)} seconds.`)
                })
                break
            default:
                sendResponse('Not a valid function.')
        }
        // Need to return true here cause to send an asynchronous response from the event listener there are 2
        // options and one of which is to just return true from the event listener. This keeps the sendResponse
        // function valid after the listener returns, so you can call it later (https://stackoverflow.com/a/56483156).
        return true;
    }
)

// TODO: sync bookmarks based on bookmark update event hooks.
// Will need to add a listener for every event (enjoy that): https://developer.chrome.com/docs/extensions/reference/api/bookmarks#event
chrome.bookmarks.onChanged.addListener(
    (id, changeInfo) => {
        console.log(id)
        console.log(changeInfo)
    }
)