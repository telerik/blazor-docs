---
title: Overview
page_title: ToolBar Overview
description: Overview of the ToolBar component for Blazor.
slug: toolbar-overview
tags: telerik,blazor,toolbar,tools,buttoncontainer
published: True
position: 0
components: ["toolbar"]
---

# Blazor ToolBar Overview

The <a href = "https://www.telerik.com/blazor-ui/toolbar" target="_blank">Blazor ToolBar component</a> is a container for buttons or other application-specific tools. This article explains the available features.

## Creating Blazor ToolBar

1. Add the `<TelerikToolBar>` tag to a Razor file.
2. Use child tags to add [tools](slug:toolbar-built-in-tools) such as `<ToolBarButton>` or `<ToolBarToggleButton>`. Set button text as child content. Optionally, set [`Icon`](slug:common-features-icons#icons-list).
3. Define `OnClick` handlers for the buttons.
4. Set the `Selected` parameter of the toggle buttons. It supports two-way binding.
5. (optional) Place related buttons in a `<ToolBarButtonGroup>` to display them together.

>caption Basic Telerik Toolbar

<demo metaUrl="client/toolbar/overview/example-1/" height="420"></demo>

## Built-in Tools

The ToolBar component can include built-in tools such as buttons, toggle buttons and button groups. [Read more about the Blazor ToolBar built-in tools](slug:toolbar-built-in-tools).

## Separators

The Toolbar features separators and spacers that can visually divide the component items. [Read more about the Blazor ToolBar separators and spacers.](slug:toolbar-separators).

## Custom Items

The ToolBar component supports template items. Use them to create complex toolbars with dropdowns, inputs and other custom content. [Read more about Blazor ToolBar item customization](slug:toolbar-templated-item).

## Events

The Blazor ToolBar fires click and selection events. Handle those events to respond to user actions. [Read more about the Blazor ToolBar events](slug:toolbar-events).

## ToolBar Parameters

The Blazor ToolBar provides parameters to configure the component:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `Class` | `string` | The CSS class to be rendered on the main wrapping element of the ToolBar component, which is `<div class="k-toolbar">`. Use for [styling customizations](slug:themes-override). |
| `OverflowMode` | `ToolBarOverflowMode` <br /> (`Menu`) | Toggles the overflow popup of the ToolBar. The component displays an additional anchor on its side, where it places all items which do not fit and overflow.|
| `ScrollButtonsPosition` | `ToolBarScrollButtonsPosition` enum <br /> (`Split`) | Specifies the position of the buttons when the ToolBar scroll adaptive mode is enabled. |
| `ScrollButtonsVisibility` | `ToolBarScrollButtonsVisibility` enum <br /> (`Visible`)| Specifies the visibility of the buttons when the ToolBar scroll adaptive mode is enabled. |

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor ToolBar:

| Parameter | Type | Description |
| --- | --- | --- |
| `Size` | `Telerik.Blazor.ThemeConstants.ToolBar.Size` | Adjust the size of the ToolBar |

You can find more information for customizing the ToolBar appearance in the [Appearance article](slug:toolbar-appearance).

## Example

The Blazor Toolbar has an option for adaptiveness. This option allows you to hide the items overflowing in a popup.

>When using `ToolBarTemplateItem` with the responsive overflow popup, the template inherits automatically `Overflow` - `ToolBarItemOverflow.Never` behavior.

>caption Responsive Overflow Popup

<demo metaUrl="client/toolbar/overview/example-2/" height="420"></demo>

## Next Steps

* [Explore the ToolBar built-in tools](slug:toolbar-built-in-tools)
* [Handle the ToolBar Events](slug:toolbar-events)
* [Use the ToolBar Separators](slug:toolbar-separators)
* [Implement custom ToolBar tools](slug:toolbar-built-in-tools)

## See Also

* [Live ToolBar Demos](https://demos.telerik.com/blazor-ui/toolbar/overview)
* [ToolBar API Reference](slug:Telerik.Blazor.Components.TelerikToolBar)
