---
title: Blazor REPL
page_title: Blazor REPL
description: Blazor REPL - Write, Compile, Execute and Share your rich UI Blazor components.
slug: blazor-repl
tags: telerik,blazor,repl
published: True
position: 40
---

# Blazor REPL

<a href = "https://www.google.com/" target = "_blank">Telerik Blazor REPL</a> is innovative web-based application that allows you to write, compile, execute and share your rich UI Blazor components. You can write your code directly in the integrated editor and it in the browser security sandbox without any communication with a server. The code is compiled on top of Web Assembly which delivers near to native performance. With Blazor REPL you can also easily edit, save and share your code.

In this article:

* [Getting Started](#getting-started)
* [Telerik UI for Blazor documentation Integration](#telerik-ui-for-blazor-documentation-integration)
* [Telerik UI for Blazor demos Integration](#telerik-ui-for-blazor-demos-integration)
* [Visual Studio Code Integration](#visual-studio-code-integration)

## Getting Started

<a href = "https://www.google.com/" target = "_blank">The Blazor REPL applications</a> is divided in four main elements:

* [Toolbar](#toolbar)
* [Sidebar - Drawer](#sidebar---drawer)
* [Editor](#editor)
* [Output](#output)
* [Error List](#error-list)

![REPL Overview](images/repl-getting-started)

### Toolbar

The Toolbar of Blazor REPL contains the commands that can be performed with the code in the [Editor](#editor):

* `Run` - executes the code from the editor and renders it in the [Output](#output)
* `Share` - allows you to save the snippet and share the snippet. Opens a confirmation popup, if confirmed a public link with the snippet will be generated.
* `Download` - downloads the project dll
* ....
* ....

### Sidebar - Drawer

The Sidebar/Drawer provides the following functionalities:

* NuGet Manager - it allows you to desired version of the Telerik UI as well as to add other desired packages.??//not sure for adding other packages.

* Static Asset Manager - it allows you to add a cdn with your desired CSS or JavaScript files. Place the file URL in the input and click the `+` button. You don't need to reference the files, Blazor REPL will do that for you.

* Config button - by clicking it you can open the `Startup.cs` file of the project and modify it if desired.

### Editor

The Editor allows you to type, paste, edit your code. It always contains `_Main.razor` file and you can also add other files to the project via the `+` button.

### Output

In the Output window, you can see the result of the run project. Its toolbar contains a Theme chooser dropdown which allows you to select the desired theme to be applied on the snippet. The available themes are the three main built-in ones - Default, Bootstrap and Material. If you want to test some of their swatches, you can do that in the <a href = "https://demos.telerik.com/blazor-ui/grid/overview" target ="_blank">live demos</a> or the <a href = "https://themebuilder.telerik.com/blazor-ui" target = "_blank"> Sass ThemeBuilder</a>.

### Error List

Blazor REPL provides an Error List that displays details on the errors thrown at runtime (if any). It can be expanded/collapsed via arrow buttons.

## Telerik UI for Blazor documentation Integration

The Telerik UI for Blazor documentation supports integration with the Telerik Blazor REPL. This provides interactive experience and easy to test snippets for the various components and scenarios. Above the code snippets listed in the documentation articles you will find a toolbar with the following options:

* `Edit Source` - click to open the source in the integrated Blazor REPL Editor.

* `Preview` - click to run the snippet in the integrated Blazor REPL Output.


## Telerik UI for Blazor demos Integration

The Telerik UI for Blazor demos supports integration with the Telerik Blazor REPL. In the demo window toolbar, along with the "Example" and "View Source" tabs, you will find a tab with dropdown that  provides option for editing the demo in Telerik Blazor REPL. Once you select that option, you will be redirected to the Blazor REPL and its editor will contain the source code of the current demo, so you can directly edit and test it.

## Visual Studio Code Integration

Telerik Extension for Visual Studio Code provides option to easily share your code to the Telerik Blazor REPL in a couple clicks. You can share the whole file or just a selection. The sharing option is served in two ways:

* Command in the command palette - select a section that you want to share, search for "Blazor REPL:Share to Blazor REPL" in the command palette and choose it.

* Context Menu option - select a section that you want to share, right click on it to open the context menu and click "Share to Blazor REPL" option.

If no selection is made, the whole file will be shared to Blazor REPL. Once the share to REPL process is triggered, notifications will appear in the bottom right corner for about 2 to 3 seconds to indicate the status, after that the default browser opens with the uploaded snippet.