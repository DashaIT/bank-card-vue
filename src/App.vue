<template>
    <div>
        <form action="#" class="form">
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
                            placeholder="1234 5678 1234 5678"
                            tabindex="1"
                        />
                    </div>

                    <div class="input input--date">
                        <label for="date" class="input__label">Месяц / год</label>
                        <input-field 
                            v-model="date"
                            id="date"
                            name="date"
                            placeholder="ММ / ГГ"
                            tabindex="2"
                        />
                    </div>

                    <div class="input input--cvc">
                        <div class="cvc-icon">?</div>
                        
                        <label for="cvc" class="input__label">CVV / CVC</label>
                        <input-field 
                            v-model="cvc"
                            id="cvc"
                            name="cvc"
                            placeholder="123"
                            tabindex="3"
                        />
                    </div>                
                </div>
            </div>
            <div class="save-card-block">
                <input type="checkbox" class="save-card" v-model="saveCard" name="save-card" id="save-card">
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
        
    </div>
</template>

<script>
import InputField from "@/components/InputField.vue";
import CvcHint from "@/components/CvcHint.vue";
export default {
        components: {
            InputField, CvcHint
        },
        data: () => {
            return{
                pan: '',
                date: '',
                cvc: '',
                saveCard: true,
            }
        },
    }
</script>

<style>

    body {
        margin: 0;
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
        font-style: normal;
    }

    /* .container {
        display: flex;        
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;
    } */

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
    }

    .input--pan {
        margin-bottom: 30px;
    }

    .input--date, .input--cvc {
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

    .save-card:checked + .save-card-label::before {
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

</style>