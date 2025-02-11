---
title: Display Loader During ContextMenu Actions in Grid
description: Learn how to show a loading indicator while performing actions from a ContextMenu in a Telerik Grid for Blazor.
type: how-to
page_title: How to Display a Loader in TelerikGrid for Blazor During ContextMenu Actions
slug: grid-kb-loader-during-contextmenu-actions
tags: contextmenu, grid, loader, loading, loadercontainer
res_type: kb
ticketid: 1675767
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor</td>
            <td>Context Menu for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

When the TelerikGrid is used with ContextMenu for various row actions, there is a noticeable delay between selecting an action and its execution. This delay could be due to data retrieval or data manipulation. The goal is to display a loading notice to the user while the data loads and the result is not yet visible.

This knowledge base article also answers the following questions:
- How to use the TelerikLoaderContainer during data fetch operations in Blazor?
- How to show a loading indicator while waiting for an action?
- How to improve user experience during delayed operations in TelerikGrid with ContextMenu in Blazor?

## Solution

To display a spinner during delayed operations initiated from a ContextMenu in a TelerikGrid, utilize the [TelerikLoaderContainer](slug:loadercontainer-overview) component. Display the TelerikLoaderContainer while the data is being loaded or an action is being performed, and hide it once the operation is complete.

````RAZOR
@using System.Collections.ObjectModel

<TelerikContextMenu @ref="@ContextMenuRef" Data="@MenuItems"
                    OnClick="@((MenuItem item) => ContextMenuClickHandler(item))">
</TelerikContextMenu>

<TelerikLoaderContainer Visible="@LoaderVisible" Text="Please wait..." />

<TelerikGrid Data="@GridData" @ref="@GridRef"
             EditMode="@GridEditMode.Inline"
             Height="500px"
             Pageable="true"
             OnCreate="@CreateItem" OnUpdate="@UpdateHandler"
             OnRowContextMenu="@OnContextMenu"
             SelectionMode="@GridSelectionMode.Multiple"
             @bind-SelectedItems="@SelectedItems">
    <GridToolBarTemplate>
        <GridCommandButton Command="Add" Icon="@SvgIcon.Plus">Add Employee</GridCommandButton>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field=@nameof(SampleData.ID) Editable="false" />
        <GridColumn Field=@nameof(SampleData.Name) />
        <GridCommandColumn>
            <GridCommandButton Command="Save" Icon="@SvgIcon.Save" ShowInEdit="true">Save</GridCommandButton>
            <GridCommandButton Command="Cancel" Icon="@SvgIcon.Cancel" ShowInEdit="true">Cancel</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@if (SelectedItems.Any())
{
    <ul>
        @foreach (var item in SelectedItems)
        {
            <li>@item.Name</li>
        }
    </ul>
}

@code {
    private ObservableCollection<SampleData> GridData { get; set; }
    private List<MenuItem> MenuItems { get; set; }
    private IEnumerable<SampleData> SelectedItems { get; set; } = Enumerable.Empty<SampleData>();
    private SampleData SelectedPerson { get; set; }
    private TelerikContextMenu<MenuItem> ContextMenuRef { get; set; }
    private TelerikGrid<SampleData> GridRef { get; set; }
    private bool LoaderVisible { get; set; }

    public class MenuItem
    {
        public string Text { get; set; }
        public ISvgIcon Icon { get; set; }
        public Action Action { get; set; }
        public string CommandName { get; set; }
    }

    private async Task OnContextMenu(GridRowClickEventArgs args)
    {
        var argsItem = args.Item as SampleData;

        SelectedPerson = argsItem;

        if (args.EventArgs is MouseEventArgs mouseEventArgs)
        {
            await ContextMenuRef.ShowAsync(mouseEventArgs.ClientX, mouseEventArgs.ClientY);
        }
    }

    private async Task ContextMenuClickHandler(MenuItem item)
    {
        if (item.Action != null)
        {
            item.Action.Invoke();
        }
        else
        {
            switch (item.CommandName)
            {
                case "BeginEdit":
                    LoaderVisible = true;
                    await Task.Delay(1); // triggers UI refresh for the LoaderContainer to show
                    await Task.Delay(3000); // replace with the actual long-running task
                    LoaderVisible = false;

                    var currState = GridRef.GetState();
                    currState.InsertedItem = null;
                    SampleData itemToEdit = SampleData.GetClonedInstance(GridData.Where(itm => itm.ID == SelectedPerson.ID).FirstOrDefault());
                    currState.OriginalEditItem = itemToEdit;
                    await GridRef.SetStateAsync(currState);
                    break;
                case "ToggleSelect":
                    LoaderVisible = true;
                    await Task.Delay(1); // triggers UI refresh for the LoaderContainer to show
                    await Task.Delay(3000); // replace with the actual long-running task
                    LoaderVisible = false;

                    var selItems = SelectedItems.ToList();
                    if (SelectedItems.Contains(SelectedPerson))
                    {
                        selItems.Remove(SelectedPerson);
                    }
                    else
                    {
                        selItems.Add(SelectedPerson);
                    }
                    SelectedItems = selItems;
                    break;
                default:
                    break;
            }
        }
        SelectedPerson = null; // clean up
    }

    protected override void OnInitialized()
    {
        MenuItems = new List<MenuItem>()
        {
            new MenuItem(){ Text = "Select", Icon = SvgIcon.CheckboxChecked, CommandName="ToggleSelect" },
            new MenuItem(){ Text = "Edit", Icon = SvgIcon.Pencil, CommandName="BeginEdit" }
        };

        GridData = new ObservableCollection<SampleData>();
        var rand = new Random();

        for (int i = 1; i < 100; i++)
        {
            GridData.Add(new SampleData()
            {
                ID = i,
                Name = "Employee " + i.ToString(),
            });
        }
    }

    private async Task CreateItem(GridCommandEventArgs args)
    {
        var argsItem = args.Item as SampleData;

        argsItem.ID = GridData.Count + 1;

        GridData.Insert(0, argsItem);
    }

    private async Task UpdateHandler(GridCommandEventArgs args)
    {
        var argsItem = args.Item as SampleData;

        var index = GridData.ToList().FindIndex(i => i.ID == argsItem.ID);
        if (index != -1)
        {
            GridData[index] = argsItem;
        }
    }

    public class SampleData
    {
        public int ID { get; set; }
        public string Name { get; set; }


        public override bool Equals(object obj)
        {
            if (obj is SampleData)
            {
                return this.ID == (obj as SampleData).ID;
            }
            return false;
        }

        public SampleData()
        {

        }

        public SampleData(SampleData itmToClone)
        {
            this.ID = itmToClone.ID;
            this.Name = itmToClone.Name;
        }

        public static SampleData GetClonedInstance(SampleData itmToClone)
        {
            return new SampleData(itmToClone);
        }
    }
}
````

## See Also

* [LoaderContainer Overview](slug:loadercontainer-overview)
* [Grid Overview](slug:grid-overview)
* [ContextMenu Overview](slug:contextmenu-overview)
