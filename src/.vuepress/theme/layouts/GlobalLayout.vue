<template>
    <div class="d-flex flex-column min-vh-100">
        <Navigation />
        <Header />
        <DefaultGlobalLayout class="GlobalLayout" />
        <Footer />
    </div>
</template>

<script>
import Navigation from '@theme/components/Navigation';
import Header from '@theme/components/Header';
import GlobalLayout from '@app/components/GlobalLayout';
import Footer from '@theme/components/Footer';

export default {
    components: {
        Navigation,
        Header,
        DefaultGlobalLayout: GlobalLayout,
        Footer,
    },

    mounted () {
        // Dynamically import the Bootstrap library, because it's not SSR-friendly.
        import('bootstrap');
    },
};
</script>

<style lang="scss">
@import 'node_modules/bootstrap/scss/bootstrap';
@import '../styles/theme';
</style>
