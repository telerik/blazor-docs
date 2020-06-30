---
title: Position
page_title: Window | Position
description: How to control the position of the Window for Blazor.
slug: components/window/position
tags: telerik,blazor,window,position
published: True
position: 2
---

# Window Position

The Window offers two ways for you to control its position:

* the `Top` and `Left` properties (read more in the [Dimensions]({%slug common-features/dimensions%}) article)
* the `Centered` boolean property

>caption Set Top and Left offset to the Window

````CSHTML
<TelerikWindow Top="50px" Left="100px" Visible="true">
	<WindowTitle>
		<strong>The Title</strong>
	</WindowTitle>
	<WindowContent>
		I am <strong>100px</strong> away from the left edge of the <strong>app</strong> container, and <strong>50px</strong> away from its top.
	</WindowContent>
</TelerikWindow>
````

The `Centered` property adds a CSS class that sets the window position to `top: 50%; left: 50%; transform: translate(-50%, -50%);`. This keep is it centered if the viewport size changes.

If the `Top` and/or `Left` properties are set, they will take precedence, because they render as rules in an inline `style` attribute.

>tip The `Centered` parameter is `true` by default.

>caption Center the Window

````CSHTML
<TelerikWindow Centered="true" Visible="true">
	<WindowTitle>
		<strong>The Title</strong>
	</WindowTitle>
	<WindowContent>
		I am <strong>centered</strong> in the app container (usually the viewport).
	</WindowContent>
</TelerikWindow>
````

>tip If you want to center the window dynamically through data binding its `Centered` property, you may want to data bind the `Top` and `Left` properties as well, so you can reset them to `null` when you want to center the window in the viewport.

>important The Window renders in the root of the application (where the `<TelerikRootComponent>` is declared). This, generally, positions it relatively to the viewport. If you have special CSS positioning, margins or other offsets on the app element, they may affect the position of the Window.


## See Also

  * [Live Demo: Window Position](https://demos.telerik.com/blazor-ui/window/position)
