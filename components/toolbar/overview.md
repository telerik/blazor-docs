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
2. Use child tags to add [tools]({%slug toolbar-built-in-tools%}) such as `<ToolBarButton>` or `<ToolBarToggleButton>`. Set button text as child content. Optionally, set [`Icon`]({%slug general-information/font-icons%}#icons-list).
3. Define `OnClick` handlers for the buttons.
4. Set the `Selected` parameter of the toggle buttons. It supports two-way binding.
5. (optional) Place related buttons in a `<ToolBarButtonGroup>` to display them together.

>caption Basic Telerik Toolbar

````CSHTML
<TelerikToolBar>
    <ToolBarButtonGroup>
        <ToolBarButton Icon="bold" OnClick="@OnBold">Bold</ToolBarButton>
        <ToolBarButton Icon="italic" OnClick="@OnItalic">Italic</ToolBarButton>
    </ToolBarButtonGroup>

    <ToolBarToggleButton @bind-Selected="@Selected">Toggle Button</ToolBarToggleButton>

    <ToolBarButton Icon="undo" OnClick="@OnUndo">Undo</ToolBarButton>
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

The ToolBar component can include built-in tools such as buttons, toggle buttons and button groups. [Read more about the Blazor ToolBar built-in tools]({%slug toolbar-built-in-tools%}).

## Separators

The Toolbar features separators and spacers that can visually divide the component items. [Read more about the Blazor ToolBar separators and spacers.]({%slug toolbar-separators%}).

## Custom Items

The ToolBar component supports template items. Use them to create complex toolbars with dropdowns, inputs and other custom content. [Read more about Blazor ToolBar item customization]({%slug toolbar-templated-item%}).

## Events

The Blazor ToolBar fires click and selection events. Handle those events to respond to user actions. [Read more about the Blazor ToolBar events]({%slug toolbar-events%}).

## ToolBar Parameters

The Blazor ToolBar provides parameters to configure the component:

<style>
    article style + table {
        table-layout: auto;
        word-break: normal;
    }
</style>

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `Adaptive ` | `bool` | Toggles the overflow popup of the toolbar. Consistent with the chosen name for the pager. |
| `Class` | `string` | The CSS class to be rendered on the main wrapping element of the ToolBar component, which is `<div class="k-toolbar">`. Use for [styling customizations]({%slug themes-override%}). |

## Example

The Blazor Toolbar has an option for adaptiveness. This option allows you to hide the items overflowing in a popup.

>We do **not** recommend using `ToolBarTemplateItem` with the responsive overflow popup as there is a high chance of breaking the popup. 

>caption Responsive Overflow Popup

````CSHTML
<div class="toolbar-wrapper">    
    <TelerikToolBar Adaptive="@ToolBarAdaptive">
        <ToolBarButton Icon="undo">Undo</ToolBarButton>
        <ToolBarButton Icon="redo">Redo</ToolBarButton>
        <ToolBarButton Icon="image" Overflow="ToolBarItemOverflow.Always">Image</ToolBarButton>
        <ToolBarSeparator></ToolBarSeparator>
        <ToolBarToggleButton Icon="apply-format"></ToolBarToggleButton>
        <ToolBarSeparator></ToolBarSeparator>
        <ToolBarButton Icon="copy" Overflow="ToolBarItemOverflow.Never">Copy</ToolBarButton>
        <ToolBarButton Icon="paste" Overflow="ToolBarItemOverflow.Never">Paste</ToolBarButton>
        <ToolBarSeparator></ToolBarSeparator>
    <ToolBarButtonGroup SelectionMode="@ButtonGroupSelectionMode.Single">
        <ToolBarToggleButton Icon="align-left" OverflowText="Left"></ToolBarToggleButton>
        <ToolBarToggleButton Icon="align-center" OverflowText="Center"></ToolBarToggleButton>
        <ToolBarToggleButton Icon="align-right" OverflowText="Right"></ToolBarToggleButton>
    </ToolBarButtonGroup>
    </TelerikToolBar>
</div>

@code {
    public double Width { get; set; } = 100;
    public bool ToolBarAdaptive { get; set; } = true;
}

<style>
    .toolbar-wrapper{
        width: @(Width.ToString() + "%");
    }

    .toolbar-slider {
        padding: 0px 16px;
    }
</style>
````

## Next Steps

* [Explore the ToolBar built-in tools]({%slug toolbar-built-in-tools%})
* [Handle the ToolBar Events]({%slug toolbar-events%})
* [Use the ToolBar Separators]({%slug toolbar-separators%})
* [Implement custom ToolBar tools]({%slug toolbar-built-in-tools%})

## See Also

* [Live ToolBar Demos](https://demos.telerik.com/blazor-ui/toolbar/overview)
* [ToolBar API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.ToolBarToolsFactory)
