<script>
import { HdLoadingSpinner } from 'homeday-blocks'

export default {
    components: { HdLoadingSpinner },
}
</script>

<template>
    <div class="app-loading">
        <HdLoadingSpinner class="app-loading__spinner" />
        <div class="app-loading__title">
            <slot>Loading</slot>
        </div>
    </div>
</template>

<style lang="scss">
@import '@/styles/_mixins.scss';

.app-loading {
    color: $secondary-color;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: $sp-xl;
    gap: $sp-m;
    text-align: center;

    &__title {
        @include font('DS-200');
        font-weight: bold;
    }
}
</style>