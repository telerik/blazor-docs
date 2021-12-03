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

In Cell editing allows the user to click cells and type new values immediately like in Excel. There is no need for Edit, Update and Cancel buttons.

Users can use the `Tab`, `Shift+Tab` and `Enter` keys to move between edited cells quickly. If validation is not satisfied, the user cannot exit edit mode, unless they satisfy validation, or cancel changes by pressing `Esc`.

Command columns and non-editable columns are skipped while tabbing.

The InCell edit mode provides a specific user experience and behaves differently than other edit modes. Please review the notes below to get a better understanding of these specifics.


#### Sections in this article

* [Basics](#basics)
* [Event Sequence](#event-sequence)
* [Incell Editing and Selection](#incell-editing-and-selection)
* [Adding Children to Collapsed Items](#adding-children-to-collapsed-items)
* [Editor Template](#editor-template)


## Basics

To enable InCell editing mode, set the `EditMode` property of the TreeList to `Telerik.Blazor.TreeListEditMode.Incell`. You can handle the `OnUpdate`, `OnCreate` and `OnDelete` events to perform the CUD operations, as shown in the example below.

To add a new item, you must add a [toolbar]({%slug treelist-toolbar%}) with an `Add` command. `OnCreate` will fire immediately when you click the `Add` button - see [Event Sequence](#event-sequence) below.

It is up to the data access logic to save the data once it is changed in the data collection. The example above showcases when that happens and adds some code to provide a visual indication of the change. In a real application, the code for handling data updates may be entirely different.

>caption Incell Editing Example. See the code comments for details.

````CSHTML
@using System.ComponentModel.DataAnnotations @* for the validation attributes *@

Click a cell, edit it and click outside of the treelist to see the change. You can also use Tab, Shift+Tab and Enter to navigate between the cells.
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
        var item = args.Item as Employee;

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

>caption The result from the code snippet above, after the user clicks in the Name column of the row with ID 4

![](images/incell-editing.png)


## Event Sequence

* The `OnCreate` event will fire as soon as you click the `Add` button. The Grid will render the new row and enter edit mode for the first editable column (to fire `OnEdit` and let the user alter the column). This means you should have [default values]({%slug grid-kb-default-value-for-new-row%}) that satisfy any initial validation and requirements your models may have.

    * This means that there is no actual inserted item, an item in InCell editing is always in Edit mode, never in Insert mode. Thus, you cannot use the `InsertedItem` field of the TreeList [State]({%slug treelist-state%}). If you want to insert items programmatically in the TreeList, alter the `Data` collection, and use the `OriginalEditItem` feature of the state (see the [Initiate Editing or Inserting of an Item]({%slug treelist-state%}#initiate-editing-or-inserting-of-an-item) example - it can put the InLine and PopUp edit modes in Insert mode, but this cannot work for InCell editing).

* The `OnEdit` event fires every time a cell is opened for editing. Until version **2.27**, the event fired **once per row** - when the user edits a cell from a different row.

* The `OnUpdate` event fires every time an edited cell is closed. Until version **2.27**, the event fired **once per row** - when the currently edited row loses focus.

* If there is a cell that is being edited at the moment, clicking on another cell will first close the current cell and fire `OnUpdate`. To start editing the new cell, you need a second click. When the user removes focus from the TreeList or the current row, the `OnUpdate` event fires, where the data-access logic can move it to the actual data source.

* The `OnCancel` event works only when pressing `Esc`. The `Cancel` command button is not supported. Clicking outside the currently edited cell will trigger `OnUpdate` and thus, clicking on the `Cancel` command button will not fire the `OnCancel` event, because an update has already occured.


## Incell Editing and Selection

* To enable item selection with InCell Edit Mode, add a `<TreeListCheckboxColumn />` to the `<Columns>` collection. More information on that can be read in the [Selection]({%slug treelist-selection-overview%}#notes) article.

   <!-- * To see how to select the row that is being edited in InCell edit mode without using a `<TreeListCheckboxColumn />` check out the [Row Selection in Edit with InCell EditMode]({%slug grid-kb-row-select-incell-edit%}) Knowledge Base article. -->


## Adding Children to Collapsed Items

If you click the "Add" button on a row that is not expanded, you will not see the new child row in the UI. There will be an `OnCreate` call to insert a record, but editing (and inserting) items is a separate operation from expanding items and the TreeList should not invoke these changes arbitrarily. There can be other handlers, business logic or load-on-demand attached to that action, and that changes the users state. This also applies to items that currently have no child items - they will now have a child item, but it will not expand and open for editing.


## Editor Template

When using an [editor template]({%slug treelist-templates-editor%}), the grid cannot know what the custom editor needs to do, what it contains, and when it needs to close the cell and update the data, because this is up to the editor. This has the following implications:

* The treelist will still capture `Enter` and `Tab` keypresses when the cell is focused, and will close the cell with the corresponding `OnUpdate` call. You can either use that (e.g., a standard input will let the keypress event propagate to the treelist cell), or you can prevent the event propagation and use only your business logic. If you don't do anything, you will get the default treelist behavior for the keyboard navigation even with custom editors.

* The treelist can no longer capture the `onblur` event in a custom editor like it does for built-in editors. It uses it to call `OnUpdate` when the user clicks away from the current row with the mouse. So, when an editor template is open, clicking away will not close it and save the row.

    If you want to get this behavior, you can use the treelist [state]({%slug treelist-state%}) to close the cell and you can also invoke the desired operations on the data according to your business logic. For example, a suitable event the Telerik input components provide is `OnBlur`.

    **.razor**
    
        <EditorTemplate>
            @{
                CurrentlyEditedLine = context as SampleData;
                <TelerikTextBox OnBlur="@CloseEditorAndSave" 
                    Width="100%" @bind-Value="@CurrentlyEditedLine.LastName">
                </TelerikTextBox>

            }
        </EditorTemplate>


    **C#**
    
        SampleData CurrentlyEditedLine { get; set; }
        TelerikTreeList<SampleData> TreeList { get; set; }
    
        async Task CloseEditorAndSave()
        {
            var state = TreeList?.GetState();
            if (state.EditItem != null)
            {
                // we can reuse the code from the OnUpdate handler
                await UpdateHandler(new TreeListCommandEventArgs()
                {
                    Item = state.EditItem
                });
                
                // use the state to remove the edited item (close the editor)
                state.EditItem = null;
                state.OriginalEditItem = null;
                await TreeList.SetState(state);
            }
        }

* Using an editor template requires that there is a focusable element in the editor template in order to maintain the tab order when using the keyboard. For example, if you prevent editing based on a runtime condition (setting `Editable=false` for the entire column does not require this), you must provide a focusable element, here is one way to add such an element:
    
    **.razor**
    
        <EditorTemplate>
        @{
            if (myCurrentEditCondition)
            {
                <MyCustomEditor />
            }
            else
            {
                <div tabindex="0">editing not allowed</div>
            }
        }
    </EditorTemplate>


## See Also

  * [Live Demo: TreeList InCell Editing](https://demos.telerik.com/blazor-ui/treelist/editing-incell)
  * [TreeList Selection Documentation]({%slug treelist-selection-overview%})
