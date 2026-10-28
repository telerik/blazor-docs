---
title: Actions
page_title: Window - Actions
description: Action buttons in Window for Blazor.
slug: components/window/actions
tags: telerik,blazor,window,actions
published: True
position: 3
components: ["window"]
---

# Window Actions

The Window offers action buttons in its titlebar:

* [Built-in actions](#built-in-actions)
    * `Maximize`
    * `Minimize`
    * `Close`
* [Custom action buttons](#custom-actions)

To define action buttons, populate the `WindowActions` tag of the Window with `WindowAction` instances.

## Action Parameters

Action buttons expose the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Name` | `string` | The name of the action. Can be one of the built-in actions (see above), or a custom action name. |
| `Hidden` | `bool` | Sets if the action button is rendered. Do not use for the `Minimize` and `Maximize` actions, because the Window manages their visibility internally, based on the component state. |
| `OnClick` | `EventCallback<MouseEventArgs>` | An event handler to respond to custom action clicks. |
| `Icon` | `string` | The CSS class of the icon to be rendered. Use with the [Telerik font icons](slug:common-features-icons), or set your own font icon class. |
| `Title` | `string` | The `title` HTML attribute of the action button. |

## Built-in Actions

>caption The built-in actions of a Window

<demo metaUrl="client/window/actions/example-1/" height="420"></demo>

>Setting custom icons for the built-in actions is not supported. If you need to specify a custom icon for a built-in action, use a [custom action](#custom-actions) instead. 

## Custom Actions

You can create a custom action icon and you must provide its `OnClick` handler.

>caption Handling a custom action

<demo metaUrl="client/window/actions/example-2/" height="420"></demo>

## See Also

* [(Demo) Window Actions](https://demos.telerik.com/blazor-ui/window/actions)
* [(KB) Keep Content in the DOM When the Window Is Closed](slug:window-kb-keep-content-when-closed)
