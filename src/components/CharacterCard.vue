<script setup lang="ts">

const props = defineProps<{
    name: string
}>()

function navigateToUser(){
    document.cookie = "user=" + props.name
    location.assign("/")
}

</script>

<template>

    <div class="card" @click="navigateToUser">
        <img class="avatar" :src="'/assets/avatar' + props.name + '.jpeg'"/>
        <span>{{ props.name }}</span>
    </div>

</template>

<style scoped lang="less">

.card {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid var(--color-on-surface-light);
    border-radius: 6px;
    padding: 30px;
    cursor: pointer;

    .avatar {
        width: 70px;
        height: 70px;
        object-fit: cover;
        object-position: center;
        border-radius: 35px;
        margin-bottom: 20px;
    }
    &:hover{
        border-color: var(--color-on-surface);
    }
}

</style>