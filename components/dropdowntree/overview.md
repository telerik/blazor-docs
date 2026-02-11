---
title: Overview
page_title: DropDownTree Overview
description: The Telerik DropDownTree component for Blazor enables you to select an item from a TreeView in a dropdown. Learn about the major DropDownTree features and functionality.
slug: dropdowntree-overview
tags: blazor,dropdowntree,dropdown
components: ["dropdowntree"]
published: True
position: 0
---

# Blazor DropDownTree Overview

The [Blazor DropDownTree component](https://www.telerik.com/blazor-ui/dropdowntree) allows users to select a single value from a hierarchical list of dropdown items. The DropDownTree combines features of the [DropDownList](slug:components/dropdownlist/overview) and the [TreeView](slug:treeview-overview) components. Familiarity with the API of the two originating components is recommended.

## Creating Blazor DropDownTree

1. Add the `<TelerikDropDownTree>` tag to your Razor page.
1. Populate its `Data` parameter with an `IEnumerable<T>` of items that you want to appear in the dropdown list. The DropDownTree [automatically recognizes property names](slug:dropdowntree-data-binding-overview#default-property-names) like `Id`, `Text`, `Value`, and a few others. To use custom property names, set the [`TextField` and `ValueField`](slug:dropdowntree-data-binding-overview#text-and-value-fields) parameters, and [define bindings for the parent-child relationships](slug:dropdowntree-data-binding-overview#dropdowntree-bindings).
1. [Bind the `Value` parameter](slug:get-started-value-vs-data-binding#value-binding) to a variable of the same type as the `ValueField` property.
1. (optional) Set the `ExpandedItems` parameter to a non-null `IEnumerable<object>`. Use it to get the expanded items in the dropdown or set them programmatically.

>caption Basic Blazor DropDownTree

<demo metaUrl="client/dropdowntree/overview/" height="300"></demo>

## Data Binding

[The Blazor DropDownTree requires a data source](slug:dropdowntree-data-binding-overview) to populate its dropdown with items. Set the `Data` parameter to a generic `IEnumerable<T>`. The model class can have properties with predefined names or custom names. The data collection can have [flat](slug:dropdowntree-data-binding-flat-data) or [hierarchical](slug:dropdowntree-data-binding-hierarchical-data) structure.

## Filtering

The Blazor DropDownTree can reduce the number of visible items as the user types in a search textbox in the open dropdown. To configure [DropDownTree filtering](slug:dropdowntree-filtering), use the `Filterable` and `FilterOperator` parameters. Additionally, you can customize the filter operator and set the minimum required number of typed characters.

## Templates

The [DropDownTree provides templates](slug:dropdowntree-templates) that allow you to customize the rendering and appearance of the component value, dropdown header, dropdown footer, TreeView items, and the popup content when there is no data.

## Adaptive Rendering

@[template](/_contentTemplates/dropdowns/adaptive-rendering.md#intro)

## Events

The Telerik DropDownTree fires events that enable the app to detect and react to user interactions with the component. Find out more about the [DropDownTree events and event arguments](slug:dropdowntree-events).

## DropDownTree API

Get familiar with all DropDownTree parameters, methods, events, and nested tags in the [DropDownTree API Reference](slug:Telerik.Blazor.Components.TelerikDropDownTree-1).

## Popup Settings

The TelerikDropDownTree exposes [settings for its dropdown (popup)](slug:Telerik.Blazor.Components.DropDownTreePopupSettings). To configure these options, declare a `<DropDownTreePopupSettings>` tag inside `<DropDownTreeSettings>`:

>caption Using DropDownTree popup settings

````RAZOR.skip-repl
<TelerikDropDownTree>
    <DropDownTreeSettings>
        <DropDownTreePopupSettings Class="dropdowntree-popup-class"
                                   Height="50vh"
                                   MaxHeight="400px" />
    </DropDownTreeSettings>
</TelerikDropDownTree>
````

## DropDownTree Reference and Methods

Add a reference to the component instance to use the [DropDownTree's methods](slug:Telerik.Blazor.Components.TelerikDropDownTree-1). Note that the [DropDownTree is a generic component](slug:common-features-data-binding-overview#component-type). Its model type and value type must be part of the component reference definition.

````RAZOR.skip-repl
<TelerikDropDownTree @ref="@DropDownTreeRef" />

@code {
    private TelerikDropDownTree<int>? DropDownTreeRef;

    private void OpenDropDownTree()
    {
        DropDownTreeRef?.Open();
    }
}
````

## Next Steps

* [Bind the DropDownTree to Data](slug:dropdowntree-data-binding-overview)

## See Also

* [DropDownTree API Reference](slug:telerik.blazor.components.telerikdropdowntree-1)
* [Live Demo: DropDownTree](https://demos.telerik.com/blazor-ui/dropdowntree/overview)
