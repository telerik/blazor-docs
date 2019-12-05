
#mono-linker-issue
Add a `Linker.xml` file to the `Client` project with the following content (make sure to use your actual app name at the end):

    **Linker.xml**
    
        <?xml version="1.0" encoding="UTF-8" ?>
        <!--
          This file specifies which parts of the BCL or Blazor packages must not be
          stripped by the IL Linker even if they aren't referenced by user code.
        -->
        <linker>
            <assembly fullname="mscorlib">
                <!--
              Preserve the methods in WasmRuntime because its methods are called by
              JavaScript client-side code to implement timers.
              Fixes: https://github.com/aspnet/Blazor/issues/239
            -->
                <type fullname="System.Threading.WasmRuntime" />
            </assembly>
            <assembly fullname="System.Core">
                <!--
              System.Linq.Expressions* is required by Json.NET and any
              expression.Compile caller. The assembly isn't stripped.
            -->
                <type fullname="System.Linq.Expressions*" />
                <type fullname="System.Linq.Queryable*" />
                <type fullname="System.Linq.Enumerable*" />
                <type fullname="System.Linq.EnumerableRewriter*" />
            </assembly>
            <!--
            In this example, the app's entry point assembly is listed. The assembly
            isn't stripped by the IL Linker.
          -->
            <assembly fullname="ClientBlazorApp.Client" />
        </linker>
        
#end

#more-on-linker
You can read more about configuring the linker in MSDN: [https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/blazor/configure-linker?view=aspnetcore-3.0#control-linking-with-a-configuration-file](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/blazor/configure-linker?view=aspnetcore-3.0#control-linking-with-a-configuration-file).

>caution Without such a linker configuration, the linker strips aggressively extension methods and this breaks our components.
#end



#valuechanged-lambda-required
>note The lambda expression in the handler is required by the framework: [https://github.com/aspnet/AspNetCore/issues/12226](https://github.com/aspnet/AspNetCore/issues/12226).
#