---
title: Overview
page_title: ToolBar Overview
description: Overview of the ToolBar component for Blazor.
slug: toolbar-overview
tags: telerik,blazor,toolbar,tools,buttoncontainer
published: True
position: 0
---

# Blazor ToolBar Overview

The <a href = "https://www.telerik.com/blazor-ui/toolbar" target="_blank">Blazor ToolBar component</a> is a container for buttons or other application-specific tools. This article explains the available features.

## Creating Blazor ToolBar

1. Add the `<TelerikToolBar>` tag to a Razor file.
2. Use child tags to add [tools](slug://toolbar-built-in-tools) such as `<ToolBarButton>` or `<ToolBarToggleButton>`. Set button text as child content. Optionally, set [`Icon`](slug://common-features-icons#icons-list).
3. Define `OnClick` handlers for the buttons.
4. Set the `Selected` parameter of the toggle buttons. It supports two-way binding.
5. (optional) Place related buttons in a `<ToolBarButtonGroup>` to display them together.

>caption Basic Telerik Toolbar

````RAZOR
<TelerikToolBar>
    <ToolBarButtonGroup>
        <ToolBarButton Icon="@SvgIcon.Bold" OnClick="@OnBold">Bold</ToolBarButton>
        <ToolBarButton Icon="@SvgIcon.Italic" OnClick="@OnItalic">Italic</ToolBarButton>
    </ToolBarButtonGroup>

    <ToolBarToggleButton @bind-Selected="@Selected">Toggle Button</ToolBarToggleButton>

    <ToolBarButton Icon="@SvgIcon.Undo" OnClick="@OnUndo">Undo</ToolBarButton>
</TelerikToolBar>

<p> Last clicked button: @LastClicked </p>
<p> The Toggle button's selected state is @Selected.ToString() </p>

@code {
    bool Selected { get; set; } = true;
    string LastClicked { get; set; }

    void OnBold()
    {
        LastClicked = "Bold";
    }

    void OnItalic()
    {
        LastClicked = "Italic";
    }

    void OnUndo()
    {
        LastClicked = "Undo";
    }
}
````

## Built-in Tools

The ToolBar component can include built-in tools such as buttons, toggle buttons and button groups. [Read more about the Blazor ToolBar built-in tools](slug://toolbar-built-in-tools).

## Separators

The Toolbar features separators and spacers that can visually divide the component items. [Read more about the Blazor ToolBar separators and spacers.](slug://toolbar-separators).

## Custom Items

The ToolBar component supports template items. Use them to create complex toolbars with dropdowns, inputs and other custom content. [Read more about Blazor ToolBar item customization](slug://toolbar-templated-item).

## Events

The Blazor ToolBar fires click and selection events. Handle those events to respond to user actions. [Read more about the Blazor ToolBar events](slug://toolbar-events).

## ToolBar Parameters

The Blazor ToolBar provides parameters to configure the component:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `Adaptive` <br /> (deprecated) | `bool` <br /> (`true`) | Toggles the overflow popup of the ToolBar. The component displays an additional anchor on its side, where it places all items which do not fit and overflow. [Template items](slug://toolbar-templated-item#notes) don't participate in this mechanism and they are always rendered in the ToolBar itself. This parameter is deprecated in favor of `OverflowMode`. |
| `Class` | `string` | The CSS class to be rendered on the main wrapping element of the ToolBar component, which is `<div class="k-toolbar">`. Use for [styling customizations](slug://themes-override). |
| `OverflowMode` | `ToolBarOverflowMode` <br /> (`Menu`) | The adaptive mode of the Toolbar. |

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor ToolBar:

| Parameter | Type | Description |
| --- | --- | --- |
| `Size` | `Telerik.Blazor.ThemeConstants.ToolBar.Size` | Adjust the size of the ToolBar |

You can find more information for customizing the ToolBar appearance in the [Appearance article](slug://toolbar-appearance).

## Example

The Blazor Toolbar has an option for adaptiveness. This option allows you to hide the items overflowing in a popup.

>When using `ToolBarTemplateItem` with the responsive overflow popup, the template inherits automatically `Overflow` - `ToolBarItemOverflow.Never` behavior.

>caption Responsive Overflow Popup

````RAZOR
<TelerikButton OnClick="ChangeWidth">Change Width!</TelerikButton>

<br />
<br />

<div class="toolbar-wrapper">    
    <TelerikToolBar Adaptive="@ToolBarAdaptive">
        <ToolBarButton Icon="@SvgIcon.Undo">Undo</ToolBarButton>
        <ToolBarButton Icon="@SvgIcon.Redo">Redo</ToolBarButton>
        <ToolBarButton Icon="@SvgIcon.Image" Overflow="ToolBarItemOverflow.Always">Image</ToolBarButton>
        <ToolBarSeparator></ToolBarSeparator>
        <ToolBarToggleButton Icon="@SvgIcon.ApplyFormat"></ToolBarToggleButton>
        <ToolBarSeparator></ToolBarSeparator>
        <ToolBarButton Icon="@SvgIcon.Copy" Overflow="ToolBarItemOverflow.Never">Copy</ToolBarButton>
        <ToolBarButton Icon="@SvgIcon.Clipboard" Overflow="ToolBarItemOverflow.Never">Paste</ToolBarButton>
        <ToolBarSeparator></ToolBarSeparator>
    <ToolBarButtonGroup SelectionMode="@ButtonGroupSelectionMode.Single">
        <ToolBarToggleButton Icon="@SvgIcon.AlignLeft" OverflowText="Left"></ToolBarToggleButton>
        <ToolBarToggleButton Icon="@SvgIcon.AlignCenter" OverflowText="Center"></ToolBarToggleButton>
        <ToolBarToggleButton Icon="@SvgIcon.AlignRight" OverflowText="Right"></ToolBarToggleButton>
    </ToolBarButtonGroup>
    </TelerikToolBar>
</div>

@code {
    void ChangeWidth()
    {
        Width = 40;
    }

    public double Width { get; set; } = 100;
    public bool ToolBarAdaptive { get; set; } = true;
}

<style>
    .toolbar-wrapper{
        width: @(Width.ToString() + "%");
    }
</style>
````

## Next Steps

* [Explore the ToolBar built-in tools](slug://toolbar-built-in-tools)
* [Handle the ToolBar Events](slug://toolbar-events)
* [Use the ToolBar Separators](slug://toolbar-separators)
* [Implement custom ToolBar tools](slug://toolbar-built-in-tools)

## See Also

* [Live ToolBar Demos](https://demos.telerik.com/blazor-ui/toolbar/overview)
* [ToolBar API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikToolBar)
