import { createPinia } from 'pinia'
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import  piniaPluginPersis from 'pinia-plugin-persist'

const pinia = createPinia()
pinia.use(piniaPluginPersis)
export default pinia
