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

In order to prevent the Grid from wrapping the text in multiple lines you can use CSS and target the `<td>` HTML tags, which contain the data. In order to make that easier you can take advantage of the [OnCellRender event](slug:grid-column-events#oncellrender) that the component exposes.

>note You can achieve the same behavior if you use the [Template](slug:grid-templates-column) instead of the OnCellRender event. If you choose to go for the `Template` approach you should wrap the `(context as <YourModel>).FieldName` into a HTML element and add the CSS class to the `class` attribute of that element.

You might still want to allow the user to see the whole content, so you can enable the `Resizable` parameter of the Grid. If, however, the content is too long, the user should resize a lot in order to see the cell content. To cover such scenario, you can display the full content in a separate container. One option would be to use a [Window component](slug:window-overview) and handle some of the Grid events to display it ([`OnRowClick`](slug:grid-events#onrowclick), [`OnRowDoubleClick`](slug:grid-events#onrowdoubleclick)). Another approach is to show a Tooltip on hover of the cell (similar example is available in [Tooltip in Grid](slug:tooltip-kb-in-grid) knowledge base article). The solution below showcases a sample implementation of the first mentioned approach - using a Window component and handling the `OnRowDoubleClick` event.


````RAZOR
@*Use the OnCellRender event to pass a custom CSS class to the Grid column and prevent it from wrapping the text in multiple lines for the Notes column. Display the full content of the column in a separate Window component.
Use the OnRowRender event to set a custom CSS class to Grid rows.*@

Both Grids have column resizing enabled. Double click a row to see the full Notes value.
<br />
Ellipsis for the Notes column via OnCellRender.
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
                <div class="custom-ellipsis">
                    @dataItem.Note
                </div>
            </Template>
        </GridColumn>
        <GridColumn Field="@(nameof(SampleData.Note))" Title="Notes OnCellRender" OnCellRender="@OnCellRenderHandler" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

Ellipsis for all columns via OnRowRender.

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
    /* template */
    div.custom-ellipsis,
    /* OnCellRender */
    .k-grid td.custom-ellipsis,
    /* OnRowRender */
    .k-grid tr.custom-ellipsis .k-table-td {
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
        CurrEmployee = args.Item as SampleData;

        WindowIsVisible = !WindowIsVisible;
    }

    // apply ellipsis to specific columns
    private void OnCellRenderHandler(GridCellRenderEventArgs args)
    {
        args.Class = "custom-ellipsis";
    }

    // apply ellipsis to all columns
    private void OnRowRender(GridRowRenderEventArgs args)
    {
        args.Class = "custom-ellipsis";
    }

    public IEnumerable<SampleData> MyData = Enumerable.Range(1, 30).Select(x => new SampleData
    {
        Id = x,
        Name = "Employee Name " + x,
        Team = "Team Name " + x % 5,
        Note = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has... ",
        HireDate = DateTime.Now.AddDays(-x).Date
    });

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public string Note { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````

## See also

* [Knowledge-Base article: Long text in TreeList does not align with the corresponding level](slug:treelist-longer-text-starts-from-root-level)
