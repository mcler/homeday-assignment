<script>
import { HdIcon, HdLink } from 'homeday-blocks'

// per-icon imports for smaller bundle size
import buildings from 'homeday-assets/S/buildings.svg'
import location from 'homeday-assets/S/location.svg'
import mail from 'homeday-assets/S/mail.svg'
import openInNew from 'homeday-assets/S/open-in-new.svg'
import twitter from 'homeday-assets/S/twitter.svg'

export default {
    components: { HdIcon, HdLink },
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
    data: () => ({
        isAvatarReady: false,
        icons: {
            buildings,
            location,
            mail,
            openInNew,
            twitter,
        },
    }),
}
</script>

<template>
    <ul class="gh-contacts">
        <li v-if="user.location" class="gh-contact">
            <HdIcon class="gh-contact__icon" :src="icons.location" />{{ user.location }}
        </li>
        <li v-if="user.email" class="gh-contact">
            <HdLink modifier="secondary" :href="`mailto:${user.email}`" target="_blank">
                <HdIcon class="gh-contact__icon gh-contact__icon--link" :src="icons.mail" />{{ user.email }}
            </HdLink>
        </li>
        <li v-if="user.blog" class="gh-contact">
            <HdLink modifier="secondary" :href="user.blog" target="_blank">
                <HdIcon class="gh-contact__icon gh-contact__icon--link" :src="icons.openInNew" />{{ user.blog }}
            </HdLink>
        </li>
        <li class="gh-contact">
            <HdLink modifier="secondary" :href="user.html_url" target="_blank">
                <HdIcon class="gh-contact__icon gh-contact__icon--link" :src="icons.openInNew" />Github Profile
            </HdLink>
        </li>
        <li v-if="user.twitter_username" class="gh-contact">
            <HdLink modifier="secondary" :href="`//twitter.com/${user.twitter_username}/`" target="_blank">
                <HdIcon class="gh-contact__icon gh-contact__icon--link" :src="icons.twitter" />{{ user.twitter_username }}
            </HdLink>
        </li>
    </ul>
</template>

<style lang="scss">
@import '@/styles/_mixins.scss';

.gh-contacts {
    align-items: center;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: $sp-s;
    margin: $sp-m 0;
    padding: 0;

    @media (min-width: $break-mobile) and (max-width: $break-tablet) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @media (min-width: $break-tablet) {
        grid-template-columns: 1fr;
    }
}

.gh-contact {
    list-style-type: none;
    margin: 0;
    padding: 0 0 0 1em;

    & + & {
        margin: $sp-xs 0 0 0;
    }

    &__icon {
        margin-top: -0.15rem;
        margin-left: -1.5em;
        height: 1em;
        width: 1.5em;
        vertical-align: middle;

        &--link {
            path {
                fill: $secondary-color;
            }
        }
    }
}
</style>
