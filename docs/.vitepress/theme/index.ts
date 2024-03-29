import DefaultTheme from 'vitepress/theme'
import Tabs from '../../../components/Tabs/Tabs.vue'
import Tab from '../../../components/Tabs/Tab.vue'

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        app.component('Tab', Tab)
        app.component('Tabs', Tabs)
    }
}
