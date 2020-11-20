---
title: Get the content of the Editor selected by the user
description: How to get the content of the Editor selected by the user
type: how-to
page_title: Get the user selection in the Editor
slug: editor-kb-get-selection
position:
tags:
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

I would like to get the content of the Editor selected (highlighted) by the user to perform some custom formatting.


## Solution

In order to receive or modify the selected (highlighted) content of the Editor, you need to use JavaScript. The `selection` object is inherently JavaScript-based because HTML editing is based on the rich text editing engine of the browser, and so it has no .NET counterpart.

Since the Editor has two different edit modes - [Div]({%slug editor-edit-modes-div%}) and [Iframe]({%slug editor-edit-modes-iframe%}), the examples below will showcase how to get the selected text for both of them. 

## Examples

* [Div Mode](#div-mode)
* [Iframe Mode](#iframe-mode)

### Div Mode

To get the selected text from an Editor in `Div mode` you should use the `getSelection()` method of the `window`.

At this point, you can apply changes to it with JavaScript.

If you want to use it on the .NET (Blazor) side, you need to:

1. Serialize the selection to a string so .NET can understand it, by using the `toString()` method.
1. Call a JavaScript function from a [Custom Tool]({%slug editor-custom-tool%}) in the Editor that will return that selection.

````Component
@using Telerik.Blazor.Components.Editor

@inject IJSRuntime js

<TelerikEditor Tools="@Tools" @bind-Value="@TheEditorContent" EditMode="@EditorEditMode.Iframe">
    <EditorCustomTools>
        <EditorCustomTool Name="GetSelectedText">
            <TelerikButton OnClick="@GetSelectedText">Get selected text</TelerikButton>
        </EditorCustomTool>
    </EditorCustomTools>
</TelerikEditor>


Selected text: @SelectedText

@code {
    string TheEditorContent { get; set; } = "<h1>Lorem ipsum</h1><p>Dolor sit amet.</p>";
    List<IEditorTool> Tools { get; set; }
    public string SelectedText { get; set; }
    
    async Task GetSelectedText()
    {
        SelectedText = await js.InvokeAsync<string>("getSelectedText");
    }

    protected override Task OnInitializedAsync()
    {
        Tools = new List<IEditorTool>(EditorToolSets.Default);

        // register the custom tool for the toolbar - it uses the Name parameter from the markup
        Tools.Add(new CustomTool("GetSelectedText"));

        return base.OnInitializedAsync();
    }
}
````
````JavaScript
function getSelectedText() {
    return window.getSelection().toString();
}
````

### Iframe Mode

To get the selected text from an Editor in `Iframe mode` you need to:

1. Select the DOM element that holds the editor `<iframe>` element by using a `querySelector()` call with a suitable CSS selector.
1. Use the `getSelection()` method available for the `contentDocument` of the `iframe`.


At this point, you can apply changes to it with JavaScript.

If you want to use it on the .NET (Blazor) side, you need to:

1. Serialize the selection to a string so .NET can understand it, by using the `toString()` method.
1. Call a JavaScript function from a [Custom Tool]({%slug editor-custom-tool%}) in the Editor that will return that selection.

````Component
@using Telerik.Blazor.Components.Editor

@inject IJSRuntime js

<TelerikEditor Tools="@Tools" @bind-Value="@TheEditorContent" EditMode="@EditorEditMode.Iframe">
    <EditorCustomTools>
        <EditorCustomTool Name="GetSelectedText">
            <TelerikButton OnClick="@GetSelectedText">Get selected text</TelerikButton>
        </EditorCustomTool>
    </EditorCustomTools>
</TelerikEditor>


Selected text: @SelectedText

@code {
    string TheEditorContent { get; set; } = "<h1>Lorem ipsum</h1><p>Dolor sit amet.</p>";
    List<IEditorTool> Tools { get; set; }
    public string SelectedText { get; set; }
    
    async Task GetSelectedText()
    {
        SelectedText = await js.InvokeAsync<string>("getSelectedText");
    }

    protected override Task OnInitializedAsync()
    {
        Tools = new List<IEditorTool>(EditorToolSets.Default);

        // register the custom tool for the toolbar - it uses the Name parameter from the markup
        Tools.Add(new CustomTool("GetSelectedText"));

        return base.OnInitializedAsync();
    }
}
````
````JavaScript
function getSelectedText() {
    var editorIframe = document.querySelector(".k-editor iframe");
    return editorIframe.contentDocument.getSelection().toString();
}
````

## Notes

The browser selection exists only in the browser. Sending it to the Blazor app will remove all its functionality and its context. For example, you no longer have access to its start and end, you cannot alter them, and it will be up to your C# code to determine where exactly that selection is in the content and how to modify the entire content to both produce the desired results, and remain valid HTML. With this in mind, consider applying changes directly with JavaScript to the selection object.



