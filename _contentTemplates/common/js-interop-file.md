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
 Add the `telerik-blazor.js` file to your main index file - `~/Pages/_Host.cshtml`:

    **HTML**
    
@[template](/_contentTemplates/common/js-interop-file.md#js-interop-file-snippet)

@[template](/_contentTemplates/common/js-interop-file.md#enable-static-assets)
#end

#js-interop-file-snippet
        <head>
          . . .
          <script src="_content/Telerik.UI.for.Blazor/js/telerik-blazor.js" defer></script>
          
          <!-- For Trial licenses use
            <script src="_content/Telerik.UI.for.Blazor.Trial/js/telerik-blazor.js" defer></script>
          -->
        </head>
#end


#theme-static-asset-snippet
        <head>
          . . .
            <link rel="stylesheet" href="_content/Telerik.UI.for.Blazor/css/kendo-theme-default/all.css" />
            
            <!-- For Trial licenses use
                <link rel="stylesheet" href="_content/Telerik.UI.for.Blazor.Trial/css/kendo-theme-default/all.css" />
              -->
        </head>
#end

#enable-static-assets
    To enable the use of static assets in your project, add the following line to the `Startup.cs` file in the **Server** project:


    **C#**
    
@[template](/_contentTemplates/common/js-interop-file.md#enable-static-assets-snippet)

#end

#enable-static-assets-snippet
        // Startup.cs
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
#end



#app-paths
 Add the following to your main index file. For a server-side Blazor app it is `~/Pages/_Host.cshtml`, and for a client-side Blazor app, it is `wwwroot/index.html`.
#end

