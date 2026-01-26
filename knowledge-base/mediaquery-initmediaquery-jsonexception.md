---
title: InitMediaQueryWidget Throws JsonException
description: Learn how to troubleshoot and find the cause for a JsonException that may be thrown by the Telerik InitMediaQueryWidget method.
type: troubleshooting
page_title: InitMediaQueryWidget Throws JsonException Due to Invalid Cast
slug: mediaquery-kb-initmediaquery-jsonexception
tags: blazor, mediaquery, serialization
ticketid: 1676092, 1680874
res_type: kb
components: ["mediaquery"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                MediaQuery for Blazor
            </td>
        </tr>
    </tbody>
</table>

## Description

A Blazor app may throw a runtime JSON serialization exception on startup that is similar to:

```C#.skip-repl
Microsoft.JSInterop.JSException: An exception occurred executing JS interop: DeserializeUnableToConvertValue, System.Boolean Path: $ | LineNumber: 0 | BytePositionInLine: 4.. See InnerException for more details.

 ---> System.Text.Json.JsonException: DeserializeUnableToConvertValue, System.Boolean Path: $ | LineNumber: 0 | BytePositionInLine: 4.
 ---> System.InvalidOperationException: InvalidCast, Null, boolean
   at System.Text.Json.ThrowHelper.ThrowInvalidOperationException_ExpectedBoolean(JsonTokenType )
   at System.Text.Json.Utf8JsonReader.GetBoolean()

   ...

   at Microsoft.JSInterop.JSRuntime.<InvokeAsync>.MoveNext()
   at Telerik.Blazor.Components.TelerikMediaQuery.InitMediaQueryWidget()
   at Telerik.Blazor.Components.TelerikMediaQuery.OnAfterRenderAsync(Boolean firstRender)
```

or

```C#.skip-repl
Microsoft.JSInterop.JSException: An exception occurred executing JS interop: The JSON value could not be converted to System.Boolean. Path: $ | LineNumber: 0 | BytePositionInLine: 4.. See InnerException for more details.

 ---> System.Text.Json.JsonException: The JSON value could not be converted to System.Boolean. Path: $ | LineNumber: 0 | BytePositionInLine: 4.
 ---> System.InvalidOperationException: Cannot get the value of a token type 'Null' as a boolean.
   at System.Text.Json.ThrowHelper.ThrowInvalidOperationException_ExpectedBoolean(JsonTokenType tokenType)
   at System.Text.Json.Utf8JsonReader.GetBoolean()
   ...

   at Microsoft.JSInterop.JSRuntime.<InvokeAsync>.MoveNext()
   at Telerik.Blazor.Components.TelerikMediaQuery.InitMediaQueryWidget()
   at Telerik.Blazor.Components.TelerikMediaQuery.OnAfterRenderAsync(Boolean firstRender)
```

## Cause

The [`TelerikRootComponent`](slug:rootcomponent-overview) creates a few [MediaQuery](slug:mediaquery-overview) components. These MediaQuery instances are responsible for the [adaptive behavior of all Telerik dropdowns and popups](slug:adaptive-rendering). During initialization, each Telerik MediaQuery component performs a JSInterop call in `OnAfterRenderAsync` that returns a boolean value back to the .NET runtime. This bool value shows whether the current browser viewport size matches the MediaQuery `Media` parameter value.

An JSON exception in the above algorithm indicates that the received value cannot be converted to boolean type. This can happen if the application is using a third-party package or middleware (for example, Serilog) that overrides the .NET serialization mechanism. As a result, the .NET runtime may receive `null` instead of `true` or `false`.

## Solution

The recommended approach is to modify the app configuration or third-party tooling, so that the .NET serialization works by default.

## Suggested Workaround

In some cases, it may be possible to avoid the JSON error by rendering all Razor components in the app with a delay in `OnAfterRenderAsync`:

>caption MainLayout.razor

````RAZOR.skip-repl
@inherits LayoutComponentBase

@if (ShouldRenderApp)
{
    <TelerikRootComponent>
        @Body
    </TelerikRootComponent>
}

@code {
    private bool ShouldRenderApp { get; set; }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await Task.Delay(1);

            ShouldRenderApp = true;
            StateHasChanged();
        }

        await base.OnAfterRenderAsync(firstRender);
    }
}
````

## See Also

* [DataSourceRequest Filters not Working When You Add Reporting or Newtonsoft.Json](slug:common-kb-newtonsoft-breaks-datasourcerequest-serialization)
* [Chart not Working with Newtonsoft.Json Properties](slug:chart-kb-newtonsoft-seialization-settings)
* [Troubleshooting JavaScript Errors](slug:troubleshooting-js-errors)
