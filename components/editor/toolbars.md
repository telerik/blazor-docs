---
title: Toolbars
page_title: Editor - Toolbars
description: Controlling the Toolbar in the Editor for Blazor - add and define buttons and tools.
slug: editor-toolbars
tags: telerik,blazor,toolbar
published: True
position: 20
---


# Editor Toolbar

TBD: Toolbar or Toolbars?!


What are toolbars (containers for tools), image showing the toolbar

built-in lists (default, all)

customize toolbars - use the default (snippet below), start from scratch

link tools reference list and command reference (if separate)

````CSHTML
@using Telerik.Blazor.Components.Editor

<TelerikEditor Tools="@customTools" @bind-Value="@TheEditorValue"></TelerikEditor>

@TheEditorValue

@code{
    string TheEditorValue { get; set; }
    public List<IEditorTool> customTools { get; set; }

    protected override void OnInitialized()
    {
        // start with the default set of tools as base
        // alternatively, you can create a new list and populate it from scratch
        customTools = new List<IEditorTool>(EditorToolSets.All);

        // create a tool group
        var UndoRedoGroup = new ToolGroup(
                new Undo(), // add individual tools to the group
                new Redo(),
                new Bold()
            );

        // add the toolgroup to the beginning of the toolbar definition
        customTools.Insert(0, UndoRedoGroup);

        // add an individual tool that will form its own tool group at the end of the toolbar
        customTools.Add(new ViewHtml());


        base.OnInitialized();
    }
}
````

## See Also

  * [Editor Overview]({%slug editor-overview%})
