// theme.js
import { extendTheme } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"

// Version 1: Using objects
const theme = extendTheme({
  styles: {
    global: {
        color:{
            cyan:{
                200: "#9DECF9",
            }
        },
      // styles for the `body`
      
    },
  },
})
export default theme;