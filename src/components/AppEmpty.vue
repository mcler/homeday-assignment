<template>
    <div class="app-empty">
        <div class="app-empty__title">
            <slot>List is empty</slot>
        </div>
    </div>
</template>

<style lang="scss">
@import '@/styles/_mixins.scss';

.app-empty {
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
