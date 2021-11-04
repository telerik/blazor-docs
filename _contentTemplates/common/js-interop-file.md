#add-blazor-js-file-to-component
@[template](/_contentTemplates/common/js-interop-file.md#app-paths)

@[template](/_contentTemplates/common/js-interop-file.md#js-interop-file-snippet)

#end

#add-js-interop-file-to-getting-started-client
 Add the `telerik-blazor.js` file to your main index file - `wwwroot/index.html`:

    **HTML**
    
@[template](/_contentTemplates/common/js-interop-file.md#js-interop-file-snippet)

@[template](/_contentTemplates/common/js-interop-file.md#enable-static-assets)
#end

#add-js-interop-file-to-getting-started-server
 Add the `telerik-blazor.js` file to your main index file:
 
 * `~/Pages/_Host.cshtml` for .NET 3.x - .NET 5
 * `~/Pages/_Layout.cshtml` for .NET 6

    **HTML**

@[template](/_contentTemplates/common/js-interop-file.md#js-interop-file-snippet)

@[template](/_contentTemplates/common/js-interop-file.md#enable-static-assets)
#end

#js-interop-file-snippet-server
````_Host.cshtml
<head>
    . . .
    <script src="_content/Telerik.UI.for.Blazor/js/telerik-blazor.js" defer></script>

    <!-- For Trial licenses use
      <script src="_content/Telerik.UI.for.Blazor.Trial/js/telerik-blazor.js" defer></script>
    -->
</head>
````
````_Layout.cshtml
<head>
    . . .
    <script src="_content/Telerik.UI.for.Blazor/js/telerik-blazor.js" defer></script>

    <!-- For Trial licenses use
      <script src="_content/Telerik.UI.for.Blazor.Trial/js/telerik-blazor.js" defer></script>
    -->
</head>
````
#end

#js-interop-file-snippet-client
````
<head>
    . . .
    <script src="_content/Telerik.UI.for.Blazor/js/telerik-blazor.js" defer></script>

    <!-- For Trial licenses use
      <script src="_content/Telerik.UI.for.Blazor.Trial/js/telerik-blazor.js" defer></script>
    -->
</head>
````
#end

#theme-static-asset-snippet-server
````_Host.cshtml
<head>
    . . .
    <link rel="stylesheet" href="_content/Telerik.UI.for.Blazor/css/kendo-theme-default/all.css" />

    <!-- For Trial licenses use
        <link rel="stylesheet" href="_content/Telerik.UI.for.Blazor.Trial/css/kendo-theme-default/all.css" />
      -->
</head>
````
````_Layout.cshtml
<head>
    . . .
    <link rel="stylesheet" href="_content/Telerik.UI.for.Blazor/css/kendo-theme-default/all.css" />

    <!-- For Trial licenses use
        <link rel="stylesheet" href="_content/Telerik.UI.for.Blazor.Trial/css/kendo-theme-default/all.css" />
      -->
</head>
````
#end

#theme-static-asset-snippet-client
````
<head>
    . . .
    <link rel="stylesheet" href="_content/Telerik.UI.for.Blazor/css/kendo-theme-default/all.css" />

    <!-- For Trial licenses use
        <link rel="stylesheet" href="_content/Telerik.UI.for.Blazor.Trial/css/kendo-theme-default/all.css" />
      -->
</head>
````
#end

#enable-static-assets
    To enable the use of static assets in your project, add the following line to the `Startup.cs` file in the **Server** project:


    **C#**
    
@[template](/_contentTemplates/common/js-interop-file.md#enable-static-assets-snippet)

#end

#enable-static-assets-snippet
````Startup.cs
namespace MyBlazorAppName
        {
            public class Startup
            {
                public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
                {
                    //more code may be present here

                    //make sure this is present to enable static files from a package
                    app.UseStaticFiles();

                    //more code may be present here
                }
            }
        }
````
````Program.cs

//more code may be present here

//make sure this is present to enable static files from a package
app.UseStaticFiles();

//more code may be present here                
````
#end



#app-paths
 Add the following to your main index file:

* Client-Side Blazor app - `wwwroot/index.html`
 * Server-Side Blazor app
    * `~/Pages/_Host.cshtml` for .NET 3.x and .NET 5
    * `~/Pages/_Layout.cshtml` for .NET 6
#end

#register-telerik-service-server
````Startup.cs
namespace MyBlazorAppName
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            //more code may be present here
            services.AddTelerikBlazor();
        }

        //more code may be present here
    }
}
````
````Program.cs
//more code may be present here

builder.Services.AddTelerikBlazor();

//more code may be present here                
````
#end

#register-telerik-service-client
````.NET_3.x_and_.NET_5
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.DependencyInjection;
using System.Threading.Tasks;
using System.Net.Http;
using System;
        
namespace ClientBlazorProject.Client // make sure this matches your actual WASM project namespace
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            // sample host builder for a WASM app, yours may differ
            var builder = WebAssemblyHostBuilder.CreateDefault(args);
            builder.RootComponents.Add<App>("app");
            builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
            // there may be more code here

            // register the Telerik services
            builder.Services.AddTelerikBlazor();

            // there may be more code here
            // sample host builder for a WASM app, yours may differ
            await builder.Build().RunAsync();
        }
    }
}
````
````.NET_6
using ClientBlazorProject;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

// sample host builder for a WASM app, yours may differ
var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

// register the Telerik services
builder.Services.AddTelerikBlazor();

await builder.Build().RunAsync();
````
#end