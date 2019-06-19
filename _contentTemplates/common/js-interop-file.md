#add-blazor-js-file-to-component
 Add the `telerik-blazor.js` file to your main index file. For a client-side Blazor app, it is `wwwroot/index.html`, and for a server-side Blazor app it is `~/Pages/Index.cshtml`.

@[template](/_contentTemplates/common/js-interop-file.md#js-interop-file-snippet)

#end

#add-js-interop-file-to-getting-started-client
 add the `telerik-blazor.js` file to your main index file - `wwwroot/index.html`:

@[template](/_contentTemplates/common/js-interop-file.md#js-interop-file-snippet)

    >note @[template](/_contentTemplates/common/js-interop-file.md#static-asset-issue-in-pure-client-project)
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

#end

#static-asset-issue-in-pure-client-project
This static asset works for server-side and ASP.NET Core hosted client-side project types. If you use a purely client-side model, you must reference the script from our CDN, because of [an issue in the framework](https://github.com/aspnet/AspNetCore/issues/10986): `https://kendo.cdn.telerik.com/blazor/1.2.0/telerik-blazor.min.js`. Make sure that the version in the URL matches the version of the Telerik Blazor package used in your project.
#end

