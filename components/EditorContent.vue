<template>
    <div class="ql-snow solution-detail">
        <div class="ql-editor">
            <div class="editor-wrap" v-html="description"></div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["description"]
}
</script>