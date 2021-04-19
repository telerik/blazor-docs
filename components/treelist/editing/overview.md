---
title: Overview
page_title: TreeList - CRUD Overview
description: CRUD basics for the treelist for Blazor.
slug: treelist-editing-overview
tags: telerik,blazor,treelist,editing,overview
published: True
position: 0
---

# TreeList CRUD Operations Overview

CRUD operations with the TreeList for Blazor support validation and
are done through the dedicated CRUD events it exposes for data editing. You can use them to transfer the changes to the underlying data source (for example, call a service that will actually work with the database, and not only with the view data).

Sections in this article:

* [Basics](#basics)
* [Example](#example)
* [Notes](#notes)

## Basics

This section explains the available events and command buttons that you need to use for editing records in a treelist. After that, you will find a code example.

List of the available events:

* `OnCreate` - fires when the `Save` [command button]({%slug treelist-columns-command%}) button for a newly added item is clicked. Cancellable.
* `OnUpdate` - fires when the `Save` command button is clicked on an existing item. Cancellable. The model reference is a copy of the original data source item.
* `OnDelete` - fires when the `Delete` command button is clicked. Cancellable.
* `OnEdit` - fires when the user is about to enter edit mode for an existing row. Cancellable.
* `OnCancel` - fires when the user clicks the `Cancel` command button. Allows you to undo the changes to the data in the view data. Cancellable.


The CUD event handlers receive an argument of type `TreeListCommandEventArgs` that exposes the following fields:

* `IsCancelled` - a boolean field indicating whether the treelist operation is to be prevented. You can use it to prevent the user action from affecting the treelist (for example, prevent a row from opening for edit, or the user from cancelling an edit operation). 
* `IsNew` - a boolean field indicating whether the item was just added through the treelist. Lets you differentiate a data source Create operation from Update operation in the `OnClick` event of a command button.
* `Item` - an object you can cast to your model class to obtain the current data item.
* `ParentItem` - an object you can cast to your model class to obtain the parent of current data item. Will be `null` if the current item is at the root level.
* `Field` - specific to [InCell editing]({%slug treelist-editing-incell%}) - indicates which is the model field the user changed when updating data.
* `Value` - specific to [InCell editing]({%slug treelist-editing-incell%}) - indicates what is the new value the user changed when updating data.


You can initiate editing or inserting of an item from anywhere on the page (buttons outside of the treelist, or components in a column template) through the [treelist state]({%slug treelist-state%}#initiate-editing-or-inserting-of-an-item).


## Example

The example below shows how you can handle the events the treelist exposes, so you can Create, Update or Delete records in your data source and the view model.

>tip The treelist events use `EventCallback` and can be synchronous or asynchronous. The example below shows async versions, and the signature for synchronous events is `void <MethodName>(TreeListCommandEventArgs args)`.

>caption Handling the CRUD events of the treelist to save data to the actual data source

````CSHTML
@using System.ComponentModel.DataAnnotations
@* Used for the model annotations only *@

Editing is cancelled for the first record.
<br />

<TelerikTreeList Data="@Data"
                 EditMode="@TreeListEditMode.Inline"
                 OnUpdate="@UpdateItem"
                 OnDelete="@DeleteItem"
                 OnCreate="@CreateItem"
                 OnEdit="@OnEditHandler"
                 OnCancel="@OnCancelHandler"
                 Pageable="true" ItemsField="@(nameof(Employee.DirectReports))"
                 Width="850px">

    <TreeListToolBar>
        <TreeListCommandButton Command="Add" Icon="add">Add</TreeListCommandButton>
    </TreeListToolBar>
    <TreeListColumns>
        <TreeListCommandColumn Width="280px">
            <TreeListCommandButton Command="Add" Icon="plus">Add Child</TreeListCommandButton>
            <TreeListCommandButton Command="Edit" Icon="edit">Edit</TreeListCommandButton>
            <TreeListCommandButton Command="Delete" Icon="delete">Delete</TreeListCommandButton>
            <TreeListCommandButton Command="Save" Icon="save" ShowInEdit="true">Update</TreeListCommandButton>
            <TreeListCommandButton Command="Cancel" Icon="cancel" ShowInEdit="true">Cancel</TreeListCommandButton>
        </TreeListCommandColumn>

        <TreeListColumn Field="Name" Expandable="true" Width="320px" />
        <TreeListColumn Field="Id" Editable="false" Width="120px" />
        <TreeListColumn Field="EmailAddress" Width="220px" />
        <TreeListColumn Field="HireDate" Width="220px" />
    </TreeListColumns>
</TelerikTreeList>

@logger

@code {
    public List<Employee> Data { get; set; }

    // Sample CUD operations for the local data
    async Task UpdateItem(TreeListCommandEventArgs args)
    {
        var item = args.Item as Employee;

        // perform actual data source operations here through your service
        await MyService.Update(item);

        // update the local view-model data with the service data
        await GetTreeListData();

        AppendToLog("Update", args);
    }

    async Task CreateItem(TreeListCommandEventArgs args)
    {
        var item = args.Item as Employee;
        var parentItem = args.ParentItem as Employee;

        // perform actual data source operations here through your service
        await MyService.Create(item, parentItem);

        // update the local view-model data with the service data
        await GetTreeListData();

        AppendToLog("Create", args);
    }

    async Task DeleteItem(TreeListCommandEventArgs args)
    {
        var item = args.Item as Employee;

        // perform actual data source operations here through your service
        await MyService.Delete(item);

        // update the local view-model data with the service data
        await GetTreeListData();

        AppendToLog("Delete", args);
    }

    // OnEdit handler

    async Task OnEditHandler(TreeListCommandEventArgs args)
    {
        Employee empl = args.Item as Employee;
        if (empl.Id == 1)
        {
            // prevent opening for edit based on condition
            args.IsCancelled = true;
            Console.WriteLine("You cannot edit this item");
        }

        AppendToLog("Edit", args);
    }

    // OnCancel handler

    async Task OnCancelHandler(TreeListCommandEventArgs args)
    {
        Employee empl = args.Item as Employee;
        // if necessary, perform actual data source operation here through your service

        AppendToLog("Cancel", args);
    }

    // sample visualization of the results
    MarkupString logger;
    void AppendToLog(string commandName, TreeListCommandEventArgs args)
    {
        string currAction = string.Format(
            "<br />Command: <strong>{0}</strong>; is cancelled: <strong>{1}</strong>; is the item new: <strong>{2}</strong>",
                commandName,
                args.IsCancelled,
                args.IsNew
            );
        logger = new MarkupString(logger + currAction);
    }


    // sample model

    public class Employee
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public DateTime HireDate { get; set; }

        public List<Employee> DirectReports { get; set; }
        public bool HasChildren { get; set; }

        // Used for the editing so replacing the object in the view-model data
        // will treat it as the same object and keep its state - otherwise it will
        // collapse after editing is done, which is not what the user would expect
        public override bool Equals(object obj)
        {
            if (obj is Employee)
            {
                return this.Id == (obj as Employee).Id;
            }
            return false;
        }
    }

    // data generation

    async Task GetTreeListData()
    {
        Data = await MyService.Read();
    }

    protected override async Task OnInitializedAsync()
    {
        await GetTreeListData();
    }

    // the following static class mimics an actual data service that handles the actual data source
    // replace it with your actual service through the DI, this only mimics how the API can look like and works for this standalone page
    public static class MyService
    {
        private static List<Employee> _data { get; set; } = new List<Employee>();
        // used in this example for data generation and retrieval for CUD operations on the current view-model data
        private static int LastId { get; set; } = 1;

        public static async Task Create(Employee itemToInsert, Employee parentItem)
        {
            InsertItemRecursive(_data, itemToInsert, parentItem);
        }

        public static async Task<List<Employee>> Read()
        {
            if (_data.Count < 1)
            {
                for (int i = 1; i < 15; i++)
                {
                    Employee root = new Employee
                    {
                        Id = LastId,
                        Name = $"root: {i}",
                        EmailAddress = $"{i}@example.com",
                        HireDate = DateTime.Now.AddYears(-i),
                        DirectReports = new List<Employee>(),
                        HasChildren = true
                    };
                    _data.Add(root);
                    LastId++;

                    for (int j = 1; j < 4; j++)
                    {
                        int currId = LastId;
                        Employee firstLevelChild = new Employee
                        {
                            Id = currId,
                            Name = $"first level child {j} of {i}",
                            EmailAddress = $"{currId}@example.com",
                            HireDate = DateTime.Now.AddDays(-currId),
                            DirectReports = new List<Employee>(),
                            HasChildren = true
                        };
                        root.DirectReports.Add(firstLevelChild);
                        LastId++;

                        for (int k = 1; k < 3; k++)
                        {
                            int nestedId = LastId;
                            firstLevelChild.DirectReports.Add(new Employee
                            {
                                Id = LastId,
                                Name = $"second level child {k} of {j} and {i}",
                                EmailAddress = $"{nestedId}@example.com",
                                HireDate = DateTime.Now.AddMinutes(-nestedId)
                            }); ;
                            LastId++;
                        }
                    }
                }

                _data[0].Name += " (non-editable, see OnEdit)";
            }

            return await Task.FromResult(_data);
        }

        public static async Task Update(Employee itemToUpdate)
        {
            UpdateItemRecursive(_data, itemToUpdate);
        }

        public static async Task Delete(Employee itemToDelete)
        {
            RemoveChildRecursive(_data, itemToDelete);
        }

        // sample helper methods for handling the view-model data hierarchy
        static void UpdateItemRecursive(List<Employee> items, Employee itemToUpdate)
        {
            for (int i = 0; i < items.Count; i++)
            {
                if (items[i].Id.Equals(itemToUpdate.Id))
                {
                    items[i] = itemToUpdate;
                    return;
                }

                if (items[i].DirectReports?.Count > 0)
                {
                    UpdateItemRecursive(items[i].DirectReports, itemToUpdate);
                }
            }
        }

        static void RemoveChildRecursive(List<Employee> items, Employee item)
        {
            for (int i = 0; i < items.Count(); i++)
            {
                if (item.Equals(items[i]))
                {
                    items.Remove(item);

                    return;
                }
                else if (items[i].DirectReports?.Count > 0)
                {
                    RemoveChildRecursive(items[i].DirectReports, item);

                    if (items[i].DirectReports.Count == 0)
                    {
                        items[i].HasChildren = false;
                    }
                }
            }
        }

        static void InsertItemRecursive(List<Employee> Data, Employee insertedItem, Employee parentItem)
        {
            insertedItem.Id = LastId++;
            if (parentItem != null)
            {
                parentItem.HasChildren = true;
                if (parentItem.DirectReports == null)
                {
                    parentItem.DirectReports = new List<Employee>();
                }

                parentItem.DirectReports.Insert(0, insertedItem);
            }
            else
            {
                Data.Insert(0, insertedItem);
            }
        }
    }
}
````

## Notes

There are a few considerations to keep in mind with the CUD operations of the treelist. They are explained in the following list:

* It is up to the data access logic to save the data once it is changed in the data collection. The example above showcases when that happens and adds some code to provide a visual indication of the change. In a real application, the code for handling data updates may be entirely different.

* The CRUD event handlers must be `async Task` and **not** `async void`. A Task can be properly awaited and allows working with services and contexts, and lets the treelist update after the actual data source operations complete.

    * When the method returns `void`, the execution of the context operations is not actually awaited, and you may get errors from the context (such as "Cannot access a disposed object. A common cause of this error is disposing a context that was resolved from dependency injection and then later trying to use the same context instance elsewhere in your application" or "A second operation started on this context before a previous operation completed. This is usually caused by different threads using the same instance of DbContext"). The treelist may also re-render before the actual data update happens and you may not see the result.

* The treelist uses `Activator.CreateInstance<TItem>();` to generate a new item when an Insert or Edit action is invoked, so the Model should have a Parameterless constructor defined. If you cannot have such a contructor, a workaround might be might be [invoking dit/Insert through the treelist state]({%slug treelist-state%}#initiate-editing-or-inserting-of-an-item) and creating the object with your own code.

* While editing, the Treelist creates a **copy of your original object** which has a **different reference**. You receive that copy in the `OnUpdate` event handler. The `OnEdit` event receives the original item from the pristine `Data` collection, because it is a cancellable event and fires before the treelist logic creates the copy. The built-in editors and [editor templates]({%slug treelist-templates-editor%}) receive the copy for their `context` that the treelist will create after `OnEdit`.

* The validation the treelist provides is based on the <a href="https://docs.microsoft.com/en-us/aspnet/core/blazor/forms-validation?view=aspnetcore-5.0#validator-components" target="_blank">`DataAnnotationValidator`</a> and creates its own `EditContext` for a row that is in edit/insert mode. When the row is not in edit/insert mode, the `EditContext` is `null`. The `EditContext` is a cascading parameter and overrides any cascading parameters from parent components (such as an `<EditForm>` that may wrap the treelist).

* When an input receives an `EditContext` (usually comes down as a cascading parameter), the framework also requires a `ValueExpression`. If you use two-way binding (the `@bind-Value` syntax), the `ValueExpression` is deducted from there. However, if you use only the `Value` property, you have to pass the `ValueExpression` yourself. This is a lambda expression that tells the framework what field in the model to update. The following sample demonstrates how to achieve that. You can also check the [Requires a value for ValueExpression]({%slug common-kb-requires-valueexpression%}) knowledge base article for more details.

````CSHTML
<EditorTemplate>
    <TelerikTextBox Value="@myModel.MyField"
                    ValueExpression="@( () => myModel.MyField )">
    </TelerikTextBox>
</EditorTemplate>

@* Applies to the other input type components as well *@
````

<!-- * The validation will not be enabled for tree bound to Expando objects or Dictionaries (such as DataTable). -->


## See Also

  * [Live Demo: TreeList Inline Editing](https://demos.telerik.com/blazor-ui/treelist/editing-inline)
  * [Live Demo: TreeList PopUp Editing](https://demos.telerik.com/blazor-ui/treelist/editing-popup)
  * [Live Demo: TreeList InCell Editing](https://demos.telerik.com/blazor-ui/treelist/editing-incell)
  * [Live Demo: TreeList Custom Editor Template](https://demos.telerik.com/blazor-ui/treelist/custom-editor)
  * [Live Demo: TreeList Custom Edit Form](https://demos.telerik.com/blazor-ui/treelist/editing-custom-form)
