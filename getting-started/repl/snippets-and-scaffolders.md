---
title: Predefined Editor Snippets and Scaffolders
page_title: Predefined Editor Snippets and Scaffolders in Telerik REPL for Blazor
description: Explore how to use the available predefined editor Snippets and Scaffolders in Telerik REPL for Blazor
slug: blazor-repl-snippets-scaffolders
tags: telerik,blazor,repl,snippets,scaffolders
published: True
position: 5
---

# Predefined Editor Snippets and Scaffolders in Telerik REPL for Blazor

Telerik REPL for Blazor provides code snippets and scaffolders to increase your productivity. They enable you to quickly add and configure a selection of UI components in the REPL UI.

In this article:

* [Snippets](#snippets)
* [Scaffolders](#scaffolders)

## Snippets

Telerik REPL for Blazor provides a list of predefined code snippets for fast UI component reference and configuration.

The basic snippets are listed in the `Snippets and Scaffolders` section of the REPL Sidebar. You can browse to find the desired snippet or search for it in the integrated search box.

A complete list of the snippets for a specific component will be displayed in a popup once you start typing the component name in the editor.

REPL for Blazor allows you to add the snippets through the [**+** button](#add-button), by [dragging the selected component](#dragging-the-component), or [typing in the editor](#typing-in-the-editor).

### Add Button

To add a component in the REPL editor, use the `+` button next to each snippet in the **Snippets and Scaffolders** menu. Clicking it adds the snippet at the current cursor position in the REPL editor. Then you can configure the component and add the code block for the `C#` part.

### Dragging the Component

To directly insert a basic snippet with the desired component into the REPL editor, drag the component name from the **Snippets and Scaffolders** menu. The snippet will be inserted at the current cursor position. Then you can configure the component and add the code block for the `C#` part.

### Typing in the Editor

While typing a component name in the editor, you will see a list of suggestions including all available snippets for the specific component. To add the snippet:

1. Navigate through the list to select the desired snippet and press `Enter` or `Tab`. 
1. Select the desired snippet from the list.


## Scaffolders

Telerik REPL for Blazor provides scaffolders for a variety of components. They allow you to setup the component parameters through an UI and quickly add the component in the REPL editor.

To use the scaffolders:

1. Open the `Snippets and Scaffolders` menu in the REPL for Blazor Sidebar.
1. Scroll to the desired component or look for it through the search box.
1. Click the `Settings` button to open the configuration options.
1. Define your desired configuration.
1. Click the `Scaffold` button to add the scaffolder to the editor.


Telerik REPL for Blazor allows using one scaffolder at a time. By default, the scaffolder will always be added to the `__Main.razor` file as this is the entry `@page` of the application. When you scaffold a component, it will override the current code in the `__Main.razor` file.

## See Also

* [User Snippets in Telerik REPL for Blazor](slug:blazor-repl-user-snippets)
* [Integration of Telerik REPL for Blazor with VS and VS Code](slug:blazor-repl-integration)