<template>
    
    <table class="table table-bordered table-responsive">
        <thead>
            <th
                v-for="field in fields"
                @click="orderBy(field)"
                style="cursor: pointer"
            >
                {{ field }} {{ orderIcon(field) }}
            </th>
        </thead>
        <tbody>
        <tr
            v-for="row in orderedAndFilteredRows"
            @click="$emit('selectedRowId', row.id)"
            :class="{'table-warning': row.selected}"
            style="cursor: pointer"
        >
            <td
                v-for="field in fields"
            >
                {{ row[field] }}
            </td>
        </tr>
        </tbody>
    </table>

</template>

<script>

    import orderBy from 'lodash/orderBy'

    export default {
        props: {
            fields: { default: [] },
            rows: { default: [] },
            search: { default: '' }
        },
        data: () => ({ orderField: '', orderAsc: true }),
        computed: {
            orderedAndFilteredRows() {
                return orderBy(
                    this.rows,
                    this.orderField,
                    this.orderAsc ? 'asc' : 'desc'
                )
                .filter(row => row.name.includes(this.search))
            }
        },
        methods: {
            orderBy(field) {
                this.orderField = field
                this.orderAsc = !this.orderAsc
            },
            orderIcon(field) {
                return (this.orderField == field)
                    ? (this.orderAsc ? '↓' : '↑') : ''
            }
        }
    }

</script>