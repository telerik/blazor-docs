---
title: Upload Files with Antiforgery Validation
description: Learn how to setup the Telerik Blazor Upload to work with .NET controllers that use the ValidateAntiForgeryToken attribute. Configure Blazor apps with antiforgery validation.
type: how-to
page_title: How to Upload Files with Antiforgery Validation
slug: upload-kb-validateantiforgerytoken
position: 
tags: telerik, blazor, upload
ticketid: 1626509, 1637325
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Upload for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

This KB article answers the following questions:

* How to use the Telerik Blazor Upload component with controllers that are decorated with the `[ValidateAntiForgeryToken]` attribute?
* How to upload files to controllers that require antiforgery validation?
* How to set antiforgery tokens in the Upload's `OnUpload` and `OnRemove` events?


## Solution

Here are the suggested steps to configure .NET Core Blazor antiforgery validation and integrate it with the Telerik Upload component.

1. Add services and configurations to `Program.cs`:
    * Add `builder.Services.AddRazorPages();`
    * Add `builder.Services.AddHttpContextAccessor();`
    * (optional) Add `builder.Services.AddAntiforgery()` with custom `HeaderName` or `FormFieldName`.
    * Verify that `app.UseAntiforgery();` is present.
    * Add `app.MapDefaultControllerRoute();` to configure routing.
1. [Implement the `Save` and `Remove` controller methods](slug:upload-overview#implement-controller-methods).
1. Decorate the controller class or specific action methods with `[ValidateAntiForgeryToken]`
1. Configure the Razor component, which contains the Telerik Blazor Upload:
    * Inject `AntiforgeryStateProvider` to use its `GetAntiforgeryToken()` method.
    * Inject `IAntiforgery` to use its `GetAndStoreTokens(httpContext)` method.
    * Inject `IHttpContextAccessor` to use its `HttpContext` property in the `GetAndStoreTokens()` method.
    * Execute `GetAndStoreTokens()` and/or `GetAntiforgeryToken()` in `OnInitialized` to obtain the required antiforgery information.
    * Add the required antiforgery information in the Upload component's [`OnUpload` and `OnRemove` event handlers](slug:upload-events).

The code snippets below assume that the application name is `BlazorAppName`.

>caption Using Telerik Blazor Upload with antiforgery validation

<div class="skip-repl"></div>

````C# Program.cs
// This is not the complete Program.cs file, but only the relevant bits.

using Microsoft.AspNetCore.Http.Features;
// Required by ValidateAntiForgeryTokenAttribute()
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.Kestrel.Core;

var builder = WebApplication.CreateBuilder(args);

// ...

// Required by MapDefaultControllerRoute()
builder.Services.AddRazorPages();

// Not necessary due to AddRazorPages()
//builder.Services.AddControllersWithViews(options =>
//{
//    options.Filters.Add(new ValidateAntiForgeryTokenAttribute());
//});

// Required by Antiforgery.GetAndStoreTokens() in Razor components
builder.Services.AddHttpContextAccessor();

// This statement and the custom names are optional.
builder.Services.AddAntiforgery(options => {
    options.HeaderName = "X-CSRF-TOKEN-HEADERNAME";
    options.FormFieldName = "X-CSRF-TOKEN-FORMFIELDNAME";
});

builder.Services.AddTelerikBlazor();

// ASP.NET Core Upload file size limit
builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 4_294_967_296; // 4 GB
});
// Kestrel Upload file size limit
builder.Services.Configure<KestrelServerOptions>(options =>
{
    options.Limits.MaxRequestBodySize = 4_294_967_296; // 4 GB
});

var app = builder.Build();

// ...

app.UseAntiforgery();

// Requires AddRazorPages() or AddControllersWithViews()
app.MapDefaultControllerRoute();

// ...

app.Run();
````
````RAZOR
@using Microsoft.AspNetCore.Antiforgery

@inject AntiforgeryStateProvider AfStateProvider
@inject IAntiforgery Antiforgery
@inject IHttpContextAccessor HttpContextAccessor
@inject NavigationManager NavigationManager

<PageTitle>Home</PageTitle>

<TelerikUpload SaveUrl="@UploadSaveUrl"
               RemoveUrl="@UploadRemoveUrl"
               OnUpload="@OnUploadUpload"
               OnRemove="@OnUploadRemove" />

@code {
    private string UploadSaveUrl => ToAbsoluteUrl("api/upload/save");
    private string UploadRemoveUrl => ToAbsoluteUrl("api/upload/remove");

    private string? AntiforgeryHeaderName { get; set; }
    private string? AntiforgeryHeaderToken { get; set; }
    private string? AntiforgeryFormFieldName { get; set; }
    private string? AntiforgeryFormValue { get; set; }

    private void OnUploadUpload(UploadEventArgs args)
    {
        // There is no need to post both antiforgery header and data.
        // Only one of them is enough.

        args.RequestHeaders.Add(AntiforgeryHeaderName, AntiforgeryHeaderToken);
        args.RequestData.Add(AntiforgeryFormFieldName, AntiforgeryFormValue);
    }

    private void OnUploadRemove(UploadEventArgs args)
    {
        // There is no need to post both antiforgery header and data.
        // Only one of them is enough.

        args.RequestHeaders.Add(AntiforgeryHeaderName, AntiforgeryHeaderToken);
        args.RequestData.Add(AntiforgeryFormFieldName, AntiforgeryFormValue);
    }

    protected override void OnInitialized()
    {
        // Obtain the antiforgery header name and value.
        if (HttpContextAccessor.HttpContext != null)
        {
            var afTokenSet = Antiforgery.GetAndStoreTokens(HttpContextAccessor.HttpContext);
            AntiforgeryHeaderName = afTokenSet.HeaderName;
            AntiforgeryHeaderToken = afTokenSet.RequestToken;
        }

        // Obtain the antiforgery form field name and value.
        var afRequestToken = AfStateProvider.GetAntiforgeryToken();
        if (afRequestToken != null)
        {
            AntiforgeryFormFieldName = afRequestToken.FormFieldName;
            AntiforgeryFormValue = afRequestToken.Value;
        }

        base.OnInitialized();
    }

    private string ToAbsoluteUrl(string url)
    {
        return $"{NavigationManager.BaseUri}{url}";
    }
}
````
````C# Controller
using Microsoft.AspNetCore.Mvc;

namespace BlazorAppName.Controllers
{
    [ValidateAntiForgeryToken]
    [Route("api/[controller]/[action]")]
    public class UploadController : ControllerBase
    {
        public IWebHostEnvironment HostingEnvironment { get; set; }

        public UploadController(IWebHostEnvironment hostingEnvironment)
        {
            HostingEnvironment = hostingEnvironment;
        }

        [HttpPost]
        public async Task<IActionResult> Save(IFormFile files)
        {
            // Save the file...

            return new EmptyResult();
        }

        [HttpPost]
        public async Task<IActionResult> Remove([FromForm] string files)
        {
            // Delete the file...

            return new EmptyResult();
        }
    }
}
````


## Disclaimer

> This article contains code snippets and suggestions that relate to general .NET programming and antiforgery setup of a Blazor application. The provided implementation is just an example and is strictly outside the Telerik support scope. The primary resource for antiforgery configuration is the Microsoft documentation. See [Blazor authentication and authorization](https://learn.microsoft.com/en-us/aspnet/core/blazor/security/).


## See Also

* [Upload Overview](slug:upload-overview)
* [Upload Events](slug:upload-events)
* [Upload Troubleshooting](slug:upload-troubleshooting)
