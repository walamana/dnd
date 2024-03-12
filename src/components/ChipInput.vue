<script setup lang="ts">

import {ref} from "vue";

const inputSlot = ref()
const inputText = ref("Hello")

function onInput(event) {
    if(event.key == "Backspace") {
        inputText.value = inputText.value.substring(0, inputText.value.length - 1)
    }
    focusInput()
    console.log(event.key, event.target.innerText)
}

function focusInput() {
    inputSlot.value.focus()
}

</script>

<template>

    <div class="container"
         @keydown.prevent="onInput" @click="focusInput">
        <span class="input" contenteditable="true" ref="inputSlot">{{ inputText }}</span>
    </div>
</template>

<style scoped lang="less">

.container{
    display: inline-block;
    background: red;
    padding-right: 20px;
}

.input {
    outline: none;;
}
</style>