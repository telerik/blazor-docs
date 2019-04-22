#add-blazor-js-file-to-list
 add the `telerik-blazor.min.js` file to your main index file. For a client-side Blazor app, it is `wwwroot/index.html`, and for a server-side Blazor app it is `~/Pages/Index.cshtml`. For example:

    **HTML**

        <head>
          . . .
          <script src="https://kendo.cdn.telerik.com/blazor/0.5.0/telerik-blazor.min.js" defer></script>
        </head>

    Make sure that the version in the URL matches the version of the Telerik Blazor package used in your project.

#end

