---
title: Overview
page_title: DropDownList Overview
description: The Blazor DropDownList allows users to select an option from a list, enabling dynamic data binding and event handling in web apps.
slug: components/dropdownlist/overview
tags: telerik,blazor,dropdownlist,dropdown,list,overview
published: True
hideCta: True
position: 0
components: ["dropdownlist"]
---

# Blazor DropDownList Overview

The Blazor DropDownList component allows the user to choose an option from a predefined set of choices presented in a dropdown list popup. The developer can control the [data](slug:components/dropdownlist/databind), sizes, and various appearance options like class and [templates](slug:components/dropdownlist/templates).

<span class="cta-panel-big-module--container--c08a9 d-print-none "><span class="row align-items-center justify-content-center cta-panel-big-module--row--9b71a"><span class="col-auto"><img class="cta-panel-big-module--icon--a648c" src="/images/avatar-ninja.svg" alt="ninja-icon"></span><span class="col-12 col-sm"><span class="cta-panel-big-module--message--40a0f">Tired of reading docs? With our new AI Coding Assistants, you can add, configure, and troubleshoot Telerik UI for Blazor components—right inside your favorite AI-powered IDE: Visual Studio, VS Code, Cursor, and more. Start building faster, smarter, and with contextual intelligence powered by our docs/APIs:</span></span><span class="col-12 col-lg-auto"><a class="cta-panel-big-module--btnTrial--38b3e" href="https://www.telerik.com/blazor-ui/documentation/ai/overview?utm_source=ai-assistants-docs" target="_blank">Try AI Assistants</a></span></span></span>

## Creating Blazor DropDownList

