<script>
import { HdButton, HdIcon } from 'homeday-blocks'

import arrowPrev from 'homeday-assets/S/arrow-back.svg'
import arrowNext from 'homeday-assets/S/arrow.svg'

export default {
    components: { HdButton, HdIcon },
    props: {
        buttons: {
            type: Object,
            required: true,
        },
    },
    data: () => ({
        icons: { arrowPrev, arrowNext },
    }),
    computed: {
        show() {
            const { buttons } = this
            return buttons?.start || buttons?.prev || buttons?.next || buttons?.finish
        },
    },
}
</script>

<template>
    <nav v-show="show" class="page-navigation">
        <RouterLink
            v-show="buttons?.start"
            v-slot="{ navigate }"
            custom :to="{ name: 'login' }">
            <HdButton @click="navigate">Start</HdButton>
        </RouterLink>

        <RouterLink
            v-show="buttons?.prev"
            v-slot="{ navigate }"
            custom :to="{ name: buttons?.prev?.to }">
            <HdButton modifier="tertiary" @click="navigate">
                <HdIcon class="page-navigation__arrow" :src="icons.arrowPrev"/> Previous
            </HdButton>
        </RouterLink>

        <RouterLink
            v-show="buttons?.next"
            v-slot="{ navigate }"
            custom :to="{ name: buttons?.next?.to }">
            <HdButton
                :class="{'page-navigation__button--hidden': buttons?.next?.hidden }"
                :disabled="buttons?.next?.disabled"
                modifier="tertiary"
                @click="navigate">
                Next <HdIcon class="page-navigation__arrow" :src="icons.arrowNext"/>
            </HdButton>
        </RouterLink>
    </nav>
</template>
