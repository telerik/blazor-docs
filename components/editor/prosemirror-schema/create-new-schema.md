---
title: Create a New Schema
page_title:  Create a New Schema
description: Expore how to create a new schema for the Editor for Blazor.
slug: editor-create-new-schema
tags: telerik,blazor,editor,prosemirror,schema
published: True
position: 5
components: ["editor"]
---

# Create a New Schema

This article describes how you can create a new [ProseMirror schema](slug:editor-prosemirror-schema-overview) for the Editor to use. Creating a new schema is useful if you want to change the majority of the default schema.

@[template](/_contentTemplates/editor/general.md#prosemirror-schema-prerequisites)

## Basics

@[template](/_contentTemplates/editor/general.md#prosemirror-schema-general-info)

## Plugin Dependencies

Some of the ProseMirror plugins that the Editor uses by design depend on specific nodes in the default ProseMirror schema of the Editor. To get a collection of the default plugins, use the [`getPlugins` function](slug:editor-prosemirror-plugins#adding-a-custom-plugin).

When creating a new schema from scratch, it is possible to get an exception if you do not include the needed nodes in your custom schema.

You have several options in this case:

* Include the corresponding nodes in your custom schema.
* Get the collection of default plugins and remove the plugins that require the missing node.
* Pass a [custom empty collection of plugins to the Editor](slug:editor-prosemirror-plugins) to override the built-in ones.

Note that with the last two options you will lose the functionality that comes with the plugin(s) you remove.

## Creating a New Schema

The below example shows how to:

* Create a new instance of the `Schema` object and include several nodes and marks in it. The new schema supports only a couple of HTML elements such as `<p>`, `<ul>`, `<ol>` and `<a>`.
* Remove a plugin that requires a node which is not part of your schema. The new Schema in this example does not include `<ol>` or `<ul>` elements, so we are removing the plugin that requires these nodes.
* Return the updated schema, so the Editor can use it.

>caption Create New ProseMirror Schema

````RAZOR
<demo metaUrl="client/editor/prosemirror-schema/create-new-schema/" height="550"></demo>
````

## See Also

* [Live Demo: Editor - ProseMirror Schema](https://demos.telerik.com/blazor-ui/editor/prosemirror-schema)
* [Modify the Default Schema](slug:editor-modify-default-schema)


<!-- # Common Scenarios

List here the KB articles created as part of https://github.com/telerik/blazor/issues/9608 

Similar to how this is handled in the Grid State article - https://docs.telerik.com/blazor-ui/components/grid/state#examples
-->