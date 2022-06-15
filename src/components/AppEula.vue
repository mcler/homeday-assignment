<template>
    <section v-once class="app-eula">
        <h1>Fake Terms and services</h1>
        <p>Are there Out-of-Stock photos? Gafuffle. I&rsquo;m the only person in&nbsp;the world with my&nbsp;name. A&nbsp;tagline for a&nbsp;car company that prides itself on&nbsp;its morals and ethics: Take the High Road. Curling is&nbsp;the best sport named after something you do&nbsp;to&nbsp;your hair. Curling is&nbsp;the best sport named after something you do&nbsp;to&nbsp;your hair.</p>

        <p>You should &ldquo;listen to&nbsp;my&nbsp;mixtape&rdquo; (check out the rest of&nbsp;my&nbsp;portfolio). This is&nbsp;a&nbsp;true fact: I&nbsp;never had a&nbsp;fear of&nbsp;heights until I&nbsp;fell off a&nbsp;roof. Logan Broger is&nbsp;&ldquo;amazing&rdquo; and a&nbsp;&ldquo;wonderful boy&rdquo; according to&nbsp;Logan&rsquo;s&nbsp;mom. Felinamiss. I&nbsp;don&rsquo;t need a&nbsp;big house, just a&nbsp;two-floor condo - you could say I&nbsp;have lofty expectations. I&rsquo;m in&nbsp;a&nbsp;band that does Metallica covers with our private parts - it&rsquo;s called Myphallica. Petrovache.</p>

        <p>Why don&rsquo;t we&nbsp;call glasses duocles. A&nbsp;tagline for a&nbsp;special highway that is&nbsp;easy to&nbsp;navigate while under the influence of&nbsp;drugs: Take the High Road. Tim Horton was a&nbsp;hockey player but is&nbsp;the name of&nbsp;a&nbsp;coffee chain, which means my&nbsp;dream of&nbsp;a&nbsp;goat sanctuary being my&nbsp;legacy is&nbsp;not unrealistic. North America should be&nbsp;called Russia since people are always moving so&nbsp;fast. Gralitica. A&nbsp;tagline for a&nbsp;car company that prides itself on&nbsp;its morals and ethics: Take the High Road.</p>
    </section>
</template>


<style lang="scss">
@import '@/styles/_mixins.scss';

.app-eula {
    background-color: $secondary-bg;
    border-radius: $field-border-radius;
    border: $field-border;
    margin: $sp-m 0;
    max-height: 200px;
    overflow: scroll;
    padding: $sp-m;

    &:hover {
        border-color: $field-border-color-hover;
    }

    h1 {
        @include font('DS-200');
        font-weight: bold;

        @media (min-width: $break-tablet) {
            @include font('DS-300');
            font-weight: 900;
        }
    }

    p {
        @include font('DS-100');
    }
}
</style>
