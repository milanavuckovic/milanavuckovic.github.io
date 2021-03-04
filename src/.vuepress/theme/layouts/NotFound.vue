<template>
    <main class="container-md my-5">
        <div class="row just justify-content-center">
            <section class="col NotFound__Content">
                <h1>{{ $themeConfig.errorTitle }}</h1>
                <p>
                    <small>{{ $themeConfig.errorDescription }}</small>
                </p>
                <p>
                    <small>
                        <NavLink link="/">{{ $themeConfig.errorHint }}</NavLink>
                    </small>
                </p>
            </section>
        </div>
    </main>
</template>

<style lang="scss">
.NotFound {
    &__Content {
        font-size: 1rem;

        @media (min-width: 768px) {
            font-size: 1.125rem;
        }

        @media (min-width: 992px) {
            font-size: 1.25rem;
        }

        @media (max-width: 992px) {
            padding-bottom: 50px;
        }

        @media (max-width: 768px) {
            padding-bottom: 30px;
        }

        em {
            color: $white;
        }
    }
}
</style>
