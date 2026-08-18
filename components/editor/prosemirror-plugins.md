---
title: ProseMirror Plugins
page_title:  ProseMirror Plugins
description: Explore how to use the ProseMirror Plugins in the Editor for Blazor uses.
slug: editor-prosemirror-plugins
tags: telerik,blazor,editor,prosemirror,plugins
published: True
position: 130
components: ["editor"]
---

# ProseMirror Plugins

The Telerik UI for Blazor Editor component is based on the <a href="https://prosemirror.net/" target="_blank">ProseMirror library</a>. ProseMirror provides a set of tools and concepts for building rich text editors, using user interface inspired by what-you-see-is-what-you-get.

## Plugins Concept

The ProseMirror <a href="https://prosemirror.net/docs/ref/#state.Plugin_System" target="_blank">plugin system</a> enables developers to create custom tools and functionality. One of the main building blocks of each editor is its <a href="https://prosemirror.net/docs/ref/#state" target="_blank">`EditorState`</a> object. The state is created through a static <a href="https://prosemirror.net/docs/ref/#state.EditorState%5Ecreate" target="_blank">`create`</a> method which takes a configuration object, containing the starting document node, the <a href="https://prosemirror.net/docs/ref/#model.Schema" target="_blank">`Schema`</a>, and a collection of <a href="https://prosemirror.net/docs/ref/#state.Plugin" target="_blank">plugins</a> which will be active in this state.

Plugins are instances of the <a href="https://prosemirror.net/docs/ref/#state.Plugin" target="_blank">`Plugin` class</a> and can model a wide variety of features. The basic ones may only add some <a href="https://prosemirror.net/docs/ref/#view.EditorProps" target="_blank">properties</a> to the Editor view to respond to certain events. More complicated features may add a new state to the editor and update it based on <a href="https://prosemirror.net/docs/ref/#state.Transaction" target="_blank">transactions</a>.

For further details about the ProseMirror plugins, refer to <a href="https://prosemirror.net/docs/guide/#state.plugins" target="_blank">this ProseMirror guide</a>.

Modifying the ProseMirror plugins is outside of the Editor scope and we do not provide support for such customizations.

## Adding a Custom Plugin

ProseMirror is a JavaScript library and the plugins use JavaScript syntax.

To add a custom plugin to the Editor, use the `Plugins` parameter. Set this `string` parameter to the name of a JavaScript function that:

* Is declared in the global scope (`window` object).
* Returns custom ProseMirror plugins.
* Accepts a single argument.

The Editor will call this function and will pass an argument object that contains the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Description |
|----------|-------------|
| `getSchema` | A function that returns the current <a href="https://prosemirror.net/docs/ref/#model.Schema" target="_blank">`Schema` object</a>. Before the Editor is initialized, the `Schema` is the default `Schema`. After the Editor is initialized, the returned `Schema` is the updated schema. If you don't provide a custom schema, this function always returns the default schema. |
| `getView` | A function that returns the currently used instance of the <a href="https://prosemirror.net/docs/ref/#view.EditorView" target="_blank">`EditorView` object</a>. Before the Editor is initialized, the view (the result of the function) is null. |
| `ProseMirror` | An object that contains various ProseMirror classes and functions.|
| `getPlugins` | A function that accepts `Schema` as an argument and returns the default Editor plugins. The function must return an array of ProseMirror plugins. |

> To ensure all the built-in functionalities of the Editor are working correctly, the result array must contain the default plugins which can be retrieved by calling the `getPlugins` function.

>caption Adding a Placeholder Plugin

<demo metaUrl="client/editor/prosemirror-plugins/" height="500"></demo>

## See Also

* [Live Demo: Editor - ProseMirror Plugins](https://demos.telerik.com/blazor-ui/editor/prosemirror-plugins)
* [ProseMirror Schema](slug:editor-prosemirror-schema-overview)


<!-- # Examples

List here the KB articles created as part of https://github.com/telerik/blazor/issues/9608 

Similar to how this is handle in the Grid State article - https://docs.telerik.com/blazor-ui/components/grid/state#examples
-->