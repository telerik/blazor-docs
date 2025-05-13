#add-js-interop-file-to-getting-started-client
 Add the `telerik-blazor.js` file to the `<head>` of your main index file - `wwwroot/index.html`:

    **HTML**
    
@[template](/_contentTemplates/common/js-interop-file.md#js-interop-file-snippet)

#end

#add-js-interop-file-to-getting-started-server
 Add the `telerik-blazor.js` file to your main index file:
 
 * `~/Pages/_Host.cshtml` for .NET 3.x and .NET 7
 * `~/Pages/_Layout.cshtml` for .NET 6

    **HTML**

@[template](/_contentTemplates/common/js-interop-file.md#js-interop-file-snippet)

#end

#js-interop-file-snippet
````HTML
<head>
    . . .
    <script src="_content/Telerik.UI.for.Blazor/js/telerik-blazor.js"></script>
</head>
````
#end

#theme-static-asset-snippet
````HTML
<head>
    . . .
    <link rel="stylesheet" href="_content/Telerik.UI.for.Blazor/css/kendo-theme-default/all.css" />
</head>
````
#end

#register-telerik-service-server
<div class="skip-repl"></div>
````C#
// ...

var builder = WebApplication.CreateBuilder(args);

// ...

builder.Services.AddTelerikBlazor();

// ...

var app = builder.Build();
````
#end

#register-telerik-service-client
<div class="skip-repl"></div>
````C#
using ClientBlazorProject;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

// sample host builder for a WASM app, yours may differ
var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

// Register the Telerik services.
builder.Services.AddTelerikBlazor();

await builder.Build().RunAsync();
````
#end