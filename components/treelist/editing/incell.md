---
title: InCell Editing
page_title: TreeList - InCell Editing
description: In-cell editing of data in treelist for Blazor.
slug: treelist-editing-incell
tags: telerik,blazor,treelist,in cell,editing
published: True
position: 4
---

# TreeList InCell Editing

In Cell editing allows the user to click the cell and type the new value. When they remove focus from the input, the `OnUpdate` event fires, where the data-access logic can move it to the actual data source.

Sections in this article:
* [Basics](#basics)
* [Notes](#notes)

## Basics

You can handle the `OnUpdate`, `OnCreate` and `OnDelete` events to perform the CUD operations, as shown in the example below. To add a new item, you must also add a [command column]({%slug treelist-columns-command%}) with a `Save` command and a [toolbar]({%slug treelist-toolbar%}) with an `Add` command. Cancellation of changes is not supported at the moment, you can prevent them by not calling the data access layer.

To enable InCell editing mode, set the `EditMode` property of the treelist to `Telerik.Blazor.TreeListEditMode.Incell`, then handle the CRUD events as shown in the example below.


>caption Values are set in the model as soon as the user finishes editing a field, and you can receive them through the treelist events

````CSHTML
Click a cell, edit it and click outside of the cell to see the change.
<br />
Editing is cancelled for the first record.
<br />

<TelerikTreeList Data="@Data"
                 EditMode="@TreeListEditMode.Incell"
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
        <TreeListCommandColumn Width="200px">
            <TreeListCommandButton Command="Add" Icon="plus">Add Child</TreeListCommandButton>
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

@code {
    public List<Employee> Data { get; set; }

    // Sample CUD operations for the local data
    async Task UpdateItem(TreeListCommandEventArgs args)
    {
        string fieldName = args.Field;
        object newVal = args.Value; // you can cast this, if necessary, according to your model

        var item = args.Item as Employee; // you can also use the entire model

        // perform actual data source operations here through your service
        await MyService.Update(item);

        // update the local view-model data with the service data
        await GetTreeListData();
    }

    async Task CreateItem(TreeListCommandEventArgs args)
    {
        var item = args.Item as Employee;
        var parentItem = args.ParentItem as Employee;

        // perform actual data source operations here through your service
        await MyService.Create(item, parentItem);

        // update the local view-model data with the service data
        await GetTreeListData();
    }

    async Task DeleteItem(TreeListCommandEventArgs args)
    {
        var item = args.Item as Employee;

        // perform actual data source operations here through your service
        await MyService.Delete(item);

        // update the local view-model data with the service data
        await GetTreeListData();
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
    }

    // OnCancel handler

    async Task OnCancelHandler(TreeListCommandEventArgs args)
    {
        Employee empl = args.Item as Employee;
        // if necessary, perform actual data source operation here through your service
    }


    // sample model

    public class Employee
    {
        public int Id { get; set; }
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

>caption The result from the code snippet above, after the user clicks in the Name column of the row with ID 4

![](images/incell-editing.png)



## Notes

* When the InCell Edit Mode is enabled and you want to enable item selection a `<TreeListCheckboxColumn />` must be added to the `<Columns>` collection. More information on that can be read in the [Selection]({%slug treelist-selection-overview%}#notes) article.

   <!-- * To see how to select the row that is being edited in InCell edit mode without using a `<TreeListCheckboxColumn />` check out the [Row Selection in Edit with InCell EditMode]({%slug grid-kb-row-select-incell-edit%}) Knowledge Base article. -->

* It is up to the data access logic to save the data once it is changed in the data collection. The example above showcases when that happens and adds some code to provide a visual indication of the change. In a real application, the code for handling data updates may be entirely different.

* When using an [editor template]({%slug treelist-templates-editor%}), the treelist cannot always know what the custom editor needs to do, and when it needs to close the cell and update the data, because this is up to the editor. Thus, to save changes when a custom editor is used, a click on the Save command button is necessary.


<!-- Thus, you can use the treelist [state]({                   %slug treelist-state%}) to close the cell and invoke the desired operations on the data according to your business logic. For example, a suitable event the Telerik input components provide is `OnChange`.
    * When keyboard navigation is enabled in the treelist (`Navigable=true`), the treelist will capture `Enter` keypresses when the cell is focused, and will close the cell with the corresponding update. You can either use that (e.g., a simple input will let the keypress event propagate to the treelist cell), or you can prevent the event propagation and use only your business logic.
    
    The example below shows how you can use both a navigable treelist and events on the custom editor templates to close the cells when Enter is pressed or when they lose focus, much like an Excel spreadsheet behaves.
    
    **.razor**
    
        @* The Telerik-specific OnChange event is used to achieve this in this example.
        You can implement a similar event in your components/editors, or use a completely different event and logic to instruct the treelist to update a cell. In this example, the two-way binding
        provides the editor value to the model immediately, so it becomes avaialable in the OnChange
        handler. In your case you might need to handle this differently, depending on the logic you need.
        *@
        
        <Teleriktreelist @ref="@treelist"
                     Data=@MyData
                     EditMode="@treelistEditMode.Incell"
                     Pageable="true"
                     Height="500px"
                     OnUpdate="@UpdateHandler" OnCreate="@CreateHandler"
                     Navigable="true">
            <treelistColumns>
                <treelistColumn Field=@nameof(SampleData.ID) Editable="false" Title="ID" />
                <treelistColumn Field=@nameof(SampleData.Name) Title="Name">
                    <EditorTemplate>
                        @{
                            currentItem = context as SampleData;
                            <TelerikTextBox @bind-Value=@currentItem.Name OnChange="@CloseEditor" Width="100%" />
                        }
                    </EditorTemplate>
                </treelistColumn>
                <treelistColumn Field=@nameof(SampleData.Ranking) Title="Ranking" Width="120px">
                    <EditorTemplate>
                        @{
                            currentItem = context as SampleData;
                            <TelerikNumericTextBox @bind-Value=@currentItem.Ranking OnChange="@CloseEditor"
                                                   Width="100%" Max="10" Min="0" Step="1">
                            </TelerikNumericTextBox>
                        }
                    </EditorTemplate>
                </treelistColumn>
                <treelistColumn Field=@nameof(SampleData.Role) Title="Position" Width="200px">
                    <EditorTemplate>
                        @{
                            currentItem = context as SampleData;
                            <TelerikDropDownList Data="@Roles" @bind-Value="@currentItem.Role" OnChange="@CloseEditor"
                                                 Width="120px" PopupHeight="auto">
                            </TelerikDropDownList>
                        }
                    </EditorTemplate>
                </treelistColumn>
                <treelistCommandColumn>
                    <treelistCommandButton Command="Save" Icon="save" ShowInEdit="true">Save</treelistCommandButton>
                </treelistCommandColumn>
            </treelistColumns>
            <treelistToolBar>
                <treelistCommandButton Command="Add" Icon="add">Add Employee</treelistCommandButton>
            </treelistToolBar>
        </Teleriktreelist>
        
        @code {
            // handling the custom editor template for InCell editing
            public Teleriktreelist<SampleData> treelist { get; set; }
            public SampleData currentItem { get; set; }
        
            async Task CloseEditor()
            {
                var state = treelist?.GetState();
        
                if (currentItem.ID == 0 && state.InsertedItem != null)
                {
                    // insert operation - the item is new
                    await CreateHandler(new treelistCommandEventArgs()
                    {
                        Item = state.InsertedItem
                    });
                }
                else
                if (currentItem.ID > 0 && state.EditItem != null)
                {
                    // edit operation on an existing item
                    await UpdateHandler(new treelistCommandEventArgs()
                    {
                        Item = state.EditItem,
                        Field = state.EditField
                    });
                }
        
                state.InsertedItem = state.OriginalEditItem = state.EditItem = default;
        
                await Task.Delay(20); // let the treelist re-render and close the cell if keyboard navigation is enabled
        
                await treelist?.SetState(state);
            }
        
            //Create and Update operations
        
            async Task UpdateHandler(treelistCommandEventArgs args)
            {
                SampleData item = (SampleData)args.Item;
        
                var index = MyData.FindIndex(i => i.ID == item.ID);
                if (index != -1)
                {
                    // with keyboard navigation and Enter key press in the component
                    // both the treelist, and the OnChange handler will raise the update event
                    // you may want to add an equality comparison for the item to only call the database once
                    // when the item has changed, not both times
                    if (!MyData[index].Equals(item))
                    {
                        MyData[index] = item;
                        Console.WriteLine("update");
                        //perform actual data source operations here
                    }
                }
            }
        
            async Task CreateHandler(treelistCommandEventArgs args)
            {
                SampleData item = (SampleData)args.Item;
        
                item.ID = MyData.Count + 1;
                MyData.Insert(0, item);
        
                Console.WriteLine("create");
                // perform actual data source operation here through your service
            }
        
            // data sources
        
            protected override void OnInitialized()
            {
                MyData = new List<SampleData>();
        
                for (int i = 1; i < 50; i++)
                {
                    MyData.Add(new SampleData()
                    {
                        ID = i,
                        Name = "name " + i,
                        Ranking = i % 10
                    });
                }
            }
        
            public class SampleData
            {
                public int ID { get; set; }
                public string Name { get; set; }
                public string Role { get; set; }
                public int Ranking { get; set; }
        
                public override bool Equals(object obj)
                {
                    if (obj != null && obj is SampleData)
                    {
                        SampleData curr = obj as SampleData;
                        return (ID == curr.ID) && (Name == curr.Name) && (Role == curr.Role) && (Ranking == curr.Ranking);
                    }
                    return false;
                }
            }
        
            List<SampleData> MyData { get; set; }
            static List<string> Roles = new List<string> { "Manager", "Employee", "Contractor" };
        }

-->

## See Also

  * [Live Demo: TreeList InCell Editing](https://demos.telerik.com/blazor-ui/treelist/editing-incell)
  * [TreeList Selection Documentation]({%slug treelist-selection-overview%})
