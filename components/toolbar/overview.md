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

The Blazor ToolBar provides parameters and child tags to configure the component:

<style>
    article style + table {
        table-layout: auto;
        word-break: normal;
    }
</style>

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `Class` | `string` | The CSS class to be rendered on the main wrapping element of the ToolBar component, which is `<div class="k-toolbar">`. Use for [styling customizations]({%slug themes-override%}). |

### Child Tags

Child tags define Toolbar tools. All of them are `RenderFragment`s.

<style>
    article style + table {
        table-layout: auto;
        word-break: normal;
    }
</style>

| Tag Name | Description |
| --- | --- |
| `ToolBarButton` | Renders a button in the ToolBar. See [ToolBar Buttons]({%slug toolbar-built-in-tools%}#toolbarbutton) for more information and examples. |
| `ToolBarButtonGroup` | Creates a group of buttons. See [ToolBar ButtonGroup]({%slug toolbar-built-in-tools%}#toolbarbuttongroup). |
| `ToolBarTemplateItem` | Create a custom item. See [Templated Items]({%slug toolbar-templated-item%}). |
| `ToolBarToggleButton` | Renders a toggle button with a selected state. See [Toggle Buttons]({%slug toolbar-built-in-tools%}#toolbartogglebutton). |
| `ToolBarSeparator` | Adds a vertical line that separates items in the ToolBar. Learn more in the [Separators]({%slug toolbar-separators%}) article. |
| `ToolBarSpacer` | Adds [empty space between Toolbar items]({%slug toolbar-separators%}). |

## Next Steps

* [Explore the ToolBar built-in tools]({%slug toolbar-built-in-tools%})
* [Handle the ToolBar Events]({%slug toolbar-events%})
* [Use the ToolBar Separators]({%slug toolbar-separators%})
* [Implement custom ToolBar tools]({%slug toolbar-built-in-tools%})

## See Also

* [Live ToolBar Demos](https://demos.telerik.com/blazor-ui/toolbar/overview)
* [ToolBar API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.ToolBarToolsFactory)
