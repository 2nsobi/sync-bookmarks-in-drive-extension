import './App.css'
import { Home } from './views/home'

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

// Used to set locale and respective langauge's text direction (e.g. right-to-left for Arabic).
import useLocalizeDocumentAttributes from "./i18n/useLocalizeDocumentAttributes";

import { MantineProvider, createTheme, CSSVariablesResolver } from '@mantine/core';

// https://mantine.dev/styles/css-variables/#css-variables-resolver
const resolver: CSSVariablesResolver = (_) => ({
  variables: {},
  dark: { '--mantine-color-error': '#FFA903' },
  light: {}
});

// https://mantine.dev/theming/typography
const theme = createTheme({
  fontFamily: 'Prime',
  // headings: { fontFamily: 'Comic Sans MS, sans-serif' },  // Not needed if not using Mantine's Title component.
});

function App() {
  useLocalizeDocumentAttributes()
  return (
    <MantineProvider theme={theme} cssVariablesResolver={resolver} defaultColorScheme="dark">
      <Home />
    </MantineProvider>
  )
}

export default App
