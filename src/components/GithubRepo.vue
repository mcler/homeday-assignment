<script>
import { HdIcon, HdLink } from 'homeday-blocks'

// per-icon imports for smaller bundle size
import directions from 'homeday-assets/S/directions.svg'
import star from 'homeday-assets/S/star-filled.svg'
import eye from 'homeday-assets/S/visibility-on.svg'

export default {
    components: { HdIcon, HdLink },
    props: {
        repo: {
            type: Object,
            required: true,
        },
    },
    data: () => ({
        icons: {
            directions,
            eye,
            star,
        },
    }),
}
</script>

<template>
    <li class="gh-repo">
        <HdLink class="gh-repo__title" :href="repo.html_url" target="_blank">{{ repo.name }}</HdLink>
        <p v-if="repo.description" class="gh-repo__description">{{ repo.description }}</p>
        <ul class="gh-repo__facts">
            <li v-if="repo.language" class="gh-repo__fact">
                {{ repo.language }}
            </li>
            <li class="gh-repo__fact" :title="`${repo.stargazers_count} starred`">
                <HdIcon class="gh-repo__icon" :src="icons.star" /> {{ repo.stargazers_count }}
            </li>
            <li class="gh-repo__fact" :title="`${repo.stargazers_count} watching`">
                <HdIcon class="gh-repo__icon" :src="icons.eye" /> {{ repo.watchers_count }}
            </li>
            <li class="gh-repo__fact" :title="`${repo.forks_count} forks`">
                <HdIcon class="gh-repo__icon" :src="icons.directions" /> {{ repo.forks_count }}
            </li>
        </ul>
    </li>
</template>

<style lang="scss">
@import '@/styles/_mixins.scss';

.gh-repo {
    display: block;
    list-style-type: none;
    padding: $sp-m 0;

    &__title {
        @include font('DS-200');
        font-weight: bold;
        margin: 0 0 $sp-s 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &__description {
        @include font('DS-100');
        margin: $sp-s 0;
    }

    &__facts {
        display: flex;
        flex-direction: row;
        list-style-type: none;
        margin: $sp-s 0 0 0;
        min-width: 0;
        padding: 0;
        gap: $sp-m;
    }

    &__fact {
        @include font('DS-100');
        color: $quaternary-color;
        min-width: 0;
        padding: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &__icon {
        $icon-size: rem-calc(14);
        height: $icon-size;
        vertical-align: -0.1em;
        width: $icon-size;

        path { fill: $quaternary-color; }
    }
}

.gh-repo + .gh-repo {
    border-top: $default-border;
}
</style>
