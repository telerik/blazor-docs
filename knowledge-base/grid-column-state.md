---
title: Get Grid Column Index, Width and Visibility
description: How to obtain Grid column information, including the current order index, field, width, visibiilty, and locked state.
type: how-to
page_title: How to Get Grid Column Index, Field, Width and Visibility
slug: grid-kb-column-state
position: 
tags: grid, state
ticketid:
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



## Solution

This scenario requires knowledge about the [Grid State](slug:grid-state). Get familiar with the following sections first:

* [Information in the Grid State](slug:grid-state#information-in-the-grid-state)
* [Grid `OnStateChanged` Event](slug:grid-state#onstatechanged)
* [Grid State Methods](slug:grid-state#methods)

There are two ways to obtain the Grid column information programmatically:

* Use the [Grid `OnStateChanged` event](slug:grid-state#onstatechanged) and check `args.GridState.ColumnStates`, where `args` is the `OnStateChanged` event argument.
* Use the [Grid `GetState` method](slug:grid-state#methods) and check the `ColumnStates` property of the returned `GridState` object.

`ColumnStates` is a `ICollection<GridColumnState>`. The `GridColumnState` class has the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| --- | --- | --- |
| `Index` | `int` | The current index of the column. It will change as a result of column reordering. |
| `Id` | `string` | The `Id` parameter value of the `<GridColumn>`. |
| `Field` | `string` | The `Field` value of the column. |
| `Visible` | `bool?` | Whether the column is visible or hidden. |
| `Locked` | `bool` | Whether the column is locked or not. |
| `Width` | `string` | The width of the column if it is set. It will change as a result of column resizing.  |

The column order in the `ColumnStates` collection matches the `<GridColumn>` tag order in the Grid declaration.


## Example

>caption Get current Grid column state

````RAZOR
<h1>Get Grid Column Information from State</h1>

<p>Resize, reoder, lock or hide columns...</p>

<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             TItem="@Person"
             ShowColumnMenu="true"
             Reorderable="true"
             Resizable="true"
             OnStateChanged="@GetColumnsFromStateChange">
    <GridColumns>
        <GridColumn Field="@nameof(Person.Id)" Id="person-id" />
        <GridColumn Field="@nameof(Person.FirstName)" Id="person-firstname" />
        <GridColumn Field="@nameof(Person.LastName)" Id="person-lastname" />
        <GridColumn Field="@nameof(Person.Age)" Id="person-age" />
    </GridColumns>
</TelerikGrid>

<h2>Column Information</h2>

<TelerikGrid Data="@ColumnData">
    <GridColumns>
        <GridColumn Field="@nameof(GridColumnState.Id)" />
        <GridColumn Field="@nameof(GridColumnState.Field)" />
        <GridColumn Field="@nameof(GridColumnState.Index)" Title="Index in State" />
        <GridColumn Field="@nameof(GridColumnState.Locked)" />
        <GridColumn Field="@nameof(GridColumnState.Width)">
            <Template>
                @{
                    var dataItem = (GridColumnState)context;
                    if (dataItem.Width != null)
                    {
                        @dataItem.Width
                    }
                    else
                    {
                        <em>null</em>
                    }
                }
            </Template>
        </GridColumn>
        <GridColumn Field="@nameof(GridColumnState.Visible)">
            <Template>
                @{
                    var dataItem = (GridColumnState)context;
                    if (dataItem.Visible.HasValue)
                    {
                        @dataItem.Visible.Value
                    }
                    else
                    {
                        <em>null</em>
                    }
                }
            </Template>
        </GridColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private TelerikGrid<Person> GridRef { get; set; }

    private List<Person> GridData { get; set; } = new List<Person>();
    private List<GridColumnState> ColumnData { get; set; } = new List<GridColumnState>();

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 3; i++)
        {
            GridData.Add(new Person
            {
                Id = i,
                FirstName = $"First Name {i}",
                LastName = $"Last Name {i}",
                Age = i + 20
            });
        }

        base.OnInitialized();
    }

    private void GetColumnsFromStateChange(GridStateEventArgs<Person> args)
    {
        ColumnData = args.GridState.ColumnStates.ToList();
    }

    private void GetColumnsOnDemand()
    {
        ColumnData = GridRef.GetState().ColumnStates.ToList();
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            GetColumnsOnDemand();

            StateHasChanged();
        }

        await base.OnAfterRenderAsync(firstRender);
    }

    public class Person
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public int Age { get; set; }
    }
}
````

## See Also

* [Grid State](slug:grid-state)
