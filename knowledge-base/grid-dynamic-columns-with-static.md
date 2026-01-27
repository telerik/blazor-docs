---
title: Show Grid Command Column Always Last
description: How to fix the Grid command column, when it does not stay and the end of a dynamic column list.
type: troubleshooting
page_title: Grid Command Column Does Not Display After Dynamic Columns
slug: grid-kb-dynamic-columns-with-static
position:
tags: grid, columns
ticketid: 1551916
res_type: kb
components: ["grid"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

I define some dynamic Grid columns in a `for` or `foreach` loop. There is a `GridCommandColumn`, which should always appear last, after the other columns.

When I switch the number of dynamic columns or the column definitions, the command column does not stay and the end of the column list.


## Steps to Reproduce

1. Render a dynamic number of columns inside `<GridColumns>` with a loop.
1. Hard-code another column after the loop.
1. Increase the number of dynamic columns and rebind the Grid.

>caption Static Grid column will reorder when adding more columns

````RAZOR
<TelerikRadioGroup Data="@ColumnOptions"
                   Value="@CurrentColumns"
                   Layout="@RadioGroupLayout.Horizontal"
                   OnChange="@( (object newValue) => ChangeGridColumns((int)newValue) )">
</TelerikRadioGroup>

<TelerikGrid @ref="@GridRef"
             OnRead="@OnGridRead"
             TItem="@GridItem">
    <GridColumns>
        @for (int i = 1; i <= CurrentColumns; i++)
        {
            <GridColumn Field="@($"Text{i}")" Title="@( $"Dynamic column {i}" )" />
        }
        <GridCommandColumn Title="Static column" Width="200px">
            <strong style="color:#f00;">Should be last</strong>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private TelerikGrid<GridItem> GridRef { get; set; }

    private IEnumerable<RadioItem> ColumnOptions { get; set; } = new List<RadioItem>()
    {
        new RadioItem() { Text = "1 dynamic column", Value = 1 },
        new RadioItem() { Text = "2 dynamic columns", Value = 2 }
    };

    private int CurrentColumns { get; set; } = 1;

    private void ChangeGridColumns(int newValue)
    {
        CurrentColumns = newValue;
        GridRef.Rebind();
    }

    private void OnGridRead(GridReadEventArgs args)
    {
        args.Data = new List<GridItem>()
        {
            new GridItem() { Id = 1, Text1 = "Text 1", Text2 = "Text 2" }
        };
        args.Total = 1;
    }

    public class GridItem
    {
        public int Id { get; set; }
        public string Text1 { get; set; }
        public string Text2 { get; set; }
    }

    public class RadioItem
    {
        public int Value { get; set; }
        public string Text { get; set; }
    }
}
````


## Possible Cause

Unexpected reordering of dynamic components is related to how Blazor works. The framework appends newly added components at the end of the component collection.

Typical scenarios that can exhibit such column position change are binding to `DataTable` or another dynamic datasource.


## Solution

To make a specific Grid column appear always last:

* Set the [`@key`](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/?view=aspnetcore-6.0#use-key-to-control-the-preservation-of-elements-and-components) directive of all columns to a unique value. This will help the Blazor framework distinguish the columns and their client-side rendering. Note that the `@key` of the command column must not remain the same when the number of dynamic columns changes.
* (optional) Define the "static" column together with all "dynamic" columns inside a single loop.

>caption Static Grid column will remain last when adding new columns

````RAZOR
<TelerikRadioGroup Data="@ColumnOptions"
                   Value="@CurrentColumns"
                   Layout="@RadioGroupLayout.Horizontal"
                   OnChange="@( (object newValue) => ChangeGridColumns((int)newValue) )">
</TelerikRadioGroup>

<TelerikGrid @ref="@GridRef"
             OnRead="@OnGridRead"
             TItem="@GridItem">
    <GridColumns>
        @for (int i = 1; i <= CurrentColumns; i++)
        {
            @* using the field name as unique key *@
            <GridColumn Field="@($"Text{i}")" Title="@( $"Dynamic column {i}" )" @key="@($"Text{i}")" />
        }
        <GridCommandColumn Title="Static column" Width="200px" @key="@($"command{CurrentColumns + 1}")">
            <strong style="color:#f00;">Should be last</strong>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private TelerikGrid<GridItem> GridRef { get; set; }

    private IEnumerable<RadioItem> ColumnOptions { get; set; } = new List<RadioItem>()
    {
        new RadioItem() { Text = "1 dynamic column", Value = 1 },
        new RadioItem() { Text = "2 dynamic columns", Value = 2 }
    };

    private int CurrentColumns { get; set; } = 1;

    private void ChangeGridColumns(int newValue)
    {
        CurrentColumns = newValue;
        GridRef.Rebind();
    }

    private void OnGridRead(GridReadEventArgs args)
    {
        args.Data = new List<GridItem>()
        {
            new GridItem() { Id = 1, Text1 = "Text 1", Text2 = "Text 2" }
        };
        args.Total = 1;
    }

    public class GridItem
    {
        public int Id { get; set; }
        public string Text1 { get; set; }
        public string Text2 { get; set; }
    }

    public class RadioItem
    {
        public int Value { get; set; }
        public string Text { get; set; }
    }
}
````
