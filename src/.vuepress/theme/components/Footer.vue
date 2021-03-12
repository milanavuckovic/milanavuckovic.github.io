<template>
    <footer class="container-fluid flex-grow-1 Footer">
        <div class="container-lg my-3">
            <div class="row justify-content-between">
                <div class="col-lg-6 order-2 order-lg-1">
                    <ul
                        v-if="copyright"
                        class="d-flex flex-row justify-content-center justify-content-lg-start m-0 list-unstyled"
                        role="menu">
                        <li
                            v-for="item in copyright"
                            v-bind:key="item.text"
                            class="Footer__Nav__Item Footer__Nav__Item--Separated"
                            role="menuitem">
                            <small>
                                <NavLink v-bind:link="item.link">
                                    {{ item.text }}
                                </NavLink>
                            </small>
                        </li>
                    </ul>
                </div>
                <div class="col-lg-6 order-1 order-lg-2 mb-2 mb-lg-1">
                    <ul
                        class="d-flex flex-row justify-content-center justify-content-lg-end m-0 list-unstyled"
                        role="menu">
                        <li class="me-5 me-md-4 Footer__Nav__Item">
                            <SearchBox />
                        </li>
                        <li
                            v-for="item in links"
                            v-bind:key="item.text"
                            class="me-4 Footer__Nav__Item"
                            role="menuitem">
                            <NavLink
                                v-bind:link="item.link"
                                v-bind:title="item.text">
                                <BootstrapIcon
                                    v-bind:icon="item.icon"
                                    size="lg" />
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
import SearchBox from '@SearchBox';

export default {
    components: {
        SearchBox,
    },

    computed: {
        copyright () {
            return ((this.$themeConfig.footer && this.$themeConfig.footer.copyright) || []);
        },

        links () {
            return ((this.$themeConfig.footer && this.$themeConfig.footer.links) || []);
        },

        syndication () {
            return ((this.$themeConfig.footer && this.$themeConfig.footer.syndication) || {});
        },
    },
};
</script>

<style lang="scss">
.Footer {
    background-color: $secondary;

    &__Nav {
        &__Item {
            &--Separated:after {
                content: '|';
                color: #ccc;
                margin-left: 5px;
                margin-right: 7px;
            }

            &--Separated:last-child:after {
                display: none;
            }

            a {
                color: $white;
                opacity: 0.8;

                &:hover {
                    color: $white;
                    opacity: 1;
                    text-decoration: none;
                }
            }
        }
    }
}

.search-box {
    margin-right: 0;

    @media (max-width: 719px) {
        & {
            margin-right: 0;
        }
    }

    input {
        color: $dark;
        opacity: .8;
        font-size: 11px;
        font-weight: 600;
        width: 175px;
        line-height: unset;
        height: 21px;
        border-color: transparent;
        background-size: 13px;
        background-position-x: 4px;
        background-position-y: 3px;
        padding-left: 20px;

        &:hover,
        &:focus {
            opacity: 1;
        }

        &:focus {
            padding-left: 20px;
            width: 175px;
        }
    }

    li {
        margin: 0;
    }

    .suggestions {
        position: relative;
        top: 2px;
        z-index: 1000;
        width: 175px;
    }

    .suggestion {
        line-height: 1.2;
        padding: 0;

        a {
            width: 100%;
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: $dark;

            &:hover {
                text-decoration: none;
                color: $primary;
            }

            .page-title,
            .header {
                font-size: 11px;
                font-weight: 600;
            }
        }
    }
}
</style>
