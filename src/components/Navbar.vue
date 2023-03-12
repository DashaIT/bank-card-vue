<template>
    <div class="navbar">
        <div class="navbar__btns" @click="$router.push('/options')">Options API</div>
        <div class="navbar__btns" @click="$router.push('/composition')">Composition API</div>
    </div>
</template>

<script>
export default {        
}
</script>

<style scoped>
.navbar {
    height: 50px;
    display: flex;
    align-items: center;
    padding: 10px 15px;
    background-color: lightgray;
    box-shadow: 2px 2px 4px gray;
}
.navbar__btns {
    margin-right: 50px;
    cursor: pointer
}
</style>