---
title: Add the Grid Built-In Functions When Using Grid Row Template
description: Learn how to implement built-in Grid functions like CheckBoxColumn or CommandColumn when using the Grid's Row Template
type: how-to
page_title: Implement Built-in Functions when Using Grid Row Template
slug: grid-kb-row-template-simulate-built-in-functions
position: 
tags: grid, rowtemplate
ticketid: 1463819, 1465447, 1578974, 1605222, 1606211, 1609036, 1629221, 1667096
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

This KB article answers the following questions:

* How to [select rows](slug://grid-selection-row) in the Grid when using a [Row Template](slug://grid-templates-row)?
* How to add a [checkbox column](slug://components/grid/columns/checkbox) in the Grid when using a Row Template? I want to be able to select the row through its checkbox, but also to have the functionality to [select all rows](slug://components/grid/columns/checkbox#parameters) from the header of the checkbox column.
* Do the built-in keyboard options to select a range of rows by clicking the `Shift` or `Ctrl` key work when using a Row Template? How to check the checkbox of the row when I select a row by clicking the row?
* How to add a [command column](slug://components/grid/columns/command) in the Grid when using a Row Template?
* When using a Row Template, how to prevent the selection of Grid rows when clicking on command buttons?
* How to implement Grid column [resizing](slug://components/grid/columns/resize), [auto-fitting](slug://components/grid/columns/resize#autofit-columns), [visibility](slug://grid-columns-visible), [locking](slug://grid-columns-frozen), and [reordering](slug://components/grid/columns/reorder) when using a Row Template?

## Solution

By default, using the Row Template disables most built-in functionalities of the Grid because the Grid no longer controls its own rendering. This lets you add custom implementations for these features. The [example below](#example) shows one way to implement functionalities such as row selection (both by clicking on a row and through a checkbox column), column resizing and visibility, editing through command buttons, sorting, and filtering.

### Selection

To implement custom selection functionality:

* In the [`<GridColumns>` collection](slug://components/grid/columns/bound#show-data-in-a-grid) add the [`<GridCheckboxColumn>`](slug://components/grid/columns/checkbox) and use the [`HeaderTemplate`](slug://components/grid/columns/checkbox#header-template) to add a [CheckBox component](slug://checkbox-overview). This CheckBox component handles the [select all rows](slug://components/grid/columns/checkbox#parameters) functionallity.
* In the Row Template, add a `<td>` element with a CheckBox component. Add a Boolean property to the Grid model to indicate selection so you can use it for the state of this CheckBox.
* Handle the Grid's [`SelectedItemsChanged` event](slug://grid-selection-row#selecteditemschanged-event) and the CheckBox's [`OnChange` event](slug://checkbox-events#onchange) to manage the [`SelectedItems` collection](slug://grid-selection-overview#access-selected-rows-or-cells). The `OnChange` event fires after the `SelectedItemsChanged` event. In this case, you need to create a separate collection of selected items to persist the selected items when multiselecting through the checkbox column.

### Editing, Sorting, Filtering

The built-in editing, sorting, and filtering will work if the Row Template structure is similar to an actual table and only for the first  Grid data model property included in the `<td>` element, if any.

### Command Column

To implement a custom command column:

* In the `<GridColumns>` collection add the [`<GridCommandColumn>`](slug://components/grid/columns/command) and use the [built-in `Save` and `Cancel` commands](slug://components/grid/columns/command#built-in-commands). 
* In the Row Template add a `<td>` element with a [Button component](slug://components/button/overview) and handle the Grid items editing and deleting programmatically. Refer to the knowledge base article on how to [enter and exit Grid edit mode programmatically](slug://grid-kb-add-edit-state).
* Set the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation" target="_blank">`stopPropagation` method</a> of the <a href="https://www.w3schools.com/jsref/event_onclick.asp" target="_blank">`onclick` event</a> to the `<td>` element to prevent row selection when clicking a command button.

### Column Resizing, Auto-Fitting, Visibility, Locking, Reordering

* Column resizing and auto-fitting will work if the Row Template structure resembles an actual table row, with a corresponding number of cells matching the Grid columns.
* Column visibility depends on including a `<td>` element for the column in the Row Template.
* To implement column locking, add the `k-grid-content-sticky` class to the `<td>` element of the columns that you want locked, and calculate and set the correct `left` and `right` CSS properties, as the content inside the Row Template can be any valid HTML.
* For column reordering, manage the `left` and `right` CSS properties on the `<td>` elements within the Row Template.

## Example

>caption Row selection, Column resizing and visibility, Editing, Sorting, and Filtering when using Row Template

````RAZOR
<TelerikGrid @ref="@GridRef"
             Data=@GridData
             Pageable="true"
             PageSize="15"
             Sortable="true"
             Resizable="true"
             FilterMode="@GridFilterMode.FilterMenu"
             FilterMenuType="@FilterMenuType.CheckBoxList"
             EditMode="@GridEditMode.Inline"
             SelectionMode="@GridSelectionMode.Multiple"
             SelectedItems="@SelectedItems"
             SelectedItemsChanged="@( (IEnumerable<ArticleDto> newSelected) => SelectedItemsChangedHandler(newSelected) )"
             OnCreate="@OnCreateHandler"
             OnUpdate="@OnUpdateHandler">
    <GridToolBarTemplate>
        <GridCommandButton Command="Add">Add</GridCommandButton>
    </GridToolBarTemplate>
    <RowTemplate Context="article">
        <td>
            <TelerikCheckBox @bind-Value="@article.IsSelected" OnChange="@(() => OnCheckBoxChangeHandler(article.Id))" />
        </td>
        <td>
            <img src="@article.ImageUrl" width="55" height="35" />
        </td>
        <td>
            @{
                if(article.IsSelected)
                {
                    <h2>Selected</h2>
                }
                else
                {
                    <h2>Not Selected</h2>
                }
            }
            @article.Title
        </td>
        <td @onclick:stopPropagation="true">
            <TelerikButton Icon="@SvgIcon.Pencil" OnClick="@(() => OnProgrammaticEditHandler(article.Id))">Programmatic Edit</TelerikButton>
            <TelerikButton Icon="@SvgIcon.Trash" OnClick="@(() => OnProgrammaticDeleteHandler(article.Id))">Programmatic Delete</TelerikButton>
        </td>
    </RowTemplate>
    <GridColumns>
        <GridCheckboxColumn>
            <HeaderTemplate>
                <TelerikCheckBox Value="@SelectAll" ValueChanged="@((bool value) => SelectAllHandler(value))" />
            </HeaderTemplate>
        </GridCheckboxColumn>
        <GridColumn Field=@nameof(ArticleDto.Id) Visible="false" />
        <GridColumn Field=@nameof(ArticleDto.ImageUrl) Title="Image" Editable="false" Resizable="true" />
        <GridColumn Field=@nameof(ArticleDto.Title) Title="Article Title" Resizable="true" />
        <GridCommandColumn>
            <GridCommandButton Icon="SvgIcon.Save" Command="Save" ShowInEdit="true">Save</GridCommandButton>
            <GridCommandButton Icon="SvgIcon.Cancel" Command="Cancel" ShowInEdit="true">Cancel</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private TelerikGrid<ArticleDto>? GridRef { get; set; }

    private List<ArticleDto> GridData { get; set; } = new();

    private IEnumerable<ArticleDto> SelectedItems { get; set; } = Enumerable.Empty<ArticleDto>();
    private List<ArticleDto> TempSelectedItemsCollection { get; set; } = new();
    private bool SelectAll { get; set; }

    #region Selection

    private void SelectAllHandler(bool newValue)
    {
        SelectAll = newValue;

        foreach (var item in GridData)
        {
            item.IsSelected = SelectAll;
        }

        // If SelectAll is true, assign all items to SelectedItems, 
        // else set it to an empty list.
        SelectedItems = SelectAll ? new List<ArticleDto>(GridData) : new List<ArticleDto>();
        TempSelectedItemsCollection = SelectAll ? new List<ArticleDto>(GridData) : new List<ArticleDto>();
    }

    protected void SelectedItemsChangedHandler(IEnumerable<ArticleDto> selectedItems)
    {
        foreach (var item in GridData)
        {
            item.IsSelected = false;
        }

        // Use temporary collection to be able to persist the
        // selected items when multiselecting with checkboxes.
        TempSelectedItemsCollection = SelectedItems.ToList();
        SelectedItems = selectedItems;

        foreach (var item in selectedItems)
        {
            item.IsSelected = true;
        }
    }

    private void OnCheckBoxChangeHandler(Guid itemId)
    {
        ArticleDto? currentItem = GridData.FirstOrDefault(a => a.Id == itemId);

        if (currentItem != null)
        {
            if (currentItem.IsSelected)
            {
                TempSelectedItemsCollection.Add(currentItem);
            }
            else
            {
                TempSelectedItemsCollection.Remove(currentItem);
            }
        }

        // The OnChange event fires after the SelectedItemsChanged
        // thus we need to update the SelectedItems collection.
        SelectedItems = TempSelectedItemsCollection;

        foreach (var item in SelectedItems)
        {
            item.IsSelected = true;
        }
    }

    #endregion Selection

    #region Edit

    private void OnCreateHandler(GridCommandEventArgs args)
    {
        var createdItem = (ArticleDto)args.Item;
        createdItem.Id = Guid.NewGuid();
        var rnd = new Random();
        createdItem.ImageUrl = $"https://demos.telerik.com/blazor-ui/images/photos/{rnd.Next(1, 30) % 7 + 1}.jpg";
        GridData.Insert(0, createdItem);
    }

    private async Task OnProgrammaticEditHandler(Guid itemId)
    {
        if (GridData.Any() && GridRef != null)
        {
            var gridState = GridRef.GetState();

            gridState.InsertedItem = null;
            gridState.OriginalEditItem = GridData.Where(x => x.Id == itemId).First();
            gridState.EditItem = GridData.Where(x => x.Id == itemId).First().Clone();
            var rnd = new Random();
            gridState.EditItem.ImageUrl = $"https://demos.telerik.com/blazor-ui/images/photos/{rnd.Next(1, 30) % 7 + 1}.jpg";
            await GridRef.SetStateAsync(gridState);
        }
    }

    private void OnUpdateHandler(GridCommandEventArgs args)
    {
        var updatedItem = (ArticleDto)args.Item;
        var index = GridData.FindIndex(i => i.Id == updatedItem.Id);
        if (index != -1)
        {
            GridData[index] = updatedItem;
        }
    }

    private void OnProgrammaticDeleteHandler(Guid itemId)
    {
        if (GridData.Any() && GridRef != null)
        {
            var itemToDelete = GridData.Where(x => x.Id == itemId).First();
            GridData.Remove(itemToDelete);

            // Remove from SelectedItems collection
            TempSelectedItemsCollection = SelectedItems.ToList();
            TempSelectedItemsCollection.Remove(itemToDelete);
            SelectedItems = TempSelectedItemsCollection;

            GridRef.Rebind();
        }
    }

    #endregion Edit

    #region Data Generation

    private void GetGridData()
    {
        GridData = new List<ArticleDto>();

        for (int i = 1; i <= 30; i++)
        {
            GridData.Add(new ArticleDto
                {
                    Id = Guid.NewGuid(),
                    Title = "Article title " + i,
                    ImageUrl = $"https://demos.telerik.com/blazor-ui/images/photos/{i % 7 + 1}.jpg"
                });
        }
    }

    protected override void OnInitialized()
    {
        GetGridData();
    }

    public class ArticleDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string ImageUrl { get; set; }
        public bool IsSelected { get; set; }

        public ArticleDto Clone()
        {
            return new ArticleDto()
                {
                    Id = Id,
                    Title = Title,
                    ImageUrl = ImageUrl
                };
        }
    }

    #endregion DataGeneration

}
````

## See Also

* [Grid Row Template](slug://grid-templates-row)
* [Grid Row Selection](slug://grid-selection-row)
* [Grid Command Column](slug://components/grid/columns/command)
* [Grid Column Resizing](slug://components/grid/columns/resize)
* [Grid Column Auto-fitting](slug://components/grid/columns/resize#autofit-columns)
* [Grid Column Visibility](slug://grid-columns-visible)
* [Grid Column Locking](slug://grid-columns-frozen)
* [Grid Column Reordering](slug://components/grid/columns/reorder)
* [Enter And Exit Grid Edit Mode Programmatically](slug://grid-kb-add-edit-state)
