---
title: Disable Table Resizing in the Editor
description: Learn how to hide table resize handles in the Telerik UI for Blazor Editor.
type: how-to
page_title: Disable Table Resizing in the Editor
slug: editor-kb-disable-table-resizing
published: true
position:
tags: telerik, blazor, editor, table, resize
ticketid: 1710657
res_type: kb
components: ["editor"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Editor for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

How can I disable table resizing in the Telerik UI for Blazor Editor?

## Solution

Hide table resize handles, to prevent table resizing:

1. Set the Editor `EditMode` to [`Div`](slug:editor-edit-modes-div).
1. Use CSS to hide the table resize handles.

This approach works with `Div` mode because it uses the page styles. The [`Iframe` mode](slug:editor-edit-modes-iframe) does not inherit the page CSS.

>caption Hide table resize handles in the Telerik UI for Blazor Editor

````RAZOR
@using Telerik.Blazor.Components.Editor

<TelerikEditor EditMode="@EditorEditMode.Div"
               @bind-Value="@EditorValue"
               Tools="@Tools">
</TelerikEditor>

<style>
    .k-editor .ProseMirror .column-resize-handle {
        display: none !important;
    }
</style>

@code {
    private string EditorValue { get; set; } = "<p>Use the toolbar to insert a table.</p>";

    private List<IEditorTool> Tools { get; set; } = new()
    {
        new EditorButtonGroup(new Bold(), new Italic(), new Underline()),
        new UnorderedList(),
        new EditorButtonGroup(new CreateLink(), new Unlink(), new InsertImage()),
        new InsertTable(),
        new EditorButtonGroup(new AddRowBefore(), new AddRowAfter(), new MergeCells(), new SplitCell())
    };
}
````

## See Also

* [Editor Edit Modes](slug:editor-edit-modes-overview)
* [Editor Built-in Tools](slug:editor-built-in-tools)
