---
title: Built-in Tools
page_title: ToolBar - Built-in Tools
description: Built-in Tools in the Telerik ToolBar for Blazor
slug: toolbar-built-in-tools
tags: telerik,blazor,toolbar,builtin,tools,button,buttons
published: True
position: 1
components: ["toolbar"]
---

# Built-in Tools

The Telerik ToolBar for Blazor allows you to use built-in buttons and button groups or to add a [custom tool](slug:toolbar-templated-item). The available built-in tools are:

* [ToolBarButton](#toolbarbutton)
* [ToolBarToggleButton](#toolbartogglebutton)
* [ToolbarButtonGroup](#toolbarbuttongroup)

## ToolBarButton

A toolbar button is a plain button that you can click and it raises an event so the application can respond to that.

You can add multiple buttons to the Telerik Toolbar. To do that you should add the `<ToolBarButton>` to the `<TelerikToolBar>`.

### ToolBarButton parameters

The nested `ToolBarButton` tag exposes parameters that allow you to customize the buttons:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default Value | Description |
| ----------- | ----------- | ----------- |
| `Class` | `string` | The CSS class that will be rendered on the main wrapping element of the ToolbarButton. You could use that class to cascade styles. |
| `Enabled` | `bool` <br /> `true` | Specifies if the button is clickable. |
| `Icon` | `object` | Adds a font icon to the button. You can find more information on adding a font icon to a Telerik Component in [Telerik Font and Svg Icons article](slug:common-features-icons#icon-namespaces). |
| `Overflow` | `ToolBarItemOverflow` enum <br /> (`Auto`) | Specifies whether the item will be hidden when the ToolBar is resized. |
| `OverflowText` | `string` | Defines the button text that will be shown only in the overflow popup. If not specified, it will get the default text of the item. |
| `Title` | `string` | Maps to the `title` HTML attribute for the `<button>`. |
| `Visible` | `bool` <br /> `true` | Specifies if the button will be visible in the toolbar. |

>caption The Telerik ToolBar with ToolBarButtons

<demo metaUrl="client/toolbar/built-in-tools/example-1/" height="420"></demo>

## ToolBarToggleButton

A toolbar toggle button has two states - normal and selected - and clicking it can toggle between them through two-way binding or an event.

You can add multiple toggle  buttons to the Telerik Toolbar. To do that you should add the `<ToolBarToggleButton>` to the `<TelerikToolBar>`.

### ToolBarToggleButton parameters

The nested `ToolBarToggleButton` tag exposes parameters that allow you to customize the buttons:

| Parameter | Type and Default Value | Description |
| ----------- | ----------- | ----------- |
| `Class` | `string` | The CSS class that will be rendered on the main wrapping element of the ToolbarButton. You could use that class to cascade styles. |
| `Enabled` | `bool` <br /> `true` | Specifies if the button is clickable. |
| `Icon` | `object` | Adds a font icon to the button. You can find more information on adding a font icon to a Telerik Component in [Telerik Font and Svg Icons article](slug:common-features-icons#icon-namespaces). |
| `Selected` | `bool` | Specifies whether the button is in selected state. You can use it with one and two-way data binding with the `SelectedChanged` event. For more information on how to handle the `SelectedChanged` event see the [Events](slug:toolbar-events) article. |
| `SpriteClass` | `string` | Add a sprite class image to the button. Set this attribute to `k-icon MySpriteClass` where `MySpriteClass` defines the CSS rules for the sprite. |
| `Overflow` | `ToolBarItemOverflow` enum <br /> (`Auto`) | Specifies whether the item will be hidden when the ToolBar is resized. |
| `OverflowText` | `string` | Defines the button text that will be shown only in the overflow popup. If not specified, it will get the default text of the item. |
| `Title` | `string` | Maps to the `title` HTML attribute for the `<button>`. |
| `Visible` | `bool` <br /> `true` | Specifies if the button will be visible in the toolbar. |

>caption The Telerik ToolBar with ToolBarToggleButtons

<demo metaUrl="client/toolbar/built-in-tools/example-2/" height="420"></demo>

## ToolBarButtonGroup

The button group is a container for one or more buttons that renders them together and spaces them out from the adjacent buttons or groups.

You can add one or more group of buttons to the Toolbar. To do that you should add the `<ToolBarButtonGroup>` to the `<TelerikToolBar>`. In the button group you can place either the `ToolBarButton` or the `ToolBarToggleButton`.

### ToolBarButtonGroup parameters

The nested `ToolBarButtonGroup` tag exposes parameters that allow you to customize the buttons:

| Parameter | Type and Default Value | Description |
| ----------- | ----------- | ----------- |
| `Class` | `string` | The CSS class that will be rendered on the main wrapping element of the ToolBarButtonGroup. You could use that class to cascade styles. |
| `Enabled` | `bool` <br /> `true` | Specifies if the group is clickable. |
| `SelectionMode` | `ButtonGroupSelectionMode` enum <br /> `Single` | Specifies whether you can select one or multiple buttons from the group at the same time (applicable for `ToolBarToggleButton` instances inside it). |
| `Overflow` | `ToolBarItemOverflow` enum <br /> (`Auto`) | Specifies whether the item will be hidden when the ToolBar is resized. |
| `OverflowText` | `string` | Defines the button text that will be shown only in the overflow popup. If not specified, it will get the default text of the item. |
| `Visible` | `bool` <br /> `true` | Specifies if the group will be visible in the toolbar. |
| `Width` | `string` | Allows you to control the width of the group. |

>caption The Telerik ToolBar with grouped buttons

<demo metaUrl="client/toolbar/built-in-tools/example-3/" height="420"></demo>

## See Also

* [Live Demo: ToolBar Overview](https://demos.telerik.com/blazor-ui/toolbar/overview)
* [ToolBar Overview](slug:toolbar-overview)
