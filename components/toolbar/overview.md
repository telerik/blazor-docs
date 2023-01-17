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
        <ToolBarButton Icon=FontIcon.Bold OnClick="@OnBold">Bold</ToolBarButton>
        <ToolBarButton Icon=FontIcon.Italic OnClick="@OnItalic">Italic</ToolBarButton>
    </ToolBarButtonGroup>

    <ToolBarToggleButton @bind-Selected="@Selected">Toggle Button</ToolBarToggleButton>

    <ToolBarButton Icon=FontIcon.Undo OnClick="@OnUndo">Undo</ToolBarButton>
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

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `Adaptive ` | `bool` <br /> (`true`) | Toggles the overflow popup of the toolbar. Displays an additional anchor on the right of the toolbar, where it places all items which overflow from the toolbar. |
| `Class` | `string` | The CSS class to be rendered on the main wrapping element of the ToolBar component, which is `<div class="k-toolbar">`. Use for [styling customizations]({%slug themes-override%}). |

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor ToolBar:

| Parameter | Type | Description |
| --- | --- | --- |
| `Size` | `Telerik.Blazor.ThemeConstants.ToolBar.Size` | Adjust the size of the ToolBar |

You can find more information for customizing the ToolBar appearance in the [Appearance article]({%slug toolbar-appearance%}).

## Example

The Blazor Toolbar has an option for adaptiveness. This option allows you to hide the items overflowing in a popup.

>When using `ToolBarTemplateItem` with the responsive overflow popup, the template inherits automatically `Overflow` - `ToolBarItemOverflow.Never` behavior.

>caption Responsive Overflow Popup

````CSHTML
<TelerikButton OnClick="ChangeWidth">Change Width!</TelerikButton>

<br />
<br />

<div class="toolbar-wrapper">    
    <TelerikToolBar Adaptive="@ToolBarAdaptive">
        <ToolBarButton Icon=FontIcon.Undo>Undo</ToolBarButton>
        <ToolBarButton Icon=FontIcon.Redo>Redo</ToolBarButton>
        <ToolBarButton Icon=FontIcon.Image Overflow="ToolBarItemOverflow.Always">Image</ToolBarButton>
        <ToolBarSeparator></ToolBarSeparator>
        <ToolBarToggleButton Icon=FontIcon.ApplyFormat></ToolBarToggleButton>
        <ToolBarSeparator></ToolBarSeparator>
        <ToolBarButton Icon=FontIcon.Copy Overflow="ToolBarItemOverflow.Never">Copy</ToolBarButton>
        <ToolBarButton Icon="paste" Overflow="ToolBarItemOverflow.Never">Paste</ToolBarButton>
        <ToolBarSeparator></ToolBarSeparator>
    <ToolBarButtonGroup SelectionMode="@ButtonGroupSelectionMode.Single">
        <ToolBarToggleButton Icon=FontIcon.AlignLeft OverflowText="Left"></ToolBarToggleButton>
        <ToolBarToggleButton Icon=FontIcon.AlignCenter OverflowText="Center"></ToolBarToggleButton>
        <ToolBarToggleButton Icon=FontIcon.AlignRight OverflowText="Right"></ToolBarToggleButton>
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

* [Explore the ToolBar built-in tools]({%slug toolbar-built-in-tools%})
* [Handle the ToolBar Events]({%slug toolbar-events%})
* [Use the ToolBar Separators]({%slug toolbar-separators%})
* [Implement custom ToolBar tools]({%slug toolbar-built-in-tools%})

## See Also

* [Live ToolBar Demos](https://demos.telerik.com/blazor-ui/toolbar/overview)
* [ToolBar API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.ToolBarToolsFactory)
