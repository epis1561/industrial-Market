<template>
    <div class="m-input-error" v-if="form.errors.has(name)">{{form.errors.get(name)}}</div>
</template>
<style>
.m-input-error {
    margin-top:8px; margin-bottom:8px;
    font-size:12px; color:red;
}
</style>
<script>
export default {
    props: ["form", "name"],
}
</script>
