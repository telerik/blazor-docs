---
title: Overview
page_title: MultiColumnComboBox Overview
description: Discover the Blazor MultiColumnComboBox and explore the examples.
slug: multicolumncombobox-overview
tags: telerik,blazor,multicolumncombobox,combo,columns,overview
published: True
position: 0
---

# Blazor MultiColumnComboBox Overview

The <a href="https://www.telerik.com/blazor-ui/multicolumncombobox" target="_blank">Blazor MultiColumnComboBox</a> enables users to select an option from a [predefined set of choices](slug:multicolumncombobox-data-binding) in a dropdown grid layout. Users can also [filter](slug:multicolumncombobox-filter) or [group](slug:multicolumncombobox-grouping) the available items, or enter [custom values](slug:multicolumncombobox-custom-value).


## Creating MultiColumnComboBox

1. Use the `<TelerikMultiColumnComboBox>` tag.
1. Populate the `Data` parameter with the collection that you want to appear in the dropdown.
1. Set the `TextField` and `ValueField` parameters to point to the corresponding property names of the model.
1. [Bind the component `Value`](slug:get-started-value-vs-data-binding#value-binding) to a variable of the same type as the one of the `ValueField`.
1. Add `MultiColumnComboBoxColumn` instances under the `MultiColumnComboBoxColumns` tag. The `Field` parameter of each column must point to a property in the model.

>caption MultiColumnComboBox data binding with two-way value binding

````RAZOR
<TelerikMultiColumnComboBox Data="@MultiComboData"
                            @bind-Value="@SelectedProduct"
                            ValueField="@nameof(Product.Id)"
                            TextField="@nameof(Product.Name)"
                            Width="300px">
    <MultiColumnComboBoxColumns>
        <MultiColumnComboBoxColumn Field="@nameof(Product.Name)" Title="Product Name"></MultiColumnComboBoxColumn>
        <MultiColumnComboBoxColumn Field="@nameof(Product.Quantity)" Title="In Stock"></MultiColumnComboBoxColumn>
    </MultiColumnComboBoxColumns>
</TelerikMultiColumnComboBox>

<p>Selected product Id: @SelectedProduct</p>

@code {
    private List<Product> MultiComboData { get; set; }

    private int SelectedProduct { get; set; }

    protected override void OnInitialized()
    {
        var rnd = new Random();

        MultiComboData = Enumerable.Range(1, 30).Select(x => new Product()
        {
            Id = x,
            Name = $"Product {x}",
            Quantity = rnd.Next(0, 30)
        }).ToList();

        base.OnInitialized();
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
    }
}
````

## Data Binding

The Blazor MultiColumnComboBox @[template](/_contentTemplates/dropdowns/features.md#data-binding) [Read more about the Blazor MultiColumnComboBox data binding...](slug:multicolumncombobox-data-binding).

The linked article also explains how the component behaves when the current value is not present in the data.

## Columns

The MultiColumnComboBox renders its dropdown items in a grid-like column layout. [Learn how to define and configure the Blazor MultiColumnComboBox columns...](slug:multicolumncombobox-columns-overview)

## Filtering

The MultiColumnComboBox @[template](/_contentTemplates/dropdowns/features.md#filtering) [Read more about the Blazor MultiColumnComboBox filtering...](slug:multicolumncombobox-filter).

## Grouping

The MultiColumnComboBox @[template](/_contentTemplates/dropdowns/features.md#grouping) [Read more about the Blazor MultiColumnComboBox grouping...](slug:multicolumncombobox-grouping).

@[template](/_contentTemplates/common/inputs.md#adornments)

## Templates

@[template](/_contentTemplates/dropdowns/features.md#templates) [Read more about the Blazor MultiColumnComboBox templates...](slug:multicolumncombobox-templates).

## Validation

@[template](/_contentTemplates/dropdowns/features.md#validation)

## Virtualization

@[template](/_contentTemplates/dropdowns/features.md#virtualization) [Read more about the Blazor MultiColumnComboBox virtualization...](slug:multicolumncombobox-virtualization)

## Adaptive Rendering

<demo metaUrl="client/multicolumncombobox/adaptive/" height="420"></demo>

@[template](/_contentTemplates/dropdowns/adaptive-rendering.md#intro)

## MultiColumnComboBox Parameters

>caption The MultiColumnComboBox provides various parameters that allow you to configure the component:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description
| ----------- | ----------- | -----------|
| `AdaptiveMode` | `AdaptiveMode` <br /> (`None`) | The [adaptive mode](slug:adaptive-rendering) of the component. |
| `AllowCustom` | `bool` | Determines if the user can enter [custom values](slug:multicolumncombobox-custom-value). If enabled, the `ValueField` must be a `string`. |
| `ShowClearButton` | `bool` | Displays a clear button inside the input. When it is clicked, the `Value` will change to `default(TValue)`, so there must be no item in the `Data` that has such a `Value`. For example, if `TValue` is `int`, there should be no data item with `0` in its `ValueField`, otherwise selection issues may occur. |
| `Data` | `IEnumerable<TItem>` | The component data. |
| `DebounceDelay` | `int` <br/> (`150`) | The time in milliseconds between the last typed symbol and the internal `oninput` event firing. Applies when the user types and filters. Use it to balance between client-side performance and number of database queries. |
| `Enabled` | `bool` | Whether the user can interact with the component. |
| `ReadOnly` | `bool` | If set to `true`, the component will be readonly and will not allow user input. The component is not readonly by default and allows user input. |
| `Filterable` | `bool` | Enables [filtering](slug:multicolumncombobox-filter) for the end user. |
| `FilterOperator` | `StringFilterOperator` enum <br /> (`StartsWith`) | The [filtering method](slug:multicolumncombobox-filter). |
| `Id` | `string` | The `id` attribute of the `<input class="k-input-inner" />` element. Use it to attach a `<label for="...">` to the input. |
| `InputMode` | `string` | The [`inputmode` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode) of the `<input />` element. |
| `LoaderShowDelay` | `int ` <br /> 300 | Time in milliseconds between opening the popup and showing the loading skeleton in it when the data is not yet available. |
| `Placeholder` | `string` | The hint text the user sees when no item is selected. The placeholder will shown when the `Value` is set to the default value of the `ValueField` type. For example, `0` for `int`, and `null` for `int?` or `string`. |
| `TItem` | `Type` | The type of the model. Required if you can't provide `Data` or `Value`. Determines the type of the reference object. |
| `TValue` | `Type` | The type of the `ValueField` from the model. Required if you can't provide `Data` or `Value`. Determines the type of the reference object. The type of the values can be:<br /> - `number` (`int`, `double`, etc.)<br /> - `string`<br /> - `Guid`<br /> - `Enum` |
| `Title` | `string` | The title text rendered in the header of the popup(action sheet). Applicable only when [`AdaptiveMode` is set to `Auto`](slug:adaptive-rendering). |
| `TextField` | `string` <br /> (`Text`) | The name of the model property that will be shown to the user. |
| `ValueField` | `string` <br /> (`Value`) | The name of the model property that will be the underlying component `Value`. |
| `Value` | `TValue` | The value of the component. Use the `@bind-Value` syntax for two-way binding. |
| `TabIndex` | `int?` | The `tabindex` attribute of the `<input class="k-input-inner" />` element. Use it to customize the tabbing (focus) order on the page. |

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor MultiColumnComboBox:

@[template](/_contentTemplates/dropdowns/features.md#styling)

You can find more options for customizing the MultiColumnComboBox styling in the [Appearance article](slug:multicolumncombobox-appearance).

### Popup settings

The popup of the component can be additionally customized via nested tags:

<div class="skip-repl"></div>

````RAZOR
<TelerikMultiColumnComboBox>
    <MultiColumnComboBoxSettings>
        <MultiColumnComboBoxPopupSettings Width="..." />
    </MultiColumnComboBoxSettings>
</TelerikMultiColumnComboBox>
````

The MultiColumnComboBox provides the following popup settings:

| Parameter | Type | Description |
| --- | --- | --- |
| `AnimationDuration` | `int` | The animation duration of the popup in milliseconds. |
| `Class` | `string` | Additional CSS class to customize the appearance of the popup. |
| `MinWidth` | `string` | The minimum width of the popup. |
| `MaxWidth` | `string` | The maximum width of the popup. |
| `Width` | `string` | The width of the popup. If you don't specify a value, the dropdown width will match the anchor element width which can help with responsive layouts and 100% widths. |

## Component Reference and Methods

To execute MultiColumnComboBox methods, obtain reference to the component instance via `@ref`.

The MultiColumnComboBox is a generic component. Its type depends on the type of its model and the type of its `Value`. In case you cannot provide either the `Value` or `Data` initially, you need to [set the corresponding types to the `TItem` and `TValue` parameters](slug:common-features-data-binding-overview#component-type).

The table below lists the MultiComboBox methods. Also consult the [MultiColumnComboBox API](slug:Telerik.Blazor.Components.TelerikMultiColumnComboBox-2).

| Method | Description |
| --- | --- |
| `Close` | Closes the component dropdown. |
| `FocusAsync` | Focuses the component textbox. |
| `Open` | Opens the component dropdown. |
| `Rebind` | [Refreshes the component data](slug:common-features-data-binding-overview#refresh-data). |
| `Refresh` | Re-renders the component popup. |

>caption Using MultiColumnComboBox methods

````RAZOR
<TelerikButton OnClick="@Open">Open MultiColumnComboBox</TelerikButton>

<TelerikMultiColumnComboBox @ref="@MultiColumnComboRef"
                            Data="@Products"
                            @bind-Value="@SelectedProduct"
                            ValueField="@nameof(Product.Id)"
                            TextField="@nameof(Product.Name)"
                            Width="300px">
    <MultiColumnComboBoxColumns>
        <MultiColumnComboBoxColumn Field="@nameof(Product.Name)" Title="Product Name"></MultiColumnComboBoxColumn>
        <MultiColumnComboBoxColumn Field="@nameof(Product.Quantity)" Title="In Stock"></MultiColumnComboBoxColumn>
    </MultiColumnComboBoxColumns>
</TelerikMultiColumnComboBox>

@code {
    private TelerikMultiColumnComboBox<Product, int> MultiColumnComboRef { get; set; }

    private List<Product> Products { get; set; }

    private int SelectedProduct { get; set; }

    private void Open()
    {
        MultiColumnComboRef.Open();
        
        SelectedProduct = 3;

        MultiColumnComboRef.Refresh();
    }

    protected override void OnInitialized()
    {
        var rnd = new Random();

        Products = Enumerable.Range(1, 30).Select(x => new Product()
            {
                Id = x,
                Name = $"Product {x}",
                Quantity = rnd.Next(0, 30)
            }).ToList();

        base.OnInitialized();
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
    }
}
````

## Next Steps

* [Bind the MultiColumnComboBox to data](slug:multicolumncombobox-data-binding)
* [Enable MultiColumnComboBox filtering](slug:multicolumncombobox-filter)
* [Allow custom MultiColumnComboBox value](slug:multicolumncombobox-custom-value)

## See Also

* [Live Demo: MultiColumnComboBox](https://demos.telerik.com/blazor-ui/multicolumncombobox/overview)
* [Live Demo: MultiColumnComboBox Validation](https://demos.telerik.com/blazor-ui/multicolumncombobox/validation)
