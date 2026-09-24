---
title: Handle Button OnClick in a Code-Behind File
description: Assign and handle the Telerik Button OnClick event from a Blazor code-behind file.
type: how-to
page_title: How to Handle Button OnClick in a Code-Behind File
slug: button-kb-onclick-code-behind
position:
tags: telerik, blazor, button, onclick, code-behind
res_type: kb
components: ["button"]
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Button for Blazor</td>
        </tr>
        <tr>
            <td>Version</td>
            <td>15.0.1 and above</td>
        </tr>
    </tbody>
</table>

## Description

Handle the Telerik Button `OnClick` event from a C# code-behind file instead of declaring the event handler in the Razor markup.

## Solution

Reference the Button with `@ref` and assign the `EventCallback<MouseEventArgs>` after the component reference becomes available. Use `OnAfterRender` and perform the assignment only during the first render.

`Button.razor`:

````RAZOR.skip-repl
<TelerikButton @ref="@ButtonRef">
    Click Me
</TelerikButton>
````

`Button.razor.cs`:

````CS.skip-repl
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;
using Telerik.Blazor.Components;

public partial class Button
{
    private TelerikButton ButtonRef { get; set; } = default!;

    protected override void OnAfterRender(bool firstRender)
    {
        if (firstRender)
        {
            ButtonRef.OnClick = EventCallback.Factory.Create<MouseEventArgs>(
                this,
                OnButtonClick);
        }
    }

    private void OnButtonClick(MouseEventArgs args)
    {
        // Handle the button click.
    }
}
````

The `OnClick` event receives a [MouseEventArgs](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.web.mouseeventargs) argument. The handler can also be asynchronous. For more information, see [EventCallback can be async](https://github.com/telerik/blazor-docs/blob/master/_contentTemplates/common/general-info.md#event-callback-can-be-async).

## See Also

* [Button Events](slug:button-events)
* [Button Overview](slug:components/button/overview)
