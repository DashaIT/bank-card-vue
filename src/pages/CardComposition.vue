<template>
    <div>
        <h1>Composition</h1>
        <form action="#" class="form" @submit.prevent="submitForm">
            <div class="card">
                <img src="../../public/img/bankLogo.svg" alt="tinkoff" class="card__logo">

                <div class="card__body">
                    
                        <input-field 
                            v-model="pan" 
                            v-focus 
                            id="pan" 
                            name="pan"                                                         
                            ref="pan" 
                            label="Номер карты"
                            maxlength="19"
                            placeholder="1234 5678 1234 5678" 
                            tabindex="1" 
                            type="text"
                            :v-obj="v$.pan"                            
                            @input="inputPan" /> 
                                      
                        <input-field 
                            v-model="date" 
                            id="date" 
                            name="date" 
                            ref="date" 
                            label="Месяц / год"
                            maxlength="7" 
                            placeholder="ММ / ГГ"
                            tabindex="2" 
                            type="text"
                            :v-obj="v$.date"
                            @input="inputDate" /> 
                        
                        <input-field 
                            v-model="cvc" 
                            id="cvc" 
                            name="cvc" 
                            ref="cvc"
                            label="CVV / CVC"
                            maxlength="3" 
                            placeholder="123"
                            tabindex="3" 
                            type="text"
                            :v-obj="v$.cvc"
                            @input="inputCvc"
                        >
                            <div class="cvc-icon"></div>
                            <div class="cvc-tooltip">Три цифры с обратной стороны карты</div>
                        </input-field>                        
                    
                </div>
            </div>
            <div class="save-card-block">
                <checkbox-input v-model:checked="saveCard" id="save-card" name="save-card" />
                <label for="save-card" class="save-card-label">
                    Сохранить карту для следующих покупок
                </label>
            </div>

            <div class="button__container">
                <button type="submit" class="submit-button" :class="{hasloader: isLoading}" id="submitButton" :disabled="buttonDisabled">
                    Оплатить
                </button>
                <div class="oferta">
                    Нажимая на кнопку «Оплатить», вы соглашаетесь с <a href="#">условиями оферты</a>
                </div>
            </div>
        </form>
        <footer class="footer">
            <div class="ps-logos-block">
                <img src="../../public/img/ps-logos.svg" alt="">
            </div>
            <div class="secure">
                <img src="../../public/img/ic_lock.svg" alt="">
                <span>Данные банковской карты будут переданы в зашифрованном виде</span>
            </div>
            <div class="order_id">
                Заказ № {{ orderId }}
            </div>
        </footer>
    </div>
</template>

<script>
import CheckboxInput from "@/components/Checkbox.vue";
import InputField from "@/components/InputField.vue";
import { formatCardNumber, formatDate, formatCvc } from '@/utils/formating';
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, minLength } from '@vuelidate/validators';
import { validatePan, checkDate } from '@/utils/validation';
import { ref, computed } from 'vue';

export default {
    components: {
        InputField, CheckboxInput
    },

    setup() {        
        const pan = ref('');
        const date = ref('');
        const cvc = ref('');
        const saveCard = ref(true);
        const orderId = 112480;
        const isLoading = ref(false);

        const onSave = (event) => saveCard.value = event.target.checked;

        function inputPan(event) {
            pan.value = formatCardNumber(event.target.value);
            if (pan.value.length === 19) {
               $refs.date.$el.children[0].focus();
            }
        }

        function inputDate(event) {
            date.value = formatDate(event.target.value, event);            
            if (date.value.length === 7) {                
                $refs.cvc.$el.children[2].children[0].focus();
            }
        }

        const inputCvc = (event) => cvc.value = formatCvc(event.target.value);        

        function submitForm(event) {            
            v$.$validate();
            if (!v$.$invalid) {
                isLoading.value = true                
            }
        }

        const buttonDisabled = computed(() => {
                return !!v$.$invalid || !!isLoading.value
            }
        )

        const rules = {
            pan: {
                required: helpers.withMessage('Поле обязательно', required),
                validatePan: helpers.withMessage('Неверный номер карты', validatePan)
            },
            date: {
                required: helpers.withMessage('Поле обязательно', required),
                checkDate: helpers.withMessage('Неверная дата', checkDate)
            },
            cvc: {
                required: helpers.withMessage('Поле обязательно', required),
                minLength: helpers.withMessage('Неверный CVC', minLength(3))
            }
        }

        const v$ = useVuelidate(rules, {pan, date, cvc});

        return {
            v$, pan, date, cvc, saveCard, orderId, isLoading,
            submitForm, onSave, inputPan, inputDate, inputCvc, buttonDisabled
        }
    },    
}

</script>

<style src="@/styles/main.css"></style>