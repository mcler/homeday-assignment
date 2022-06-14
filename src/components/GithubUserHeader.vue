<script>
export default {
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
    data: () => ({
        isAvatarReady: false,
    }),
    computed: {
        isOrganization() {
            const { user } = this
            return user?.type == 'Organization'
        },
    },
}
</script>

<template>
    <div class="gh-header">
        <transition name="fade" appear>
            <picture v-show="isAvatarReady" class="gh-header__avatar" :class="{'gh-header__avatar--org': isOrganization }">
                <img class="gh-header__image" :src="user.avatar_url" :alt="user.name" @load="isAvatarReady = true">
            </picture>
        </transition>

        <div class="gh-header__info">
            <p v-if="isOrganization" class="gh-header__position">Organization</p>
            <h1 class="gh-header__name" v-text="user.name" />
            <p class="gh-header__login" v-text="`@${user.login}`" />
        </div>
    </div>
</template>

<style lang="scss">
@import '@/styles/_mixins.scss';

.gh-header {
    align-items: center;
    display: grid;
    gap: $sp-xs $sp-s;
    grid-template-columns: auto minmax(0, 1fr);
    margin-bottom: $sp-m;

    &__avatar {
        $avatar-size: 64px;

        background-color: $secondary-bg;
        border: $default-border;
        border-radius: $avatar-size * 0.5;
        display: block;
        height: $avatar-size;
        overflow: hidden;
        width: $avatar-size;

        &--org {
            border-radius: $default-border-radius;
        }
    }

    &__image {
        object-fit: cover;
        height: 100%;
        width: 100%;
    }

    &__position {
        @include font('DS-80');
        margin: 0;
    }

    &__name {
        @include font('DS-100');
        margin: 0;
    }

    &__login {
        @include font('DS-80');
        margin: 0;
    }
}
</style>
