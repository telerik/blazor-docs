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

CRUD operations with the Grid for Blazor support validation and are done through the dedicated CRUD events it exposes for data editing. You can use them to transfer the changes to the underlying data source (for example, call a service that will actually work with the database, and not only with the view data).

Sections in this article:

- [Basics](#basics)
- [Example](#example)
- [Notes](#notes)


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

>tip You can see the CRUD events in action in our live demos for [Inline](https://demos.telerik.com/blazor-ui/grid/editing-inline), [Popup](https://demos.telerik.com/blazor-ui/grid/editing-popup) and [InCell](https://demos.telerik.com/blazor-ui/grid/editing-incell) editing. You can also use the [Telerik Wizard]({%slug getting-started-vs-integration-new-project%}) project templates to easily create an application that showcases the Telerik Grid with CRUD events implemented.

>caption Handling the CRUD events of the grid to save data to the actual data source (mocked with local methods in this example, see the code comments for details)

````CSHTML
@using System.ComponentModel.DataAnnotations @* for the validation attributes *@ 

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
        SampleData item = (SampleData)args.Item;

        //prevent opening for edit based on condition
        if (item.ID < 3)
        {
            args.IsCancelled = true;//the general approach for cancelling an event
        }

        AppendToLog("Edit", args);
    }

    async Task UpdateHandler(GridCommandEventArgs args)
    {
        AppendToLog("Update", args);

        SampleData item = (SampleData)args.Item;

        // perform actual data source operations here through your service
        await MyService.Update(item);

        // update the local view-model data with the service data
        await GetGridData();
    }

    async Task DeleteHandler(GridCommandEventArgs args)
    {
        AppendToLog("Delete", args);

        SampleData item = (SampleData)args.Item;

        // perform actual data source operation here through your service
        await MyService.Delete(item);

        // update the local view-model data with the service data
        await GetGridData();

    }

    async Task CreateHandler(GridCommandEventArgs args)
    {
        AppendToLog("Create", args);

        SampleData item = (SampleData)args.Item;

        // perform actual data source operation here through your service
        await MyService.Create(item);

        // update the local view-model data with the service data
        await GetGridData();
    }

    async Task CancelHandler(GridCommandEventArgs args)
    {
        AppendToLog("Cancel", args);

        SampleData item = (SampleData)args.Item;

        // if necessary, perform actual data source operation here through your service

        await Task.Delay(1000); //simulate actual long running async operation
    }

    // this method and field just display what happened for visual cues in this example

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
        [Required]
        public string Name { get; set; }
    }

    List<SampleData> MyData { get; set; }

    async Task GetGridData()
    {
        MyData = await MyService.Read();
    }

    protected override async Task OnInitializedAsync()
    {
        await GetGridData();
    }


    // the following static class mimics an actual data service that handles the actual data source
    // replace it with your actual service through the DI, this only mimics how the API will look like and works for this standalone page
    public static class MyService
    {
        private static List<SampleData> _data { get; set; } = new List<SampleData>();

        public static async Task Create(SampleData itemToInsert)
        {
            await Task.Delay(1000); // simulate actual long running async operation

            itemToInsert.ID = _data.Count + 1;
            _data.Insert(0, itemToInsert);
        }

        public static async Task<List<SampleData>> Read()
        {
            await Task.Delay(1000); // simulate actual long running async operation

            if (_data.Count < 1)
            {
                for (int i = 1; i < 50; i++)
                {
                    _data.Add(new SampleData()
                    {
                        ID = i,
                        Name = "Name " + i.ToString()
                    });
                }
            }

            return await Task.FromResult(_data);
        }

        public static async Task Update(SampleData itemToUpdate)
        {
            await Task.Delay(1000); // simulate actual long running async operation

            var index = _data.FindIndex(i => i.ID == itemToUpdate.ID);
            if (index != -1)
            {
                _data[index] = itemToUpdate;
            }
        }

        public static async Task Delete(SampleData itemToDelete)
        {
            await Task.Delay(1000); // simulate actual long running async operation

            _data.Remove(itemToDelete);
        }
    }
}
````

>tip The grid events use `EventCallback` and can be synchronous or asynchronous. The example above shows async versions, and the signature for synchronous events is `void <MethodName>(GridCommandEventArgs args)`.

## Notes

There are a few considerations to keep in mind with the CUD operations of the grid. They are explained in the following list:

* It is up to the data access logic to save the data once it is changed in the data collection. The example above showcases when that happens and adds some code to provide a visual indication of the change. In a real application, the code for handling data updates may be entirely different.
    
    * For example, you may want to update the view-model only on success of the data service with the model returned from the server. Another thing you may want to do is to inform the user for server (async, remote) validation errors such as duplicates. You can find examples of both in the [Remote Validation sample project](https://github.com/telerik/blazor-ui/tree/master/grid/remote-validation).

* The CRUD event handlers must be `async Task` and **not** `async void`. A Task can be properly awaited and allows working with services and contexts, and lets the grid update after the actual data source operations complete.

    * When the method returns `void`, the execution of the context operations is not actually awaited, and you may get errors from the context (such as "Cannot access a disposed object. A common cause of this error is disposing a context that was resolved from dependency injection and then later trying to use the same context instance elsewhere in your application" or "A second operation started on this context before a previous operation completed. This is usually caused by different threads using the same instance of DbContext"). The grid may also re-render before the actual data update happens and you may not see the result.

* If you are [using the `OnRead` event to optimize the data requests]({%slug components/grid/manual-operations%}), it will fire after the CUD events (`OnCreate`, `OnUpdate`, `OnDelete`, `OnCancel`) so that the grid data can be refreshed properly from the real data source. If you want to avoid such calls to the database, you can raise a flag in those four events to avoid calling your data service in the `OnRead` event, and then you can lower that flag at the end of `OnRead` so subsequent calls can fetch fresh data.

* The Grid uses `Activator.CreateInstance<TItem>();` to generate a new item when an Insert or Edit action is invoked, so the Model should have a parameterless constructor defined. If you cannot have such a constructor, you must use the [OnModelInit]({%slug grid-events%}#onmodelinit) event.
    * Another case when you may need to insert items through the grid state is when you use [OnRead with grouping]({%slug components/grid/manual-operations%}#grouping-with-onread). In such cases the Grid is bound to an `object`, not to a particular model. As a result, it can't create new items for you and errors may be thrown.

* While editing, the Grid creates a **copy of your original object** which has a **different reference**. You receive that copy in the `OnUpdate` event handler. The `OnEdit` event receives the original item from the pristine `Data` collection, because it is a cancellable event and fires before the grid logic creates the copy. The built-in editors and [editor templates]({%slug grid-templates-editor%}) receive the copy for their `context` that the grid will create after `OnEdit`.

* If you want to pre-populate values to the user, see the [Setting default values in new row]({%slug grid-kb-default-value-for-new-row%}) KnowledgeBase article.

* When you are using your Entity Framework models directly in the Grid (especially in a server-side Blazor scenario) and you use the `Item` property of `GridCommandEventArgs` directly in your DataBase update method, you can get one of the following exceptions: `The instance of entity type 'YourModel' cannot be tracked because another instance with the same key value for {'Id'} is already being tracked. When attaching existing entities, ensure that only one entity instance with a given key value is attached...` or `This is a DynamicProxy2 error: The interceptor attempted to 'Proceed' for method 'Microsoft.EntityFrameworkCore.Infrastructure.ILazyLoader get_LazyLoader()' which has no target. When calling method without target there is no implementation to 'proceed' to and it is the responsibility of the interceptor to mimic the implementation (set return value, out arguments etc)`.
    
    To fix it you can change the update using this approach:
    
    1.  Find the object in your database by Id (you can use `dbContext.Find()` or similar method depending on your infrastructure).
    1. Apply all the changes you need to it one by one - assign the values of all of its properties - `dbObject.Property1 = argsItem.Property1...`
    1. Call `dbContext.SaveChanges()`

* The validation the grid provides is based on the <a href="https://docs.microsoft.com/en-us/aspnet/core/blazor/forms-validation?view=aspnetcore-5.0#validator-components" target="_blank">`DataAnnotationValidator`</a> and creates its own `EditContext` for a row that is in edit/insert mode. When the row is not in edit/insert mode, the `EditContext` is `null`. The `EditContext` is a cascading parameter and overrides any cascading parameters from parent components (such as an `<EditForm>` that may wrap the grid).

    * The validation will not be enabled for Grids bound to Expando objects or Dictionaries (such as DataTable).

    * When an input receives an `EditContext` (usually comes down as a cascading parameter), the framework also requires a `ValueExpression`. If you use two-way binding (the `@bind-Value` syntax), the `ValueExpression` is deducted from there. However, if you use only the `Value` property, you have to pass the `ValueExpression` yourself. This is a lambda expression that tells the framework what field in the model to update. The following sample demonstrates how to achieve that. You can also check the [Requires a value for ValueExpression]({%slug common-kb-requires-valueexpression%}) knowledge base article for more details.

    ````CSHTML
    <EditorTemplate>
        <TelerikTextBox Value="@myModel.MyField"
                        ValueExpression="@( () => myModel.MyField )">
        </TelerikTextBox>
    </EditorTemplate>

    @* Applies to the other input type components as well *@
    ````

## See Also

  * [Live Demo: Grid Inline Editing](https://demos.telerik.com/blazor-ui/grid/editing-inline)
  * [Live Demo: Grid PopUp Editing](https://demos.telerik.com/blazor-ui/grid/editing-popup)
  * [Live Demo: Grid InCell Editing](https://demos.telerik.com/blazor-ui/grid/editing-incell)
  * [Live Demo: Grid Custom Editor Template](https://demos.telerik.com/blazor-ui/grid/custom-editor)
  * [Live Demo: Grid Custom Edit Form](https://demos.telerik.com/blazor-ui/grid/editing-custom-form)
  * [Batch Editing Example](https://github.com/telerik/blazor-ui/tree/master/grid/batch-editing)
