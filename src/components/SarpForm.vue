<template>
    
    <div>
        <div class="form-group" v-for="field in fields">
            <label for="field">{{ field }}</label>
            <input
                :id="field"
                class="form-control"
                v-model="data[field]"
                @input="onInput"
            >
        </div>
    </div>

</template>

<script>

    export default {
        props: {
            row: { default: () => {} },
            fields: { default: [] },
        },
        data: () => ({
            data: {}
        }),
        watch: {
            row(value) {
                this.data = value
            }
        },
        methods: {
            onInput() {
                this.$emit('updatedRow', this.data)
            }
        },
    }

</script>