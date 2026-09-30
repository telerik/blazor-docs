---
title: Toolbar
page_title: TreeList - Toolbar
description: Use toolbar and custom actions in Treelist for Blazor.
slug: treelist-toolbar
tags: telerik,blazor,treelist,toolbar
published: True
position: 45
components: ["treelist"]
---

# TreeList Toolbar

The [Blazor TreeList](https://demos.telerik.com/blazor-ui/treelist/overview) toolbar can render built-in and custom tools. This article describes the built-in tools and shows how to add custom tools or [customize the toolbar](#custom-toolbar-configuration).

## Built-In Tools

The [Blazor TreeList](https://demos.telerik.com/blazor-ui/treelist/overview) displays all its built-in tools in the order below. Use the respective tool tag if you need to define a tool explicitly in a [toolbar configuration](#toolbar-tools-configuration).

### Command Tools

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Tool Name | Tool Tag | Description |
| --- | --- | --- |
| Add | `TreeListToolBarAddTool` | An add command that fires the [`OnAdd` event](slug:treelist-editing-overview#events). |
| SearchBox | `TreeListToolBarSearchBoxTool` | A searchbox that filters multiple TreeList columns simultaneously. |

### Layout Tools

| Tool Name | Tool Tag | Description |
| --- | --- | --- |
| Spacer | `TreeListToolBarSpacerTool` | Consumes the available empty space and pushes the rest of the tools next to one another. |

## Custom Tools

In addition to the built-in tools, the TreeList also supports custom tools. Use the `<TreeListToolBarCustomTool>` tag, which is a standard Blazor `RenderFragment`. See the example below.

## Toolbar Tools Configuration

Add a `<TreeListToolBar>` tag inside `<TelerikTreeList>` to configure a toolbar, for example:

* Arrange the TreeList toolbar tools in a specific order;
* Remove some of the built-in tools;
* Add custom tools.

>important `<TreeListToolBar>` and `<TreeListToolBarTemplate>` cannot be used together in the same TreeList instance.

>caption TreeList Toolbar Tools

<demo metaUrl="client/treelist/toolbar/example-1/" height="720"></demo>

## Custom Toolbar Configuration

Add a `<TreeListToolBarTemplate>` tag inside `<TelerikTreeList>` to configure a custom toolbar. You can add your own HTML and components to create a more complex layout in the TreeList header to match your business needs and also `TreeListCommandButton` instances (read more about the features available in those buttons in the [Command Column](slug:treelist-columns-command) article).

When using a `<TreeListToolBarTemplate>`, you need to use the `Tab` key to navigate between the focusable items. This is because the `<TreeListToolBarTemplate>` allows rendering of custom elements. On the other hand, the `<TreeListToolBar>` uses the [built-in keyboard navigation](slug:accessibility-overview#keyboard-navigation) through arrow keys.

>caption Custom TreeList Toolbar

<demo metaUrl="client/treelist/toolbar/example-2/" height="720"></demo>

## Next Steps

* [Handle TreeList events](slug:treelist-events)


## See Also

* [TreeList Live Demo](https://demos.telerik.com/blazor-ui/treelist/overview)
* [TreeList API](slug:Telerik.Blazor.Components.TelerikTreeList-1)
