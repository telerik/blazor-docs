---
title: Overview
page_title: Editor ProseMirror Schema Overview
description: Overview of the ProseMirror Schema that the Editor for Blazor uses.
slug: editor-prosemirror-schema-overview
tags: telerik,blazor,editor,prosemirror,schema
published: True
position: 0
---

# ProseMirror Schema Overview

The Telerik UI for Blazor Editor component is based on the [ProseMirror library](https://prosemirror.net/). ProseMirror provides a set of tools and concepts for building rich textual editors, using user interface inspired by the What-You-See-Is-What-You-Get (WYSIWYG).

## Schema Concept

ProseMirror defines its own data structure, the [`Node`](https://prosemirror.net/docs/ref/#model.Node), to represent content documents. The [ProseMirror document](https://prosemirror.net/docs/guide/#doc) is a tree-like structure comprised of nodes. A document is an instance of `Node` with children that are also instances of `Node`.

Each ProseMirror `document` conforms to a specific [schema](https://prosemirror.net/docs/guide/#schema). Document schemas allow you to edit documents with a custom structure without writing your own editor from scratch.

The Prosemirror schema describes:

* All HTML elements and attributes that may occur in the document.
* What tag nesting is allowed.
* What is the order or the HTML attributes.
* What marks can be applied to a HTML node. A mark is a piece of information that can be attached to a node. For example, emphasized text, text in code block or a link. It has a type and optionally a set of attributes that provide further information (such as the target of the link).

As a result, the Editor may automatically modify its initial `Value` on first user interaction.

For more details, refer to the [ProseMirror schema guide](https://prosemirror.net/docs/guide/#schema).

## Editor Schema

The Editor uses a built-in schema with predefined nodes and marks, which describes some of the most common HTML tags and their basic attributes like `id`, `class`, and `style`.

To change the existing nodes and marks or define new ones, you can:

* [Modify the Default Schema](slug:editor-modify-default-schema)
* [Create a New Schema](slug:editor-create-new-schema)

## See Also

* [Live Demo: Editor - ProseMirror Schema](https://demos.telerik.com/blazor-ui/editor/prosemirror-schema)
* [Modify the Default Schema](slug:editor-modify-default-schema)
* [Create a New Schema](slug:editor-create-new-schema)
