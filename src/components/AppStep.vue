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
    <div class="app-step">
        <div class="app-step__num">Step {{ num }}</div>
        <h1 class="app-step__title">
            <slot />
        </h1>
    </div>
</template>

<style lang="scss">
@import '@/styles/_mixins.scss';

.app-step {
    display: flex;
    align-items: center;
    margin-bottom: $sp-l;

    &__num {
        background-color: $primary-color;
        border-radius: 2rem;
        color: $white;
        font-size: rem-calc(16);
        font-weight: bold;
        line-height: 2;
        margin-right: $sp-s;
        padding: 0 1rem;
    }

    &__title {
        @include font('DS-300');
        line-height: 1;
        font-weight: bold;
        margin: 0;

        @media (min-width: $break-tablet) {
            @include font('DS-400');
            font-weight: 900;
        }
    }
}
</style>
