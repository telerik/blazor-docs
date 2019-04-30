---
title: InCell Editing
page_title: Grid for Blazor | InCell Editing
description: In-cell editing of data in Grid for Blazor
slug: components/grid/editing/incell
tags: telerik,blazor,grid,in cell,editing
published: True
position: 4
---

# Grid InCell Editing

In Cell editing allows the user has to click the cell and type the new value. When they remove focus from the input, the new value is sent to the model, where the data-access logic can move it to the actual data source.

You can handle the `Update` and `Delete` events to perform the CRUD operations, as shown in the example below. At the moment, the in-cell editing does not support item creation or cancellation of changes.

To enable InCell editing mode, set the `EditMode` property of the grid to `incell`, then handle the CRUD events as shown in the example below.

>caption Values are set in the model as soon as the user finishes editing a field, and you can receive them through the grid events

````CSHTML
@using Telerik.Blazor
@using Telerik.Blazor.Components.Grid

<strong>Click a cell, edit it and click outside of the cell to see the change. Editing is prevented for the first two items.</strong>

<TelerikGrid Data=@MyData EditMode="incell" Pageable="true" Height="200">
    <TelerikGridColumns>
        <TelerikGridColumn Field=@nameof(SampleData.ID) Title="ID" Editable="false" />
        <TelerikGridColumn Field=@nameof(SampleData.Name) Title="Name" />
        <TelerikGridCommandColumn>
            <TelerikGridCommandButton Command="Delete" Icon="delete">Delete</TelerikGridCommandButton>
        </TelerikGridCommandColumn>
    </TelerikGridColumns>
</TelerikGrid>

@functions {
    public void EditHandler(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;

        //prevent opening for edit based on condition
        if (item.ID < 3)
        {
            args.IsCancelled = true;//the general approach for cancelling an event
        }

        Console.WriteLine("Edit event is fired.");
    }

    public void UpdateHandler(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;

        //perform actual data source operation here
        //if you have a context added through an @inject statement, you could call its SaveChanges() method
        //myContext.SaveChanges();
        Console.WriteLine("Update event is fired.");
    }

    public void DeleteHandler(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;
        //perform actual data source operation here
        //if you have a context added through an @inject statement, you could call its SaveChanges() method
        //myContext.SaveChanges();
        Console.WriteLine("Update event is fired.");
    }

    //in a real case, keep the models in dedicated locations, this is just an easy to copy and see example
    public class SampleData
    {
        public int ID { get; set; }
        public string Name { get; set; }
    }


    public IEnumerable<SampleData> MyData = Enumerable.Range(1, 50).Select(x => new SampleData
    {
        ID = x,
        Name = "name " + x
    });
}
````

>caption The result from the code snippet above, after the user clicks in the Name column of the second row

![](images/incell-editing.png)

>note It is up to the data access logic to save the data once it is changed in the data collection. The example above showcases when that happens and adds some code to provide a visual indication of the change. In a real application, the code for handling data updates may be entirely different.

## See Also

  * [Live Demo: Grid InCell Editing](https://demos.telerik.com/blazor-ui/grid/incellediting)
   
  