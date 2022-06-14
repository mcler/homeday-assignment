<script>
import { HdIcon } from 'homeday-blocks'

import logo from '@/assets/logo.svg'

export default {
    components: {
        HdIcon,
    },
    data: () => ({
        logo,
    }),
}
</script>

<template>
    <header v-once class="page-header">
        <HdIcon class="page-header__logo" :src="logo" />
        <h1 class="page-header__title">GitHub Viewer</h1>
    </header>
</template>
