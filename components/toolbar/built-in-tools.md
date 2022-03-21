---
title: Built-in Tools
page_title: ToolBar - Built-in Tools
description: Built-in Tools in the Telerik ToolBar for Blazor
slug: toolbar-built-in-tools
tags: telerik,blazor,toolbar,builtin,tools,button,buttons
published: True
position: 1
---

# Built-in Tools

The Telerik ToolBar for Blazor allows you to use built-in buttons and button groups or to add a [custom tool]({%slug toolbar-templated-item%}). The available built-in tools are:

* [ToolBarButton](#toolbarbutton)
* [ToolBarToggleButton](#toolbartogglebutton)
* [ToolbarButtonGroup](#toolbarbuttongroup)

## ToolBarButton

A toolbar button is a plain button that you can click and it raises an event so the application can respond to that.

You can add multiple buttons to the Telerik Toolbar. To do that you should add the `<ToolBarButton>` to the `<TelerikToolBar>`.

### ToolBarButton parameters

The nested `ToolBarButton` tag exposes parameters that allow you to customize the buttons:

<style>
    article style + table {
        table-layout: auto;
        word-break: normal;
    }
</style>
| Parameter | Type and Default Value | Description |
| ----------- | ----------- | ----------- |
| `Enabled` | `bool` <br /> `true` | Specifies if the button is clickable. |
| `Visible` | `bool` <br /> `true` | Specifies if the button will be visible in the toolbar. |
| `Title` | `string` | Maps to the `title` HTML attribute for the `<button>`. |
| `Class` | `string` | The CSS class that will be rendered on the main wrapping element of the ToolbarButton. You could use that class to cascade styles. |
| `Icon` | `string` | Adds a font icon to the button. You can find more information on adding a font icon to a Telerik Component in [Telerik Font Icons article]({%slug general-information/font-icons%}#icon-in-telerik-component). |
| `ImageURL` | `string` | Adds an image to the button. You can provide an image url to this parameter. |
| `SpriteClass` | `string` | Add a sprite class image to the button. Set this attribute to `k-icon MySpriteClass` where `MySpriteClass` defines the CSS rules for the sprite. |
| `IconClass` | `string` | Allows you to set a CSS class that provides the required font name, font size and content for the `::before` pseudo-element. |

>caption The Telerik ToolBar with ToolBarButtons

![](images/toolbar-toolbarbutton-example.png)

````CSHTML
@*This example shows the TelerikToolBar with ToolBarButtons and their features*@

<TelerikToolBar>
    <ToolBarButton Icon="bold" Class="myBoldButton" Enabled="@true" Visible="true" Title="Bold Button" OnClick="@OnBold">Bold</ToolBarButton>
    <ToolBarButton Icon="italic" Class="myItalicButton" Enabled="@false" Visible="true" Title="Italic Button" OnClick="@OnItalic">Italic</ToolBarButton>
    <ToolBarButton Icon="underline" Class="myUnderlineButton" Enabled="@true" Visible="true" Title="Underline Button" OnClick="@OnUnderline">Underline</ToolBarButton>
</TelerikToolBar>

@code {
    public void OnBold()
    {
        Console.WriteLine("The user clicked on the bold button");
    }

    public void OnItalic()
    {
        Console.WriteLine("The user clicked on the italic button");
    }

    public void OnUnderline()
    {
        Console.WriteLine("The user clicked on the underline button");
    }
}
````

## ToolBarToggleButton

A toolbar toggle button has two states - normal and selected - and clicking it can toggle between them through two-way binding or an event.

You can add multiple toggle  buttons to the Telerik Toolbar. To do that you should add the `<ToolBarToggleButton>` to the `<TelerikToolBar>`.

### ToolBarToggleButton parameters

The nested `ToolBarToggleButton` tag exposes parameters that allow you to customize the buttons:

<style>
    article style + table {
        table-layout: auto;
        word-break: normal;
    }
</style>
| Parameter | Type and Default Value | Description |
| ----------- | ----------- | ----------- |
| `Selected` | `bool` | Specifies whether the button is in selected state. You can use it with one and two-way data binding with the `SelectedChanged` event. For more information on how to handle the `SelectedChanged` event see the [Events]({%slug toolbar-events%}) article. |
| `Enabled` | `bool` <br /> `true` | Specifies if the button is clickable. |
| `Visible` | `bool` <br /> `true` | Specifies if the button will be visible in the toolbar. |
| `Title` | `string` | Maps to the `title` HTML attribute for the `<button>`. |
| `Class` | `string` | The CSS class that will be rendered on the main wrapping element of the ToolbarButton. You could use that class to cascade styles. |
| `Icon` | `string` | Adds a font icon to the button. You can find more information on adding a font icon to a Telerik Component in [Telerik Font Icons article]({%slug general-information/font-icons%}#icon-in-telerik-component). |
| `ImageURL` | `string` | Adds an image to the button. You can provide an image url to this parameter. |
| `SpriteClass` | `string` | Add a sprite class image to the button. Set this attribute to `k-icon MySpriteClass` where `MySpriteClass` defines the CSS rules for the sprite. |
| `IconClass` | `string` | Allows you to set a CSS class that provides the required font name, font size and content for the `::before` pseudo-element. |

>caption The Telerik ToolBar with ToolBarToggleButtons

![](images/toolbar-togglebutton-example.png)

````CSHTML
@*This example shows the TelerikToolBar with ToolBarToggleButton and its available features*@

<TelerikToolBar>
    <ToolBarToggleButton @bind-Selected="@Selected" 
                         Enabled="true" 
                         Class="myToggleFullScreenButton" 
                         Icon="toggle-full-screen-mode" 
                         OnClick="@ToggleFullScreen">
                            Toggle Fullscreen
    </ToolBarToggleButton>
</TelerikToolBar>

@code {
    public bool Selected { get; set; } = true;

    public void ToggleFullScreen()
    {
        if (Selected)
        {
            Console.WriteLine("The user is in full screen");
        }
        else
        {
            Console.WriteLine("The user exited full screen");
        }
    }
}
````

## ToolBarButtonGroup

The button group is a container for one or more buttons that renders them together and spaces them out from the adacent buttons or groups.

You can add one or more group of buttons to the Toolbar. To do that you should add the `<ToolBarButtonGroup>` to the `<TelerikToolBar>`. In the button group you can place either the `ToolBarButton` or the `ToolBarToggleButton`.

### ToolBarButtonGroup parameters

The nested `ToolBarButtonGroup` tag exposes parameters that allow you to customize the buttons:

<style>
    article style + table {
        table-layout: auto;
        word-break: normal;
    }
</style>
| Parameter | Type and Default Value | Description |
| ----------- | ----------- | ----------- |
| `Visible` | `bool` <br /> `true` | Specifies if the group will be visible in the toolbar. |
| `SelectionMode` | `ButtonGroupSelectionMode` enum <br /> `Single` | Specifies whether you can select one or multiple buttons from the group at the same time (applicable for `ToolBarToggleButton` instances inside it). |
| `Enabled` | `bool` <br /> `true` | Specifies if the group is clickable. |
| `Class` | `string` | The CSS class that will be rendered on the main wrapping element of the ToolBarButtonGroup. You could use that class to cascade styles. |
| `Width` | `string` | Allows you to control the width of the group. |

>caption The Telerik ToolBar with grouped buttons

![](images/toolbar-grouped-buttons.png)

````CSHTML
@*This example shows the TelerikToolBar with grouped ToolBarButtons*@

<TelerikToolBar>
    <ToolBarButtonGroup Visible="true" 
                        SelectionMode="@ButtonGroupSelectionMode.Multiple" 
                        Class="formattingButtons" 
                        Enabled="true">
        <ToolBarButton Icon="bold">Bold</ToolBarButton>
        <ToolBarButton Icon="italic">Italic</ToolBarButton>
        <ToolBarButton Icon="underline">Underline</ToolBarButton>
    </ToolBarButtonGroup>
</TelerikToolBar>
````

## See Also

  * [Live Demo: ToolBar Overview](https://demos.telerik.com/blazor-ui/toolbar/overview)
  * [ToolBar Overview]({%slug toolbar-overview%})
