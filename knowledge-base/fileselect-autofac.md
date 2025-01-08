---
title: FileSelect ReadAsync Method Throws JsonException
description: Learn how to resolve an exception about JSON serialization attempting to deserialize an unexpected byte array when using the Telerik Blazor FileSelect.
type: troubleshooting
page_title: FileSelect ReadAsync Method Throws JsonException
slug: fileselect-kb-autofac
tags: telerik, blazor, fileselect, autofac, dependency injection
ticketid: 1637702, 1634460, 1634313, 1632874
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>FileSelect for Blazor</td>
        </tr>
        <tr>
            <td>Version</td>
            <td>5.0.0 and above</td>
        </tr>
    </tbody>
</table>


## Description

This knowledge base article deals with the following issues:

* The FileSelect component's file stream `ReadAsync` method throws `Microsoft.JSInterop.JSException`.
* FileSelect file stream reading fails when using `builder.Host.UseServiceProviderFactory`.
* An exception occurs when trying to upload files through Blazor FileSelect with Autofac dependency injection enabled.


## Error Message

````C#.skip-repl
Microsoft.JSInterop.JSException: JSON serialization is attempting to deserialize an unexpected byte array.
    at System.Threading.Tasks.ValueTask`1.get_Result()
    at Telerik.Blazor.Components.FileSelect.Stream.FileInfoStream.&lt;ReadBytesAsync&gt;d__24.MoveNext()
````


## Cause

The problem can occur when an Inversion of Control (IoC) container interferes with the SignalR hub operation. For example, we have received reports about Autofac:

>caption Program.cs

<div class="skip-repl"></div>

````C#
builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());
````

The problem does not occur in FileSelect versions before 5.0.0, because the component used a slower legacy file management mechanism with `string` instead of `byte[]`.

The following resources provide additional details:

* [Technical description of the cause in the `aspnetcore` GitHub repository](https://github.com/dotnet/aspnetcore/issues/38842#issuecomment-1342540950)
* [Closed issue in the `aspnetcore` GitHub repository](https://github.com/dotnet/aspnetcore/issues/47875)
* [Similar StackOverflow thread about the Blazor `InputFile` component](https://stackoverflow.com/questions/76098236/blazor-inputfile-component-does-not-work-when-registering-autofacserviceprovider).


## Solution

To avoid the error, disable implicit parameters from services in the Blazor hub configuration:

>caption Program.cs

<div class="skip-repl"></div>

````C#
builder.Services.AddHubOptions(options =>
{
    options.DisableImplicitFromServicesParameters = true;
});
````

## See Also

* [FileSelect Overview](slug://fileselect-overview)
