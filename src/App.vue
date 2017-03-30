<template>

    <div class="container">
        <div class="row">
            <div class="col-6">
                <div class="card">
                    <div class="card-header card-inverse card-primary">Names</div>
                    <div class="card-block">
                        <input type="text" class="form-control" v-model="search">
                    </div>
                    <div class="card-block">
                        <sarp-datatable
                            :search="search"
                            :rows="rows"
                            :fields="fields"
                            @selected="select"
                        ></sarp-datatable>
                    </div>
                </div>
            </div>
            <div class="col-6">
            <div class="card">
                <div class="card-header card-inverse card-primary">Edit</div>
                <div class="card-block">
                    <sarp-form
                        :row="selectedRow"
                        :fields="fields"
                        @update="onUpdate"
                    ></sarp-form>
                </div>
            </div>
            </div>
        </div>
    </div>

</template>

<script>

    import SarpDatatable from './components/SarpDatatable.vue'
    import SarpForm from './components/SarpForm.vue'

    export default {
        name: 'App',
        components: { SarpDatatable, SarpForm },
        data: () => ({ rows: [], fields: ['name', 'age'], search: '' }),
        mounted() {
            this.rows.push({id: 1, name: 'John Wayne', age: 100})
            this.rows.push({id: 2, name: 'Bruce Lee', age: 70})
            this.rows.push({id: 3, name: 'Jean-Claude van Damme', age: 60})
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
