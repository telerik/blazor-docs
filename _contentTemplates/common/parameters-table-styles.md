#table-layout
<style>
    .article table {
        table-layout: auto;
        word-break: normal;
    }
</style>
#end

#multidimensional-table
<style>
    table.multi-dimensional-table {
        border-collapse: collapse;
        border-radius: 0 0 0 0;
    }

    .multi-dimensional-table th {
        padding: 8px;
        background: var(--bg-table-th-color);
        color: var(--table-th-color);
        font-weight: 700;
        text-align: left;
        font-size: 18px;
        text-align: center;
    }
    .multi-dimensional-table,
    .multi-dimensional-table th,
    .multi-dimensional-table td {
        border: 1px solid rgba(127, 127, 127, .2);
    }

    table.multi-dimensional-table ul {
        margin: .5em 0;
    }

    table.multi-dimensional-table li {
        font-size: inherit;
        font-weight: inherit;
    }
</style>
#end
