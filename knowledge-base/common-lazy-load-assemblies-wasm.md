---
title: Telerik Blazor Components and WebAssembly Lazy Load of Assemblies
description: How to use the lazy assembly loading feature of Blazor with the Telerik components.
type: how-to
page_title: Telerik Blazor Components and WebAssembly Lazy Load of Assemblies
slug: common-kb-lazy-load-assemblies-wasm
position:
tags:
ticketid: 1628239, 1633572
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>UI for Blazor</td>
        </tr>
        <tr>
            <td>Version</td>
            <td>2.19.0 and above</td>
        </tr>
        <tr>
            <td>.NET version</td>
            <td>5 and above</td>
        </tr>
    </tbody>
</table>

## Description

How to use the [lazy assembly loading feature of Blazor WebAssembly apps](https://learn.microsoft.com/en-us/aspnet/core/blazor/webassembly-lazy-load-assemblies) with the Telerik Blazor components?

## Solution

All general guidance from the [Microsoft documentation](https://learn.microsoft.com/en-us/aspnet/core/blazor/webassembly-lazy-load-assemblies) applies. The Telerik-related specifics are:

* List the following assemblies in the "client" `.csproj` file to be lazy loaded.

````XML.skip-repl
<ItemGroup>
    <!-- Components and data binding -->
    <BlazorWebAssemblyLazyLoad Include="Telerik.Blazor.dll" />
    <BlazorWebAssemblyLazyLoad Include="Telerik.DataSource.dll" />
    <BlazorWebAssemblyLazyLoad Include="System.Data.Common.dll" />
    <BlazorWebAssemblyLazyLoad Include="System.Linq.Queryable.dll" />
    <!-- Icons -->
    <BlazorWebAssemblyLazyLoad Include="Telerik.SvgIcons.dll" />
    <BlazorWebAssemblyLazyLoad Include="Telerik.FontIcons.dll" />
    <!-- PivotGrid -->
    <BlazorWebAssemblyLazyLoad Include="Telerik.Pivot.Core.dll" />
    <BlazorWebAssemblyLazyLoad Include="Telerik.Pivot.DataProviders.Xmla.dll" />
    <!-- Scheduler -->
    <BlazorWebAssemblyLazyLoad Include="Telerik.Recurrence.dll" />
    <!-- Excel export -->
    <BlazorWebAssemblyLazyLoad Include="Telerik.Documents.SpreadsheetStreaming.dll" />
    <BlazorWebAssemblyLazyLoad Include="Telerik.Zip.dll" />
</ItemGroup>
````

* The assembly requirements depend on component usage, and not on feature usage. For example, both icon assemblies are always required, as our components render icons internally and must be aware of both types of icons. The assemblies, which are related to Excel export, are always required when using a Grid. `Telerik.Recurrence.dll` is required only when using the Scheduler.
* Move the [`<TelerikRootComponent>`](slug:rootcomponent-overview) to a layout that is used only on pages that have the Telerik assemblies loaded.
* Lazy loading of assemblies does not support dynamic service injection. As a result, remove the Telerik service registration (`builder.Services.AddTelerikBlazor();`) from `Program.cs`. If you are using [localization for the Telerik Blazor components](slug:globalization-localization), define the the localization service for the Telerik components with the `Localizer` parameter of the `<TelerikRootComponent>`. The key thing is to instantiate the localization service inline. It cannot be injected as a variable from the `@code { }` block, because that will throw runtime errors.


````RAZOR.skip-repl

@using LazyLoadTelerikComponents.Shared.Services


<TelerikRootComponent Localizer="@( new SampleResxLocalizer() )">

    ...

</TelerikRootComponent>

````

Overall, the lazy loading of assemblies at the correct time is a responsibility of the application. If an assembly is not loaded when required, the app will throw `System.IO.FileNotFoundException: Could not load file or assembly ...`. The loading code is in the `OnNavigateAsync` event handler of the `<Router>`. You can also define an optional loading screen inside the `<Router>` with a `<Navigating>` tag.

### .NET 8 and 9 Specifics

The following tips apply only to .NET 8 and 9 WebAssembly apps:

* Use `.wasm` instead of `.dll` in the `.csproj` file and the `OnNavigateAsync` event handler.
* [Register the lazy loader service manually](https://github.com/dotnet/aspnetcore/issues/51966) in the "server" `Program.cs`. Otherwise, you may get a `InvalidOperationException: Cannot provide a value for property 'AssemblyLoader' on type '...Routes'. There is no registered service of type 'Microsoft.AspNetCore.Components.WebAssembly.Services.LazyAssemblyLoader'.`

````C#.skip-repl
using Microsoft.AspNetCore.Components.WebAssembly.Services;
builder.Services.AddScoped(typeof(LazyAssemblyLoader));
````

## Example

An sample project is available in GitHub: [Lazy load Telerik Blazor assemblies](https://github.com/telerik/blazor-ui/tree/master/common/lazy-load-assemblies-wasm).
