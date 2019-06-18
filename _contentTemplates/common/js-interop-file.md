#add-blazor-js-file-to-component
 add the `telerik-blazor.js` file to your main index file. For a client-side Blazor app, it is `wwwroot/index.html`, and for a server-side Blazor app it is `~/Pages/Index.cshtml`. For example:

@[template](/_contentTemplates/common/js-interop-file.md#js-interop-file-snippet)

#end

#add-js-interop-file-to-getting-started-client
 add the `telerik-blazor.js` file to your main index file - `wwwroot/index.html`:

@[template](/_contentTemplates/common/js-interop-file.md#js-interop-file-snippet)
#end

#add-js-interop-file-to-getting-started-server
 add the `telerik-blazor.js` file to your main index file - `~/Pages/_Host.cshtml`:

@[template](/_contentTemplates/common/js-interop-file.md#js-interop-file-snippet)
#end

#js-interop-file-snippet
    **HTML**

        <head>
          . . .
          <script src="_content/telerikuiforblazor/js/telerik-blazor.js" defer></script>
        </head>

    As of version `1.2.0` we no longer maintain a CDN with the JS Interop file. If you would like to serve it from a cloud, save its contents and create a CDN of your choice.
#end

