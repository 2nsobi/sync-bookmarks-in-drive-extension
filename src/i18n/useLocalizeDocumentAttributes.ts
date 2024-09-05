import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function useLocalizeDocumentAttributes() {
    const { i18n } = useTranslation();

    useEffect(() => {
        if (i18n.resolvedLanguage) {
            // Set the locale for the i18next plugin.
            i18n.changeLanguage(i18n.resolvedLanguage);

            // Set the <html lang> attribute.
            document.documentElement.lang = i18n.resolvedLanguage;

            // Set the <html dir> attribute for specifying the langauge's reading direction.
            document.documentElement.dir = i18n.dir(i18n.resolvedLanguage);
        }
    }, [i18n, i18n.resolvedLanguage]);
}