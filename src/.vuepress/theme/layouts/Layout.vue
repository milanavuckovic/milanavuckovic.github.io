<template>
    <div class="Layout">
        <BaseListLayout v-if="$pagination" />
        <template v-else>
            <Content />
        </template>
    </div>
</template>
