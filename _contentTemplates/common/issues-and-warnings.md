
#mono-linker-issue
Open the Client `.csproj` file and ensure that the following switch is present. At the moment the IL Linker needs to be disabled because of an issue where it strips aggressively extension methods.

    **.csproj**
    
        <PropertyGroup>
            <!-- there may be other elements here -->
            <BlazorLinkOnBuild>false</BlazorLinkOnBuild>
        </PropertyGroup>

#end



#valuechanged-lambda-required
>note The lambda expression in the handler is required by the framework: [https://github.com/aspnet/AspNetCore/issues/12226](https://github.com/aspnet/AspNetCore/issues/12226).
#end


#component-does-not-re-render
>note For performance reasons, the component does not re-render after this event, even though it is an `EventCallback`. This means that you cannot change its settings such as dimensions, or settings/parameters of child components in it.
#end

