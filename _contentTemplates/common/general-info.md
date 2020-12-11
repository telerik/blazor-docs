#event-callback-can-be-async
>tip The event is an `EventCallback` and it can be synchronous (return `void`), or it can also be asynchronous and return `async Task`.
#end

#ensure-nuget-packge-for-upgrade
Make sure that you have a NuGet feed source with the version you want to upgrade to. This is usually the [Telerik NuGet Feed]({%slug installation/nuget%}), but you can also use a local feed from [our MSI installer]({%slug installation/msi%}) or [ZIP archive]({%slug installation/zip%}).
#end

#date-format-per-culture
the `Format` is culture-specific and the same format may produce different results depending on the culture. You can find more information and examples in the [Supported Date Formats]({%slug components/dateinput/supported-formats%}) article.
#end

#cdn
You can reference the built-in Telerik assets from a cloud CDN instead of a local resource on your server.

>caption Reference the Telerik assets from the cloud in a `WebAssembly` app

````CSHTML
<!DOCTYPE html>
<html>
<head>
    . . .
    <!-- Choose only one of the themes -->
    
    <link rel="stylesheet" href="https://unpkg.com/@progress/kendo-theme-default@latest/dist/all.css" />
    
    <!-- 
        <link href="https://unpkg.com/@progress/kendo-theme-bootstrap@latest/dist/all.css" rel="stylesheet" />
        <link href="https://unpkg.com/@progress/kendo-theme-material@latest/dist/all.css" rel="stylesheet" />
    -->
    
    <script src="https://kendo.cdn.telerik.com/blazor/{{site.uiForBlazorLatestVersion}}/telerik-blazor.min.js" defer></script>
</head>

 . . .
 
</html>
````

>caption Reference the Telerik assets from the cloud in a `Server-side` app

````CSHTML
<!DOCTYPE html>
<html>
<head>
    . . .
    <!-- Choose only one of the themes -->
    
    <link rel="stylesheet" href="https://unpkg.com/@@progress/kendo-theme-default@@latest/dist/all.css" />
    
    <!-- 
        <link href="https://unpkg.com/@@progress/kendo-theme-bootstrap@@latest/dist/all.css" rel="stylesheet" />
        <link href="https://unpkg.com/@@progress/kendo-theme-material@@latest/dist/all.css" rel="stylesheet" />
    -->
    
    <script src="https://kendo.cdn.telerik.com/blazor/{{site.uiForBlazorLatestVersion}}/telerik-blazor.min.js" defer></script>
</head>

 . . .
 
</html>
````

>important Make sure that the version in the JS file URL matches the version of the Telerik UI for Blazor package.

>note You may want to monitor the [release notes](https://www.telerik.com/support/whats-new/blazor-ui/release-history) to see when a release uses newer Themes. This will let you point the CDN to a particular version of the themes that is tested and supported with this release, instead of `@latest`. If you don't upgrade for longer periods of time, cumulative changes in the themes may cause the `@latest` to have issues with old rendering from old versions. You can also find the Themes releases and their dates in the [Themes Repo Releases section](https://github.com/telerik/kendo-themes/releases) to match them against the Telerik UI for Blazor releases.

>tip If you decide to use a CDN over static assets, you may want to implement a [fallback]({%slug common-kb-cdn-fallback%}) in case it is unavailable to your users.

>note We are considering a better CDN option for the themes. Until then, you can use the unpkg workaround above, or local dependency management as described below.

#end



#vsx-download
You can get them from the:

* [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=TelerikInc.TelerikBlazorVSExtensions) (for Windows)
* [Telerik UI for Blazor automated installer]({%slug installation/msi%}) (for Windows and Mac)
* Your [Telerik.com account](https://www.telerik.com/account/product-download?product=BLAZOR) - the `.mpack` file for VS for Mac

#end



#valuebind-vs-databind-link
For details on Value Binding and Data Binding, and the differences between them, see the [Value Binding vs Data Binding]({%slug get-started-value-vs-data-binding%}) article.
#end