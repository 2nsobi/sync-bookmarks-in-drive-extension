import classes from './header.module.css';
import { Text } from '@mantine/core';
// import { useTranslation } from "react-i18next";

function colorLetters(letters: string, colors: Array<string>) {
    if (letters.length !== colors.length) {
        throw new Error("letters must have a number of characters equal to the length of colors array.")
    }
    let spans = []
    for (let i = 0; i < letters.length; i++) {
        spans.push(<span style={{ color: colors[i] }}>{letters.charAt(i)}</span>)
    }
    return spans
}

export const Header = () => {
    // // The `t()` function gives us
    // // access to the active locale's
    // // translations.
    // const { t } = useTranslation();

    return (
        <header>
            <div className={classes.inner}>
                <Text fz="lg">
                    SYNC BOOKMARKS IN <a href='https://drive.google.com/' target="_blank">
                        {colorLetters("Drive", ["#00B5FF", "#ff3642", "#faee20", "#00B5FF", "#2BDD66"])}
                    </a>
                    {/* TODO: add il8n translations for all text in the extension */}
                    {/* {t("hello_world")} */}
                </Text>
            </div>
        </header>
    )
}