---
title: Modal
page_title: Window for Blazor | Modal
description: How to make a modal Window for Blazor
slug: components/window/modal
tags: telerik,blazor,window,modal
published: True
position: 5
---

# Modal Window

The Window for Blazor can be modal so that the user is unable to interact with the rest of the page until it closes.

To make a modal window, set its `Modal` property to `true`.

````CSHTML
<TelerikWindow Modal="true" Visible="true">
	<WindowTitle>
		<strong>The Title</strong>
	</WindowTitle>
	<WindowContent>
		I am modal so the page behind me is not available to the user.
	</WindowContent>
	<WindowActions>
		<WindowAction Name="Minimize" />
		<WindowAction Name="Maximize" />
		<WindowAction Name="Close" />
	</WindowActions>
</TelerikWindow>
````

>note A modal window is centered.

## See Also

  * [Live Demo: Modal Window Size](https://demos.telerik.com/blazor-ui/window/modal)
