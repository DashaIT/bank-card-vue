<template>    
    <input 
        type="checkbox" 
        class="save-card" 
        :checked="saveCard" 
        @change="updateCheckbox"
        name="save-card" 
        >
   
</template>

<script>
export default {
        name: 'CheckBoxInput',
        props: {
            modelValue: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            updateCheckbox(event) {
                this.$emit('update:saveCard', event.target.checked)
            }
        }
    }
</script>

<style scoped>
.save-card {
    visibility: hidden;
}    
</style>