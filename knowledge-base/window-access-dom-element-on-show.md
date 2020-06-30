---
title: Unable to detect a div in a Telerik Window from JavaScript
description: How to access an HTML element in a Telerik Window from JavaScript when showing the window.
type: troubleshooting
page_title: Reference DOM element in Window from JS
slug: window-access-dom-element-on-show
position: 
tags: 
ticketid: 1444024
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Window for Blazor</td>
		</tr>
	</tbody>
</table>


## Description
I have a Telerik window which becomes visible on a button click. On this button click I will change the `Visible` property to `true` and I will call a JavaScript function (using `JSRuntime`) which will do some work (like creating jQuery widgets) inside my Telerik Window. 

## Error Message

Accessing a DOM element inside the window when showing it throws an error similar to  `Microsoft.JSInterop.JSException: 'Invalid DIV id; could not get element with id: myElemId`.

Depending on the exact JS code you use, you may get an error similar to: `Error: Microsoft.JSInterop.JSException: Cannot read property 'innerHTML' of null
TypeError: Cannot read property 'innerHTML' of null`

## Cause\Possible Cause(s)

When you make the window visible and issue the JS Interop call, there is a race condition and when the JS code runs, the window is not yet rendered, so the element in question is not yet in the DOM.

## Solution
Before invoking JS Interop calls that use elements in the window when making the window visible, wait a little so they have rendered first. 

Comments in the sample below provide more explanations:

>caption sample component

````CSHTML
@inject IJSRuntime JSRuntime;

<TelerikButton OnClick="@ShowWindowAndCallJs">Show Window and call JS</TelerikButton>

<TelerikWindow Visible="@ShowWindow">
    <WindowContent>
        <div id="sample">
            <div id="myElemId">some content</div>
        </div>
    </WindowContent>
</TelerikWindow>

@code{
    bool ShowWindow { get; set; }

    async Task ShowWindowAndCallJs()
    {
        ShowWindow = true;

        //await Task.Delay(20); // wait for about one rendering frame
        await JSRuntime.InvokeAsync<object>("doWork");
    }
}
````

>caption sample JS Interop code

````JavaScript
function doWork() {
    var elem = document.querySelector("#myElemId");
    // you should also consider defensive checks here in any case
    // something like an if(!elem) { console.log("could not find my element"); return; }
    console.log(elem.innerHTML);
}
````

