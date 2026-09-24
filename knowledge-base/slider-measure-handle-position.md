---
title: Measure the Slider Handle Position
description: How to measure the position of the Slider handle and display content below it.
type: how-to
page_title: Measure the Slider Handle Position
slug: slider-kb-measure-handle-position
position: 
tags: telerik,blazor,slider,handle,position,javascript
ticketid: 
res_type: kb
components: ["slider"]
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Slider for Blazor</td>
        </tr>
		<tr>
			<td>Version</td>
			<td>15.0.1 and above</td>
		</tr>
    </tbody>
</table>

## Description

How to get the position of the Slider handle?

How to display a value below the Slider handle while the user drags it?

## Solution

The Slider does not expose the handle coordinates through a parameter or event. To position a value below the handle of a horizontal Slider, wrap the component in a positioned element and measure the rendered handle with JavaScript interop. Use the [`ValueChanged` event](slug:slider-events) to request a new measurement while the user drags the handle.

>caption Measure the Slider handle position

````RAZOR
@inject IJSRuntime JS

<div @ref="@SliderWrapper" class="slider-wrapper">
	<TelerikSlider Value="@SliderValue"
				   ValueChanged="@OnSliderValueChanged"
				   Min="0"
				   Max="100"
				   SmallStep="1"
				   LargeStep="20"
				   Width="400px" />

	<span class="slider-value" style="left:@($"{HandleLeft}px")">@SliderValue</span>
</div>

<style>
	.slider-wrapper {
		position: relative;
		width: 400px;
		padding-bottom: 30px;
	}

	.slider-value {
		position: absolute;
		top: 100%;
		transform: translateX(-50%);
	}
</style>

@code {
	private ElementReference SliderWrapper { get; set; }

	private int SliderValue { get; set; } = 33;

	private double HandleLeft { get; set; }

	private bool HandlePositionNeedsUpdate { get; set; } = true;

	private void OnSliderValueChanged(int newValue)
	{
		SliderValue = newValue;
		HandlePositionNeedsUpdate = true;
	}

	protected override async Task OnAfterRenderAsync(bool firstRender)
	{
		if (firstRender || HandlePositionNeedsUpdate)
		{
			HandlePositionNeedsUpdate = false;
			HandleLeft = await JS.InvokeAsync<double>("sliderInterop.getHandleLeft", SliderWrapper);
			await InvokeAsync(StateHasChanged);
		}
	}
}
````

Add the following function to a JavaScript file loaded by the application:

````JS
window.sliderInterop = {
	getHandleLeft: function (wrapper) {
		var handle = wrapper.querySelector(".k-draghandle");

		if (!handle) {
			return 0;
		}

		var wrapperRect = wrapper.getBoundingClientRect();
		var handleRect = handle.getBoundingClientRect();

		return handleRect.left - wrapperRect.left + handleRect.width / 2;
	}
};
````

The returned value is relative to the wrapper. `getBoundingClientRect()` returns viewport coordinates, so recalculate the position after window resizing or other layout changes. For a vertical Slider, measure the `top` values instead of the `left` values.

## See Also

* [Slider Events](slug:slider-events)
* [Slider Overview](slug:slider-overview)