---
title: Individual (conditional) cell back color
description: How to apply Individual (conditional) cell back color in the Telerik Blazor grid and treelist.
type: how-to
page_title: Individual (conditional) cell color
slug: grid-conditional-cell-background
position: 
tags: 
ticketid: 1443681
res_type: kb
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

I want to set the backcolor of the cells on a cell by cell basis. In some cases, setting the color for the entire row can also work.

I want to apply conditional formatting and styling to the cells and rows, or to change rendering and colors.

## Solution

There are several approaches you can take depending on the goals and situation that you have:

* [OnCellRender and OnRowRender Events](#oncellrender-and-onrowrender-events) - fine grained control over the styling of a particular cell or row
* [Cell Template](#cell-template) - control over the contents of the cells
* [Row Template](#row-template) - change the entire contents of the row
* [CSS Only Approach](#css-only-approach) - override built-in CSS rules with your own without conditions or custom themes

>note These approaches, including the [OnCellRender]({%slug treelist-column-events%}) and [OnRowRender]({%slug treelist-events%}) events, are applicable for the TreeList as well.

### OnCellRender and OnRowRender Events

To customize the formatting of the cells you can use the [OnCellRender]({%slug grid-column-events%}#oncellrender) event, exposed for the Grid Column.

To customize the formatting of the entire row, use the [OnRowRender]({%slug grid-events%}#onrowrender) event for the Grid.

These events provide you with the data item and cell value, and let you set a custom class to the corresponding element, so you can cascade the needed CSS rules through it.

>caption Conditional styling through CSS rules per cell and row

@[template](/_contentTemplates/grid/common-link.md#conditional-style-row-and-cell-render)

### Cell Template

You can use a particular column's [cell template]({%slug grid-templates-column%}) to render conditional markup inside its cell. In this case you will need some CSS to make your element take up the entire size of the cell so the default padding from the grid does not leave some of the original background visible. 
>caption Cell Template and CSS to change the background of particular cells conditionally

````CSHTML
<style>
    /* remove the default cell padding to remove traces of the original background */
    .k-grid-table td {
        padding: 0;
        /*height: 40px;*/ /*you may want to set height to the cells so the height:100% to the child div works better*/
    }

        .k-grid-table td .cell-padding {
            height: 100%;
            padding: 5px; /* apply the desired cell padding here */
        }

        /* the custom background - in this example, on every third element*/
        .k-grid-table td .special-background {
            background: yellow;
        }
</style>

<TelerikGrid Data="@MyData" Height="500px">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.ID))" Title="Photo">
            <Template>
                @{
                    var employee = context as SampleData;
                    // add the class (or inline style) that sets special background based on the desired condition
                    <div class="@( employee.ID % 3 == 0 ? "special-background cell-padding" : "cell-padding" )">@employee.ID</div>
                }
            </Template>
        </GridColumn>
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name">
        </GridColumn>
        <GridColumn Field="HireDate" Title="Hire Date - Default string">
        </GridColumn>
        <GridColumn Field="HireDate" Title="Hire Date - Custom string">
            <Template>
                @((context as SampleData).HireDate.ToString("dd MMM yyyy"))
            </Template>
        </GridColumn>
    </GridColumns>
</TelerikGrid>

@code {
    public class SampleData
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public DateTime HireDate { get; set; }
    }

    public IEnumerable<SampleData> MyData = Enumerable.Range(1, 50).Select(x => new SampleData
    {
        ID = x,
        Name = "name " + x,
        HireDate = DateTime.Now.AddDays(-x)
    });
}
````

### Row Template

You can fully control the row rendering through a [row template]({%slug grid-templates-row%}) and apply the classes or inline rules you require to individual cells, or to all cells. Review the requirements and limitations of the row temlates and if they suit you needs.

>caption Use a row template to style individual cells or the entire row conditionally

````CSHTML
<style>
    .yellow-cell-bg {
        background: yellow;
    }
</style>

<TelerikGrid Data=@MyData Height="500px">
    <RowTemplate>
        @{
            SampleData currRowData = context as SampleData;

            // to style the entire row, you can use the same class for all cells, or their style attribute
            // to style individual cells - either use their style attribute, or apply a conditional class only to them

            <td style="@GetConditionalCellStyle(currRowData)" class="@GetConditionalCellClass(currRowData)">
                <img class="rounded-circle" src="@($"/images/{currRowData.ID}.jpg")" alt="employee photo" />
                <strong>@currRowData.Name</strong>
            </td>
            <td class="@GetConditionalCellClass(currRowData)">
                Hired on: @(String.Format("{0:dd MMM yyyy}", currRowData.HireDate))
            </td>
        }
    </RowTemplate>
    <GridColumns>
        <GridColumn Field=@nameof(SampleData.Name) Title="Employee Name" />
        <GridColumn Field=@nameof(SampleData.HireDate) Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    string GetConditionalCellStyle(SampleData rowData)
    {
        if (rowData.Name.Contains("5"))
        {
            return "background-color: green;";
        }
        return string.Empty;
    }

    string GetConditionalCellClass(SampleData rowData)
    {
        if(rowData.ID % 3 == 0)
        {
            return "yellow-cell-bg";
        }
        return string.Empty;
    }

    public class SampleData
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public DateTime HireDate { get; set; }
    }

    public IEnumerable<SampleData> MyData = Enumerable.Range(1, 50).Select(x => new SampleData
    {
        ID = x,
        Name = "name " + x,
        HireDate = DateTime.Now.AddDays(-x)
    });
}
````

### CSS Only Approach

If you want to change the default row and alternating row backgrounds to match your app styles, without conditional logic being required for that, you only need some CSS that you can find in example below.


>caption Change the built-in row backgrounds with CSS only

````CSHTML
<style>
    .custom-row-colors .k-grid-table .k-master-row {
        background-color: red;
    }

        .custom-row-colors .k-grid-table .k-master-row:hover {
            background-color: pink;
        }

        .custom-row-colors .k-grid-table .k-master-row.k-alt {
            background-color: green;
        }

            .custom-row-colors .k-grid-table .k-master-row.k-alt:hover {
                background-color: cyan;
            }
</style>

<TelerikGrid Data="@MyData" Height="400px" Class="custom-row-colors"
             Pageable="true" Sortable="true" Groupable="true"
             FilterMode="Telerik.Blazor.GridFilterMode.FilterRow"
             Resizable="true" Reorderable="true">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" Groupable="false" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    public IEnumerable<SampleData> MyData = Enumerable.Range(1, 30).Select(x => new SampleData
    {
        Id = x,
        Name = "name " + x,
        Team = "team " + x % 5,
        HireDate = DateTime.Now.AddDays(-x).Date
    });

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````

