---
title: Add Icons in Editor
description: How to insert icon tags in Editor?
type: how-to
page_title: Add Icons in Editor
slug: editor-kb-add-icons
position: 
tags: editor, blazor, icon, schema, prosemirror
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

I want to add custom icons in the Editor content. When adding an icon such as `<i class="fa-light fa-envelope">`, the icon's HTML disappears upon saving.

How can I add an `<i>` element inside the Editor?

## Solution

The built-in ProseMirror schema that the Editor uses does not support an `<i>` tag. To allow adding icons in the Editor content:

1. [Modify the ProseMirror schema]({%slug editor-modify-default-schema%}) to include a node for the `<i>` element.
2. Ensure the CSS classes for the icons are applied. The approach varies depending on the [edit mode of the Editor]({%slug editor-edit-modes-overview%})
    * [Iframe Edit Mode](#add-icons-in-iframe-edit-mode)
    * [Div Edit Mode](#add-icons-in-div-edit-mode)


### Add icons in Iframe Edit Mode

When the [EditMode of the Editor is set to `EditorEditMode.Iframe`]({%slug editor-edit-modes-iframe%}), the content area is an editable `<iframe>` element that does not inherit the CSS rules from the current page.

This means that you need to inject the icons stylesheet into the `<iframe>`, so the icons are properly rendered. [This will be supported in a future UI for Blazor version](https://feedback.telerik.com/blazor/1543925-add-the-ability-to-inject-css-files-into-the-iframe). For the time-being you can inject the stylesheet with JSInterop in the `OnAfterRenderAsync`.

>caption Add icons in an Editor with Iframe Edit Mode

````CSHTML
@using Telerik.Blazor.Components.Editor
@inject IJSRuntime js

<TelerikEditor @bind-Value="@EditorValue"
               Tools="@EditorTools"
               Schema="schemaProvider"
               Width="600px"
               Height="300px">
</TelerikEditor>

@code {
    private string EditorValue { get; set; } = @"Here is an example icon in the Editor content <i class='fa fa-info-circle'></i>";

    private List<IEditorTool> EditorTools { get; set; } = new List<IEditorTool>() { new ViewHtml() };

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await js.InvokeVoidAsync("injectEditorStylesheet");
        }
    }
}

@* Move JavaScript code to a separate JS file in production *@
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

    window.schemaProvider = (args) => {
        const schema = args.getSchema();
        const Schema = args.ProseMirror.Schema

        let nodes = schema.spec.nodes.addToEnd("i", icon);

        const newSchema = new Schema({ nodes });
        return newSchema;
    }

    function injectEditorStylesheet() {
        var doc = document.querySelector("iframe").contentWindow.document;
        var head = doc.querySelector("head");

        var cssLink1 = document.createElement("link");
        cssLink1.href = "https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic-bootstrap.min.css";
        cssLink1.rel = "stylesheet";
        cssLink1.type = "text/css";

        var cssLink2 = document.createElement("link");
        cssLink2.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css";
        cssLink2.rel = "stylesheet";
        cssLink2.type = "text/css";

        head.appendChild(cssLink1);
        head.appendChild(cssLink2);
    };
</script>
````

### Add icons in Div Edit Mode

When the [EditMode of the Editor is set to `EditorEditMode.Div`]({%slug editor-edit-modes-div%}), the content area is an editable <div> element that inherits the CSS rules from the current page.

This allows you to include the icons stylesheet in the `<head>` of the web page along with the other stylesheets. 

>caption Add icons in an Editor with Div Edit Mode

````CSHTML
@using Telerik.Blazor.Components.Editor

@* Just one example of including custom font icon libraries.
Make sure to use the correct way and resources for your actual project *@
<link href="https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic-bootstrap.min.css" rel="stylesheet" />
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />

<TelerikEditor @bind-Value="@EditorValue"
               Tools="@EditorTools"
               Schema="schemaProvider"
               EditMode="@EditorEditMode.Div"
               Width="600px"
               Height="300px">
</TelerikEditor>

@code {
    private string EditorValue { get; set; } = @"Here is an example icon in the Editor content <i class='fa fa-info-circle'></i>";

    private List<IEditorTool> EditorTools { get; set; } = new List<IEditorTool>() { new ViewHtml() };
}

@* Move JavaScript code to a separate JS file in production *@
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
```