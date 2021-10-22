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
* `Get Started` - links the getting started article for the product
* `Share` - allows you to share the snippet. In the popup, you will find a generated public link with the snippet will that you can share as desired. The menu also provides buttons to directly share it in the corresponding social medias. Embed????????
* `Download` - downloads the project dll.
* `Feedback` - leads to the public feedback portal for Telerik Blazor REPL where you can share your enhancement requests and eventual bug reports. We use it to constantly monitor the community interest and demand and thus improve our products.

### Sidebar - Drawer

The Sidebar/Drawer provides the following functionalities:

* NuGet Package Manager - it allows you to specify the desired version of the Telerik UI for Blazor as well as to add other desired packages.??//not sure for adding other packages.

* Static Asset Manager - it allows you to add a cdn with your desired CSS or JavaScript files. Place the file URL in the input and click the download button. You don't need to reference the files, Blazor REPL will do that for you. Once the desired cdn is added, you can easily enable/disable it via a switch.

* Telerik UI Asset Manager - provides a summary of the installed Telerik UI packages and a dropdown to choose the desired theme to apply to the application. The menu allows choosing between the [built-in themes]({%slug general-information/themes%}) and some of their most commonly used [swatches]({%slug themes-swatches%}).

* Config button - by clicking it you can open the `Startup.cs` file of the project and modify it if desired.

### Editor

The Editor allows you to type, paste and edit your code. It always contains `_Main.razor` file and you can also add other files to the project via the `+` button. The newly added files could be `.razor` or `.cs` and their names should always start with a capital letter.

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