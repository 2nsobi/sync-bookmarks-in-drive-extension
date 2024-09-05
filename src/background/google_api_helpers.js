function returnAndLogError(error) {
    console.log(error)
    return { "error": error }
}

export async function getBookmarkTree() {
    return await chrome.bookmarks.getTree()
        .catch(error => returnAndLogError(error))
}

export async function createSpreadsheet(title, sheets) {
    // A Spreadsheet object: https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets#Spreadsheet
    const spreadsheet = { properties: { title }, sheets }

    return await chrome.identity.getAuthToken({ interactive: true })
        .then(({ token }) => {
            const fetch_options = {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(spreadsheet),
            }
            return fetch(
                'https://sheets.googleapis.com/v4/spreadsheets',
                fetch_options
            )
        })
        .then(response => response.json())
        .catch(error => returnAndLogError(error))
}
