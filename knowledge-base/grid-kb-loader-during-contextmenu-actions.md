---
title: Displaying Loader During Actions in TelerikGrid with ContextMenu
description: Learn how to show a loading indicator while performing actions from a ContextMenu in a TelerikGrid for Blazor.
type: how-to
page_title: How to Display a Loader in TelerikGrid for Blazor During ContextMenu Actions
slug: grid-kb-loader-during-contextmenu-actions
tags: contextmenu,grid,loader,loading, loadercontainer,actions
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

When using the TelerikGrid with ContextMenu for various row actions, there is a noticeable delay between selecting an action and its execution. This delay could be due to data retrieval or data manipulation. The goal is to display a loading notice to the user while the data loads and the result is not yet visible.

This knowledge base article also answers the following questions:
- How to use the TelerikLoaderContainer during data fetch operations in Blazor?
- How to show a loading indicator while waiting for an action?
- How to improve user experience during delayed operations in TelerikGrid with ContextMenu in Blazor?

## Solution

To display a spinner during delayed operations initiated from a ContextMenu in a TelerikGrid, utilize the [TelerikLoaderContainer](https://www.telerik.com/blazor-ui/documentation/components/loadercontainer/overview) component. Display the TelerikLoaderContainer while the data is being loaded or an action is being performed, and hide it once the operation is complete.

````RAZOR
@using System.Collections.Generic
@using System.Collections.ObjectModel
@using Telerik.Blazor.Components

<TelerikContextMenu @ref="@ContextMenuRef" Data="@MenuItems"
OnClick="@((MenuItem item) => ContextMenuClickHandler(item))">
</TelerikContextMenu>

<TelerikLoaderContainer Visible="@LoaderVisible" Text="Loading, please wait..."></TelerikLoaderContainer>

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

@code {
    private ObservableCollection<SampleData> GridData { get; set; }
    private List<MenuItem> MenuItems { get; set; }
    private IEnumerable<SampleData> SelectedItems { get; set; } = Enumerable.Empty<SampleData>();
    private SampleData SelectedPerson { get; set; }
    private TelerikContextMenu<MenuItem> ContextMenuRef { get; set; }
    private TelerikGrid<SampleData> GridRef { get; set; }
    private bool LoaderVisible { get; set; }

    private async Task ContextMenuClickHandler(MenuItem item)
    {
        LoaderVisible = true;
        // Perform the action, such as data loading or another operation.
        await Task.Delay(3000); // Simulate a delay for demonstration.
        LoaderVisible = false;
        // Proceed with action-specific logic after the delay.
    }

    // Additional component logic such as data initialization and CRUD operations.
}
````

## See Also

- [TelerikLoaderContainer Overview](https://www.telerik.com/blazor-ui/documentation/components/loadercontainer/overview)
- [TelerikGrid Documentation](https://docs.telerik.com/blazor-ui/components/grid/overview)
- [TelerikContextMenu Documentation](https://docs.telerik.com/blazor-ui/components/contextmenu/overview)
