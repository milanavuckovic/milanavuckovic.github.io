<template>
    <header
        v-if="isList || isError"
        class="Header">
        <div
            id="carousel"
            class="carousel slide Header__Carousel"
            data-bs-interval="5000"
            data-bs-pause="false"
            data-bs-ride="carousel">
            <ol class="carousel-indicators">
                <li
                    v-for="(backgroundImage, backgroundImageIdx) in $themeConfig.carouselImages"
                    v-bind:key="backgroundImage"
                    v-bind:class="{
                        active: backgroundImageIdx === startImageIdx,
                    }"
                    v-bind:data-bs-slide-to="backgroundImageIdx"
                    data-bs-target="#carousel" />
            </ol>
            <div class="carousel-inner">
                <div
                    v-for="(backgroundImage, backgroundImageIdx) in backgroundImages"
                    v-bind:key="backgroundImage"
                    v-bind:data-image="backgroundImage"
                    v-bind:class="{
                        active: backgroundImageIdx === startImageIdx,
                    }"
                    v-bind:style="{
                        backgroundImage: `url(${backgroundImage})`,
                    }"
                    class="carousel-item Header__Carousel__Item" />
            </div>
        </div>
    </header>
</template>

<script>
export default {
    data () {
        return {
            startImageIdx: 0,
            backgroundImages: [],
        };
    },

    computed: {
        isList () {
            return this.$route.meta
                && (
                    this.$route.meta.pid === 'post'
                    || this.$route.meta.pid === 'tag'
                );
        },

        isError () {
            return this.$route.name === undefined;
        },
    },

    created () {
        this.backgroundImages = this.$themeConfig.carouselImages || [];
        this.startImageIdx = Math.floor(Math.random() * this.backgroundImages.length);
    },
};
</script>

<style lang="scss">
.Header {
    &__Carousel {
        margin-top: -100px;

        &__Item {
            background: $dark no-repeat 50%;
            background-size: auto;
            background-size: cover;
            height: 480px;

            @media (max-width: 767px) {
                height: 360px;
            }
        }
    }
}
</style>
