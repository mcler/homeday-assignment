<template>
    <form class="form app-form" @submit.prevent="console.log('submit')">
        <slot />
    </form>
</template>

<style lang="scss">
@import '@/styles/_mixins.scss';

.app-form {
    max-width: 420px;
    margin: $sp-s auto;
}
</style>
