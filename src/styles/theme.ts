import {
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react"

// const theme = extendTheme({
//   components: {
//     Heading: {
//       baseStyle: {}
//     }
//   },
//   colors: {
//     pink: '#E46167',
//     blue: '#64C7CC'
//   },
//   config: {
//     initialColorMode: 'light',
//     useSystemColorMode: true
//   }
// });

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        pink: "#E46167",
        blue: "#64C7CC"
      },
    },
  },
})

const theme = createSystem(defaultConfig, config)

export default theme;
