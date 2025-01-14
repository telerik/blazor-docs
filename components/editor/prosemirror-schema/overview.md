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

The Telerik UI for Blazor Editor component is based on the <a href="https://prosemirror.net/" target="_blank">ProseMirror library</a>. ProseMirror provides a set of tools and concepts for building rich textual editors, using user interface inspired by the What-You-See-Is-What-You-Get (WYSIWYG).

## Schema Concept

ProseMirror defines its own data structure, the <a href="https://prosemirror.net/docs/ref/#model.Node" target="_blank">`Node`</a>, to represent content documents. The <a href="https://prosemirror.net/docs/guide/#doc" target="_blank">ProseMirror document</a> is a tree-like structure comprised of nodes. A document is an instance of `Node` with children that are also instances of `Node`.

Each ProseMirror `document` conforms to a specific <a href="https://prosemirror.net/docs/guide/#schema" target="_blank">schema</a>. Document schemas allow you to edit documents with a custom structure without writing your own editor from scratch.

The schema describes all nodes that may occur in the document, the way they are nested, and any marks applied to them. A mark is a piece of information that can be attached to a node. For example, emphasized text, text in code block or a link. It has a type and optionally a set of attributes that provide further information (such as the target of the link).

For more details, refer to the <a href="https://prosemirror.net/docs/guide/#schema" target="_blank">ProseMirror schema guide</a>.

## Editor Schema

The Editor uses a built-in schema with predefined nodes and marks, which describes some of the most common HTML tags and their basic attributes like `id`, `class`, and `style`.

To change the existing nodes and marks or define new ones, you can:

* [Modify the Default Schema](slug://editor-modify-default-schema)
* [Create a New Schema](slug://editor-create-new-schema)

## See Also

* [Live Demo: Editor - ProseMirror Schema](https://demos.telerik.com/blazor-ui/editor/prosemirror-schema)
* [Modify the Default Schema](slug://editor-modify-default-schema)
* [Create a New Schema](slug://editor-create-new-schema)
