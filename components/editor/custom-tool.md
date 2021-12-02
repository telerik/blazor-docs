---
title: Custom Tool
page_title: Editor - Custom Tool
description: How to make a custom Tool in the Editor for Blazor.
slug: editor-custom-tool
tags: telerik,blazor,custom,tool
published: True
position: 60
---


# Editor Custom Tool

The Blazor Editor component lets you add custom tools to its [toolbar]({%slug editor-toolbars%}). In those tools, you can use both the [built-in tools and commands]({%slug editor-built-in-tools%}) the editor provides, and also your own custom logic.

In this article:

* [Basics](#basics)
* [Examples](#examples)
	* [Change the Value](#change-the-value)
	* [Use Editor Commands](#use-editor-commands)
    * [Save Command](#save-command)

## Basics

To create a custom tool:

1. Make sure your Editor has the `<EditorCustomTools>` tag.

1. Under it, add an `<EditorCustomTool>` tag and set its `Name` parameter to something you can use to distinguish this tool. You can add more than one custom tool in the Editor.

1. Inside that tag, add your custom content (e.g., buttons, dropdowns, etc.) with their desired rendering, data, logic, event handlers.

1. [Add the custom tool to the Editor toolbar via the `Tools` collection]({%slug editor-toolbars%}#choose-toolbar-items). You can add the custom tools in the desired order and position, regardless of their order in the markup. Custom tools can be added as standalone tools only, not inside an `EditorButtonGroup`.

1. Manipulate the editor content as desired from the custom content events (like clicks) - either through the [editor commands]({%slug editor-built-in-tools%}), or with your own code that manipulates its `Value` field contents.

## Examples

In this section you can find the following examples:

* [Change the Value](#change-the-value)
* [Use Editor Commands](#use-editor-commands)
* [Save Command](#save-command)

### Change the Value

>caption Custom tool that manipulates the Value to add a signature at the end

````CSHTML
@using Telerik.Blazor.Components.Editor

<TelerikEditor Tools="@Tools" @bind-Value="@TheEditorContent">
    <EditorCustomTools>
        <EditorCustomTool Name="AddSignature">
            <TelerikButton OnClick="@AddSignature">Add Signature</TelerikButton>
        </EditorCustomTool>
    </EditorCustomTools>
</TelerikEditor>

@code {
    string TheEditorContent { get; set; } = "<h1>Lorem ipsum</h1><p>Dolor sit amet.</p>";
    List<IEditorTool> Tools { get; set; }

    protected override Task OnInitializedAsync()
    {
        Tools = new List<IEditorTool>();

        // register the custom tool for the toolbar - it uses the Name parameter from the markup
        Tools.Add(new CustomTool("AddSignature"));

        return base.OnInitializedAsync();
    }

    async Task AddSignature()
    {
        string signature = "<div style=\"margin-top: 30px;border: 2px solid black;\">Regards,<br />John Smith,<br />ACME Corp.</div>";

        // alter the Value of the editor
        TheEditorContent += signature;
    }
}
````


### Use Editor Commands

>caption Custom Tool that uses the editor commands to alter the selected content

````CSHTML
@using Telerik.Blazor.Components.Editor

<TelerikEditor @ref="@EditorRef" Tools="@Tools" @bind-Value="@TheEditorContent">
    <EditorCustomTools>
        <EditorCustomTool Name="ImportantFragment">
            <TelerikButton OnClick="@MarkImportant" Icon="star"></TelerikButton>
        </EditorCustomTool>
    </EditorCustomTools>
</TelerikEditor>

@code {
    string TheEditorContent { get; set; } = "<p>Lorem ipsum</p><p>Dolor sit amet.</p>";
    TelerikEditor EditorRef { get; set; }
    List<IEditorTool> Tools { get; set; }

    protected override Task OnInitializedAsync()
    {
        Tools = new List<IEditorTool>();

        // register the custom tool for the toolbar - it uses the Name parameter from the markup
        Tools.Add(new CustomTool("ImportantFragment"));

        return base.OnInitializedAsync();
    }

    async Task MarkImportant()
    {
        // you can use one or more commands from the editor
        // this example makes the selected block element an <h1>  with yellow text on red background
        await EditorRef.ExecuteAsync(new FormatCommandArgs("backColor", "red"));
        await EditorRef.ExecuteAsync(new FormatCommandArgs("foreColor", "yellow"));
        await EditorRef.ExecuteAsync(new FormatCommandArgs("format", "h1"));
    }
}
````

### Save Command

You can call application code from the editor tools to, for example, save the current content.

````CSHTML
@using Telerik.Blazor.Components.Editor

<TelerikEditor Tools="@Tools" @bind-Value="@TheEditorContent">
    <EditorCustomTools>
        <EditorCustomTool Name="Save">
            <TelerikButton OnClick="@Save" Icon="save" />
        </EditorCustomTool>
    </EditorCustomTools>
</TelerikEditor>

@code {
    string TheEditorContent { get; set; } = "<h1>Lorem ipsum</h1><p>Dolor sit amet.</p>";
    List<IEditorTool> Tools { get; set; }

    protected override Task OnInitializedAsync()
    {
        Tools = new List<IEditorTool>();

        // register the custom tool for the toolbar - it uses the Name parameter from the markup
        Tools.Add(new CustomTool("Save"));

        return base.OnInitializedAsync();
    }

    async Task Save()
    {
        // call the necessary logic here, such as saving the content
        Console.WriteLine("Saving content: " + TheEditorContent);
    }
}
````


<!--
### More Examples

The [blazor-ui repo]() contains more exmaples of creating custom tools - they also include custom dropdowns, custom dialogs, and extracting the rendering and main logic of the custom tool to a separate component to declutter the main view.
-->


## See Also

  * [Editor Overview]({%slug editor-overview%})
  * [Built-in Tools]({%slug editor-built-in-tools%})
  * [Toolbar]({%slug editor-toolbars%})

