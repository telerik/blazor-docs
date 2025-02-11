---
title: Troubleshooting
page_title: Upload Troubleshooting
description: Investigate, troubleshoot and fix Blazor File Upload issues.
slug: upload-troubleshooting
tags: telerik,blazor,upload,async,troubleshooting
published: True
position: 10
---


# Upload Troubleshooting

The Upload component requires integration with remote endpoints and controller methods to work. Controller routing depends entirely on the app configuration. This article discusses the most common pitfalls.


## Action Method Argument `null`

The action method is hit, but the method argument is `null`

* Make sure the action method argument names match the `SaveField` and `RemoveField` values. The default value of both parameters is `"files"`.
* The argument type of the `SaveUrl` action method should be `IFormFile` or `IEnumerable<IFormFile>`.
* The argument type of the `RemoveUrl` action method should be `string` or `IEnumerable<string>`.
* The uploaded [file size may be over the web server's maximum](slug:upload-overview#large-file-uploads).


## HTTP 400 Bad request

The action method is not hit and the server returns HTTP 400 Bad request.

* Make sure that [controller routing is enabled and configured correctly](https://docs.microsoft.com/en-us/aspnet/core/mvc/controllers/routing). For example, the controller samples in this documentation use `[Route("api/[controller]/[action]")]`. It is enough to add `app.MapDefaultControllerRoute();` to `Program.cs` in the default Blazor project template. [Web API controllers require explicit `[Route]` configuration](https://learn.microsoft.com/en-gb/aspnet/core/web-api/?view=aspnetcore-8.0#attribute-routing-requirement).
* Make sure that the `[Route]` attribute in the upload controller (if set) is compatible with `SaveUrl` and `RemoveUrl`.
* Verify that the controller and action method names match the `SaveUrl` and `RemoveUrl` values.
* Set a `[FromForm]` [binding source attribute](https://learn.microsoft.com/en-gb/aspnet/core/web-api/?view=aspnetcore-8.0#binding-source-parameter-inference) to the action method argument.


## HTTP 415 Unsupported Media Type

The Remove action may return `HTTP 415 Unsupported Media Type`.

This means that the Remove action method expects `IEnumerable<string>` and .NET does not infer the correct binding source. Set a `[FromForm]` [binding source attribute](https://learn.microsoft.com/en-gb/aspnet/core/web-api/?view=aspnetcore-8.0#binding-source-parameter-inference) to the file name argument.


## Connection Error and No Response

The server does not return any response. The browser console shows connection errors like:

* `Failed to load resource: net::ERR_CONNECTION_RESET`
* `Failed to load resource: The network connection was lost.`

This means that the uploaded file size [exceeds the web server's maximum](slug:upload-overview#large-file-uploads).


## Antiforgery Validation Blocks the Upload Requests

If the upload controller is decorated with the `[ValidateAntiForgeryToken]` attribute, the Upload component must include antiforgery tokens in its upload and delete requests. Use the [`OnUpload` and `OnRemove`](slug:upload-events) events to [add the required antiforgery tokens](slug:upload-kb-validateantiforgerytoken).


## See Also

* [How to implement Upload controller methods](slug:upload-overview#implement-controller-methods)
* [Validation](slug:upload-validation)
* [Events](slug:upload-events)
