---
title: Add icons in Editor
description: How to insert icons in Editor?
type: how-to
page_title: Add icons in Editor
slug: editor-kb-add-icons
position: 
tags: editor
ticketid: 
res_type: kb
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

I want to add icons...

## Solution

Modify the schema....

````CSHTML
@using Telerik.Blazor.Components.Editor

<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet" />

<script suppress-error="BL9992">  
    var icon = {
        attrs: {
            class: { default: null },
            type: { default: null },
        },
        group: "inline",
        content: "text*",
        inline: true,
        parseDOM: [
            {
                tag: "i",
                getAttrs: (dom) => ({
                    class: dom.getAttribute("class"),
                }),
            },
        ],
        toDOM: (node) => {
            const attrs = {
                class: node.attrs.class
            };
            return ["i", attrs];
        },
    };
    debugger

    window.schemaProvider = (args) => {
        const schema = args.getSchema();
        const Schema = args.ProseMirror.Schema

        let nodes = schema.spec.nodes.addToEnd("i", icon);

        const newSchema = new Schema({ nodes });
        return newSchema;
    }

</script>

<i class="fas fa-x"></i>

<TelerikEditor @bind-Value="@EditorValue" Tools="@EditorToolSets.All"
               Schema="schemaProvider"
               Height="300px"               
               EditMode="@EditorEditMode.Div">
</TelerikEditor>

@code {
    private string EditorValue { get; set; } = @"Here is an example icon in the Editor content <i class='fa fa-info-circle'></i>";

    // private List<IEditorTool> EditorTools { get; set; } = new List<IEditorTool>() { ViewHtml };

}
```