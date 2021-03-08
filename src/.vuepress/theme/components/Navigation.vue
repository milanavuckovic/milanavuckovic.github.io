<template>
    <nav
        v-bind:class="{
            'Navbar--OpaqueBackground': scrolledDocument,
        }"
        class="navbar navbar-expand-md navbar-dark sticky-top Navbar">
        <div class="container-fluid">
            <NavLink
                class="navbar-brand Navbar__Brand"
                link="/">
                <img
                    v-if="$themeConfig.logo"
                    v-bind:src="$themeConfig.logo"
                    v-bind:alt="$site.title"
                    width="36"
                    height="36">
                back<span class="Accent">2</span>string<span class="Accent">.</span>art
            </NavLink>
            <button
                v-bind:disabled="!isUnitTestMode && isMenuTransitioning"
                class="navbar-toggler p-1"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbar"
                aria-controls="navbar"
                aria-expanded="false"
                aria-label="Toggle navigation"
                v-on:click="isMenuOpen = !isMenuOpen">
                <BootstrapIcon
                    v-bind:icon="isMenuOpen ? 'x' : 'list'"
                    size="21" />
            </button>
            <div
                id="navbar"
                class="collapse navbar-collapse w-100"
                v-on:transitionstart="onMenuTransitionStart"
                v-on:transitionend="onMenuTransitionEnd">
                <ul
                    class="navbar-nav ms-auto text-uppercase Navbar__Nav"
                    role="menu">
                    <li
                        v-for="item in $themeConfig.nav"
                        v-bind:key="item.text"
                        class="position-relative nav-item"
                        role="menuitem">
                        <NavLink
                            v-bind:link="item.link"
                            class="nav-link me-2 me-md-0 text-end">
                            {{ item.text }}
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data () {
        return {
            scrollY: 0,
            isMenuOpen: false,
            isMenuTransitioning: false,
        };
    },

    computed: {
        scrolledDocument () {
            return this.scrollY > 415;
        },

        isUnitTestMode () {
            return typeof Cypress !== 'undefined';
        },
    },

    mounted () {
        window.addEventListener('scroll', this.handleScroll);
        this.handleScroll();
    },

    beforeDestroy () {
        window.removeEventListener('scroll', this.handleScroll);
    },

    methods: {
        handleScroll () {
            this.scrollY = window.scrollY;
        },

        onMenuTransitionStart () {
            this.isMenuTransitioning = true;
        },

        onMenuTransitionEnd () {
            this.isMenuTransitioning = false;
        },
    },
};
</script>

<style lang="scss">
.Navbar {
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    background: linear-gradient(
        to bottom,
        hsla(0, 0%, 0%, 0.62) 0%,
        hsla(0, 0%, 0%, 0.612) 8.1%,
        hsla(0, 0%, 0%, 0.59) 15.5%,
        hsla(0, 0%, 0%, 0.556) 22.5%,
        hsla(0, 0%, 0%, 0.511) 29%,
        hsla(0, 0%, 0%, 0.459) 35.3%,
        hsla(0, 0%, 0%, 0.402) 41.2%,
        hsla(0, 0%, 0%, 0.341) 47.1%,
        hsla(0, 0%, 0%, 0.279) 52.9%,
        hsla(0, 0%, 0%, 0.218) 58.8%,
        hsla(0, 0%, 0%, 0.161) 64.7%,
        hsla(0, 0%, 0%, 0.109) 71%,
        hsla(0, 0%, 0%, 0.064) 77.5%,
        hsla(0, 0%, 0%, 0.03) 84.5%,
        hsla(0, 0%, 0%, 0.008) 91.9%,
        hsla(0, 0%, 0%, 0) 100%
    );

    &__Nav {
        .nav-item .nav-link {
            color: var(--bs-white) !important;
            text-shadow: var(--bs-dark) 1px 1px 0px;

            &.router-link-active,
            &:hover {
                color: var(--bs-white);
                text-decoration: none;
            }

            &:focus,
            &:active {
                color: var(--bs-white);
            }

            &:before {
                content: "▪";
                color: var(--bs-primary);
                transition: opacity 0.15s ease-in-out;
                opacity: 0;
            }

            &:hover:before,
            &.router-link-active:before {
                opacity: 1;
                text-shadow: var(--bs-dark) 1px 1px 0px;
            }
        }
    }

    &__Brand {
        &.navbar-brand {
            text-shadow: var(--bs-dark) 1px 1px 0px;

            img {
                -webkit-filter: drop-shadow(1px 1px 0px var(--bs-dark));
                filter: drop-shadow(1px 1px 0px var(--bs-dark));
            }

            .Accent {
                color: var(--bs-primary);
            }

            &:hover {
                text-decoration: none;
            }
        }

        #logo {
            fill: $white;
        }
    }

    &--OpaqueBackground {
        background: var(--bs-secondary);
        box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 10px;

        .nav-item .nav-link {
            text-shadow: none;

            &:hover:before,
            &.router-link-active:before {
                text-shadow: none;
            }
        }

        .Navbar__Brand.navbar-brand {
            text-shadow: none;

            img {
                -webkit-filter: none;
                filter: none;
            }
        }
    }

    @media (max-width: 767px) {
        background: var(--bs-secondary);
        box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 10px;

        .nav-item .nav-link {
            text-shadow: none;

            &:hover:before,
            &.router-link-active:before {
                text-shadow: none;
            }
        }

        .Navbar__Brand.navbar-brand {
            text-shadow: none;

            img {
                -webkit-filter: none;
                filter: none;
            }
        }
    }
}

.navbar {
    &-toggler {
        border: none !important;
        font-size: 1.5em;

        .navbar-dark & {
            color: var(--bs-white) !important;

            &:hover {
                color: var(--bs-primary) !important;
            }
        }
    }
}
</style>
