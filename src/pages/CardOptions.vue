<template>
    <div>
        <form action="#" class="form" @submit.prevent="submitForm">
            <div class="card">
                <img src="../public/img/bankLogo.svg" alt="tinkoff" class="card__logo">

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
                <img src="../public/img/ps-logos.svg" alt="">
            </div>
            <div class="secure">
                <img src="../public/img/ic_lock.svg" alt="">
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

<style>
body {
    margin: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    font-style: normal;
}

.form {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    padding-left: 24px;
    padding-right: 24px;
}

.card {
    box-sizing: border-box;
    margin-top: 120px;
    margin-bottom: 32px;
    padding: 60px 56px 40px;
    position: relative;
    background: #FFFFFF;
    box-shadow: 0px 0px 4px rgba(64, 64, 64, 0.08), 0px 4px 16px rgba(64, 64, 64, 0.16);
    border-radius: 12px;
    width: 100%;
    max-width: 412px;
    height: 240px;
}

.card__logo {
    position: absolute;
    top: 24px;
    right: 24px;
}

.card__body {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
}

.input {
    max-height: 72px;
    width: 100%;
    position: relative;
}

.input--pan {
    margin-bottom: 30px;
}

.input--date,
.input--cvc {
    width: 45%;
    position: relative;
}

.input__label {
    font-weight: 400;
    font-size: 12px;
    line-height: 13px;
    letter-spacing: 0.3px;
    color: #A6A6A6;
}

.input__error {
    position: absolute;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 0.4px;
    color: #FF3B30;
}

.cvc-icon {
    position: absolute;
    left: 75px;
    background-color: #F2F2F2;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    text-align: center;
    color: #A6A6A6;
    background-image: url(../public/img/cvc-icon.svg);
    background-position: center;
    background-repeat: no-repeat;
}

.cvc-icon:hover {
    background-color: #A6A6A6;
    background-image: url(../public/img/cvc-icon-hover.svg);
    background-position: center;
}

.cvc-icon:hover+.cvc-tooltip {
    display: block;
}

.cvc-tooltip {
    display: none;
    position: absolute;
    left: 13px;
    top: -55px;
    width: 136px;
    height: 50px;
    background-image: url(../public/img/tooltip.svg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 0.3px;
    color: #FFFFFF;
    padding: 8px 8px 0 8px;
}

.save-card {
    visibility: hidden;
}

.save-card-label {
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    letter-spacing: 0.3px;
    color: #595959;
}

.save-card-label::before {
    content: '';
    width: 24px;
    height: 24px;
    border: 2px solid #A6A6A6;
    border-radius: 6px;
    margin-right: 10px;
}

.save-card:checked+.save-card-label::before {
    background-color: #FF335F;
    border-radius: 6px;
    border-color: #FF335F;
    background-image: url(/public/img/icon_check.svg);
    background-position: center;
    background-repeat: no-repeat;
}

.button__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 72px;
    width: 100%;
}

.submit-button {
    width: 100%;
    max-width: 295px;
    height: 64px;
    background: #FF335F;
    border-radius: 56px;
    border: none;
    text-align: center;
    padding: 22px 0 22px;
    font-weight: 500;
    font-size: 18px;
    line-height: 18px;
    letter-spacing: 0.3px;
    color: #FFFFFF;
}

.oferta {
    margin-top: 24px;
    max-width: 240px;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #A6A6A6;
}

.oferta a {
    color: #595959;
    text-decoration: underline;
}

.footer {
    margin-top: 98px;
    padding-top: 40px;
    padding-bottom: 49px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(180deg, #F2F2F2 0%, rgba(242, 242, 242, 0) 100%);
}

.secure {
    display: flex;
    align-items: center;
    width: 210px;
    margin-bottom: 16px;
    margin-top: 24px;
}

.secure,
.order_id {
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    letter-spacing: 0.3px;
    color: #A6A6A6;
}

.secure img,
.secure span {
    display: block;
}

.secure img {
    margin-right: 6px;
}
</style>