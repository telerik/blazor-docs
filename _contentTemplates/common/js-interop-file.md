#add-blazor-js-file-to-component
 add the `telerik-blazor.min.js` file to your main index file. For a client-side Blazor app, it is `wwwroot/index.html`, and for a server-side Blazor app it is `~/Pages/Index.cshtml`. For example:

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
          <script src="https://kendo.cdn.telerik.com/blazor/1.1.1/telerik-blazor.min.js" defer></script>
        </head>

    Make sure that the version in the URL matches the version of the Telerik Blazor package used in your project.
#end

