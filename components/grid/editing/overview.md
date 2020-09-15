---
title: Overview
page_title: Grid - CRUD Overview
description: CRUD basics for the Grid for Blazor.
slug: components/grid/editing/overview
tags: telerik,blazor,grid,editing,overview
published: True
position: 0
---

# Grid CRUD Operations Overview

CRUD operations with the Grid for Blazor are done through the dedicated CRUD events it exposes for data editing. You can use them to transfer the changes to the actual data source (for example, call a service that will actually work with the database, and not only with the view data).

Sections in this article:

* [Basics](#basics)
* [Example](#example)
* [Notes](#notes)

## Basics

This section explains the available events and command buttons that you need to use for editing records in a grid. After that, you will find a code example.

List of the available events:

* `OnCreate` - fires when the `Save` [command button]({%slug components/grid/columns/command%}) button for a newly added item is clicked. Cancellable (cancelling it keeps the grid in Insert mode).
* `OnUpdate` - fires when the `Save` command button is clicked on an existing item. Cancellable (cancelling it keeps the grid in Edit mode). The model reference is a copy of the original data source item.
* `OnDelete` - fires when the `Delete` command button is clicked.
* `OnEdit` - fires when the user is about to enter edit mode for an existing row. Cancellable (cancelling it prevents the item from opening for editing).
* `OnCancel` - fires when the user clicks the `Cancel` command button. Allows you to undo the changes to the data in the view data. Cancellable (keeps the grid in Edit/Insert mode).
* `OnRead` - fires when the grid needs data - after any data source operation like updating, creating, deleting, filtering, sorting. If you cancel the CUD events, the [OnRead]({%slug components/grid/manual-operations%}) event will not fire.

The CUD event handlers receive an argument of type `GridCommandEventArgs` that exposes the following fields:

* `IsCancelled` - a boolean field indicating whether the grid operation is to be prevented (for example, prevent a row from opening for edit, or from updating the data layer).
* `IsNew` - a boolean field indicating whether the item was just added through the grid. Lets you differentiate a data source Create operation from Update operation in the `OnClick` event of a command button.
* `Item` - an object you can cast to your model class to obtain the current data item.
* `Field` - specific to [InCell editing]({%slug components/grid/editing/incell%}) - indicates which is the model field the user changed when updating data.
* `Value` - specific to [InCell editing]({%slug components/grid/editing/incell%}) - indicates what is the new value the user changed when updating data.

You can initiate editing or inserting of an item from anywhere on the page (buttons outside of the grid, or components in a column template) through the [grid state]({%slug grid-state%}#initiate-editing-or-inserting-of-an-item).

## Example

The example below shows how you can handle the events the grid exposes, so you can Create, Update or Delete records in your data source and the view model.

>tip The grid events use `EventCallback` and can be synchronous or asynchronous. The example below shows async versions, and the signature for synchronous events is `void <MethodName>(GridCommandEventArgs args)`.

>caption Handling the CRUD events of the grid to save data to the actual data source

````CSHTML
Editing is cancelled for the first two records.
<br />
<strong>There is a deliberate delay</strong> in the data source operations in this example to mimic real life delays and to showcase the async nature of the calls.

<TelerikGrid Data=@MyData EditMode="@GridEditMode.Inline" Pageable="true" Height="400px"
             OnUpdate="@UpdateHandler" OnEdit="@EditHandler" OnDelete="@DeleteHandler" OnCreate="@CreateHandler" OnCancel="@CancelHandler">
    <GridToolBar>
        <GridCommandButton Command="Add" Icon="add">Add Employee</GridCommandButton>
    </GridToolBar>
    <GridColumns>
        <GridColumn Field=@nameof(SampleData.ID) Title="ID" Editable="false" />
        <GridColumn Field=@nameof(SampleData.Name) Title="Name" />
        <GridCommandColumn>
            <GridCommandButton Command="Save" Icon="save" ShowInEdit="true">Update</GridCommandButton>
            <GridCommandButton Command="Edit" Icon="edit">Edit</GridCommandButton>
            <GridCommandButton Command="Delete" Icon="delete">Delete</GridCommandButton>
            <GridCommandButton Command="Cancel" Icon="cancel" ShowInEdit="true">Cancel</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@logger

@code {
    async Task EditHandler(GridCommandEventArgs args)
    {
        AppendToLog("Edit", args);

        SampleData item = (SampleData)args.Item;

        //prevent opening for edit based on condition
        if (item.ID < 3)
        {
            args.IsCancelled = true;//the general approach for cancelling an event
        }
    }

    async Task UpdateHandler(GridCommandEventArgs args)
    {
        AppendToLog("Update", args);

        SampleData item = (SampleData)args.Item;

        // perform actual data source operations here through your service

        await Task.Delay(2000); // simulate actual long running async operation

        // if the grid Data is not tied to the service, you may need to update the local view data too
        var index = MyData.FindIndex(i => i.ID == item.ID);
        if (index != -1)
        {
            MyData[index] = item;
        }
    }

    async Task DeleteHandler(GridCommandEventArgs args)
    {
        AppendToLog("Delete", args);

        SampleData item = (SampleData)args.Item;

        // perform actual data source operation here through your service

        await Task.Delay(2000); // simulate actual long running async operation

        // if the grid Data is not tied to the service, you may need to update the local view data too
        MyData.Remove(item);
    }

    async Task CreateHandler(GridCommandEventArgs args)
    {
        AppendToLog("Create", args);

        SampleData item = (SampleData)args.Item;

        // perform actual data source operation here through your service

        await Task.Delay(2000); // simulate actual long running async operation

        // if the grid Data is not tied to the service, you may need to update the local view data too
        item.ID = MyData.Count + 1;
        MyData.Insert(0, item);
    }

    async Task CancelHandler(GridCommandEventArgs args)
    {
        AppendToLog("Cancel", args);

        SampleData item = (SampleData)args.Item;

        // if necessary, perform actual data source operation here through your service

        await Task.Delay(1000); //simulate actual long running async operation
    }

    MarkupString logger;
    void AppendToLog(string commandName, GridCommandEventArgs args)
    {
        string currAction = string.Format(
            "<br />Command: <strong>{0}</strong>; is cancelled: <strong>{1}</strong>; is the item new: <strong>{2}</strong>",
                commandName,
                args.IsCancelled,
                args.IsNew
            );
        logger = new MarkupString(logger + currAction);
    }


    // in a real case, keep the models in dedicated locations, this is just an easy to copy and see example
    public class SampleData
    {
        public int ID { get; set; }
        public string Name { get; set; }
    }

    List<SampleData> MyData { get; set; }

    protected override void OnInitialized()
    {
        MyData = new List<SampleData>();

        for (int i = 0; i < 50; i++)
        {
            MyData.Add(new SampleData()
            {
                ID = i,
                Name = "Name " + i.ToString()
            });
        }
    }
}
````

## Notes

There are a few considerations to keep in mind with the CUD operations of the grid. They are explained in the following list:

* It is up to the data access logic to save the data once it is changed in the data collection. The example above showcases when that happens and adds some code to provide a visual indication of the change. In a real application, the code for handling data updates may be entirely different.
    
    * For example, you may want to update the view-model only on success of the data service with the model returned from the server. Another thing you may want to do is to inform the user for server (async, remote) validation errors such as duplicates. You can find examples of both in the [Remote Validation sample project](https://github.com/telerik/blazor-ui/tree/master/grid/remote-validation).

* The CRUD event handlers must be `async Task` and **not** `async void`. A Task can be properly awaited and allows working with services and contexts. When the method returns `void`, the execution of the context operations is not actually awaited, and you may get errors from the context (such as "Cannot access a disposed object. A common cause of this error is disposing a context that was resolved from dependency injection and then later trying to use the same context instance elsewhere in your application" or "A second operation started on this context before a previous operation completed. This is usually caused by different threads using the same instance of DbContext").

* The Grid uses `Activator.CreateInstance<TItem>();` to generate a new item when an Insert action is invoked, so the Model should have a Parameterless constructor defined. A workaround might be [invoking Insert through the grid state]({%slug grid-state%}#initiate-editing-or-inserting-of-an-item) and creating the object with your own code.

## See Also

  * [Live Demo: Grid Inline Editing](https://demos.telerik.com/blazor-ui/grid/editing-inline)
  * [Live Demo: Grid PopUp Editing](https://demos.telerik.com/blazor-ui/grid/editing-popup)
  * [Live Demo: Grid InCell Editing](https://demos.telerik.com/blazor-ui/grid/editing-incell)
  * [Live Demo: Grid Custom Editor Template](https://demos.telerik.com/blazor-ui/grid/custom-editor)
  * [Live Demo: Grid Custom Edit Form](https://demos.telerik.com/blazor-ui/grid/editing-custom-form)
  * [Batch Editing Example](https://github.com/telerik/blazor-ui/tree/master/grid/batch-editing)
