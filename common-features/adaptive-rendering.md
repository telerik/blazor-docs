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

Telerik UI for Blazor supports adaptive rendering for the components that incorporate popup elements. This functionality allows the component adapt to the screen size by providing different rendering of the popup element based on the screen dimensions.

>caption In this article:

* [Supported components](#supported-components)
* [Basics](#basics)
* [Rendering specifics](#rendering-specifics)

## Supported components

The adaptive rendering functionality is supported by the following components that incorporate popup elemens:

* [AutoComplete]({%slug autocomplete-overview%})
* [ComboBox]({%slug components/combobox/overview%})
* [DropDownList]({%slug components/dropdownlist/overview%})
* [MultiColumnComboBox]({%slug multicolumncombobox-overview%})
* [MultiSelect]({%slug multiselect-overview%})

## Basics

To enable the adaptive rendering of the component use the `AdaptiveMode` parameter. It takes a member of the `AdaptiveMode` enum:

* `None` (default)
* `Auto`

>caption Enable the adaptive rendering

````CSHTML
// NOTE: The configurations below includeс only the DropDownList, but is applicable to all of teh above listed components

// Adapts to the screen size to use the appropriate rendering.
<TelerikDropDownList ... AdaptiveMode="@AdaptiveMode.Auto" ... />
````

# Rendering specifics

When you set the `AdaptiveMode` to `Auto`, the component will take the screen size into consideration to use the appropriate rendering. The different rendering essentially targets the popup element of the component and how it will be displayed to the user.

Three breakpoints define the rendering options as follows:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

|| **Small** | **Medium** | **Large** |
|-------|-------|--------|-------|
**Dimensions** | up to 500px | 501px to 768px | over 768px |
**Rendering** | The popup is rendered as a fullscreen action sheet. `Apply` and `Cancel` buttons are rendered at the bottom, so the user can sumbit their new selection or retract the change. Clicking on any of the buttons closes the action sheet. | The popup is rendered as an action sheet docked to the bottom of the screen. `Confirm` and `Cancel` buttons are rendered at the bottom, so the user can sumbit their new selection or retract the change. Clicking on any of the buttons closes the action sheet.| The popup is rendered as an animation container docked to the main element of the component. |
**Events Firing**| `ValueChanged` and `OnChange` events will be fired only when the user clicks `Apply`. Typing in the input, browsing through the available options in the action sheet or clicking them will **not** trigger `ValueChanged`. | `ValueChanged` and `OnChange` events will be fired only when the user clicks `Apply`.  Typing in the input, browsing through the available options in the action sheet or clicking them will **not** trigger `ValueChanged`. | `ValueChanged` event fires upon every change (for example, keystroke) in the input. `OnChange` fires in response to user confirmation of the value (for example, `Enter` press or component blur). |

## See also

* [Live Demo: AutoComplete](https://demos.telerik.com/blazor-ui/autocomplete/overview)
* [Live Demo: ComboBox](https://demos.telerik.com/blazor-ui/combobox/overview)
* [Live Demo: DropDownList](https://demos.telerik.com/blazor-ui/dropdownlist/overview)
* [Live Demo: MultiColumnComboBox](https://demos.telerik.com/blazor-ui/multicolumncombobox/overview)
* [Live Demo: MultiSelect](https://demos.telerik.com/blazor-ui/multiselect/overview)