#generic-component-event-issue
>warning [.NET Core Issue 8385](https://github.com/aspnet/AspNetCore/issues/8385) is preventing the ValueChanged handler from working at the moment. The code below will work as soon as Microsoft release a fix for this problem. Until then, you may get compilation issue due to the handler presence. We strive to follow best practices and future-proof our components, which is why we are using this approach even though it does not work yet.
#end


#mono-linker-issue
Open the Client `.csproj` file and ensure that the following switch is present. At the moment the IL Linker needs to be disabled because of [an issue in Mono](https://github.com/mono/mono/issues/12917).

    **.csproj**
    
        <PropertyGroup>
            <!-- there may be other elements here -->
            <BlazorLinkOnBuild>false</BlazorLinkOnBuild>
        </PropertyGroup>
#end

#static-asset-issue-in-client-project
Static assets work for Server-side project types only because of [an issue in the framework](https://github.com/aspnet/AspNetCore/issues/10986). If you use a client-side model, you must reference the script from our CDN.
#end