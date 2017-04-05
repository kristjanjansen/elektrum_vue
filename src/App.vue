<template>

    <sarp-layout title="Vue demo">
    
        <sarp-panel slot="left" title="Data">
            
            <div class="form-group">
                <input
                    type="text"
                    class="form-control search"
                    v-model="search"
                    placeholder="Search"
                >
            </div>
            
            <sarp-datatable
                :search="search"
                :rows="rows"
                :fields="fields"
                @selectedRowId="onSelectedRowId"
            ></sarp-datatable>

        </sarp-panel>

        <sarp-panel slot="right" title="Edit">
            
            <sarp-form
                :row="selectedRow"
                :fields="fields"
                @updatedRow="onUpdatedRow"
            ></sarp-form>
        
        </sarp-panel>

    </sarp-layout>

</template>

<script>

    // Utlility to generate dummy data for testing
    
    import faker from 'faker'

    // Content components

    import SarpDatatable from './components/SarpDatatable.vue'
    import SarpForm from './components/SarpForm.vue'
    
    // Layout components

    import SarpPanel from './components/SarpPanel.vue'
    import SarpLayout from './components/SarpLayout.vue'

    export default {
        name: 'App',
        components: { SarpDatatable, SarpForm, SarpPanel, SarpLayout },
        data: () => ({
            // On initialization data collection is empty,
            // we fill it later
            rows: [],
            // Collection row keys we want to display
            fields: ['name', 'company', 'city', 'zip'],
            // On initialization the search string is empty
            search: ''
        }),
        mounted() {
            // Fill the this.rows collection with fake data
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
            // SarpDatatable emits 'selectedRowId' event,
            // this method finds the row by emitted rowID
            // and adds property 'selected' to the row
            onSelectedRowId(rowId) {
                this.rows = this.rows.map(row => {
                    row.selected = row.id === rowId
                    return row
                })
            },
            // SarpForm emits 'updatedRow' event.
            // This method updates the rows collection
            // based on emitted updatedRow data
            onUpdatedRow(updatedRow) {
                this.rows = this.rows.map(row => {
                    if (row.id === updatedRow.id) {
                        row = updatedRow
                    }
                    return row
                })
            }
        },
        computed: {
            // Find the first row in this.rows collection
            // that has 'selected' property
            selectedRow() {
                return this.rows.find(row => row.selected)
            }
        }
    }

</script>