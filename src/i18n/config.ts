// From this guide: https://phrase.com/blog/posts/localizing-react-apps-with-i18next/#how-do-i-install-and-configure-i18next-for-my-react-app

// Core i18next library.
import i18n from "i18next";
// i18next HTTP API backend plugin for downloading translation files.
import HttpApi from "i18next-http-backend";
// Bindings for React: allow components to
// re-render when language changes.
import { initReactI18next } from "react-i18next";

i18n
    // Wire up the backend as a plugin.
    .use(HttpApi)
    // Add React bindings as a plugin.
    .use(initReactI18next)
    // Initialize the i18next instance.
    .init({
        // Config options

        // Specifies the default language (locale) used
        // when a user visits our site for the first time.
        // We use English here, but feel free to use
        // whichever locale you want.
        // Don't set this if i18n LanguageDetector plugin is being used,
        // otherwise it will overwrite the detected language.           
        lng: "en",

        // Fallback locale used when a translation is
        // missing in the active locale. Again, use your
        // preferred locale here. 
        fallbackLng: "en",

        // Enables useful output in the browser’s
        // dev console.
        debug: true,

        // Normally, we want `escapeValue: true` as it
        // ensures that i18next escapes any code in
        // translation messages, safeguarding against
        // XSS (cross-site scripting) attacks. However,
        // React does this escaping itself, so we turn 
        // it off in i18next.
        interpolation: {
            escapeValue: false,
        }
    });

export default i18n;
