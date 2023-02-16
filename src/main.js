import { createApp } from 'vue';
import App from  './App';
import VFocus from '@/directives/VFocus';

const app = createApp(App);

app
    .directive('focus', VFocus)
    .mount('#app');
