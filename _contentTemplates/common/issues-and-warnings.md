
#mono-linker-issue
Open the Client `.csproj` file and ensure that the following switch is present. At the moment the IL Linker needs to be disabled because of [an issue in Mono](https://github.com/mono/mono/issues/12917).

    **.csproj**
    
        <PropertyGroup>
            <!-- there may be other elements here -->
            <BlazorLinkOnBuild>false</BlazorLinkOnBuild>
        </PropertyGroup>
#end



#valuechanged-lambda-required
>note The lambda expression in the handler is required by the framework: [https://github.com/aspnet/AspNetCore/issues/12226](https://github.com/aspnet/AspNetCore/issues/12226).
#