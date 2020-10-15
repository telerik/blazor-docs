---
title: WebAssembly Server PreRendering with Telerik components
description: WebAssembly Server PreRendering with Telerik components - two things that you need to set up
type: troubleshooting
page_title: WebAssembly Server PreRendering with Telerik components
slug: common-kb-wasm-prerendering
position: 
tags:
res_type: kb
---

## Description

I want to use the web assembly server-side pre-rendering feature in .NET 5 - the `WebAssemblyPrerendered` mode.

````
<component type="typeof(App)" render-mode="WebAssemblyPrerendered" />
````

You can read more about it in the following resources:

* <a href="https://devblogs.microsoft.com/aspnet/asp-net-core-updates-in-net-5-release-candidate-1/#blazor-webassembly-prerendering" target="_blank">MS blog: ASP.NET Core updates in .NET 5 Release Candidate 1 - Blazor WebAssembly prerendering</a>

* <a href="https://jonhilton.net/blazor-wasm-prerendering" target="_blank">Jon Hilton - Prerendering your Blazor WASM application with .NET 5 (part 1)</a>

* <a href="https://jonhilton.net/blazor-wasm-prerendering-missing-http-client/" target="_blank">Jon Hilton - Prerendering your Blazor WASM application with .NET 5 (part 2 - solving the missing HttpClient problem)</a>

## Solution

You can see how to add Telerik assets, services and the root component in the [What You Need]({%slug getting-started/what-you-need%}) article. Make sure you are familiar with it before you continue reading. Both the client-side, and the server-side information is necessary.

There are a couple of things specific to the Telerik components that you need to do:

* Add the Telerik services and the `TelerikRootComponent` as usual in the WebAssembly project.

* Add the Telerik web assets to the index page (now the `_Host.cshtml` page in the `Server` project) as usual.

* Add a package reference to the `Telerik.UI.for.Blazor` package in the `Server` project as well.

* Add the Telerik services in the `Server` projet as well.

* Add other specific services to the `Server` project as well (such as localization services for the Telerik components, or other services for your app like data retrieval logic) and ensure they have an appropriate implementation that can work on the server.

The last three steps are required so the server can also work with the Telerik components and render them. This is similar to using a server-side Blazor application - the first render happens on the server, like with a server-side Blazor app.



