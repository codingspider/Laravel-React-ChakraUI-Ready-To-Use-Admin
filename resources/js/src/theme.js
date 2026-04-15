import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    config: { initialColorMode: 'light', useSystemColorMode: false },
    fonts: { heading: `'Inter', sans-serif`, body: `'Inter', sans-serif` },
    colors: {
        brand: {
            50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4',
            400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e',
            800: '#115e59', 900: '#134e4a',
        },
    },
    radii: {
        sm: '8px', md: '12px', lg: '16px', xl: '20px'
    },
    shadows: {
        soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        softDark: '0 2px 15px -3px rgba(0, 0, 0, 0.2), 0 10px 20px -2px rgba(0, 0, 0, 0.15)',
        card: { base: '0 1px 3px rgba(0,0,0,0.05)', _dark: '0 1px 3px rgba(0,0,0,0.2)' }
    },
    components: {
        Button: {
            variants: {
                primary: { bg: 'brand.600', color: 'white', _hover: { bg: 'brand.700' }, fontWeight: 'medium', borderRadius: 'lg' },
                secondary: { bg: 'gray.100', color: 'gray.700', _hover: { bg: 'gray.200' }, _dark: { bg: 'gray.700', color: 'gray.200', _hover: { bg: 'gray.600' } }, fontWeight: 'medium', borderRadius: 'lg' },
                danger: { bg: 'red.50', color: 'red.600', _hover: { bg: 'red.100' }, _dark: { bg: 'red.900', color: 'red.200' }, fontWeight: 'medium', borderRadius: 'lg' },
            }
        }
    },
    styles: {
        global: (props) => ({
            body: {
                bg: props.colorMode === 'light' ? 'gray.50' : 'gray.900',
                color: props.colorMode === 'light' ? 'gray.800' : 'gray.100',
            }
        })
    }
});

export default theme;