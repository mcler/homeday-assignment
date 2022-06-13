<script>
export default {
    props: {
        num: {
            type: Number,
            required: true,
        },
    },
}
</script>

<template>
    <p class="app-description">
        <slot />
    </p>
</template>

<style lang="scss">
@import '@/styles/_mixins.scss';

.app-description {
    @include font('DS-100');
    color: $quaternary-color;
}
</style>
