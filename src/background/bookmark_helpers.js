import { createSpreadsheet, getBookmarkTree } from './google_api_helpers.js'

const SYNC_FILE_NAME_PREFIX = 'Sync File for Sync Bookmarks in Chome Extension'
const COLUMN_NAMES = ['id', 'parentId', 'index', 'title', 'url']

function convertValuesToCellDataArray(vals) {
    return vals.map(v => {
        // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/other#ExtendedValue
        const extendedValue = typeof v === 'number' ? { numberValue: v } : { stringValue: v }
        return { userEnteredValue: extendedValue }
    })
}

function convertBookmarkTreeToSheetsData(tree) {
    // Array of RowData objects (https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/sheets#RowData).
    const rowDataArray = [{ values: convertValuesToCellDataArray(COLUMN_NAMES) }]

    // DFS (preorder) traversal tree for a lil readability once data is uploaded to the sync sheet.
    const stack = []
    if (tree.length > 0) {
        stack.push(tree[0])
    }
    while (stack.length > 0) {
        const node = stack.pop()

        rowDataArray.push({
            values: convertValuesToCellDataArray([
                node.id !== undefined ? node.id : null,
                node.parentId !== undefined ? node.parentId : null,
                node.index !== undefined ? node.index : null,
                node.title !== undefined ? node.title : null,
                node.url !== undefined ? node.url : null,
            ])
        })

        if (node.children !== undefined) {
            for (let i = node.children.length - 1; i >= 0; i--) {
                stack.push(node.children[i])
            }
        }
    }

    const gridData = { startRow: 0, startColumn: 0, rowData: rowDataArray }
    const sheet = { data: [gridData] }
    return [sheet]
}

function storeSyncFileInfo(spreadsheet) {
    const spreadsheetId = spreadsheet.spreadsheetId
    const sheetId = spreadsheet.sheets[0].properties.sheetId
    chrome.storage.sync.set({ spreadsheetId, sheetId }).then(() => {
        console.log(`Sync file info stored:\nSpreadsheet ID: ${spreadsheetId}\nSheet ID: ${sheetId}`);
    });
}

export async function createBookmarkSyncFile() {
    const tree = await getBookmarkTree()
    console.log(tree)
    if (tree.hasOwnProperty('error')) {
        return tree
    }

    const sheets = convertBookmarkTreeToSheetsData(tree)
    const spreadsheet = await createSpreadsheet(`${SYNC_FILE_NAME_PREFIX} (${new Date().toISOString()})`, sheets)

    storeSyncFileInfo(spreadsheet)

    return spreadsheet

    // convert bookmark tree to a spreadsheet-compatible format (use the bookmark.js helper module plez)

    // return something!!!
}

export async function syncBookmarksWithSyncFile() {
    // 1) check sync file data
    // 2) sync browser bookmarks to sync file (i.e. sync file overwrites browser bookmarks)
}