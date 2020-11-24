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

You can add multiple buttons to the Telerik Toolbar. To do that you should add the `<ToolBarButton>` to the `<TelerikToolBar>`. You can customize the buttons using the following features:

* `Enabled` - `bool`, defaults to `true` - specifies if the button is clickable.

* `Visible` - `bool`, defaults to `true` - specifies if the button will be visible in the toolbar.

* `Title` - `string` - maps to the `title` HTML attribute for the `<button>`.

* `Class` - `string` - the CSS class that will be rendered on the main wrapping element of the ToolbarButton. You could use that class to cascade styles.

* `OnClick` - `EventCallback` - allows you to execute an method upon the click of the button.

* `Icon` - `string` - adds a font icon to the button. You can find more information on adding a font icon to a Telerik Component in [Telerik Font Icons article]({%slug general-information/font-icons%}#icon-in-telerik-component).

* `ImageURL` - `string` - adds an image to the button. You can provide an image url to this parameter.

* `SpriteClass` - `string` - add a sprite class image to the button. Set this attribute to `k-icon MySpriteClass` where `MySpriteClass` defines the CSS rules for the sprite.

* `IconClass` - `string` - allows you to set a CSS class that provides the required font name, font size and content for the ::before pseudo-element.

## ToolBarToggleButton

You can add multiple toggle  buttons to the Telerik Toolbar. To do that you should add the `<ToolBarToggleButton>` to the `<TelerikToolBar>`. You can customize the buttons using the following features:

* `Selected` - `bool` - specifies whether the button is in selected state. You can use it with one and two-way data binding with the `SelectedChanged` event.

* `Enabled` - `bool`, defaults to `true` - specifies if the button is clickable.

* `Visible` - `bool`, defaults to `true` - specifies if the button will be visible in the toolbar.

* `Title` - `string` - maps to the `title` HTML attribute for the `<button>`.

* `Class` - `string` - the CSS class that will be rendered on the main wrapping element of the ToolbarButton. You could use that class to cascade styles.

* `OnClick` - `EventCallback` - allows you to execute an method upon the click of the button.

* `Icon` - `string` - adds a font icon to the button. You can find more information on adding a font icon to a Telerik Component in [Telerik Font Icons article]({%slug general-information/font-icons%}#icon-in-telerik-component).

* `ImageURL` - `string` - adds an image to the button. You can provide an image url to this parameter.

* `SpriteClass` - `string` - add a sprite class image to the button. Set this attribute to `k-icon MySpriteClass` where `MySpriteClass` defines the CSS rules for the sprite.

* `IconClass` - `string` - allows you to set a CSS class that provides the required font name, font size and content for the ::before pseudo-element.

## ToolBarButtonGroup

You can add one or more group of buttons to the Toolbar. To do that you should add the `<ToolBarButtonGroup>` to the `<TelerikToolBar>`. In the button group you can place either the `ToolBarButton` or the `ToolBarToggleButton`. You can customize the groups using the following features:

* `Visible` - `bool`, defaults to `true` - specifies if the group will be visible in the toolbar.

* `SelectionMode` - `enum` - specifies whether you can select one or multiple buttons from the group at the same time. It takes a member of the `ButtonGroupSelectionMode` enum:

    * Single - this is the default value
    * Multiple
    
* `Enabled` - `bool`, defaults to `true` - specifies if the group is clickable.

* `Class` - `string` - the CSS class that will be rendered on the main wrapping element of the ToolBarButtonGroup. You could use that class to cascade styles.

* `Width` - `string` - allows you to control the width of the group.

## See Also

  * [Live Demo: ToolBar Overview](https://demos.telerik.com/blazor-ui/toolbar/overview)
  * [ToolBar Overview]({%slug toolbar-overview%})
