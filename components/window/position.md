---
title: Position
page_title: Window for Blazor | Position
description: How to control the position of the Window for Blazor
slug: components/window/position
tags: telerik,blazor,window,position
published: True
position: 2
---

# Window Position

The Window offers two ways for you to control its position:

* the `Top` and `Left` integer properties
* the `Centered` boolean property

>caption Set Top and Left offset to the Window

````CSHTML
<TelerikWindow Top="50" Left="100" Visible="true">
	<TelerikWindowTitle>
		<strong>The Title</strong>
	</TelerikWindowTitle>
	<TelerikWindowContent>
		I am <strong>100px</strong> away from the left edge of my container, and <strong>50px</strong> away from its top.
	</TelerikWindowContent>
</TelerikWindow>
````

The `Centered` property adds a CSS class that sets the window position to `top: 50%; left: 50%; transform: translate(-50%, -50%);`. This centers it in its container.

If the `Top` and/or `Left` properties are set, they will take precedence, because they render as rules in an inline `style` attribute.

>caption Center the Window

````CSHTML
<TelerikWindow Centered="true" Visible="true">
	<TelerikWindowTitle>
		<strong>The Title</strong>
	</TelerikWindowTitle>
	<TelerikWindowContent>
		I am <strong>centered</strong> in my container (usually the viewport).
	</TelerikWindowContent>
</TelerikWindow>
````

>tip If you want to center the window dynamically through data binding its `Centered` property, you may want to data bind the `Top` and `Left` properties as well, so you can reset them to `null` when you want to center the window in the viewport.

>important The Window renders in the place of its declaration. If its parent elements have special CSS positioning, it will affect the position of the Window. You can find an example in the snippet below.

>caption Parent element positions affect the Windnow position

````CSHTML
<div style="position: absolute; top: 300px; left: 300px; border: 1px solid red;">
	I am a parent of the Window with special positioning (absolute, fixed, relative) and my offsets affect the position of the Window.

	<TelerikWindow Top="50" Left="100" Visible="true">
		<TelerikWindowTitle>
			<strong>The Title</strong>
		</TelerikWindowTitle>
		<TelerikWindowContent>
			I am <strong>100px</strong> away from the left edge of my container, and <strong>50px</strong> away from its top.
		</TelerikWindowContent>
	</TelerikWindow>
	
</div>
````

## See Also

  * [Live Demo: Window Position](https://demos.telerik.com/blazor/window/position)