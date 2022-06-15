<script>
import debounce from 'lodash/debounce'
import { mapState, mapActions, mapGetters } from 'vuex'

import { HdLoadingSpinner } from 'homeday-blocks'

import AppEmpty from '@/components/AppEmpty.vue'
import AppError from '@/components/AppError.vue'
import AppLoading from '@/components/AppLoading.vue'

import GithubRepo from '@/components/GithubRepo.vue'
import GithubUserContacts from '@/components/GithubUserContacts.vue'
import GithubUserHeader from '@/components/GithubUserHeader.vue'
import GithubUserStats from '@/components/GithubUserStats.vue'

export default {
    components: {
        HdLoadingSpinner,

        AppEmpty,
        AppError,
        AppLoading,

        GithubRepo,
        GithubUserContacts,
        GithubUserHeader,
        GithubUserStats,
    },
    computed: {
        ...mapState('githubUser', { userLoading: 'loading', userError: 'error', user: 'data' }),
        ...mapState('githubRepos', { reposLoading: 'loading', reposError: 'error', repos: 'data' }),
        ...mapGetters('githubRepos', { canLoadMoreRepos: 'canLoadMore' }),
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onPageEndReach, { passive: true })
    },
    mounted() {
        window.addEventListener('scroll', this.onPageEndReach, { passive: true })
        this.loadUser()
    },
    methods: {
        ...mapActions('githubUser', ['loadUser']),
        ...mapActions('githubRepos', ['loadMoreRepos']),

        onPageEndReach: debounce(function () {
            if (!this.canLoadMoreRepos || this.reposLoading) return

            if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
                this.loadMoreRepos()
            }
        }, 666),
    },
}
</script>

<template>
    <AppLoading v-if="userLoading" />
    <AppError v-else-if="userError" />
    <div v-else class="gh-layout">
        <section>
            <div class="gh-user">
                <GithubUserHeader :user="user" />
                <GithubUserContacts :user="user" />
                <p v-if="user.bio" class="gh-bio" v-text="user.bio" />
                <GithubUserStats :user="user" />
            </div>
        </section>

        <section>
            <AppLoading v-if="reposLoading && !repos" />
            <AppEmpty v-else-if="!repos?.length">
                No repositories
            </AppEmpty>
            <div v-else class="gh-repos">
                <div class="gh-repos__header">
                    <h2 class="gh-repos__title">Repositories</h2>
                </div>

                <transition-group
                    tag="ul"
                    class="gh-repos__list"
                    name="fade"
                    appear>
                    <GithubRepo v-for="repo of repos" :key="`repo-${repo.id}`" :repo="repo" />
                </transition-group>

                <HdLoadingSpinner v-show="canLoadMoreRepos" class="gh-load" />
            </div>
        </section>
    </div>
</template>

<style lang="scss">
@import '@/styles/_mixins.scss';

.gh-layout {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    gap: $sp-m;
    min-height: 50vh;

    @media (min-width: $break-tablet) {
    gap: $sp-l;
        grid-template-columns: 40% 1fr;
        grid-template-rows: auto;
    }

    @media (min-width: $break-desktop) {
        grid-template-columns: 33% 1fr;
        grid-template-rows: auto;
    }
}

.gh-user {
    padding: $sp-xs 0;

    @media (min-width: $break-tablet) {
        position: sticky;
        top: 0;
    }
}

.gh-bio {
    @include font('DS-100');
    margin: $sp-m 0;
}

.gh-repos {
    border-radius: $default-border-radius;
    padding: 0;

    &__header {
        background-color: $white;
        border-bottom: $default-border;
        margin: 0;
        padding: $sp-xs 0;
        position: sticky;
        top: calc($sp-m * 2 + rem-calc(20 * 1.6));
        z-index: 99;

        @media (min-width: $break-tablet) {
            top: 0;
        }
    }

    &__title {
        @include font('DS-200');
    }

    &__list {
        margin: 0;
        padding: 0;
    }
}

.gh-load {
    display: block;
    margin: $sp-m auto 0 auto;
}
</style>
