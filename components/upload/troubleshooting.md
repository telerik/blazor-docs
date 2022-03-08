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

The Upload component requires integration with remote endpoints and controller methods to work. Controller routing depends entirely on the app configuration. Common pitfalls may be:

* **The action method is hit, but the method argument is `null`.**
    * Make sure the action method argument names match the `SaveField` and `RemoveField` values. The default value of both parameters is `"files"`.
    * The argument type of the `SaveUrl` action method should be `IFormFile` or `IEnumerable<IFormFile>`.
    * The argument type of the `RemoveUrl` action method should be `string` or `IEnumerable<string>`.
    * The uploaded file size may be over the web server's maximum.
* **The server returns `HTTP 400 Bad request`.**
    * Make sure that [controller routing is enabled and configured correctly](https://docs.microsoft.com/en-us/aspnet/core/mvc/controllers/routing).
    * Make sure that the `[Route]` attribute in the upload controller (if set) is compatible with `SaveUrl` and `RemoveUrl`.
    * Verify that the controller and action method names match the `SaveUrl` and `RemoveUrl` values.
* **The server does not return any response. The browser console shows connection errors:**
    `Failed to load resource: net::ERR_CONNECTION_RESET` or `Failed to load resource: The network connection was lost.`
    * The uploaded file size exceeds the web server's maximum.

## See Also

* [How to implement Upload controller methods]({%slug upload-overview%}#implement-controller-methods)
* [Validation]({%slug upload-validation%})
* [Events]({%slug upload-events%})
