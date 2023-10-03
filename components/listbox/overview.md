---
title: Overview
page_title: ListBox - Overview
description: Overview of the ListBox for Blazor.
slug: listbox-overview
tags: telerik,blazor,listbox
published: True
position: 0
---

# Blazor ListBox Overview

The <a href = "https://www.telerik.com/blazor-ui/listbox" target="_blank">ListBox for Blazor</a> ... .

## Creating Blazor ListBox

````CSHML

````

## ListBox Parameters

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `AriaLabel` | `string` | The `aria-label` attribute of the `<ul>` element that holds the ListBox items. |
| `AriaLabelledBy` | `string` | The `aria-labelledby` attribute of the `<ul>` element that holds the ListBox items. |
| `Class` | `string` | The `class` attribute of the `<div class="k-listbox">` element. Use it to apply custom styles or [override the theme]({%slug themes-override%}). |
| `ConnectedListBoxId` | `string` | The `Id` value of another ListBox instance. Use it to [connect (link) multiple ListBox instances]({%slug listbox-connect%}). |
| `Data` | `IEnumerable<T>` * | The ListBox component data collection. |
| `Draggable` | `bool` | Defines if users can drag and drop ListBox items. |
| `DropSources` | `List<string>` | The `Id` values of the ListBoxes from which users can drag items into the current ListBox. |
| `Enabled` | `bool` <br /> (`true`) | Defines if the ListBox allows item selection and toolbar operation. |
| `Height` | `string` | The `height` style of the component in any [supported CSS unit]({%slug common-features/dimensions%}). The default ListBox dimensions depend on the CSS theme. |
| `Id` | `string` | The `id` attribute of `<div class="k-listbox">`. Use it to [connect (link) multiple ListBox instances]({%slug listbox-connect%}). |
| `SelectedItems` | `IEnumerable<T>` * | The selected item(s) of the ListBox. The parameter supports two-way binding. The variable that is used with this parameter must be specifically `IEnumerable<T>` and not `List<T>`. |
| `SelectionMode` | `ListBoxSelectionMode` enum <br /> (`Single`) | Defines if users can select just one or multiple items. |
| `Size` | `string` <br /> (`"md"`) | This parameter controls ListBox styles such as paddings or font size. For easier usage, set the parameter to a member of the static class `Telerik.Blazor.ThemeConstants.ListBox.Size`. |
| `TextField` | `string` <br /> (`"Text"`) | The property name of class `T` that holds the item value to display in the ListBox. |
| `TItem` | `Type` | The ListBox model type. |
| `ToolBarPosition` | `ListBoxToolBarPosition` enum <br /> (`Right`) | The ListBox toolbar position with relation to the item list. |
| `Width` | `string` | The `width` style of the component in any [supported CSS unit]({%slug common-features/dimensions%}). The default ListBox dimensions depend on the CSS theme. |

\* `T` is the ListBox model type.

## Next Steps

* [Configure the ListBox toolbar]({%slug listbox-toolbar%})
* [Choose the ListBox selection mode]({%slug listbox-selection%})
* [Connect Multiple ListBoxes]({%slug listbox-connect%})
* [Enable ListBox drag-and-drop]({%slug listbox-dragdrop%})
* [Implement ListBox templates]({%slug listbox-templates%})
* [Handle ListBox events]({%slug listbox-events%})

## See Also

* [Live Demo: ListBox](https://demos.telerik.com/blazor-ui/listbox/overview)
