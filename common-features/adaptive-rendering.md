---
title: Adaptive Rendering
page_title: Adaptive Rendering
description: Explore how the components with popup elements can react to the changes in the
slug: adaptive-rendering
tags: telerik,blazor,adaptive,rendering,mobile
published: True
position: 0
---

# Adaptive Rendering

Telerik UI for Blazor supports adaptive rendering for the components that incorporate popup elements. This functionality allows the component to adapt to the screen size by providing different rendering of the popup element based on the screen dimensions.

>caption In this article:

* [Supported components](#supported-components)
* [Basics](#basics)
* [Rendering specifics](#rendering-specifics)
* [Limitations](#limitations)

## Supported components

The adaptive rendering functionality is supported by the following components:

* [AutoComplete]({%slug autocomplete-overview%})
* [ComboBox]({%slug components/combobox/overview%})
* [DatePicker]({%slug components/datepicker/overview%})
* [DateRangePicker]({%slug daterangepicker-overview%})
* [DateTimePicker]({%slug components/datetimepicker/overview%})
* [DropDownList]({%slug components/dropdownlist/overview%})
* [MultiColumnComboBox]({%slug multicolumncombobox-overview%})
* [MultiSelect]({%slug multiselect-overview%})
* [TimePicker]({%slug components/timepicker/overview%})

## Basics

To enable the adaptive rendering use the `AdaptiveMode` parameter. It takes a member of the `AdaptiveMode` enum:

* `None` (default)
* `Auto`

Optionally, you may set the `Title` parameter to provide custom header text for the popup on small and medium devices.

>caption Enable the adaptive rendering

````CSHTML
// NOTE: The configurations below includes only the DropDownList, but it is applicable to all of the above listed components

// Adapts to the screen size to use the appropriate rendering.
<TelerikDropDownList ... AdaptiveMode="@AdaptiveMode.Auto" Title="Select item"... />
````

# Rendering specifics

When you set the `AdaptiveMode` to `Auto`, the component will take the screen size into consideration to use the appropriate rendering. The different rendering targets the popup element of the component and how it will be displayed to the user.

Three breakpoints define the rendering options as follows:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

|| **Small** | **Medium** | **Large** |
|-------|-------|--------|-------|
**Dimensions** | up to 500px | 501px to 768px | over 768px |
**Rendering** | The popup is rendered as a fullscreen action sheet. | The popup is rendered as an action sheet docked to the bottom of the screen. | The popup is rendered as an animation container docked to the main element of the component. |

## Limitations

Some of the [supported components](#supported-components) allow custom values, for example, [ComboBox]({%slug components/combobox/custom-value%}) and [MultiColumnComboBox]({%slug multicolumncombobox-custom-value%}). Using custom values with `AdaptiveMode.Auto` is currently not supported. To expedite the development of this feature, vote for the related feature request in the Blazor Feedback Portal: [Support for custom values in `AdaptiveMode`](https://feedback.telerik.com/blazor/1611829-support-for-custom-values-in-adaptivemode).

## See also

* [Live Demo: AutoComplete](https://demos.telerik.com/blazor-ui/autocomplete/adaptive)
* [Live Demo: ComboBox](https://demos.telerik.com/blazor-ui/combobox/adaptive)
* [Live Demo: DatePicker](https://demos.telerik.com/blazor-ui/datepicker/adaptive)
* [Live Demo: DateRangePicker](https://demos.telerik.com/blazor-ui/daterangepicker/adaptive)
* [Live Demo: DateTimePicker](https://demos.telerik.com/blazor-ui/datetimepicker/adaptive)
* [Live Demo: DropDownList](https://demos.telerik.com/blazor-ui/dropdownlist/adaptive)
* [Live Demo: MultiColumnComboBox](https://demos.telerik.com/blazor-ui/multicolumncombobox/adaptive)
* [Live Demo: MultiSelect](https://demos.telerik.com/blazor-ui/multiselect/adaptive)
* [Live Demo: TimePicker](https://demos.telerik.com/blazor-ui/timepicker/adaptive)
