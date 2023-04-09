import { createApp } from 'vue';
import App from  './App';
import VFocus from '@/directives/VFocus';
import router from '@/router/router';

const app = createApp(App);

app
    .use(router)
    .directive('focus', VFocus)
    .mount('#app');
