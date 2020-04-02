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

>caption Reference the Telerik assets from the cloud

````ClientApp
<!DOCTYPE html>
<html>
<head>
    . . .
    <link rel="stylesheet" href="https://unpkg.com/@progress/kendo-theme-default@latest/dist/all.css" />
    
    <!-- Choose only one of the themes -->
    <!-- 
        <link href="https://unpkg.com/@progress/kendo-theme-bootstrap@latest/dist/all.css" rel="stylesheet" />
        <link href="https://unpkg.com/@progress/kendo-theme-material@latest/dist/all.css" rel="stylesheet" />
    -->
    
    <script src="https://kendo.cdn.telerik.com/blazor/{{site.uiForBlazorLatestVersion}}/telerik-blazor.min.js" defer></script>
</head>

 . . .
 
</html>
````
````ServerApp
<!DOCTYPE html>
<html>
<head>
    . . .
    <link rel="stylesheet" href="https://unpkg.com/@@progress/kendo-theme-default@@latest/dist/all.css" />
    
    <!-- Choose only one of the themes -->
    <!-- 
        <link href="https://unpkg.com/@@progress/kendo-theme-bootstrap@@latest/dist/all.css" rel="stylesheet" />
        <link href="https://unpkg.com/@@progress/kendo-theme-material@@latest/dist/all.css" rel="stylesheet" />
    -->
    
    <script src="https://kendo.cdn.telerik.com/blazor/{{site.uiForBlazorLatestVersion}}/telerik-blazor.min.js" defer></script>
</head>

 . . .
 
</html>
````

>note Make sure that the version in the JS file URL matches the version of the Telerik UI for Blazor package.

>note We are considering a better CDN option for the themes. Until then, you can use the unpkg workaround above, or local dependency management as described below.

#end