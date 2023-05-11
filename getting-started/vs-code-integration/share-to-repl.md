---
title:  Share to Telerik REPL for Blazor
page_title: Visual Studio Code Share to Telerik REPL
description: Learn how to share your Blazor code snippets in Telerik REPL for Blazor.
slug: getting-started-vs-code-share-to-repl
position: 25
---

# Share to Telerik REPL

[Progress Telerik REPL for Blazor]((https://www.telerik.com/blazor-ui/repl)) is a browser-based playground for creating, saving, running and sharing Blazor code snippets.

The [Telerik UI for Blazor Productivity Tools for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=TelerikInc.blazortemplatewizard) provides integration with Telerik REPL for Blazor. It allows you to export your code snippet and share the generated URL to social media, community forums or with a team member.

## Get the Extension

To use the **Share to Telerik REPL for Blazor** option, install the Telerik UI for Blazor Visual Studio Code Extension. 
@[template](/_contentTemplates/common/general-info.md#vs-code-x-download)

## Share a Code Snippet

To share a code snippet to Telerik REPL for Blazor you have a few options. 

1. Share Using the Code Editor Context Menu
    To share your code using *Share to Telerik REPL for Blazor* from the code editor's context menu:

    * Open a `.razor` file or a Razor language in the code editor.
    * Select code to share:
        * To send the whole file - clear the selection.
        * To send a part of the file - select the code.
    * Right-click over the code editor.
    * In the context menu click `Share to Telerik REPL for Blazor`.

    ![Share Using the Code Editor Context Menu](images/share-to-repl-editor-context-menu.png)

1. Share Using the Code Editor Command Palette

    To share your code with Share to Telerik REPL for Blazor from the command palette:

    * Open a `.razor` file or a Razor language in the code editor.
    * Select code to share:
        * To send the whole file - clear the selection.
        * To send a part of the file - select the code.
    * Open the Command Palette (Ctrl+Shift+P in Windows/Linux or Cmd+Shift+P on Mac) and type `Share to Telerik REPL for Blazor`.

    ![Share Using the Code Editor Context Menu](images/share-to-repl-editor-command-palette.png)

1.  Share Using the File Explorer Context Menu

    To use Share to Telerik REPL for Blazor from the VS Code file explorer's context menu:

    * Right-click a `.razor` file in the files tree.
    * Select the Share to Telerik REPL for Blazor.
    
    ![Share Using the Code Editor Context Menu](images/share-to-repl-file-explorer-context-menu.png)

> Please note, that multiple selection is not supported. Only the right-clicked file is sent.