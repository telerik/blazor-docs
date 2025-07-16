---
title: Display Vertical ToolBar
description: Learn how to display the Telerik ToolBar for Blazor vertically.
type: how-to
page_title: How to Display Vertical ToolBar
slug: toolbar-kb-vertical-orientation-display
tags: telerik, blazor, toolbar
ticketid: 1693045
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>ToolBar for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

This KB answers the following questions:

* How to display the TelerikToolBar vertically?
* How to render the Telerik ToolBar for Blazor with vertical orientation?
* How to arrange the ToolBar buttons one below the other?

## Solution

1. Disable the automatic tool overflowing with `OverflowMode="@ToolBarOverflowMode.None"` or `Adaptive="false"` in older versions.
1. Set a custom CSS class to the ToolBar with the `Class` parameter.
1. Use the custom CSS class to [override the ToolBar CSS styles](slug:themes-override):
    * Set `column` `flex-flow` for the ToolBar and any nested [ButtonGroups](slug:toolbar-built-in-tools#toolbarbuttongroup). See [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) for more information.
    * Reduce the component `width`.
    * Adjust the `border-radius` values of buttons inside nested ButtonGroups.

>caption Configure a vertical Telerik ToolBar for Blazor

````RAZOR
<h4>Block ToolBar</h4>

before

<TelerikToolBar Class="vertical-toolbar" Adaptive="false">
    <ToolBarButtonGroup SelectionMode="@ButtonGroupSelectionMode.Multiple">
        <ToolBarToggleButton Icon="@SvgIcon.Bold" @bind-Selected="@BoldSelected" />
        <ToolBarToggleButton Icon="@SvgIcon.Italic" @bind-Selected="@ItalicSelected" />
        <ToolBarToggleButton Icon="@SvgIcon.Underline" @bind-Selected="@UnderlineSelected" />
    </ToolBarButtonGroup>

    <ToolBarButton Icon="@SvgIcon.Save"></ToolBarButton>
    <ToolBarButton Icon="@SvgIcon.Cancel"></ToolBarButton>
    <ToolBarButton Icon="@SvgIcon.Trash"></ToolBarButton>

    <ToolBarButton Icon="@SvgIcon.Undo"></ToolBarButton>
</TelerikToolBar>

after

<h4>Inline ToolBar</h4>

before

<TelerikToolBar Class="vertical-toolbar inline-toolbar" Adaptive="false">
    <ToolBarButtonGroup SelectionMode="@ButtonGroupSelectionMode.Multiple">
        <ToolBarToggleButton Icon="@SvgIcon.Bold" @bind-Selected="@BoldSelected" />
        <ToolBarToggleButton Icon="@SvgIcon.Italic" @bind-Selected="@ItalicSelected" />
        <ToolBarToggleButton Icon="@SvgIcon.Underline" @bind-Selected="@UnderlineSelected" />
    </ToolBarButtonGroup>

    <ToolBarButton Icon="@SvgIcon.Save"></ToolBarButton>
    <ToolBarButton Icon="@SvgIcon.Cancel"></ToolBarButton>
    <ToolBarButton Icon="@SvgIcon.Trash"></ToolBarButton>

    <ToolBarButton Icon="@SvgIcon.Undo"></ToolBarButton>
</TelerikToolBar>

after

<style>

    /* Optional inline display */

    .vertical-toolbar.inline-toolbar {
        display: inline-flex;
    }

    /* Apply vertical orientation */
    .vertical-toolbar,
    .vertical-toolbar .k-button-group {
        flex-flow: column wrap;
    }

    /* Reduce width */
    .vertical-toolbar {
        width: min-content;
    }

        /* Remove unnecessary empty space at the top */
        .vertical-toolbar::before {
            content: none;
        }

        /* Adjust rounded corners in Button Groups */
        .vertical-toolbar .k-button-group > .k-button:first-child {
            border-start-end-radius: 4px;
            border-end-start-radius: 0;
        }

        .vertical-toolbar .k-button-group > .k-button:last-child {
            border-start-end-radius: 0;
            border-end-start-radius: 4px;
        }

        .vertical-toolbar .k-button-group > .k-button + .k-button {
            margin-inline-start: 0;
            margin-block-start: -1px;
        }
</style>

@code {
    private bool BoldSelected { get; set; }
    private bool ItalicSelected { get; set; }
    private bool UnderlineSelected { get; set; }
}
````

## See Also

* [ToolBar Overview](slug:toolbar-overview)
