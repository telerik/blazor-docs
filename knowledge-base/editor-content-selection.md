---
title: Get the content of the Editor selected by the user
description: How to get the content of the Editor selected by the user
type: how-to
page_title: Get the content of the Editor selected by the user
slug: editor-kb-content-selection
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

In order to receive the selected (highlighted) content of the Editor you should use JavaScript. Since the Editor has two different edit modes - [Div]({%slug editor-edit-modes-div%}) and [Iframe]({%slug editor-edit-modes-iframe%}).  Alternatively, for the `Iframe mode` you

## Examples

* [Div Mode](#div-mode)
* [Iframe Mode](#iframe-mode)

### Div Mode

To get the selected text from an Editor in `Div mode` you should:
* Use the `getSelection()` method of the `window`.
* Cast it to a string, using the `toString()` method.
* Call that JavaScript function from a [Custom Tool]({%slug editor-custom-tool%}) in the Editor.

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

To get the selected text from an Editor in `Iframe mode` you should:

* Select the HTML that holds the editor content using a `querySelector` with a suitable CSS selector.
* Use the `getSelection()` method available for the `contentDocument`.
* Cast it to a string, using the `toString()` method.
* Call that JavaScript function from a [Custom Tool]({%slug editor-custom-tool%}) in the Editor.

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





