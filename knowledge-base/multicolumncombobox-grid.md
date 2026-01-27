---
title: MultiColumnComboBox with Grid
description: Learn how to implement a custom MultiColumnComboBox component with an actual Grid inside its dropdown. Thus you will be able to use all Grid features such as sorting, column resizing, paging, and more.
type: how-to
page_title: How to Implement MultiColumnComboBox with Grid
slug: multicolumncombobox-kb-grid
tags: telerik, blazor, multicolumncombobox, grid
ticketid: 1576248
res_type: kb
components: ["multicolumncombobox"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                MultiColumnComboBox for Blazor, <br />
                Grid for Blazor, <br />
                Popup for Blazor
            </td>
        </tr>
    </tbody>
</table>

## Description

This KB answers the following questions:

* How to add more Grid features to the MultiColumnComboBox?
* How to filter by multiple columns in the MultiColumnComboBox Grid?
* How to enable column resizing in the MultiColumnComboBox?

## Solution

The steps and example below describe how to create a custom component that looks and works similarly to a [Telerik MultiColumnComboBox for Blazor](slug:multicolumncombobox-overview), but uses an actual [Grid component](slug:grid-overview) inside a [Popup component](slug:popup-overview).

## Prerequisites

The solution below requires familiarity with:

* [Telerik Grid for Blazor](slug:grid-overview), especially the [Grid state](slug:grid-state) and [Grid selection](slug:grid-selection-overview).
* [Telerik Popup for Blazor](slug:popup-overview);
* [Telerik TextBox for Blazor](slug:components/textbox/overview);
* Implementing [Blazor component parameters that support two-way binding](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/data-binding?view=aspnetcore-8.0#binding-with-component-parameters).
* Implementing [Blazor components with `ChildContent` that is a `RenderFragment`](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/?view=aspnetcore-8.0#child-content-render-fragments).

## Steps

1. Implement UI that looks like a closed Telerik ComboBox. For example, use a [TextBox](slug:components/textbox/overview) and a [`TextBoxSuffixTemplate`](slug:common-features/input-adornments) with an [icon Button](slug:button-icons) inside.
1. Add a [Popup](slug:popup-overview) and set its `AnchorSelector` to be a selector that depends on a custom `Class` of the TextBox.
1. Add a [Grid](slug:grid-overview) inside the Popup. Enable the features that you need.
1. Use [Grid row selection](slug:grid-selection-row) and the Grid `SelectedItemsChanged` event to set the TextBox `Value` and the overall value of the custom MultiColumnComboBox component.
1. (optional) Extract the whole implementation to a separate generic Razor component and implement parameters such as `Value` and `Data`.

## How it Works

* The example demonstrates a generic and reusable Razor component called `ComboBoxGrid`.
* The component has several parameters, which work similarly to the corresponding [MultiColumnComboBox parameters](slug:multicolumncombobox-overview#multicolumncombobox-parameters):
    * `Data`
    * `Value`
    * `TextField`
    * `ValueField`
    * `Width`
* Typing in the component's textbox opens the dropdown and filters the Grid, similar to a [SearchBox](slug:grid-searchbox#search-from-code).
* Blurring the textbox or hitting Enter will select the first matching item in the Grid.
* Selecting a Grid item applies a new `ComboBoxGrid` value and closes the dropdown.
* Closing and reopening the dropdown preserves the Grid state.

>tip This KB article shows a custom integration scenario that uses built-in features and APIs of Telerik UI for Blazor components. The implementation is provided as is. It can be subject to a lot of changes and customizations by the developer, according to the business requirements.

## Example

>caption Custom MultiColumnComboBox with an actual Grid component in the dropdown

<div class="skip-repl"></div>

````RAZOR Home.razor
<p>Custom MultiComboBox Value: @CustomComboBoxValue</p>

<ComboBoxGrid Data="@GridData"
        @bind-Value="@CustomComboBoxValue"
        ValueField="@nameof(SampleModel.Id)"
        TextField="@nameof(SampleModel.Name)"
        Width="300px">
    <GridColumn Field="@nameof(SampleModel.Name)" Title="Product Name" />
    <GridColumn Field="@nameof(SampleModel.Price)" Width="120px" DisplayFormat="{0:c2}" />
    <GridColumn Field="@nameof(SampleModel.Quantity)" Width="120px" />
</ComboBoxGrid>

@code {
    private List<SampleModel> GridData { get; set; } = new();

    private int CustomComboBoxValue { get; set; } = 3;

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 37; i++)
        {
            GridData.Add(new SampleModel()
            {
                Id = i,
                Name = $"Name {i}",
                Price = Random.Shared.Next(1, 100) * 1.23m,
                Quantity = Random.Shared.Next(0, 1000)
            });
        }
    }

    public class SampleModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}
````
````RAZOR ComboBoxGrid.razor
@typeparam TItem
@typeparam TValue

@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikTextBox Value="@TextBoxValue"
                ValueChanged="@TextBoxValueChanged"
                OnChange="@OnTextBoxChange"
                Class="@TextBoxClass"
                Width="@Width">
    <TextBoxSuffixTemplate>
        <TelerikButton Visible="@HasNonDefaultValue"
                       FillMode="@ThemeConstants.Button.FillMode.Clear"
                       Icon="@SvgIcon.X"
                       OnClick="@OnClearButtonClick" />
        <TelerikButton Icon="@( PopupVisible ? SvgIcon.ChevronUp : SvgIcon.ChevronDown )"
                       OnClick="@TogglePopup"
                       Class="@ButtonClass" />
    </TextBoxSuffixTemplate>
</TelerikTextBox>

<TelerikPopup @ref="@PopupRef"
              AnchorHorizontalAlign="@PopupAnchorHorizontalAlign.Left"
              AnchorVerticalAlign="@PopupAnchorVerticalAlign.Bottom"
              AnchorSelector="@PopupAnchorSelector"
              AnimationDuration="200"
              AnimationType="@AnimationType.SlideDown"
              Height="400px"
              HorizontalAlign="@PopupHorizontalAlign.Left"
              VerticalAlign="@PopupVerticalAlign.Top"
              Width="600px">
    <TelerikGrid @ref="@GridRef"
                 Data="@Data"
                 TItem="@TItem"
                 Pageable="true"
                 Sortable="true"
                 FilterMode="GridFilterMode.FilterMenu"
                 Resizable="true"
                 SelectionMode="@GridSelectionMode.Single"
                 SelectedItems="@GridSelectedItems"
                 SelectedItemsChanged="@OnGridSelectedItemsChanged"
                 OnStateInit="@OnGridStateInit"
                 OnStateChanged="@OnGridStateChanged"
                 Height="100%">
        <GridColumns>
            @ChildContent
        </GridColumns>
    </TelerikGrid>
</TelerikPopup>

@code {
    #region Parameters

    /// <summary>
    /// The data item collection for the Grid in the dropdown.
    /// </summary>
    [Parameter]
    public IEnumerable<TItem> Data { get; set; } = Enumerable.Empty<TItem>();

    /// <summary>
    /// The selected value.
    /// </summary>
    [Parameter]
    public TValue? Value { get; set; }

    /// <summary>
    /// An event that fires when the user changes the selected value.
    /// </summary>
    [Parameter]
    public EventCallback<TValue?> ValueChanged { get; set; }

    /// <summary>
    /// The model class property name, which holds the data item value.
    /// </summary>
    [Parameter]
    public string ValueField { get; set; } = string.Empty;

    /// <summary>
    /// The model class property name, which holds the text of the selected item.
    /// </summary>
    [Parameter]
    public string TextField { get; set; } = string.Empty;

    /// <summary>
    /// The total width of the textbox and open button.
    /// </summary>
    [Parameter]
    public string? Width { get; set; }

    /// <summary>
    /// The Grid columns definition.
    /// </summary>
    [Parameter]
    public RenderFragment? ChildContent { get; set; }

    #endregion Parameters

    #region Private Members

    private string DataId { get; set; } = Guid.NewGuid().ToString();

    private string TextBoxClass => $"textbox-{DataId}";
    private string ButtonClass => $"button-{DataId}";
    private string PopupAnchorSelector => $".{TextBoxClass}";

    /// <summary>
    /// The TextBoxValue. It may indicate the selected item or the current search string.
    /// </summary>
    private string TextBoxValue { get; set; } = string.Empty;

    /// <summary>
    /// The Popup component instance. Use for programmatic opening and closing.
    /// </summary>
    private TelerikPopup? PopupRef { get; set; }

    /// <summary>
    /// The Grid component instance. Use for programmatic state changes.
    /// </summary>
    private TelerikGrid<TItem>? GridRef { get; set; }

    /// <summary>
    /// A flag that holds the current Popup state.
    /// </summary>
    private bool PopupVisible { get; set; }

    /// <summary>
    /// The selected Grid item. The Grid SelectionMode is Single, so the collection contains max one item.
    /// </summary>
    private IEnumerable<TItem> GridSelectedItems { get; set; } = new List<TItem>();

    /// <summary>
    /// A property that shows if the generic component has a value that doesn't match the default one of its TValue type.
    /// </summary>
    private bool HasNonDefaultValue
    {
        get
        {
            if (Value == null)
            {
                return false;
            }

            Type TValueType = typeof(TValue);

            if (TValueType.IsValueType)
            {
                return !Value.Equals(Activator.CreateInstance(TValueType));
            }

            return false;
        }
    }

    /// <summary>
    /// The user-controlled Grid state, which is maintained across different openings of the Popup, when the Grid is recreated.
    /// </summary>
    private GridState<TItem>? GridState { get; set; }

    #endregion Private Members

    #region Event Handlers

    /// <summary>
    /// Fires during typing in the TextBox.
    /// </summary>
    private async Task TextBoxValueChanged(string newValue)
    {
        TextBoxValue = newValue;

        if (string.IsNullOrEmpty(TextBoxValue))
        {
            await ClearValue();
        }
        else
        {
            // Search the Grid data programmatically.
            var fdc = new FilterDescriptorCollection();

            fdc.Add(new FilterDescriptor()
            {
                Member = TextField,
                MemberType = typeof(string),
                Operator = FilterOperator.Contains,
                Value = TextBoxValue
            });

            var cfd = new CompositeFilterDescriptor()
            {
                LogicalOperator = FilterCompositionLogicalOperator.Or,
                FilterDescriptors = fdc
            };

            if (!PopupVisible)
            {
                GridState = new GridState<TItem>()
                {
                    SearchFilter = cfd
                };

                await TogglePopup();
            }
            else if (GridRef != null)
            {
                var gridState = GridRef.GetState();

                gridState.SearchFilter = cfd;

                await GridRef.SetStateAsync(gridState);
            }
        }
    }

    private async Task OnTextBoxChange(object newValue)
    {
        if (!string.IsNullOrEmpty(TextBoxValue))
        {
            // Select the first visible Grid item on TextBox blur or Enter keypress
            if (GridState != null && GridState.SearchFilter != null)
            {
                var filterAndSearchDescriptors = new List<IFilterDescriptor>();
                if (GridState.FilterDescriptors != null && GridState.FilterDescriptors.Any())
                {
                    filterAndSearchDescriptors.AddRange(GridState.FilterDescriptors);
                }
                if (GridState.SearchFilter != null)
                {
                    filterAndSearchDescriptors.Add(GridState.SearchFilter);
                }

                var sortDescriptors = new List<SortDescriptor>();
                if (GridState.SortDescriptors != null && GridState.SortDescriptors.Any())
                {
                    sortDescriptors = GridState.SortDescriptors.ToList();
                }

                DataSourceRequest request = new DataSourceRequest()
                {
                    Filters = filterAndSearchDescriptors,
                    Page = GridState.Page ?? 1,
                    PageSize = 10,
                    Sorts = sortDescriptors
                };

                // Get the data items, which the user sees in the Grid.
                DataSourceResult result = Data.ToDataSourceResult(request);

                if (result.Total > 0)
                {
                    // Select the first visible Grid item.
                    TItem firstItem = result.Data.AsGenericEnumerable().Cast<TItem>().First();

                    GridSelectedItems = new List<TItem>() { firstItem };

                    TextBoxValue = firstItem.GetType()?.GetProperty(TextField)?.GetValue(firstItem)?.ToString() ?? string.Empty;
                    Value = (TValue?)firstItem.GetType()?.GetProperty(ValueField)?.GetValue(firstItem);

                    if (ValueChanged.HasDelegate)
                    {
                        await ValueChanged.InvokeAsync(Value);
                    }

                    GridState.SearchFilter = default;

                    if (GridRef != null)
                    {
                        await GridRef.SetStateAsync(GridState);
                    }
                }
                else
                {
                    await ClearValue();
                }
            }
        }

        if (PopupVisible)
        {
            PopupVisible = false;
            PopupRef?.Hide();
        }
    }

    /// <summary>
    /// Clear the component value and close the Popup.
    /// </summary>
    private async Task OnClearButtonClick()
    {
        await ClearValue();

        if (PopupVisible)
        {
            await TogglePopup();
        }
    }

    /// <summary>
    /// Toggle the Popup and clear the TextBox value if no item is selected.
    /// </summary>
    private async Task TogglePopup()
    {
        if (PopupVisible)
        {
            PopupVisible = false;
            PopupRef?.Hide();

            if (!GridSelectedItems.Any())
            {
                await ClearValue();
            }
            else
            {
                var selectedItem = GridSelectedItems.First();
                if (TextBoxValue != selectedItem.GetType()?.GetProperty(TextField)?.GetValue(selectedItem)?.ToString())
                {
                    await ClearValue();
                }
            }
        }
        else
        {
            PopupVisible = true;
            PopupRef?.Show();
        }
    }

    /// <summary>
    /// Restore the Grid state from the previous Popup opening.
    /// </summary>
    private void OnGridStateInit(GridStateEventArgs<TItem> args)
    {
        if (GridState != null)
        {
            args.GridState = GridState;
        }
    }

    /// <summary>
    /// Save the Grid state for the next Popup opening.
    /// </summary>
    private void OnGridStateChanged(GridStateEventArgs<TItem> args)
    {
        GridState = args.GridState;
    }

    /// <summary>
    /// Set the new Grid selected item and set a new component value.
    /// </summary>
    private async Task OnGridSelectedItemsChanged(IEnumerable<TItem> newSelectedItems)
    {
        GridSelectedItems = newSelectedItems;

        if (GridSelectedItems.Any())
        {
            TItem selectedItem = GridSelectedItems.First();

            TextBoxValue = selectedItem.GetType()?.GetProperty(TextField)?.GetValue(selectedItem)?.ToString() ?? string.Empty;
            Value = (TValue?)selectedItem.GetType()?.GetProperty(ValueField)?.GetValue(selectedItem);
        }

        if (ValueChanged.HasDelegate)
        {
            await ValueChanged.InvokeAsync(Value);
        }

        await TogglePopup();
    }

    #endregion Event Handlers

    #region Methods

    /// <summary>
    /// Clear the TextBox, remove the Grid selected item and reset the Grid search state.
    /// </summary>
    private async Task ClearValue()
    {
        GridSelectedItems = new List<TItem>();
        TextBoxValue = string.Empty;

        if (HasNonDefaultValue)
        {
            Value = default;
            if (ValueChanged.HasDelegate)
            {
                await ValueChanged.InvokeAsync(Value);
            }
        }

        if (GridState != null)
        {
            GridState.SearchFilter = default;

            if (GridRef != null)
            {
                await GridRef.SetStateAsync(GridState);
            }
        }
    }

    #endregion Methods

    #region Life Cycle Methods

    /// <summary>
    /// Find the component Value in the ValueField property of an item in the Data collection.
    /// Display the TextField property value inside the TextBox.
    /// </summary>
    protected override void OnParametersSet()
    {
        ValidateParameters();

        if (Value != null && Data.Any() && !string.IsNullOrEmpty(ValueField))
        {
            TItem? selectedItem = Data.FirstOrDefault(x =>
            {
                return Value.Equals(x.GetType()?.GetProperty(ValueField)?.GetValue(x));
            });

            if (selectedItem != null)
            {
                TextBoxValue = selectedItem.GetType()?.GetProperty(TextField)?.GetValue(selectedItem)?.ToString() ?? string.Empty;

                GridSelectedItems = new List<TItem>() { selectedItem };
            }
            else
            {
                TextBoxValue = string.Empty;
            }
        }

        base.OnParametersSet();
    }

    /// <summary>
    /// Ensure that ValueField and TextField are set.
    /// </summary>
    private void ValidateParameters()
    {
        if (string.IsNullOrEmpty(ValueField))
            throw new ArgumentNullException("ValueField");
        if (string.IsNullOrEmpty(TextField))
            throw new ArgumentNullException("TextField");
    }

    #endregion Life Cycle Methods
}
````

## See Also

* [Grid State](slug:grid-state)
* [Grid Selection](slug:grid-selection-overview)
* [Popup Overview](slug:popup-overview)
* [TextBox Events](slug:components/textbox/events)
