<script>
export default {
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
    data: () => ({
        items: [
            { prop: 'followers', title: 'Followers' },
            { prop: 'following', title: 'Following' },
            { prop: 'public_repos', title: 'Repos' },
            { prop: 'public_gists', title: 'Gists' },
        ],
    }),
}
</script>

<template>
    <ul class="gh-stats">
        <li v-for="{ prop, title } in items" :key="`stat-${prop}`" class="gh-stat-item">
            <div class="gh-stat-item__value" v-text="user[prop]" />
            <div class="gh-stat-item__description" v-text="title" />
        </li>
    </ul>
</template>

<style lang="scss">
@import '@/styles/_mixins.scss';

.gh-stats {
    $column: minmax(rem-calc(72), 1fr);

    display: grid;
    grid-template-columns: repeat(auto-fill, $column);
    gap: $sp-s;
    margin: $sp-m 0;
    padding: 0;
}

.gh-stat-item {
    border-radius: $default-border-radius;
    background-color: $secondary-bg;
    list-style-type: none;
    padding: $sp-s;
    text-align: center;

    &__value {
        @include font('DS-300');
        font-weight: bold;
    }

    &__description {
        @include font('DS-80');
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        // font-weight: bold;
    }
}

.gh-bio {
    @include font('DS-100');
    margin: $sp-m 0;
}
</style>
