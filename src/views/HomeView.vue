<script>
import { HdIcon, HdLink } from 'homeday-blocks'

import logo from '@/assets/logo.svg'
import AppStep from '@/components/AppStep.vue'

export default {
    components: { AppStep, HdIcon, HdLink },
    data: () => ({
        logo,
    }),
}
</script>

<template>
    <div v-once class="app-home">
        <AppStep :num="1">Introduction</AppStep>

        <HdIcon class="app-home__logo" :src="logo" />

        <p class="app-home__text">Welcome!</p>

        <p class="app-home__text">This is a&nbsp;test assignment for&nbsp;<HdLink href="https://github.com/homeday-de/" target="_blank">Homeday</HdLink> that utilizes some fantasy process, collects data and&nbsp;displays any&nbsp;GitHub profile of&nbsp;your choice.</p>
        <p class="app-home__text">Feel free to&nbsp;play with different data inputs &amp;&nbsp;screen sizes and use browser back/next buttons to navigate.</p>

        <p class="app-home__note">Made with love by&nbsp;<HdLink href="https://github.com/mcler" target="_blank">@mcler</HdLink> &middot; <HdLink href="https://github.com/mcler/homeday-assignment" target="_blank">Project repository</HdLink> &middot; <HdLink href="https://mcler.notion.site/Homeday-assignment-afc04818a6a8461482af758d8774d850" target="_blank">Task</HdLink></p>
    </div>
</template>

<style lang="scss">
@import '@/styles/_mixins.scss';

.app-home {
    max-width: $max-width-paragraph-tablet;
    margin: $sp-s auto;

    &__logo {
        @include elevation(8);
        $size: $sp-l * 3;
        display: block;
        border-radius: 11%;
        margin: $sp-l auto;
        height: $size;
        width: $size;
    }

    &__text {
        @include font('DS-100')
    }

    &__note {
        @include font('DS-80');

        &:last-child {
            margin-bottom: 0;
        }
    }
}
</style>
