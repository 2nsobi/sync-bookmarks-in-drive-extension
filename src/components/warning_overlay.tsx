import { Center, Overlay, Text, Button, SimpleGrid, Group } from '@mantine/core';

export const WarningOverlay = ({ yesAction, noAction }: { yesAction: any, noAction: any }) => {
    return (
        <Overlay color="#000" backgroundOpacity={0.35} blur={15}>
            <Center className='inner-overlay'>
                <SimpleGrid cols={1}>
                    <Text>
                        This will overwrite your current bookmarks with the contents of the sync file you select.
                        <br />Do you wish to proceed?
                    </Text>
                    <Center>
                        <Group>
                            <Button onClick={yesAction} variant="filled" color="blue">
                                <Text styles={{ root: { textWrap: "pretty" } }} >YES</Text>
                            </Button>
                            <Button onClick={noAction} variant="filled" color="#63687C">
                                <Text styles={{ root: { textWrap: "pretty" } }} >NO</Text>
                            </Button>
                        </Group>
                    </Center>
                </SimpleGrid>
            </Center>
        </Overlay>
    )
}