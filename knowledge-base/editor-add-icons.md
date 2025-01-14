---
title: Add Font Icons in Editor
description: How to insert <i> tags in the Editor for Blazor to render custom icons in the Editor content?
type: how-to
page_title: How to Add Font Icons in the Telerik Editor for Blazor
slug: editor-kb-add-icons
position: 
tags: blazor, editor, prosemirror, schema, icon
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

This KB article answers the following questions:

* How to add custom icons in the Editor content? When adding an icon such as `<i class="fa-light fa-envelope">`, the icon's HTML disappears upon saving.
* How can I add an `<i>` element inside the Editor?

## Solution

The default schema of the Telerik Editor does not include an `<i>` tag, so the Editor strips such elements automatically. To allow adding font icons through `<i>` tags in the Editor content:

1. [Modify the ProseMirror schema](slug://editor-modify-default-schema) to include a node for the `<i>` element.
2. Ensure the required font icon stylesheets can affect the Editor content. The approach varies depending on the [edit mode of the Editor](slug://editor-edit-modes-overview):
    * [Iframe Edit Mode](#add-icons-in-iframe-edit-mode)
    * [Div Edit Mode](#add-icons-in-div-edit-mode)


### Add Icons in Iframe Edit Mode

When the [Editor `EditMode` is set to `EditorEditMode.Iframe`](slug://editor-edit-modes-iframe), the content area is inside an `<iframe>` element that does not apply the CSS rules from the current page.

This means that you need to inject the icons stylesheet into the `<iframe>`, so the icons are properly rendered. At the time of writing (UI for Blazor **6.1.0**), [the Editor does not support injecting your CSS files into the iframe](https://feedback.telerik.com/blazor/1543925-add-the-ability-to-inject-css-files-into-the-iframe) but you can inject them with JSInterop in `OnAfterRenderAsync`.

>caption Add icons in an Editor with Iframe edit mode

````RAZOR
@using Telerik.Blazor.Components.Editor
@inject IJSRuntime js

<TelerikEditor @bind-Value="@EditorValue"
               Tools="@EditorToolSets.All"
               Schema="schemaProvider"
               Height="300px">
</TelerikEditor>

@code {
    private string EditorValue { get; set; } = @"<p>Here is an example icon in the Editor content <i class='fa fa-info-circle'></i></p>";

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

    //define the icon node
    var iconNode = {
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

    //add the icon node to the Editor ProseMirror schema
    window.schemaProvider = (args) => {
        const schema = args.getSchema();
        const Schema = args.ProseMirror.Schema

        // remove the default i mark that does not support the class attribute
        let marks = schema.spec.marks.remove("i");

        // add the modified i as a node
        let nodes = schema.spec.nodes.addToEnd("i", iconNode);

        const newSchema = new Schema({ nodes, marks });
        return newSchema;
    }

    //inject the stylesheet for the icons, so they are properly visualized
    function injectEditorStylesheet() {
        var doc = document.querySelector("iframe").contentWindow.document;
        var head = doc.querySelector("head");

        var bootstrapCssLink = document.createElement("link");
        bootstrapCssLink.href = "https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic-bootstrap.min.css";
        bootstrapCssLink.rel = "stylesheet";

        var fontAwesomeCssLink = document.createElement("link");
        fontAwesomeCssLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css";
        fontAwesomeCssLink.rel = "stylesheet";

        head.appendChild(bootstrapCssLink);
        head.appendChild(fontAwesomeCssLink);
    };

</script>
````

### Add Icons in Div Edit Mode

When the [Editor `EditMode` is set to `EditorEditMode.Div`](slug://editor-edit-modes-div), the content area is a `<div contenteditable="true">` element that inherits the CSS rules from the current page.

This allows you to include the icon stylesheets in the `<head>` of the web page along with the other stylesheets. 

>caption Add icons in an Editor with Div edit mode

````RAZOR
@using Telerik.Blazor.Components.Editor

@* Just one example of including custom font icon libraries.
Make sure to use the correct way and resources for your actual project *@
<link href="https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic-bootstrap.min.css" rel="stylesheet" />
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />

<TelerikEditor @bind-Value="@EditorValue"
               Tools="@EditorToolSets.All"
               Schema="schemaProvider"
               EditMode="@EditorEditMode.Div"
               Height="300px">
</TelerikEditor>

@code {
    private string EditorValue { get; set; } = @"Here is an example icon in the Editor content <i class='fa fa-info-circle'></i>";
}

@* Move JavaScript code to a separate JS file in production *@
<script suppress-error="BL9992">

    //define the icon node
    var iconNode = {
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

    //add the icon node to the Editor ProseMirror schema
    window.schemaProvider = (args) => {
        const schema = args.getSchema();
        const Schema = args.ProseMirror.Schema

        // remove the default i mark that does not support the class attribute
        let marks = schema.spec.marks.remove("i");

        // add the modified i as a node
        let nodes = schema.spec.nodes.addToEnd("i", iconNode);

        const newSchema = new Schema({ nodes, marks });
        return newSchema;
    }

</script>
````

## See Also

* [Custom Editor Tools](slug://editor-custom-tools)
* [Modify the ProseMirror Schema](slug://editor-modify-default-schema)
