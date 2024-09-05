import { Button, Text } from '@mantine/core';

function createBookmarkSyncFileFrontend() {
    chrome.runtime.sendMessage(
        { message: 'createBookmarkSyncFile' },
        (response) => {
            if (response !== true) {
                // TODO: replace this by showing error to user in extension
                console.log(response.errorMessage)
            }
        }
    )
}

export const CreateFile = () => {
    return (
        <>
            <Button
                onClick={createBookmarkSyncFileFrontend}
                styles={{ root: { height: 120, width: 100 } }}
                variant="gradient"
                gradient={{ from: 'blue', to: 'green', deg: 90 }}
            >
                <Text styles={{ root: { textWrap: "pretty" } }} >CREATE NEW SYNC FILE</Text>
            </Button>
        </>
    )
}
