---
title: Customize dragged and dropped Grid rows
description: How to customize and change the style of the dragged and dropped rows in the Grid?
type: how-to
page_title: Customize dragged and dropped Grid rows
slug: grid-kb-customize-dragged-dropped-row
position: 
tags: grid, drag, drop, customize, style
ticketid: 1547069
res_type: kb
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

I am using Grid with Drag and Drop functionality to drag the items from one Grid to another. How to change the background color style of the dragged item?

## Solution

Do the following to customize the appearance of the dropped item:

* Use a global variable to store the dropped item. You can get it from the `GridRowDropEventArgs` of the [`OnRowDrop` event]({%slug grid-events%}#onrowdrop)

* Handle the [`OnRowRender` event]({%slug grid-events%}#onrowrender) of the Grid to set a custom CSS class to the item that is matching the dropped one (you can compare them by Id, for example).

* Additionally, you can set some custom styles for the drag clue container. The element matches this CSS selector: `.k-header.k-drag-clue`.

Here is an example. Note that the customized item will match only the last dropped item. Once you drag and drop another item, it will assume the custom styles and the previous one will be treated as a regular Grid item. It is possible to enhance the code logic, preserve all dragged rows in a collection and persist the custom styles for all of them.

````CSHTML
<style>
    .k-grid tr.myCustomRowFormatting,
    .k-grid tr.myCustomRowFormatting:hover {
        background-color: rgb(244,97,71);
        color:white;
    }

    .k-header.k-drag-clue {
        background-color: rgb(244,97,71);
        color: white;
    }
</style>

<TelerikGrid Data="@MyData" Height="400px"
             Pageable="true" Sortable="true"
             FilterMode="Telerik.Blazor.GridFilterMode.FilterRow"
             Resizable="true" Reorderable="true"
             @ref="@FirstGrid"
             RowDraggable="true"
             OnRowDrop="@((GridRowDropEventArgs<SampleData> args) => OnRowDropHandler(args))"
             OnRowRender="@OnRowRenderHandler">
    <GridSettings>
        <GridRowDraggableSettings DragClueField="@nameof(SampleData.Name)"></GridRowDraggableSettings>
    </GridSettings>
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" Groupable="false" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

<TelerikGrid Data="@MySecondGridData" Height="400px"
             Pageable="true"
             Resizable="true"
             Reorderable="true"
             RowDraggable="true"
             OnRowDrop="@((GridRowDropEventArgs<SampleData> args) => OnSecondGridRowDropHandler(args))"
             OnRowRender="@OnRowRenderHandler">
    <GridSettings>
        <GridRowDraggableSettings DragClueField="@nameof(SampleData.Name)"></GridRowDraggableSettings>
    </GridSettings>
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" Groupable="false" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    TelerikGrid<SampleData> FirstGrid { get; set; }

    public SampleData droppedItem { get; set; } = new SampleData();

    private void OnRowDropHandler(GridRowDropEventArgs<SampleData> args)
    {
        //The data manipulations in this example are to showcase a basic scenario.
        //In your application you should implement them as per the needs of the project.

        MyData.Remove(args.Item);
        InsertItem(args);
        droppedItem = args.Item;
    }

    private void OnSecondGridRowDropHandler(GridRowDropEventArgs<SampleData> args)
    {
        //The data manipulations in this example are to showcase a basic scenario.
        //In your application you should implement them as per the needs of the project.

        MySecondGridData.Remove(args.Item);
        InsertItem(args);
        droppedItem = args.Item;
    }

    void OnRowRenderHandler(GridRowRenderEventArgs args)
    {
        var item = args.Item as SampleData;

        if (item.Id == droppedItem.Id)
        {
            args.Class = "myCustomRowFormatting";
        }
    }

    private void InsertItem(GridRowDropEventArgs<SampleData> args)
    {
        var destinationData = args.DestinationGrid == FirstGrid ? MyData : MySecondGridData;

        var destinationIndex = 0;

        if (args.DestinationItem != null)
        {
            destinationIndex = destinationData.IndexOf(args.DestinationItem);
            if (args.DropPosition == GridRowDropPosition.After)
            {
                destinationIndex += 1;
            }
        }

        destinationData.InsertRange(destinationIndex, args.Items);
    }

    public List<SampleData> MySecondGridData = Enumerable.Range(1, 30).Select(x => new SampleData
    {
        Id = x + 2,
        Name = "name  " + x + 2,
        Team = "team " + x % 3,
        HireDate = DateTime.Now.AddDays(-x * 2).Date
    }).ToList();

    public List<SampleData> MyData = Enumerable.Range(31, 30).Select(x => new SampleData
    {
        Id = x,
        Name = "name " + x,
        Team = "team " + x % 5,
        HireDate = DateTime.Now.AddDays(-x).Date
    }).ToList();

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````