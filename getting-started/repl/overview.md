---
title: Overview
page_title: Telerik REPL for Blazor Overview
description: Telerik REPL for Blazor - Write, Compile, Execute and Share your rich UI Blazor components.
slug: blazor-repl
tags: telerik,blazor,repl
published: True
position: 1
previous_url: /getting-started/repl
---

# Telerik REPL for Blazor Overview

<a href = "https://telerik.com/blazor-ui/repl/getting-started" target = "_blank"> Progress Telerik REPL for Blazor </a> is innovative web-based application that allows you to write, compile, execute and share your rich Blazor UI components. You can write your code directly in the integrated editor and execute it in the browser security sandbox without any communication with a server. The code is compiled on top of Web Assembly which delivers near to native performance. With Telerik REPL for Blazor you can also easily edit, save and share your code.

>important Telerik REPL for Blazor integrates 3.0.0 version of Telerik.UI.for.Blazor. Any snippet created before 3.0.0 that uses the Telerik Components might need an update due to the [breaking changes in the release]({%slug changes-in-3-0-0%}).

The <a href = "https://blazorrepl.telerik.com/" target = "_blank">Telerik REPL for Blazor application</a> interface consists of five main sections:

* [Toolbar](#toolbar)
* [Sidebar - Drawer](#sidebar---drawer)
* [Editor](#editor)
* [Result View](#result-view)
* [Error List](#error-list)

<!-- ![Overview](images/repl-overview.png) -->

## Toolbar

The Toolbar of Telerik REPL for Blazor contains the operations that can be performed:

* `Run` - executes the code from the editor and renders it in the [Result View](#result-view)

* `Get Started` - links the [getting started article](https://telerik.com/blazor-ui/repl/getting-started) for the product

* `Share` - allows you to share the snippet. The menu is divided in two sections:
    *  `Share` - In the popup, you will find a generated public link with the snippet that you can share as desired. The menu also provides several options for direct sharing in social media.
    * `Embed` - generates a link which you can use to embed the snippet in blog posts and other websites. Based on your use case, you can choose whether to embed only the Editor, the Result View, the Error Console or all three. You will see a preview of the embed in the popup upon selecting the desired option.
    
* `Feedback` - leads to the [public feedback portal for Telerik REPL for Blazor](https://feedback.telerik.com/repl) where you can share your enhancement requests and eventual bug reports. We use it to constantly monitor the community interest and demand and thus improve our products.

## Sidebar

The Sidebar provides the following functionalities:

* NuGet Package Manager - it allows you to install third party NuGet packages that are stored in the public `nuget.org` repository. If the published NuGet requires accepting license agreement, you will see a confirmation prompt. The latest `Telerik UI for Blazor` package is already installed by default.

* Static Asset Manager - it allows you to add CDN URLs for your CSS or JavaScript files. Place the file URL in the input and click the download button. This will automatically add references for the corresponding files. Once the desired asset is added, you can easily enable/disable it via a switch. In case some of the installed NuGet packages include CSS/JavaScript files, they will automatically be listed in this section, so you can manage them.

* Telerik UI Asset Manager - shows the Telerik.UI.for.Blazor package version and allows you to change or update it. Starting from September 14, 2022 (R3 2022), each REPL example will maintain its Telerik UI package version until changed explicitly. There is also a list of the available [built-in themes]({%slug general-information/themes%}) and their corresponding [color swatches]({%slug themes-swatches%}). When you select a different theme or swatch, you can immediately see the applied styles in the Result View.

* Snippets and Scaffolders - it allows you to add predefined component snippets or scaffold some componnents defining your desired configuration. [Read more about Snippets and Scaffolders...]({%slug blazor-repl-snippets-scaffolders%})

* Startup Config - the config icon at the bottom of the Sidebar opens the `Startup.cs` file of the project. You can configure services or other settings there.

## Editor

The Editor allows you to type, paste and edit your code. It always contains `_Main.razor` file and you can also add other files to the project via the `+` button.

The newly added files could be `.razor` (pages, components) or `.cs` (models, code-behind files, services, etc.). All files of type `.razor` should be named with a capital letter.

## Result View

Once you click the Run button, the actual result of your code will be rendered in the Result View of the Telerik REPL for Blazor. To successfully run the code you need to make sure that no errors are thrown (if any, they will be listed in the [Error List](#error-list)).

## Error List

Telerik REPL for Blazor provides an Error List that displays details for the compile time errors and warnings. It can be expanded/collapsed via arrow buttons.

The Error list is located at the bottom of the [Editor](#editor).

