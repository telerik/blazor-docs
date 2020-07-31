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

To create a custom tool:

1. Make sure your editor has the `<EditorCustomTools>` tag.
1. Under it, add an `<EditorCustomTool>` tag and set its `Name` parameter to something you can use to distinguish this tool.
1. Inside that tag, add your custom content (e.g., buttons, dropdowns, etc.) with their desired rendering, data, logic, event handlers.
1. Add the custom tool to the toolbar (see [how to control toolbars]({%slug editor-toolbars%})).
1. Manipulate the editor content as desired - either through the editor commands, or with your own code through its `Value` field.

>caption Custom tool that adds a signature at the end of the content

````CSHTML
@using Telerik.Blazor.Components.Editor

<TelerikEditor @ref="@EditorRef" Tools="@Tools" @bind-Value="@TheEditorContent">
    <EditorCustomTools>
        <EditorCustomTool Name="AddSignature">
            <TelerikButton OnClick="@AddSignature">Add Signature</TelerikButton>
        </EditorCustomTool>
    </EditorCustomTools>
</TelerikEditor>

@code {
    string TheEditorContent { get; set; } = "<h1>Lorem ipsum</h1><p>Dolor sit amet.</p>";
    TelerikEditor EditorRef { get; set; }
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




Add basic sample of something (maybe the insert at cursor pos), link more samples in blazor-ui (custom ddl, custom dialog, ...)

## See Also

  * [Editor Overview]({%slug editor-overview%})
  * [Built-in Tools]({%slug editor-built-in-tools%})
  * [Toolbar]({%slug editor-toolbars%})

