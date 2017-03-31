<template>

    <sarp-layout title="Vue demo">
    
        <div slot="left">

            <sarp-panel title="Data">
                
                <div class="form-group">
                    <input
                        type="text"
                        class="form-control"
                        v-model="search"
                        placeholder="Search"
                    >
                </div>
                
                <sarp-datatable
                    :search="search"
                    :rows="rows"
                    :fields="fields"
                    @selected="onSelect"
                ></sarp-datatable>

            </sarp-panel>

        </div>


            <sarp-panel slot="right" title="Edit">
                
                <sarp-form
                    :row="selectedRow"
                    :fields="fields"
                    @update="onUpdate"
                ></sarp-form>
            
            </sarp-panel>


    </sarp-layout>

</template>

<script>

    // Utlility to generate dummy data for testing
    import faker from 'faker'

    import SarpDatatable from './components/SarpDatatable.vue'
    import SarpForm from './components/SarpForm.vue'
    import SarpPanel from './components/SarpPanel.vue'
    import SarpLayout from './components/SarpLayout.vue'

    export default {
        name: 'App',
        components: { SarpDatatable, SarpForm, SarpPanel, SarpLayout },
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
