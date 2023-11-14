#add-js-interop-file-to-getting-started-client
 Add the `telerik-blazor.js` file to your main index file - `wwwroot/index.html`:

    **HTML**
    
@[template](/_contentTemplates/common/js-interop-file.md#js-interop-file-snippet)

@[template](/_contentTemplates/common/js-interop-file.md#enable-static-assets)
#end

#add-js-interop-file-to-getting-started-server
 Add the `telerik-blazor.js` file to your main index file:
 
 * `~/Pages/_Host.cshtml` for .NET 3.x and .NET 7
 * `~/Pages/_Layout.cshtml` for .NET 6

    **HTML**

@[template](/_contentTemplates/common/js-interop-file.md#js-interop-file-snippet)

@[template](/_contentTemplates/common/js-interop-file.md#enable-static-assets)
#end

#js-interop-file-snippet
````
<head>
    . . .
    <script src="_content/Telerik.UI.for.Blazor/js/telerik-blazor.js" defer></script>

    <!-- For Trial licenses, use
      <script src="_content/Telerik.UI.for.Blazor.Trial/js/telerik-blazor.js" defer></script>
    -->
</head>
````
#end

#theme-static-asset-snippet
````
<head>
    . . .
    <link rel="stylesheet" href="_content/Telerik.UI.for.Blazor/css/kendo-theme-default/all.css" />

    <!-- For Trial licenses, use
        <link rel="stylesheet" href="_content/Telerik.UI.for.Blazor.Trial/css/kendo-theme-default/all.css" />
      -->
</head>
````
#end

#enable-static-assets
    To enable the use of static assets in your project, add the following line to the `Program.cs` file in the **Server** project:


    **C#**
    
@[template](/_contentTemplates/common/js-interop-file.md#enable-static-assets-snippet)

#end

#enable-static-assets-snippet
<div class="skip-repl"></div>
````Program.cs
var app = builder.Build();

// ...

//To enable static files from a package, make sure this is present.
app.UseStaticFiles();

// ...

app.Run();
````
#end

#register-telerik-service-server
<div class="skip-repl"></div>
````
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
````.NET_6_and_.NET_7
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