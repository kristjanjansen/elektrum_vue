<template>

    <div id="app">
        <sample
            :rows="rows"
            :fields="fields"
            @selected="select"
        ></sample>
        <div class="card">
        <div class="card-header card-inverse card-primary">Featured</div>
        <div class="card-block">
        <sample2
            :row="selectedRow"
            :fields="fields"
            @update="onUpdate"
        ></sample2>
        </div>
        </div>
    </div>

</template>

<script>

    import Sample from './components/Sample.vue'
    import Sample2 from './components/Sample2.vue'

    export default {
        name: 'App',
        components: { Sample, Sample2 },
        data: () => ({ rows: [], fields: ['name', 'age'] }),
        mounted() {
            this.rows.push({id: 1, name: 'John', age: 100})
            this.rows.push({id: 2, name: 'Bruce', age: 70})
            this.rows.push({id: 3, name: 'Jan-Claude', age: 60})
        },
        computed: {
            selectedRow() {
                return this.rows.find(row => row.selected)
            }
        },
        methods: {
            select(rowId) {
                this.rows = this.rows.map(row => {
                    row.selected = row.id === rowId
                    return row
                })
            },
            onUpdate(updatedRow) {
                this.rows = this.rows.map(row => {
                    if (row.id === updatedRow.id) {
                        row = updatedRow
                    }
                    return row
                })
            }
        }
    }

</script>

<style>

    body {
        font-family: sans-serif;
        margin: 0;
        padding: 2rem;
    }

</style>
