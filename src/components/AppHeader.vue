<script>
import { HdIcon } from 'homeday-blocks'

import logoSrc from '@/assets/logo.svg'

export default {
    components: {
        HdIcon,
    },
    data: () => ({
        logo: logoSrc,
    }),
}
</script>

<template>
    <header class="page-header">
        <HdIcon class="page-header__logo" :src="logo" />
        <h1 class="page-header__title">GitHub Viewer</h1>
    </header>
</template>
