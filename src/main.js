import { createApp } from 'vue';
import App from  './App';
import VFocus from '@/directives/VFocus';
import Vuelidate from 'vuelidate'

const app = createApp(App);

app     
    .directive('focus', VFocus)
    .mount('#app');
