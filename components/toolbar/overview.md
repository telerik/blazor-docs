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

1. Add the `<TelerikToolBar>` tag to add the component to your razor page.

1. Populate it with [Built-In Tools]({%slug toolbar-built-in-tools%}) or [Custom Tools]({%slug toolbar-templated-item%}).

1. Handle their respective events so your application can respond to the user actions.

>caption Basic Telerik Toolbar.

````CSHTML
@*Add a basic Telerik ToolBar to your page with a few built-in buttons.*@

<TelerikToolBar>
    <ToolBarButtonGroup>
        <ToolBarButton Icon="bold" OnClick="@OnBold">Bold</ToolBarButton>
        <ToolBarButton Icon="italic" OnClick="@OnItalic">Italic</ToolBarButton>
        <ToolBarButton Icon="underline" OnClick="@OnUnderline">Underline</ToolBarButton>
    </ToolBarButtonGroup>

    <ToolBarToggleButton @bind-Selected="@Selected">Toggle Button</ToolBarToggleButton>

    <ToolBarButton Icon="undo">Undo</ToolBarButton>
</TelerikToolBar>

<br />

@Result

@code {
    public bool Selected { get; set; } = true;

    public string Result { get; set; }

    public void OnBold()
    {
        Result = "The user clicked on the bold button";
    }

    public void OnItalic()
    {
        Result = "The user clicked on the italic button";
    }

    public void OnUnderline()
    {
        Result = "The user clicked on the underline button";
    }
}
````

## Built-in Tools

The ToolBar component allows you to use built-in buttons and button groups or add a custom tool. [Read more about the Blazor ToolBar built-in tools]({%slug toolbar-built-in-tools%}).

## Separators

You can visually separate the items in the ToolBar. [Read more about the supported Blazor ToolBar separators]({%slug toolbar-separators%}).

## Custom Items

The ToolBar component allows you to add a custom element. You can use that item to add complex toolbars to your application, which have dropdowns, inputs and other components. [Read more about the Blazor ToolBar item customization]({%slug toolbar-templated-item%}).

## Events

The Blazor ToolBar generates events that you can handle and further customize its behavior. [Read more about the Blazor ToolBar events]({%slug toolbar-events%}).

## Parameters

The Blazor ToolBar provides various parameters that allow you to configure the component:

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `Class` | `string` | The CSS class that will be rendered on the main wrapping element of the ToolBar component. You could use that class to control the size of the component through CSS. |
| `ToolBarButton` | `RenderFragment` | Renders a button in the ToolBar. You can find more information and examples in the [Built-In Tools]({%slug toolbar-built-in-tools%}#toolbarbutton) article. |
| `ToolBarToggleButton` | `RenderFragment` | Renders a toggle button in the ToolBar. You can find more information and examples in the [Built-In Tools]({%slug toolbar-built-in-tools%}#toolbartogglebutton) article. |
| `ToolBarButtonGroup` | `RenderFragment` | Creates a group of buttons in the component. You can find more information and examples in the [Built-In Tools]({%slug toolbar-built-in-tools%}#toolbarbuttongroup) article. |
| `ToolBarTemplateItem` | `RenderFragment` | Allows you to create a custom item for the ToolBar. You can read more about this in the [Templated Item]({%slug toolbar-templated-item%}) article. |
| `ToolBarSeparator` | `RenderFragment` | Adds a line that separates items in the ToolBar. You can find more information in the [Separators]({%slug toolbar-separators%}) article. |
| `ToolBarSpacer` | `RenderFragment` | Adds empty space that separates the items into different groups. You can find more information in the [Separators]({%slug toolbar-separators%}) article. |

## ToolBar Reference

>caption Components namespace and reference.

````CSHTML
@*Component namespace and reference*@

<TelerikToolBar @ref="@ToolbarReference">
    <ToolBarToggleButton @bind-Selected="@Selected">Toggle Button</ToolBarToggleButton>

    <ToolBarButton Icon="undo">Undo</ToolBarButton>
</TelerikToolBar>

@code {
    public Telerik.Blazor.Components.TelerikToolBar ToolbarReference { get; set; }

    public bool Selected { get; set; } = true;
}
````

## Next Steps

[Explore the ToolBar Built-in Tools]({%slug toolbar-built-in-tools%})

[Explore the ToolBar Separators]({%slug toolbar-separators%})

[Explore the ToolBar Events]({%slug toolbar-events%})

## See Also

* [Live Demo: ToolBar Overview](https://demos.telerik.com/blazor-ui/toolbar/overview)
* [Live Demo: ToolBar Tools](https://demos.telerik.com/blazor-ui/toolbar/tools)