1. Use the `TelerikDropDownList` tag to add the Blazor dropdown list to your razor page.
1. Populate its `Data` property with the collection of items you want to appear in the dropdown list.
1. Set the `TextField` and `ValueField` properties to point to the corresponding names of the model.
1. [Bind the value of the component](slug:common-features-data-binding-overview#data-binding-vs-value-binding) to a variable of the same type as the type defined in the `ValueField` parameter.
1. (optional) Set the `Value` property to the initial value of the model.

>caption DropDownList [data binding](slug:components/dropdownlist/databind), two-way value binding, and main features

<demo metaUrl="client/dropdownlist/overview/" height="380"></demo>

## Data Binding

The Blazor DropDownList @[template](/_contentTemplates/dropdowns/features.md#data-binding) [Read more about the Blazor DropDownList data binding...](slug:components/dropdownlist/databind).

## Filtering

The Blazor DropDownList @[template](/_contentTemplates/dropdowns/features.md#filtering) [Read more about the Blazor DropDownList filter...](slug:components/dropdownlist/filter).

## Grouping

The Blazor DropDownList @[template](/_contentTemplates/dropdowns/features.md#grouping) [Read more about the Blazor DropDownList grouping...](slug:components/dropdownlist/grouping).

## Templates

@[template](/_contentTemplates/dropdowns/features.md#templates) [Read more about the Blazor DropDownList templates...](slug:components/dropdownlist/templates).

## Validation

@[template](/_contentTemplates/dropdowns/features.md#validation)

## Virtualization

@[template](/_contentTemplates/dropdowns/features.md#virtualization) [Read more about the Blazor DropDownList virtualization...](slug:dropdownlist-virtualization)

## Adaptive Rendering

<demo metaUrl="client/dropdownlist/adaptive/" height="420"></demo>

@[template](/_contentTemplates/dropdowns/adaptive-rendering.md#intro)

## DropDownList Parameters

>caption The Blazor dropdown list provides various parameters that allow you to configure the component:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter      | Type | Description
| ----------- | ----------- | -----------|
| `AdaptiveMode` | `AdaptiveMode` <br /> (`None`) | The [adaptive mode](slug:adaptive-rendering) of the component. |
| `Data` | `IEnumerable<TItem>` | Allows you to provide the data source. Required. |
| `DefaultText` | `string` | Simple hint to be displayed when no item is selected yet. In order for it to be shown, the `Value` parameter should be set to a default value depending on the type defined in the `ValueField` parameter. For example, `0` for an `int`, and `null` for an `int?` or `string`. You need to make sure that it does not match the value of an existing item in the data source. See the first example in the [Examples section](#examples) in this article and in the [Input Validation](slug:common-features/input-validation#dropdownlist) article. |
| `Enabled` | `bool` | Whether the component is enabled. |
| `ReadOnly` | `bool` | If set to `true`, the component will be readonly and will not allow user input. The component is not readonly by default and allows user input. |
|`Filterable` | `bool` | Whether [filtering](slug:components/dropdownlist/filter) is enabled for the end user. |
| `FilterDebounceDelay` | `int` <br/> 150 | Time in milliseconds between the last typed symbol and the filter input value update. Applicable to filtering only. Use it to balance between client-side performance and number of database queries. |
| `FilterOperator` | `StringFilterOperator` <br /> (`StartsWith`)| The method of [filtering](slug:components/dropdownlist/filter) the items. |
| `FilterPlaceholder` |  `string` | The hint that will be displayed in the filter input when it has no value.
| `Id` | `string` | The `id` attribute rendered on the main wrapping element of the component (`<span class="k-dropdownlist">`). You can use it to attach a `<label for="">` to it. |
| `InputMode` | `string` | The [`inputmode` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode) of the `<input />` element. |
| `TItem` | `Type`| The type of the model to which the component is bound. Required if you can't provide `Data` or `Value`. Determines the type of the reference object. |
| `TValue` | `Type` | The type of the value field from the model to which the component is bound. Required if you can't provide `Data` or `Value`. Determines the type of the reference object. The type of the values can be:<br /> - `number` (such as `int`, `double`, and so on)<br /> - `string`<br /> - `Guid`<br /> - `Enum` |
| `Title` | `string` | The title text rendered in the header of the dropdown list popup (action sheet). Applicable only when [`AdaptiveMode` is set to `Auto`](slug:adaptive-rendering). |
| `TabIndex` | `int?` | The `tabindex` attribute rendered on the dropdown list. |
| `TextField` | `string` <br /> (`Text`)| The name of the field from the model that will be shown to the user. |
| `ValueField` | `string` <br /> (`Value`) | The name of the field from the model that will be the underlying `value`. |
|`Value` and `bind-Value`| `TValue` | Gets/sets the value of the component, can be used for binding. If you set it to a value allowed by the model class value field, the corresponding item from the data collection will be pre-selected. Use the `bind-Value` syntax for two-way binding, for example, to a variable of your own. |


### Styling and Appearance

The following parameters enable you to customize the [appearance](slug:dropdownlist-appearance) of the Blazor DropDownList component:

@[template](/_contentTemplates/dropdowns/features.md#styling)

>tip To learn more about the appearance, anatomy, and accessibility of the DropDownList, visit the [Progress Design System Kit documentation](https://www.telerik.com/design-system/docs/components/dropdownlist/)—an information portal offering rich component usage guidelines, descriptions of the available style variables, and globalization support details.

### Popup Settings

The DropDownList exposes settings for its dropdown (popup). To configure the options, declare a  `<DropDownListPopupSettings>` tag inside a `<DropDownListSettings>` tag:

<demo metaUrl="client/dropdownlist/popup-settings/" height="300"></demo>

The DropDownList provides the following popup settings:

@[template](/_contentTemplates/dropdowns/features.md#popup-settings)

## DropDownList Reference and Methods

Add a reference to the component instance to use the [DropDownList's methods](slug:Telerik.Blazor.Components.TelerikDropDownList-2). Note that the [DropDownList is a generic component](slug:common-features-data-binding-overview#component-type).


@[template](/_contentTemplates/dropdowns/methods.md#methods-list)

<demo metaUrl="client/dropdownlist/methods/" height="250"></demo>

## Selected Item and DefaultText

By default, if no `Value` is provided and no `DefaultText` is defined, the DropDownList will appear empty.

* To display `DefaultText` - `Value` should be `0` or `null` depending on the data type you are using in the `ValueField` and the `DefaultText` should be defined.

* To display a selected item when the component renders - provide the `Value` of the desired element. Note that it must match an item of the component's data source.


## Examples

>caption Default text (hint) to show when no actual item is selected

<demo metaUrl="client/dropdownlist/default-text/" height="300"></demo>


>caption Get selected item from external code

<demo metaUrl="client/dropdownlist/selected-item/" height="300"></demo>


@[template](/_contentTemplates/common/get-model-from-dropdowns.md#get-model-from-dropdowns)

## Next Steps

* [Binding the DropDownList to Data](slug:components/dropdownlist/databind)
* [Pre-Selecting Items for the User](slug:dropdownlist-pre-select-item)

## See Also

* [Data Binding](slug:components/dropdownlist/databind)
* [DropDownList API Reference](slug:telerik.blazor.components.telerikdropdownlist-2)
* [Live Demo: DropDownList](https://demos.telerik.com/blazor-ui/dropdownlist/overview)
* [Live Demo: DropDownList Validation](https://demos.telerik.com/blazor-ui/dropdownlist/validation)