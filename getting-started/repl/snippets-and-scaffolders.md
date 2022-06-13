---
title: Snippets and Scaffolders
page_title: Snippets and Scaffolders in Telerik REPL for Blazor
description: Explore how to use the available Snippets and Scaffolders in Telerik REPL for Blazor
slug: blazor-repl-snippets-scaffolders
tags: telerik,blazor,repl,snippets,scaffolders
published: True
position: 5
---

# Telerik REPL for Blazor Snippets and Scaffolders

Telerik REPL for Blazor supports the following features for increased developer productivity:

* [Snippets](#snippets)
* [Scaffolders](#scaffolders)

## Snippets

Telerik REPL for Blazor provides a list of predefined code snippets for fast UI component reference and configuration.

The basic snippets are listed in the `Snippets and Scaffolders` section of the REPL Sidebar. You can browse to find the desired snippet or search for it in the integrated search box.

A complete list of the snippets for a specific component will be displayed in a popup once you start typing the component name in the editor.

REPL for Blazor allows you to add the snippets in several ways:

### Add button

There is a `+` button next to each snippet in the `Snippets and Scaffolders` menu. Clicking it will automatically add the snippet at the current cursor position in the REPL editor. Then you can additionally configure the component and add the code block for the `C#` part.

### Drag the component

You can drag the component name from the `Snippets and Scaffolders` menu to directly add its basic snippet into the REPL editor. The snippet will be inserted at the current cursor position. Then you can additionally configure the component and add the code block for the `C#` part.

### Type in the editor

While typing a component name in the editor, you will see a list of suggestions including all available snippets for the specific component. To add the snippet:

* Navigate through the list to select the desired snippet and press `Enter` or `Tab`. 
* Single click on the desired snippet in the list.


## Scaffolders

Telerik REPL for Blazor provides scaffolders for a variety of components. They allow you to setup the component parameters through an UI and quickly add the component in the REPL editor.

To use the scaffolders:

1. Open the `Snippets and Scaffolders` menu in the REPL for Blazor Sidebar.
1. Scroll to the desired component or look for it through the search box.
1. Click the `Settings` button to open the configuration options.
1. Define your desired configuration.
1. Click the `Scaffold` button to add the scaffolder to the editor.


Telerik REPL for Blazor allows using one scaffolder at a time. By defaut, the scaffolder will always be added to the `__Main.razor` file as this is the entry `@page` of the application. When you scaffold a component, it will override the current code in the `__Main.razor` file.
