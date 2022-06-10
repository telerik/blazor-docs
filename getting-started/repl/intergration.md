---
title: Integration
page_title: Telerik REPL for Blazor Integration
description: Telerik REPL for Blazor integration in other Telerik Resources, Visual Studio and Visual Studio Code
slug: blazor-repl-integration
tags: telerik,blazor,repl,integration
published: True
position: 10
---

# Telerik REPL for Blazor Integration

Telerik REPL for Blazor is integrated in our resources (documentation and demos), as well as Visual Studio and Visual Studio Code.

In this article:

* [Documentation Integration](#documentation-integration)
* [Demos Integration](#demos-integration)
* [Visual Studio and Visual Studio Code Integration](#visual-studio-and-visual-studio-code-integration)

## Documentation Integration

Most code examples in the Telerik UI for Blazor documentation are directly runnable in Telerik REPL for Blazor. This provides interactive experience, as the snippets are easy to test and edit. The toolbar above each runnable code snippet contains the following options:

* `Edit` - click to open the source in the integrated the Telerik REPL for Blazor Editor.

* `Preview` - click to run the snippet in the integrated the Telerik REPL for Blazor Result View.


![Documentation Integration](../images/repl-docs-integration.png)


## Demos Integration

[The Telerik UI for Blazor demos](https://demos.telerik.com/blazor-ui) support integration with the Telerik REPL for Blazor. The demo window toolbar provides option for editing the demo in Telerik REPL for Blazor. Once you select that option, you will be redirected to the Telerik REPL for Blazor and its editor will contain the source code of the current demo, so you can directly edit and test it.

![Demos Integration](../images/repl-demos-integration.png)


## Visual Studio and Visual Studio Code Integration

Telerik Extensions for [Visual Studio]({%slug getting-started-vs-integration-overview%}) and [Visual Studio Code]({%slug getting-started-vs-code-integration-overview%}) provide option to easily share your code to the Telerik REPL for Blazor with a few clicks. You can share the whole file or just a selection.

The command can be used if more than 10 symbols are selected. Otherwise Visual Studio will disable the command, and Visual Studio Code will show an error message ("Expected at least 10 characters"). In case of multiple selection every new piece will be concatenated on a new line.

If no selection is made, the whole file will be shared to Telerik REPL for Blazor. Only single files can be shared per command and not the whole application. Once the share to REPL process is triggered, status notifications will appear in the bottom-right corner for a few seconds. After that, the default browser will open with the uploaded snippet.

The `Share to Telerik REPL for Blazor` command can be accessed as follows:

### Visual Studio

Get the extension from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=TelerikInc.TelerikBlazorVSExtensions). 

Access the command through the Context Menu - select a section that you want to share, right click on it to open the context menu and click "Share to Telerik REPL for Blazor" option.
    
![VS - Share to Telerik REPL for Blazor](../images/vs-extension-share-to-repl.png)



### Visual Studio Code

Get the extension from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=TelerikInc.blazortemplatewizard). Access the command using one of the following:

* Context Menu option - select a section that you want to share, right click on it to open the context menu and click "Share to Telerik REPL for Blazor" option.`

![VS Code - Share to Telerik REPL for Blazor](../images/vs-code-extension-share-to-repl.png)


* Command in the command palette - select a section that you want to share, search for "Share to Telerik REPL for Blazor" in the command palette and choose it.


![VS Code - Share to Telerik REPL for Blazor](../images/vs-code-extension-share-to-repl-command-palette.png)
