<template>    
    <input 
        :value="modelValue"        
        @input="updateInput"
        class="input__field"
        type="text"
    >
</template>

<script>
export default {
        name: 'input-field',
        props: {
            modelValue: String,            
        },
        methods: {
            updateInput(event) {
                this.$emit('update:modelValue', event.target.value)
            }
        }
    }
</script>

<style scoped>
.input__field {
    height: 32px;
    width: 100%;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 1px;
    color: #595959;
    border: none;
    border-bottom: 1px solid  #F2F2F2;
}

.input__field::placeholder {
    color: #F2F2F2;
}
.input__field:focus {
    outline: none;
}
    
</style>