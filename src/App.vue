<script>
import { mapGetters } from 'vuex'
import debounce from 'lodash/debounce'

import AppHeader from '@/components/AppHeader.vue'
import AppNavigation from '@/components/AppNavigation.vue'
import { APP_TRANSITIONS } from '@/utils/consts'

export default {
    components: {
        AppHeader, AppNavigation,
    },
    data: () => ({
        routerAnimating: true,
        transitionName: APP_TRANSITIONS.default,
    }),
    computed: {
        ...mapGetters('navigation', ['buttons']),
    },
    watch: {
        // Handling transition name on route change
        $route(to, from) {
            if (!from?.name || to.name === from.name) {
                this.transitionName = APP_TRANSITIONS.default
                return
            }
            const toOrder = to?.meta?.order
            const fromOrder = from?.meta?.order

            this.transitionName = fromOrder < toOrder ? APP_TRANSITIONS.routerLeft : APP_TRANSITIONS.routerRight
        },
    },
    methods: {
        onAnimationStart() {
            this.routerAnimating = true
        },
        onAnimationEnd: debounce(function() {
            this.routerAnimating = false
        }, 100),
    },
}
</script>

<template>
    <div class="page" tabindex="-1">
        <AppHeader />
        <main class="page-content" :class="{'page-content--animating': routerAnimating}">
            <transition
                mode="out-in"
                :name="transitionName"
                @before-enter="onAnimationStart"
                @after-enter="onAnimationEnd"
                @before-leave="onAnimationStart"
                @after-leave="onAnimationEnd">
                <RouterView />
            </transition>
        </main>
        <AppNavigation :buttons="buttons" />
    </div>
</template>

<style lang="scss">
@import "@/styles/main.scss";
</style>
