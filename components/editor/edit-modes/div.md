---
title: Div
page_title: Editor - Div Edit Mode
description: Div Edit Mode in the Editor for Blazor.
slug: editor-edit-modes-div
tags: telerik,blazor,edit,mode,div
published: True
position: 3
components: ["editor"]
---

# Editor Div Edit Mode

The Div [edit mode](slug:editor-edit-modes-overview) uses a `<div>` element for the editable area of the Editor.

This has the following implications:

* CSS rules from the current page apply to the content as well.
    
    * This includes rules that would match elements and classes you have in the content, so the content looks like the current page.
    * Such behavior can be useful when the final styles for the content will be similar/identical to the current page hosting the editor.
    * You can cascade classes that will affect only the editor content but not the rest of the page through the `.k-editor-content` class - this is the wrapper of the editor content area.

* The Editor cannot add specific styling for elements in the editable area, as they would be elements selectors (such as `table {border: 1px solid black}`) which can impact negatively the hosting page.

To use this mode, set the `EditMode` parameter of the editor to `EditorEditMode.Div` explicitly:

>caption Use the `Div` edit mode

<demo metaUrl="client/editor/edit-modes/div/basic/" height="450"></demo>

The example below shows how you can customize the appearance of elements in the editor. It showcases the following:

* an element selector from the page affects the editor (e.g., the `p` selector in the sample)
* if your content has predefined classes, attribute and other features that can be used in CSS selectors, you can target them too (e.g., the `h1.my-heading` selector)
* how to make the editor adjust its height based on the content height - see the `Height="auto"` parameter
* how to cascade rules so that they only affect the editor content and not the main page (see the `.k-editor-content` cascade)
* how to style the content area element itself

>caption Customize the content area appearance in Div mode

<demo metaUrl="client/editor/edit-modes/div/customize-content/" height="500"></demo>

## See Also

* [Editor Overview](slug:editor-overview)
* [Editor Toolbar](slug:editor-toolbar)

