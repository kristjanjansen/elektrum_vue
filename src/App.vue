<template>

    <div>
    
    <nav class="navbar fixed-top navbar-inverse bg-inverse">
      <a class="navbar-brand" href="#">Vue component demo</a>
    </nav>

    <div class="container-fluid">
        <div class="row">
            <div class="col-8">

                <div class="card">
                    <div class="card-header card-inverse card-primary">
                        Clients (SarpDatatable.vue)
                    </div>
                        <div class="card-block">
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="search" placeholder="Search">
                        </div>
                        <sarp-datatable
                            :search="search"
                            :rows="rows"
                            :fields="fields"
                            @selected="onSelect"
                        ></sarp-datatable>
                    </div>
                </div>

            </div>
            <div class="col-4">

                <div class="card">
                    <div class="card-header card-inverse card-primary">
                        Edit (SarpForm.vue)
                    </div>
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

    </div>

</template>

<script>

    // Utlility to generate dummy data for testing
    import faker from 'faker'

    import SarpDatatable from './components/SarpDatatable.vue'
    import SarpForm from './components/SarpForm.vue'

    export default {
        name: 'App',
        components: { SarpDatatable, SarpForm },
        data: () => ({
            // On init the data collection is empty, we fill it later
            rows: [],
            // Collection row keys we want to display
            fields: ['name', 'company', 'city', 'zip'],
            // On init the search string is empty
            search: ''
        }),
        mounted() {
            // Fill the table with fake data
            for (var i = 0; i < 50; i++) {
                this.rows.push({
                    id: i,
                    name: faker.name.findName(),
                    company: faker.company.companyName(),
                    city: faker.address.city(),
                    zip: faker.address.zipCode()
                })
            }
        },
        methods: {
            onSelect(rowId) {
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
        },
        computed: {
            // Find the collection row that is selected
            selectedRow() {
                return this.rows.find(row => row.selected)
            }
        }
    }

</script>

<style lang="sass">

    body {
        padding-top: 5em;
    }

    @import "~bootstrap/scss/variables";
    $enable-rounded: false;
    $enable-shadows: true;
    $spacer-y: .5rem;
    $card-spacer-x: 1rem;
    $card-spacer-y: .5rem;
    $font-family-base: 'Open Sans', sans-serif;
    @import "~bootstrap/scss/bootstrap";

</style>
