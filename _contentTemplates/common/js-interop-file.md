#add-blazor-js-file-to-component
@[template](/_contentTemplates/common/js-interop-file.md#app-paths)

@[template](/_contentTemplates/common/js-interop-file.md#js-interop-file-snippet)

#end

#add-js-interop-file-to-getting-started-client
 add the `telerik-blazor.min.js` file to your main index file - `wwwroot/index.html`:

@[template](/_contentTemplates/common/js-interop-file.md#js-interop-file-snippet)

#end

#add-js-interop-file-to-getting-started-server
 add the `telerik-blazor.min.js` file to your main index file - `~/Pages/_Host.cshtml`:

@[template](/_contentTemplates/common/js-interop-file.md#js-interop-file-snippet)
#end

#js-interop-file-snippet
    **HTML**

        <head>
          . . .
          <script src="https://kendo.cdn.telerik.com/blazor/1.3.0/telerik-blazor.min.js" defer></script>
        </head>
        
    Make sure that the version in the URL matches the version of the Telerik UI for Blazor package.

#end

#app-paths
 Add the following to your main index file. For a server-side Blazor app it is `~/Pages/Index.cshtml`, and for a client-side Blazor app, it is `wwwroot/index.html`.
#

