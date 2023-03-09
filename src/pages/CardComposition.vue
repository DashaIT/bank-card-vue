<template>
    <div>
        <h1>Composition</h1>
        <form action="#" class="form" @submit.prevent="submitForm">
            <div class="card">
                <img src="../../public/img/bankLogo.svg" alt="tinkoff" class="card__logo">

                <div class="card__body">
                    <div class="input input--pan">
                        <label for="pan" class="input__label">Номер карты</label>
                        <input-field   
                            v-model="pan" 
                            v-focus 
                            id="pan" 
                            name="pan" 
                            ref="ref" 
                            maxlength="19"
                            placeholder="1234 5678 1234 5678" 
                            tabindex="1" 
                            @input="inputPan" />
                        <span v-if="v$.pan.$error" class="input__error">{{ v$.pan.$errors[0].$message }}</span>
                    </div>

                    <div class="input input--date">
                        <label for="date" class="input__label">Месяц / год</label>
                        <input-field 
                            v-model="date" 
                            id="date" 
                            name="date" 
                            ref="date" 
                            maxlength="7" 
                            placeholder="ММ / ГГ"
                            tabindex="2" 
                            @input="inputDate" />
                        <span v-if="v$.date.$error" class="input__error">{{ v$.date.$errors[0].$message }}</span>
                    </div>

                    <div class="input input--cvc">
                        <div class="cvc-icon"></div>
                        <div class="cvc-tooltip">Три цифры с обратной стороны карты</div>
                        <label for="cvc" class="input__label">CVV / CVC</label>
                        <input-field 
                            v-model="cvc" 
                            id="cvc" 
                            name="cvc" 
                            ref="cvc" 
                            maxlength="3" 
                            placeholder="123"
                            tabindex="3" 
                            @input="inputCvc" />
                        <span v-if="v$.cvc.$error" class="input__error">{{ v$.cvc.$errors[0].$message }}</span>
                    </div>
                </div>
            </div>
            <div class="save-card-block">
                <checkbox-input 
                    v-model:checked="saveCard" 
                    id="save-card" 
                    name="save-card" />
                <label for="save-card" class="save-card-label">
                    Сохранить карту для следующих покупок
                </label>
            </div>

            <div class="button__container">
                <button type="submit" class="submit-button" id="submitButton">
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

export default {
    components: {
        InputField, CheckboxInput
    },
    data: () => {
        return {
            v$: useVuelidate(),
            pan: '',
            date: '',
            cvc: '',
            saveCard: true,
            orderId: 112480
        }
    },
    methods: {
        onSave(event) {
            this.saveCard = event.target.checked;
        },
        inputPan(event) {
            this.pan = formatCardNumber(event.target.value);
            if (this.pan.length === 19) {
                this.$refs.date.$el.focus();
            }
        },
        inputDate(event) {
            this.date = formatDate(event.target.value, event);
            if (this.date.length === 7) {
                this.$refs.cvc.$el.focus();
            }
        },
        inputCvc(event) {
            this.cvc = formatCvc(event.target.value);
        },
        submitForm(event) {
            this.v$.$validate();
        }
    },
    validations() {
        return {
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
    }
}
</script>

<style src="@/styles/main.css">
</style>
