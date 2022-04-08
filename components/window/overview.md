---
title: Overview
page_title: Window Overview
description: Overview of the Window for Blazor.
slug: components/window/overview
tags: telerik,blazor,window,overview
published: True
position: 0
---

# Blazor Window Overview

This article provides basic information about the <a href="https://www.telerik.com/blazor-ui/window" target="_blank">Blazor Window component</a> and its core features.

The Window component displays a popup window which shows users custom content. The component provides both custom and predefined actions, custom style, position and work as a modal window.

#### In this article:

* [How to Create a Window](#create-a-window)
* [Responsiveness](#responsiveness)
* [Parameters](#window-parameters)
* [Show and Close](#show-and-close)
* [Styling](#styling)
* [Important Notes](#important-notes)

## Creating Blazor Window

1. Use the `TelerikWindow` tag.
1. Set the `Visible` parameter to a `bool` property.
1. Add content to the `WindowContent` child tag.
1. (optional) Add some title inside a `WindowTitle` tag. HTML markup and child components are supported too.
1. (optional) Add the predefined [actions]({%slug components/window/actions%}) inside a `<WindowActions>` tag.

>caption Basic Blazor Window

````CSHTML
<TelerikWindow @bind-Visible="@WindowIsVisible">
    <WindowTitle>
        Window Title
    </WindowTitle>
    <WindowContent>
        Window Content ...
    </WindowContent>
    <WindowActions>
        <WindowAction Name="Close" />
    </WindowActions>
</TelerikWindow>

<TelerikButton OnClick="@( () => WindowIsVisible = !WindowIsVisible )">Toggle window</TelerikButton>

@code {
    bool WindowIsVisible { get; set; }
}
````

## Responsiveness

The Window component can be fully responsive when the browser window size changes. Here is an [example that shows how to use the `Width` and `Height` parameters of the Window or through a separate CSS file.]({%slug window-kb-responsive%})


## Window Parameters

<style>
    article style + table {
        table-layout: auto;
        word-break: normal;
    }
</style>

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Class` | `string` | Renders a custom CSS class to the `<div class="k-window">` element. Use it to [override theme styles]({%slug themes-override%}). |
| `PersistContent` | `bool` | Defines if the Window content should be hidden with CSS when the Window is minimized. By default, the content is removed from the DOM. |
| `Resizable` | `bool`<br />(`true`) | Defines if the Window should be resizable by the user. |
| `Visible` | `bool` | Defines if the Window is rendered on the page. |


## Show and Close

The `Visible` property lets you control whether the window component is shown (and rendered).

>caption Bind the visibility of the window

````CSHTML
@*Use property binding to control the state of the window programmatically*@

<button @onclick="ShowWindow">Show the Window</button>
<button @onclick="CloseWindow">Close the Window</button>

<TelerikWindow PersistContent="true" @bind-Visible="@isVisible">
    <WindowTitle>
        <strong>The Title</strong>
    </WindowTitle>
    <WindowContent>
        This is my window <strong>popup</strong> content.
    </WindowContent>
    <WindowActions>
        <WindowAction Name="Minimize"></WindowAction>
        <WindowAction Name="Maximize"></WindowAction>
        <WindowAction Name="Close"></WindowAction>
    </WindowActions>
</TelerikWindow>

@code {
    bool isVisible { get; set; }

    public void ShowWindow()
    {
        isVisible = true;
    }

    public void CloseWindow()
    {
        isVisible = false;
    }
}
````

## Styling

The `Class` property lets you define a CSS class that will be rendered on the popup element so you can cascade through it in order to change the appearane of both the content, and the built-in elements of the Window.

>caption Use a Class to change the appearance and style of the Window

````CSHTML
@* Use CSS selectors with high specifity to customize the looks of the window *@

<TelerikWindow Class="MyClass" Visible="true">
    <WindowTitle>
        <strong>The Title</strong>
    </WindowTitle>
    <WindowContent>
        This is my window <strong>popup</strong> content.
    </WindowContent>
</TelerikWindow>

<style>
    div.k-window.MyClass { /* targets the entire popup element */
        border: 5px solid red;
    }

        .MyClass .k-window-content.k-content.k-dialog-content { /* targets the content element */
            background: yellow;
        }

        .MyClass .k-window-title.k-dialog-title { /* targets the title container */
            color: blue;
        }

    .MyClass .k-dialog-titlebar.k-header.k-window-titlebar { /* targets the entire titlebar */
        background: gold;
    }
</style>
````

>caption The result from the code snippet above

![](images/window-custom-styling.png)

## Important Notes

The Telerik Window component renders as a child of the `TelerikRootComponent` at the root of your app. This is required so it can show up and have correct positions without being affected and broken by parent elements and their CSS rules.

In Blazor, however, the render tree structure may be important in some cases and the fact that the Window renders its contents in a different place may put you in one of the following situations:

* [Returning data from a window does not update the parent]({%slug window-does-not-update-parent%})
* [CascadingParameter Value is null in Window]({%slug window-cascading-parameter-null%})
* [Using an EditContext for a form holding a window requires updating the EditContext]({%slug window-in-form-edit-context%})
* [Block all content with a Window]({%slug window-kb-block-all-content%})

## See Also

* [Live Demos: Window](https://demos.telerik.com/blazor-ui/window/index)
* [Window Size, Maximize, Minimize]({%slug components/window/size%})
* [Window Actions]({%slug components/window/actions%})
* [Window Events]({%slug window-events%})
* [Window Position]({%slug components/window/position%})
* [Modal Window]({%slug components/window/modal%})
