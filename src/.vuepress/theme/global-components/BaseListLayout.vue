<template>
    <main class="container-md my-5">
        <h1 v-if="title">
            {{ title }}
        </h1>
        <div
            class="row row-cols-1 row-cols-sm-2 row-cols-xl-3 g-4 my-3"
            itemscope
            itemtype="http://schema.org/Blog">
            <article
                v-for="page in pages"
                v-bind:key="page.key"
                class="col"
                itemprop="blogPost"
                itemscope
                itemtype="https://schema.org/BlogPosting">
                <meta
                    itemprop="mainEntityOfPage"
                    v-bind:content="page.path">
                <div class="card overflow-hidden bg-dark text-white Card">
                    <img
                        v-if="page.frontmatter.image"
                        v-bind:src="page.frontmatter.image"
                        v-bind:alt="page.frontmatter.title"
                        class="card-img"
                        loading="lazy">
                    <div
                        v-bind:class="getRandomTransition()"
                        class="position-absolute Card__Overlay">
                        <h5 class="card-title">{{ page.title }}</h5>
                        <p
                            class="card-text"
                            itemprop="description">
                            {{ page.frontmatter.summary || page.summary }}
                        </p>
                        <p
                            v-if="page.frontmatter.date"
                            class="card-text d-sm-none d-lg-block d-xl-none d-xxl-block">
                            <time
                                pubdate
                                itemprop="datePublished"
                                v-bind:datetime="page.frontmatter.date">
                                {{ resolvePostDate(page.frontmatter.date) }}
                            </time>
                        </p>
                        <button class="btn btn-primary d-sm-none d-lg-block">Read more</button>
                        <NavLink
                            v-bind:link="page.path"
                            class="stretched-link" />
                    </div>
                </div>
            </article>
        </div>
        <component
            v-bind:is="paginationComponent"
            v-if="$pagination.length > 1 && paginationComponent"
            class="mt-5 w-100 text-center" />
    </main>
</template>

<script>
import Vue from 'vue';
import moment from 'moment';
import {
    Pagination,
    SimplePagination,
} from '@vuepress/plugin-blog/lib/client/components';
import { upperFirst } from 'lodash';

export default {
    data () {
        return {
            paginationComponent: null,
        };
    },

    computed: {
        pages () {
            return this.$pagination.pages;
        },

        title () {
            if (!this.$frontmatter.title) return null;
            let { title } = this.$frontmatter;
            title = title.replace(/(\s\|\s)?Tag$/, '');
            title = title.replace(/^Page\s[0-9]+\s-\s/, '');
            return upperFirst(title);
        },
    },

    mounted () {
        this.paginationComponent = this.getPaginationComponent();
    },

    methods: {
        getPaginationComponent () {
            // eslint-disable-next-line no-undef
            const n = THEME_BLOG_PAGINATION_COMPONENT;
            if (n === 'Pagination') {
                return Pagination;
            }

            if (n === 'SimplePagination') {
                return SimplePagination;
            }

            return Vue.component(n) || Pagination;
        },

        resolvePostDate (date) {
            return moment(date).fromNow();
        },

        getRandomTransition () {
            const transitions = [
                'Card__Overlay--Top',
                'Card__Overlay--Left',
                'Card__Overlay--Right',
                'Card__Overlay--Bottom',
            ];

            return transitions[Math.floor(Math.random() * transitions.length)];
        },
    },
};
</script>

<style lang="scss">
.Card {
    border: none;

    &__Overlay {
        background: rgba(0, 0, 0, 0.5);
        transition: all 0.15s ease-in-out;
        width: 100%;
        height: 100%;
        padding: 1rem;
        border-radius: calc(0.25rem - 1px);

        &--Bottom {
            top: 100%;
        }

        &--Right {
            left: 100%;
        }

        &--Left {
            right: 100%;
        }

        &--Top {
            bottom: 100%;
        }
    }

    &__Thumbnail {
        & + a:after {
            content: "";
            background-color: $dark;
            opacity: 0;
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            display: block;
        }

        & + a:hover:after {
            opacity: 0.2;
        }
    }

    &:hover {
        .Card__Overlay {
            &--Bottom {
                top: 0;
            }

            &--Right {
                left: 0;
            }

            &--Left {
                right: 0;
            }

            &--Top {
                bottom: 0;
            }
        }

        .btn {
            color: $white;
        }
    }

    .btn {
        color: $white;
    }
}

.pagination {
    display: inline-block;
    padding-left: 0;
    margin: 20px 0;
    border-radius: 4px;
    border: none;

    a {
        font-family: "Montserrat", sans-serif;
        font-size: 0.9em;
        font-weight: 500;
        text-transform: uppercase;
        transition: none;
        border: none;
        background-color: $primary;

        &:hover {
            background-color: $secondary;
        }
    }
}

.simple-pagination a {
    margin-right: 20px;
    color: $white;
    height: 38px;
    line-height: 38px;
    transition: all .3s ease;
    position: relative;
    overflow: hidden;
    display: inline-block;
    background: $primary;
    padding: 0 15px;
    text-decoration: none;
    border: none;
    border-radius: 5px;
    transition: none;

    &:hover {
        border: none;
    }
}
</style>
