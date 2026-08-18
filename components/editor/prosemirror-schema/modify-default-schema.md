---
title: Modify the Default Schema
page_title:  Modify the Default Schema
description: Expore how to modify the default schema the Editor for Blazor uses.
slug: editor-modify-default-schema
tags: telerik,blazor,editor,prosemirror,schema
published: True
position: 3
components: ["editor"]
---

# Modify the Default ProseMirror Schema

This article describes how you can modify the default [ProseMirror schema that the Editor for Blazor uses](slug:editor-prosemirror-schema-overview). Updating the existing schema is useful if you want to:

* Extend the Editor capabilities and allow end users to add more kinds of HTML tags than the predefined ones.
* Allow adding more attributes to the predefined HTML elements.
* Restrict end users from adding some of the predefined HTML elements.

@[template](/_contentTemplates/editor/general.md#prosemirror-schema-prerequisites)

## Basics

@[template](/_contentTemplates/editor/general.md#prosemirror-schema-general-info)

## Modifying the Schema

The below example shows how to:

* Get the default ProseMirror schema.
* Add a `data-id` attribute to the `<p>` node.
* Remove the default `horizontal_rule` node that does not allow any attributes and add a custom node for the `<hr>` element that allows setting a CSS `class`.
* Add a `mark` for the `<s>` element.
* Return the updated schema, so the Editor can use it.

>tip The Editor in this example uses the [`Div` edit mode](slug:editor-edit-modes-iframe), so the style for the `<hr>` element is applied. If you use the default [`Iframe` edit mode](slug:editor-edit-modes-div), you have to plug the styles with JavaScript as shown in [this example](slug:editor-prosemirror-plugins).

>caption Modify the default ProseMirror Schema

````RAZOR
<demo metaUrl="client/editor/prosemirror-schema/modify-default-schema/" height="500"></demo>
````

## See Also

* [Live Demo: Editor - ProseMirror Schema](https://demos.telerik.com/blazor-ui/editor/prosemirror-schema)
* [Create a New Schema](slug:editor-create-new-schema)


<!-- # Common Scenarios

List here the KB articles created as part of https://github.com/telerik/blazor/issues/9608 

Similar to how this is handled in the Grid State article - https://docs.telerik.com/blazor-ui/components/grid/state#examples
-->