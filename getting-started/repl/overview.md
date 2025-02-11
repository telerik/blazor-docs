---
title: Overview
page_title: Telerik REPL for Blazor Overview
description: Telerik REPL for Blazor allows you to write, compile, execute, and share your rich UI Blazor components directly in the browser.
slug: blazor-repl
tags: telerik,blazor,repl
published: True
position: 1
previous_url: /getting-started/repl
---

# Telerik REPL for Blazor Overview

<a href = "https://www.telerik.com/blazor-ui/repl" target = "_blank"> Progress Telerik REPL for Blazor </a> is an innovative web-based application that allows you to write, compile, execute, and share your rich Blazor UI components. You can write your code directly in the integrated editor and execute it in the browser security sandbox without any communication with a server. The code is compiled on top of Web Assembly which delivers near to native performance. With Telerik REPL for Blazor, you can also easily edit, save, and share your code.


The <a href = "https://blazorrepl.telerik.com/" target = "_blank">Telerik REPL for Blazor application</a> interface consists of five main sections:

- [Telerik REPL for Blazor Overview](#telerik-repl-for-blazor-overview)
  - [Toolbar](#toolbar)
  - [Sidebar](#sidebar)
  - [Editor](#editor)
  - [Result View](#result-view)
  - [Error List](#error-list)
  - [See Also](#see-also)

<!-- ![Overview](images/repl-overview.png) -->

## Toolbar

The Toolbar of Telerik REPL for Blazor provides access to the operations that you can perform:

* **Run**&mdash;executes the code from the editor and renders it in the [Result View](#result-view).

* **Get Started**&mdash;links the [Getting Started article](https://telerik.com/blazor-ui/repl/getting-started) for Telerik UI for Blazor.

* **Share**&mdash;allows you to share the snippet. The menu is divided into two sections:
    *  **Share**&mdash;in the popup, you will find a generated public link with the snippet that you can share as desired. The menu also provides several options for direct sharing in social media.
    * **Embed**&mdash;generates a link which you can use to embed the snippet in blog posts and other websites. Based on your use case, you can choose whether to embed only the Editor, the Result View, the Error Console or all three. Upon selecting the desired option, you will see a preview of the embed in the popup.
    
* **Feedback**&mdash;leads to the [public feedback portal for Telerik REPL for Blazor](https://feedback.telerik.com/repl) where you can share your enhancement requests and eventual bug reports. We use it to constantly monitor the community interest and demand and thus improve our products.

* **Login/Register**&mdash;allows you to [login and save snippets to your account](slug:blazor-repl-user-snippets).

## Sidebar

The Sidebar provides the following functionalities:

* **NuGet Package Manager**&mdash;it allows you to install third party NuGet packages that are stored in the public `nuget.org` repository. If the published NuGet requires accepting a license agreement, you will see a confirmation prompt. The latest `Telerik UI for Blazor` package is already installed by default.

* **Static Asset Manager**&mdash;it allows you to add CDN URLs for your CSS or JavaScript files. Place the file URL in the input and click the download button. This will automatically add references for the corresponding files. Once the desired asset is added, you can easily enable/disable it via a switch. In case some of the installed NuGet packages include CSS/JavaScript files, they will automatically be listed in this section, so you can manage them.

* **User Snippets**&mdash;allows you to review and manage the snippets saved in your account. [Read more about the user snippets...](slug:blazor-repl-user-snippets)

* **Telerik UI Asset Manager**&mdash;shows the Telerik.UI.for.Blazor package version and allows you to change or update it. Starting from September 14, 2022 (R3 2022), each REPL example maintains its Telerik UI package version until changed explicitly. The Asset Manager also shows a list with the available [built-in themes](slug:themes-overview) and their corresponding [theme swatches](slug:themes-overview#basics). When you select a new theme and swatch, you can immediately see the applied styles in the Result View.

* **Snippets and Scaffolders**&mdash;it allows you to add predefined component snippets or scaffold some components defining your desired configuration. [Read more about Snippets and Scaffolders...](slug:blazor-repl-snippets-scaffolders)

* **Startup Config**&mdash;the config icon at the bottom of the Sidebar opens the `Startup.cs` file of the project. You can configure services or other settings there.

## Editor

The Editor allows you to type, paste, and edit your code. It always contains a `_Main.razor` file and you can also add other files to the project via the **+** button.

The newly added files can be `.razor` (pages, components) or `.cs` (models, code-behind files, services, etc.). All files of type `.razor` must start with a capital letter.

## Result View

Once you click the Run button, the actual result of your code will be rendered in the Result View of the Telerik REPL for Blazor. To successfully run the code you need to make sure that no errors are thrown (if any, they will be listed in the [Error List](#error-list)).

## Error List

Telerik REPL for Blazor provides an Error List that displays details for the compile time errors and warnings. It can be expanded/collapsed via arrow buttons.

The Error list is located at the bottom of the [Editor](#editor).

## See Also

* [User Snippets in Telerik REPL for Blazor](slug:blazor-repl-user-snippets)
* [Predefined Snippets and Scaffolders in Telerik REPL for Blazor](slug:blazor-repl-snippets-scaffolders)
* [Integration of Telerik REPL for Blazor with VS and VS Code](slug:blazor-repl-integration)