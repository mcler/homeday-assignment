<script>
import { mapGetters } from 'vuex'
import debounce from 'lodash/debounce'

import AppHeader from '@/components/AppHeader.vue'
import AppNavigation from '@/components/AppNavigation.vue'
import { APP_TRANSITIONS, APP_PAGES_ORDER } from '@/utils/consts'

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
            if (!from.name || to.name === from.name) {
                this.transitionName = APP_TRANSITIONS.default
                return
            }
            const toWeight = APP_PAGES_ORDER.indexOf(to.name)
            const fromWeight = APP_PAGES_ORDER.indexOf(from.name)

            this.transitionName = fromWeight < toWeight ? APP_TRANSITIONS.routerLeft : APP_TRANSITIONS.routerRight
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
