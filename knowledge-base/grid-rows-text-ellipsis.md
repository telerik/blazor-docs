---
title: Prevent the Grid from wrapping text in multiple lines and show ellipsis
description: How to prevent the Grid from wrapping text in multiple lines and show ellipsis
type: how-to
page_title: Prevent the Grid from wrapping text in multiple lines and show ellipsis
slug: grid-kb-rows-text-ellipsis
position: 
tags: 
ticketid: 1499434
res_type: kb
components: ["grid"]
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor, TreeList for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

I am using the TelerikGrid component for Blazor. One of my columns contains a long text, like a description and the Grid wraps it in multiple lines. I would like to prevent that from happening and show the maximum amount of text depending on the column width and after that put an ellipsis (...). 

## Solution

To prevent the Grid from wrapping the text in multiple lines you can use CSS and target the `<td>` HTML tags, which contain the data. You can disable text wrapping in:

* All data rows and cells. Use the Grid `Class` parameter.
* Specific columns. Use the [`OnCellRender` event](slug:grid-column-events#oncellrender) of the Grid columns. In some scenarios you may prefer a column [Template](slug:grid-templates-column) instead.
* Specific rows. Use the [`OnRowRender` event](slug:grid-events#onrowrender) of the Grid.

You can still allow the user to see the whole cell content, for example:

* Enable [column resizing](slug:components/grid/columns/resize).
* Display the cell content in a separate container like a [Window component](slug:window-overview) that shows in the Grid [`OnRowClick`](slug:grid-events#onrowclick) or [`OnRowDoubleClick`](slug:grid-events#onrowdoubleclick) event.
* [Show a Tooltip on Grid row hover](slug:tooltip-kb-in-grid).

The example below shows how to display a Window component in the Grid `OnRowDoubleClick` event.

````RAZOR
<h4>Ellipsis for all data rows and cells with Grid <code>Class</code></h4>

<TelerikGrid Data="@MyData" Height="300px"
             Class="grid-ellipsis"
             Pageable="true" Sortable="true"
             Resizable="true" Reorderable="true"
             OnRowDoubleClick="@OnRowDoubleClickHandler">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="100px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" Width="100px" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" Width="100px" />
        <GridColumn Field="@(nameof(SampleData.Note))" Title="Notes" Width="200px" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" Width="100px" />
        <GridColumn Title="Empty Column" />
    </GridColumns>
</TelerikGrid>

<h4>Ellipsis for the Notes columns with <code>Template</code> and <code>OnCellRender</code></h4>

<TelerikGrid Data="@MyData" Height="300px"
             Pageable="true" Sortable="true"
             Resizable="true" Reorderable="true"
             OnRowDoubleClick="@OnRowDoubleClickHandler">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" Groupable="false" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@(nameof(SampleData.Note))" Title="Notes Template">
            <Template>
                @{ var dataItem = (SampleData)context; }
                <div class="template-ellipsis">
                    @dataItem.Note
                </div>
            </Template>
        </GridColumn>
        <GridColumn Field="@(nameof(SampleData.Note))" Title="Notes OnCellRender" OnCellRender="@OnCellRenderHandler" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

<h4>Ellipsis for all rows with <code>OnRowRender</code></h4>

<TelerikGrid Data="@MyData" Height="300px"
             Pageable="true" Sortable="true"
             Resizable="true" Reorderable="true"
             OnRowDoubleClick="@OnRowDoubleClickHandler"
             OnRowRender="@OnRowRender">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="100px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" Width="100px" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" Width="100px" />
        <GridColumn Field="@(nameof(SampleData.Note))" Title="Notes" Width="200px" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" Width="100px" />
        <GridColumn Title="Empty Column" />
    </GridColumns>
</TelerikGrid>

<style>
    /* Grid */
    .grid-ellipsis td.k-table-td,
    /* template */
    div.template-ellipsis,
    /* OnCellRender */
    .k-grid td.cell-ellipsis,
    /* OnRowRender */
    tr.row-ellipsis td.k-table-td {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>

<TelerikWindow @bind-Visible="@WindowIsVisible" Modal="true">
    <WindowTitle>
        <strong>Details for @CurrEmployee.Name</strong>
    </WindowTitle>
    <WindowContent>
        @CurrEmployee.Note
    </WindowContent>
    <WindowActions>
        <WindowAction Name="Minimize"></WindowAction>
        <WindowAction Name="Maximize"></WindowAction>
        <WindowAction Name="Close"></WindowAction>
    </WindowActions>
</TelerikWindow>

@code {
    private bool WindowIsVisible { get; set; }

    private SampleData CurrEmployee { get; set; } = new SampleData();

    private void OnRowDoubleClickHandler(GridRowClickEventArgs args)
    {
        CurrEmployee = (SampleData)args.Item;

        WindowIsVisible = !WindowIsVisible;
    }

    // apply ellipsis to specific columns
    private void OnCellRenderHandler(GridCellRenderEventArgs args)
    {
        args.Class = "cell-ellipsis";
    }

    // apply ellipsis to all columns
    private void OnRowRender(GridRowRenderEventArgs args)
    {
        args.Class = "row-ellipsis";
    }

    public IEnumerable<SampleData> MyData = Enumerable.Range(1, 30).Select(x => new SampleData
    {
        Id = x,
        Name = $"Employee Name {x}",
        Team = $"Team Name {x % 5 + 1}",
        Note = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has... ",
        HireDate = DateTime.Today.AddDays(-Random.Shared.Next(0, 3000))
    });

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Team { get; set; } = string.Empty;
        public string Note { get; set; } = string.Empty;
        public DateTime HireDate { get; set; }
    }
}
````

## See also

* [Knowledge-Base article: Long text in TreeList does not align with the corresponding level](slug:treelist-longer-text-starts-from-root-level)
