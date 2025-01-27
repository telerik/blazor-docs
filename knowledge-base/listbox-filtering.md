---
title: Filter ListBox Data
description: How to filter or search the data in a Telerik Blazor ListBox component programmatically.
type: how-to
page_title: How to Filter or Search ListBox Data
slug: listbox-kb-filtering
position: 
tags: telerik, blazor, listbox, filter, search
ticketid:
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>ListBox for Blazor</td>
        </tr>
        <tr>
            <td>Product Version</td>
            <td>4.6.0 and above</td>
        </tr>
    </tbody>
</table>


## Description

This KB article answers the following questions:

* How to enable users to search the ListBox component data?
* How to implement programmatic ListBox data filtering?


## Solution

1. Implement a user interface that includes:
    * A [`TextBox`](slug://components/textbox/overview) for the search string;
    * (optional) A selection component (DropDownButton, DropDownList, ContextMenu, SplitButton) for the filter operator;
    * (optional) A [Button](slug://components/button/overview) to clear the TextBox `Value`.
    * (optional) A Button to start the filtering. Alternatively, use the [`ValueChanged` or `OnChange` event of the TextBox](slug://components/textbox/events).
1. Create a [`DataSourceRequest` object](slug://Telerik.DataSource.DataSourceRequest) and populate its `Filters` property with a single [`FilterDescriptor`](slug://Telerik.DataSource.FilterDescriptor).
    * If you need more complex filtering logic, use one or more [`CompositeFilterDescriptor`](slug://Telerik.DataSource.CompositeFilterDescriptor).
1. Execute the [`ToDataSourceResult()` extension method](slug://common-features-data-binding-onread#todatasourceresult-method) on the ListBox data. You will need to import the [`Telerik.DataSource.Extensions` namespace](slug://Telerik.DataSource.Extensions).
1. (optional) Show a [Loader](slug://loader-overview) or a [LoaderContainer](slug://loadercontainer-overview) during the filtering process.

>tip If the filtering operator is fixed (for example, `Contains`), you can replace steps 2 and 3 with a standard LINQ expression:
>
> `ListBoxData = AllData.Where(x => x.Name.Contains(ListBoxFilterString)).ToList();`

>caption ListBox Filtering

````RAZOR
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<div style="display: flex; gap: 8px; width: 200px; margin-bottom: 8px;">
    <TelerikTextBox Value="@ListBoxFilterString"
                    ValueChanged="@OnTextBoxValueChanged"
                    Placeholder="Letters or digits" />
    <TelerikButton Icon="@SvgIcon.X"
                   Title="Clear Filter Text"
                   OnClick="@( () => OnTextBoxValueChanged(string.Empty) )" />
    <TelerikButton Icon="@SvgIcon.Filter"
                   Title="Change Filter Operator"
                   OnClick="@( (MouseEventArgs args) => ContextMenuRef.ShowAsync(args.PageX, args.PageY) )" />
    <TelerikContextMenu @ref="@ContextMenuRef"
                        Data="@AllFilterOperators"
                        TItem="@FilterModel"
                        OnClick="@OnContextMenuClick"
                        Class="no-padding">
        <ItemTemplate>
            <span class="k-list-item @((context.Operator == ListBoxFilterOperator) ? "k-selected" : string.Empty )">
                @context.Text
            </span>
        </ItemTemplate>
    </TelerikContextMenu>
</div>

<div style="position: relative; width: min-content">
    <TelerikListBox @ref="@ListBoxRef"
                    Data="@ListBoxData"
                    TextField="@nameof(ListBoxModel.Name)"
                    SelectionMode="@ListBoxSelectionMode.Multiple"
                    @bind-SelectedItems="@ListBoxSelectedItems"
                    OnReorder="@( (ListBoxReorderEventArgs<ListBoxModel> args) => OnListBoxReorder(args) )"
                    Width="200px">
        <ListBoxToolBarSettings>
            <ListBoxToolBar>
                <ListBoxToolBarMoveUpTool />
                <ListBoxToolBarMoveDownTool />
            </ListBoxToolBar>
        </ListBoxToolBarSettings>
    </TelerikListBox>
    <TelerikLoaderContainer Visible="@LoaderContainerVisible" />
</div>

<style>
    /* Move the ContextMenu item padding inside ItemTemplate
        in order to achieve good looking selected state. */
    .no-padding .k-menu .k-menu-link {
        padding: 0;
    }

        .no-padding .k-menu .k-menu-link .k-list-item {
            width: 100%;
            padding: 4px 8px;
        }
</style>

@code {
    private TelerikListBox<ListBoxModel> ListBoxRef { get; set; } = null!;
    private TelerikContextMenu<FilterModel> ContextMenuRef { get; set; } = null!;

    private List<ListBoxModel> AllData { get; set; } = new List<ListBoxModel>();
    private List<ListBoxModel> ListBoxData { get; set; } = new List<ListBoxModel>();

    private IEnumerable<ListBoxModel> ListBoxSelectedItems { get; set; } = new List<ListBoxModel>();

    private bool LoaderContainerVisible { get; set; }

    #region ListBox Filtering Logic

    private string ListBoxFilterString { get; set; } = string.Empty;

    private FilterOperator ListBoxFilterOperator { get; set; } = FilterOperator.Contains;

    private List<FilterModel> AllFilterOperators { get; set; } = new List<FilterModel>() {
        new FilterModel() { Operator = FilterOperator.Contains, Text = "Contains" },
        new FilterModel() { Operator = FilterOperator.StartsWith, Text = "Starts With" },
        new FilterModel() { Operator = FilterOperator.EndsWith, Text = "Ends With" },
        new FilterModel() { Operator = FilterOperator.DoesNotContain, Text = "Does Not Contain" }
    };

    private async Task OnTextBoxValueChanged(string newValue)
    {
        ListBoxFilterString = newValue;

        await FilterListBox();
    }

    private async Task OnContextMenuClick(FilterModel menuItem)
    {
        ListBoxFilterOperator = menuItem.Operator;

        if (!string.IsNullOrEmpty(ListBoxFilterString))
        {
            await FilterListBox();
        }
    }

    private async Task FilterListBox()
    {
        LoaderContainerVisible = true;

        // simulate network delay and trigger Blazor rendering to allow the LoaderContainer to show
        await Task.Delay(300);

        var request = new DataSourceRequest()
        {
            Filters = new List<IFilterDescriptor>() {
                     new FilterDescriptor()
                     {
                        Member = nameof(ListBoxModel.Name),
                        MemberType = typeof(string),
                        Operator = ListBoxFilterOperator,
                        Value = !string.IsNullOrEmpty(ListBoxFilterString) ? ListBoxFilterString : null
                     }
                 }
        };

        var result = AllData.ToDataSourceResult(request);

        ListBoxData = result.Data.Cast<ListBoxModel>().ToList();

        LoaderContainerVisible = false;
    }

    #endregion ListBox Filtering Logic

    private void OnListBoxReorder(ListBoxReorderEventArgs<ListBoxModel> args)
    {
        ListBoxData.RemoveAll(x => args.Items.Contains(x));
        ListBoxData.InsertRange(args.ToIndex, args.Items);

        ListBoxRef.Rebind();
    }

    #region Data Generation

    protected override void OnInitialized()
    {
        var rnd = new Random();

        for (int i = 1; i <= 40; i++)
        {
            AllData.Add(new ListBoxModel()
            {
                Id = i,
                Name = $"Item " +
                        $"{(char)(65 + rnd.Next(0, 26))}" +
                        $"{(char)(65 + rnd.Next(0, 26))}" +
                        $"{(char)(65 + rnd.Next(0, 26))} " +
                        $"{(i % 11) * 11}{rnd.Next(0, 99)}"
            });
        }

        ListBoxData = new List<ListBoxModel>(AllData);
    }

    public class ListBoxModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }

    public class FilterModel
    {
        public FilterOperator Operator { get; set; }
        public string Text { get; set; } = string.Empty;
    }

    #endregion Data Generation
}
````

## See Also

* [`ToDataSourceResult` Method](slug://common-features-data-binding-onread#todatasourceresult-method)
* [`DataSourceRequest`](slug://Telerik.DataSource.DataSourceRequest)
* [ListBox Overview](slug://listbox-overview)
