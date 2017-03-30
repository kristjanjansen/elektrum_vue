<template>
    
    <table class="table table-bordered table-responsive">

        <thead>
            <th
                v-for="field in fields"
                @click="order(field)"
            >
                {{ field }}
            </th>
        </thead>
        <tbody>
        <tr
            v-for="row in orderedRows"
            @click="$emit('selected', row.id)"
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
            rows: { default: [] }
        },
        data: () => ({ orderKey: 'a', orderAsc: true }),
        computed: {
            orderedRows() {
                return orderBy(
                    this.rows,
                    this.orderKey,
                    this.orderAsc ? 'asc' : 'desc'
                )
            }
        },
        methods: {
            order(field) {
                console.log(field)
                this.orderKey = field
                this.orderAsc = !this.orderAsc
            }
        }
    }

</script>

<style>
</style>
