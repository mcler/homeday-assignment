<script>
import { HdIcon } from 'homeday-blocks'
import warningTriangle from 'homeday-assets/M/warning-triangle.svg'

export default {
    components: { HdIcon },
    data: () => ({ icon: warningTriangle }),
}
</script>

<template>
    <div class="app-error">
        <HdIcon class="app-error__icon" :src="icon" />
        <div class="app-error__title">
            <slot>Could not load data</slot>
        </div>
    </div>
</template>

<style lang="scss">
@import '@/styles/_mixins.scss';

.app-error {
    color: $secondary-color;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: $sp-xl;
    gap: $sp-m;
    text-align: center;
    color: $error-color;

    &__icon {
        margin: 0 auto;
    }

    &__title {
        @include font('DS-200');
        font-weight: bold;
    }
}
</style>