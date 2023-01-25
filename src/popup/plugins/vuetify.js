import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

const opts = {
    theme: {
        themes: {
          light: {
            primary: colors.blue.darken2,
            secondary: colors.indigo.lighten5,
            accent: '#8c9eff',
            error: '#b71c1c',
          },
        },
      },
}

export default new Vuetify(opts)