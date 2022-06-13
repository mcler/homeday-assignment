<script>
import { mapGetters } from 'vuex'
import debounce from 'lodash/debounce'

import AppHeader from '@/components/AppHeader.vue'
import AppNavigation from '@/components/AppNavigation.vue'
import { TRANSITIONS, VIEWS_ORDER } from '@/utils/consts'

export default {
    components: {
        AppHeader, AppNavigation,
    },
    data: () => ({
        routerAnimating: true,
        transitionName: TRANSITIONS.default,
    }),
    computed: {
        ...mapGetters('navigation', ['buttons']),
    },
    watch: {
        // Resolving per-view transition name
        $route(to, from) {
            if (!from.name || to.name === from.name) {
                this.transitionName = TRANSITIONS.default
                return
            }
            const toWeight = VIEWS_ORDER.indexOf(to.name)
            const fromWeight = VIEWS_ORDER.indexOf(from.name)

            this.transitionName = fromWeight < toWeight ? TRANSITIONS.routerLeft : TRANSITIONS.routerRight
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
