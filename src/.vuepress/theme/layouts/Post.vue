<template>
    <article
        class="Post"
        itemscope
        itemtype="https://schema.org/BlogPosting">
        <figure
            v-if="$frontmatter.image && !$frontmatter.hideImage"
            v-bind:style="{
                backgroundImage: `url(${$frontmatter.image})`,
            }"
            class="position-relative Post__Image" />
        <div class="container-md my-5">
            <div class="row">
                <section
                    class="col-lg-8"
                    itemprop="articleBody">
                    <header class="col">
                        <h1 itemprop="name headline">
                            {{ $frontmatter.title }}
                        </h1>
                        <p
                            class="fs-5 text-muted Post__Summary"
                            itemprop="description">
                            {{ $frontmatter.summary }}
                        </p>
                    </header>
                    <Content class="Post__Content" />
                </section>
                <section
                    class="col-lg-4"
                    itemprop="articleSection">
                    <Content
                        class="Post__Content Post__Content--Sidebar"
                        slot-key="sidebar" />
                </section>
            </div>
            <div class="row">
                <section
                    class="col"
                    itemprop="articleSection">
                    <Content
                        class="Post__Content Post__Content--Wide"
                        slot-key="wide" />
                </section>
            </div>
            <div class="row">
                <footer class="col-lg-8">
                    <ul
                        class="d-flex flex-row mb-2 list-unstyled Post__Meta"
                        itemprop="keywords">
                        <li
                            v-if="$frontmatter.date"
                            class="mx-2 Post__Meta--Separator">
                            ▪
                        </li>
                        <li
                            v-if="$frontmatter.date"
                            class="text-uppercase Post__Meta--Date">
                            <time
                                pubdate
                                itemprop="datePublished"
                                v-bind:datetime="$frontmatter.date">
                                {{ resolvePostDate($frontmatter.date) }}
                            </time>
                        </li>
                        <li
                            v-if="$frontmatter.tags"
                            class="mx-2 Post__Meta--Separator">
                            ▪
                        </li>
                        <PostTag
                            v-for="tag in resolvedTags"
                            v-bind:key="tag"
                            v-bind:tag="tag" />
                    </ul>
                </footer>
            </div>
        </div>
    </article>
</template>

<script>
import PostTag from '@theme/components/PostTag';
import moment from 'moment';
import zoom from 'medium-zoom';

export default {
    components: {
        PostTag,
    },

    data () {
        return {
            previousScrollPosition: 0,
            mediumZoom: null,
        };
    },

    computed: {
        resolvedTags () {
            if (!this.$frontmatter.tags || Array.isArray(this.$frontmatter.tags)) {
                return this.$frontmatter.tags;
            }

            return [ this.$frontmatter.tags ];
        },
    },

    mounted () {
        window.addEventListener('scroll', this.onScrollPosition);
        this.initMediumZoom();
    },

    updated () {
        this.initMediumZoom();
    },

    beforeDestroy () {
        window.removeEventListener('scroll', this.onScrollPosition);
    },

    methods: {
        resolvePostDate (date) {
            return moment(date).fromNow();
        },

        initMediumZoom () {
            this.$nextTick(() => {
                if (this.zoom) this.zoom.detach();
                this.zoom = zoom('.Post__Content :not(a) > img:not([src*="#nozoom"])');
            });
        },
    },
};
</script>

<style lang="scss">
.Post {
    &__Summary {
        font-family: "Montserrat", sans-serif;
        font-weight: 400;
    }

    &__Meta {
        font-size: 0.9em;

        &--Separator {
            color: $secondary;
        }

        &--Date {
            font-weight: 500;
        }

        .PostTag {
            font-weight: 600;
        }
    }

    &__Image {
        margin-top: -62px;
        background: $dark no-repeat 50%;
        background-size: auto;
        background-size: cover;
        height: 480px;
    }

    &__Content {
        em,
        strong {
            color: $secondary;
        }

        img {
            max-width: 100%;
            display: block;
            margin: 0 auto;
            border-radius: 0.25em;

            &[src*='#invert'] {
                filter: invert(100%);
                border-radius: 0;
            }

            &[src*='#rect'] {
                border-radius: 0;
            }

            &[src*='#icon'] {
                float: left;
                margin-left: -70px;

                @media (max-width: 767px) {
                    & {
                        display: none;
                    }
                }
            }

            &[src*='#half'] {
                float: left;
                width: 48%;
                margin-right: 2%;
                margin-bottom: 15px;
            }
        }

        h2,
        h3,
        h4,
        h5,
        h6 {
            color: $dark;
        }

        code {
            color: $white;
            background: $dark;
            border-radius: 0.25em;
        }

        li,
        p {
            code {
                padding: 0 5px 2px;
            }
        }

        pre {
            font-size: 14px;
            margin: 21px 0;
            color: $white;
            background: #111;
            border-radius: 0.25em;
        }

        pre ::selection {
            color: $white;
            background: $primary;
        }

        table {
            border-spacing: 0;
            border-collapse: collapse;
            display: inline-block;
            margin: 16px 0 32px;
            max-width: 100%;
            width: auto;
            border-spacing: 0;
            border-collapse: collapse;
            vertical-align: top;

            td {
                font-size: 16px;
            }

            td:first-child {
                text-align: center;
            }

            th {
                font-size: 12px;
                letter-spacing: .2px;
                text-align: center;
                text-transform: uppercase;
            }

            td,
            th {
                padding: 6px 12px;
                border: 1px solid $dark;
            }

            th {
                color: $white;
                background-color: $dark;
            }

            td,
            th {
                border: 1px solid $light;
            }
        }

        blockquote {
            margin-bottom: 1rem;
            font-size: 1.25rem;
            margin: 0 0 1rem;
        }

        &--Sidebar {
            img {
                margin-bottom: 15px;
            }
        }
    }
}

.medium-zoom {
    &-overlay {
        background: $dark !important;
        z-index: 1020;
    }

    &-image {
        z-index: 1020 !important;
    }
}
</style>
