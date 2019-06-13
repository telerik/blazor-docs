---
title: Overview
page_title: Animation Container for Blazor |
description: How to use the Animation Container in the UI for Blazor suite to create messages and popups
slug: components/animationcontainer/overview
tags: telerik,blazor,animation,container
published: True
position: 0
---

# Animation Container

The UI for Blazor suite provides the Animation Container component that you can use to create messages and popups such as notifications or expandable containers. It lets you define its animation, size and position, and arbitrary content.

To use the animation container, add the `TelerikAnimationContainer` tag.

>caption How to use the Animation Container

````CSHTML
@using Telerik.Blazor.Components.AnimationContainer
@using Telerik.Blazor.Components.Button
@using Telerik.Blazor

<TelerikAnimationContainer Top="300px" Width="100px" Height="100px" Visible="@Shown" AnimationType="AnimationType.ZoomOut" Class="k-popup">
	My content goes here. The "k-popup" class adds some background and borders which you can define through your own styles instead.
</TelerikAnimationContainer>

<TelerikButton OnClick="@ToggleContainer">Toggle Animation Container</TelerikButton>

@code {
	public bool Shown { get; set; } = false;

	public void ToggleContainer()
	{
		Shown = !Shown;
		StateHasChanged();
	}
}
````

The animation container exposes the following properties:

* `Visible` - to control whether the container is shown.
* `Width` and `Height` - to control its size.
* `Top` and `Left` - to control its offset from its parent with special positioning (`relative`, `absolute`, `fixed`).
* `AnimationType` and `AnimationDuration` to control the way it is shown and hidden. The animation duration is in milliseconds (defaults to `300`), and the type is of the `Telerik.Blazor.AnimationType` enum with the following options:
	* SlideUp,
	* SlideIn,
	* SlideDown,
	* SlideRight,
	* SlideLeft,
	* PushUp,
	* PushDown,
	* PushLeft,
	* PushRight,
	* Fade,
	* ZoomIn,
	* ZoomOut
* `ShowDelay` and `HideDelay` - to set how much time will pass between toggling the `Visible` property and the actual change of the container state. When the `Visible` property is set to `true`, the `ShowDelay` timer counts and then the container shows. When `Visible` is set to `false`, the `HideDelay` timer starts and then the container hides. Both values are in milliseconds and default to `20`.
* `Class` - a CSS class rendered on the container DOM element.

>caption Explore the animation options

````
@using Telerik.Blazor.Components.AnimationContainer
@using Telerik.Blazor.Components.Button
@using Telerik.Blazor

<TelerikAnimationContainer Top="300px" Width="100px" Height="100px" Visible="@Shown" AnimationType="@AnimType" Class="my-popup">
	My content goes here.
</TelerikAnimationContainer>

<select @bind="AnimType">
	@foreach (var possibleAnimation in Enum.GetValues(typeof(AnimationType)))
	{
		<option value="@possibleAnimation">@possibleAnimation</option>
	}
</select>

<TelerikButton OnClick="@ToggleContainer">Toggle Animation Container</TelerikButton>

@code {
	public bool Shown { get; set; } = false;
	public AnimationType AnimType { get; set; } = AnimationType.Fade;
	public void ToggleContainer()
	{
		Shown = !Shown;
		StateHasChanged();
	}
}

<style>
	.my-popup {
		border: 2px solid red;
		background: #ccc;
	}
</style>
````

## See Also

  * [Live Demos: Animation Container](https://demos.telerik.com/blazor-ui/animationcontainer/index)
