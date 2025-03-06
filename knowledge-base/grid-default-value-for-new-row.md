---
title: Set Default Values for New Grid Rows
description: Learn how to set default values when the user adds new data items to a Telerik Grid or Telerik TreeList for Blazor.
type: how-to
page_title: How to Set Default Values for New Grid Rows
slug: grid-kb-default-value-for-new-row
position: 
tags: blazor, grid, treelist, crud
ticketid: 1433032
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor, <br /> TreeList for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

This KB article answers the following questions:

* How to apply predefined default values to data item properties when adding new rows to the Grid?
* How to set default values that are used when I create a new row? For example, I want to default a date to January 1 of next year instead of `null` or `Jan 1, 0001`.

## Solution

There are several ways to set default values in a new Grid or TreeList row:

* [In the component model class](#model-class)
* [In the `OnAdd` event](#onadd-event)
* [In the `OnModelInit` event](#onmodelinit-event)
* [Through the Grid State](#grid-state)

### Model Class

Setting default values in the model class is independent of the Grid component.

>caption Set default values inline

````C#.skip-repl
public class Order
{
    public int Quantity { get; set; } = 10;

    public DateTime Received { get; set; } = DateTime.Now;
}
````

>caption Set default values in the constructor method

````C#.skip-repl
public class Order
{
    public int Quantity { get; set; }

    public DateTime Received { get; set; }

    public Order()
    {
        Quantity = 10;
        Received = DateTime.Now;
    }
}
````

### OnAdd Event

The [Grid `OnAdd` event](slug:grid-editing-overview#events) fires when the user clicks on the **Add** command button and before the Grid renders the new row. Set the default values to the `Item` property of the [`GridCommandEventArgs` event argument](slug:grid-editing-overview#gridcommandeventargs).

>caption Set default values in the Grid OnAdd event

````C#.skip-repl
private void OnGridAdd(GridCommandEventArgs args)
{
    var newItem = (Order)args.Item;
    newItem.Quantity = 10;
    newItem.Received = DateTime.Now;
}
````

See complete runnable examples for [inline](slug:grid-editing-inline#advanced), [popup](slug:grid-editing-popup#advanced), and [in-cell](slug:grid-editing-incell#advanced) edit mode.

### OnModelInit Event

The [Grid `OnModelInit` event](slug:grid-editing-overview#events) fires when the Grid [needs a new model instance](slug:grid-editing-overview#item-instances) for add or edit mode. Set the default values to the item object that the event handler returns.

>caption Set default values in the OnAdd event

````C#.skip-repl
private Order OnGridModelInit()
{
    return new Order()
    {
        Quantity = 10,
        Received = DateTime.Now
    };
}
````

See complete runnable examples for [inline](slug:grid-editing-inline#advanced), [popup](slug:grid-editing-popup#advanced), and [in-cell](slug:grid-editing-incell#advanced) edit mode.

### Grid State

You can [use the Grid State to put the component in add or edit mode programmatically](slug:grid-kb-add-edit-state). This process does not use [built-in commands](slug:grid-editing-overview#commands). In this case, set the default item values to the [`InsertedItem` property](slug:grid-state#information-in-the-grid-state) of the `GridState` object.

````C#.skip-repl
var gridState = GridRef.GetState();

gridState.InsertedItem = new Order();
gridState.InsertedItem.Quantity = 10;
gridState.InsertedItem.Received = DateTime.Now;

await GridRef.SetStateAsync(gridState);
````

## See Also

* [Grid CRUD Events](slug:grid-editing-overview#events)
* [Grid State](slug:grid-state)
