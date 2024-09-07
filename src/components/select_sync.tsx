import { Center, Overlay, Text, Button, SimpleGrid, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

const URL_TEXT_INPUT_ID = 'url_text_input_id'
const VALID_URL_REGEX = /\S*?docs.google.com\/spreadsheets\/d\/(?<spreadsheetId>\S+?)(?:\/|#)gid=(?<sheetId>[0-9]+).*/

function selectBookmarkSyncFile(url: string) {
    const match = VALID_URL_REGEX.exec(url)
    if (match === null || match.groups === undefined) {
        return
    }
    const spreadsheetId = match.groups.spreadsheetId
    const sheetId = match.groups.sheetId
    console.log(spreadsheetId)
    console.log(sheetId)
}

export const WarningOverlay = ({ closeAction }: { closeAction: any }) => {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { url: '' },
        // Functions will be used to validate values at corresponding key.
        validate: {
            url: (value) => ((value && VALID_URL_REGEX.test(value)) ? null : "Invalid Google Sheet URL. Valid example: https://docs.google.com/spreadsheets/d/<spreadsheet ID>#gid=<sheet ID>"),
        },
    });
    return (
        <Overlay color="#000" backgroundOpacity={0.35} blur={15}>
            <Center className='inner-overlay'>
                <SimpleGrid cols={1}>
                    <form onSubmit={form.onSubmit((submission) => {
                        closeAction()
                        selectBookmarkSyncFile(submission.url)
                    })}>
                        <div className='card'>
                            <TextInput
                                label="Please enter URL:"
                                placeholder="Google Sheet URL"
                                id={URL_TEXT_INPUT_ID}
                                type='url'
                                key={form.key('url')}
                                {...form.getInputProps('url')}
                            />
                        </div>
                        <div className='card'>
                            <Text styles={{ root: { textWrap: "pretty" } }}>
                                <span style={{ color: 'red' }}>WARNING: </span>
                                This will overwrite your current bookmarks with the contents of the sync file at this URL (but don't worry too much because a backup of your current bookmarks will be saved as well).
                                <br />Do you wish to proceed?
                            </Text>
                        </div>
                        <div className='card'>
                            <Center>
                                <Group>
                                    <Button type="submit" variant="filled" color="blue">
                                        <Text styles={{ root: { textWrap: "pretty" } }} >YES</Text>
                                    </Button>
                                    <Button onClick={closeAction} variant="filled" color="#63687C">
                                        <Text styles={{ root: { textWrap: "pretty" } }} >NO</Text>
                                    </Button>
                                </Group>
                            </Center>
                        </div>
                    </form>
                </SimpleGrid>
            </Center>
        </Overlay>
    )
}

export const SelectFile = ({ action }: { action: any }) => {
    return (
        <Button
            onClick={action}
            styles={{ root: { height: 120, width: 110 } }}
            variant="filled"
            color="gray"
        >
            <Text styles={{ root: { textWrap: "pretty" } }} >
                ENTER SYNC FILE URL<br />
                <img src="Google_Sheets_logo_(2014-2020).svg" width={30} height={30} />
            </Text>

        </Button>
    )
}
