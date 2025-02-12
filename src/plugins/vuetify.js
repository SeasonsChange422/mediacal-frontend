/*
 * @Author: Dhx
 * @Date: 2025-02-01 14:58:55
 * @Description: 
 * @FilePath: \medical-frontend\src\plugins\vuetify.js
 */
/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    // defaultTheme: 'bright',
  },
})
