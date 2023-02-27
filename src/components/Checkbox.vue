<template>    
    <input 
        type="checkbox" 
        class="save-card" 
        :checked="checked" 
        @change="updateCheckbox"
        name="save-card" 
        >
   
</template>

<script>
export default {
        name: 'checkbox-input',
        props: {
            checked: {
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