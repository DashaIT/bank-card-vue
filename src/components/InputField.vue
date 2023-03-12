<template>
    <div class="input" :class="'input--' + name">
        <slot></slot>        
        <label class="input__label">{{ label }}
            <input 
                v-model="localComputed"       
                class="input__field"        
                :type="type"                 
                v-bind="$attrs" 
                @blur="vObj.$touch()"                            
            >
        </label>
        <span v-if="vObj.$error" class="input__error">{{ vObj.$errors[0].$message }}</span>
    </div>
</template>

<script>
export default {
        name: 'input-field',
        inheritAttrs: false,
        props: {
            modelValue: String,
            vObj: Object,
            label: String,    
            name: String,
            type: String        
        },        
        computed: {
            localComputed: {
                get() {
                    return this.modelValue
                },
                set(newValue) {
                    this.$emit('update:modelValue', newValue)
                }
            }
        },             
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
    border-bottom: 1px solid #FF335F;
    caret-color: #FF335F;
}

.input__field:hover {
    border-bottom: 1px solid #FF335F;
}
    
</style>