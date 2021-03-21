
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


#nuget-security-links
You may find useful the following Microsoft articles on securing your NuGet feed setup and supply chain as general best practices:

* <a href="https://devblogs.microsoft.com/nuget/lock-down-your-dependencies-using-configurable-trust-policies/" target="_blank">Lock down your dependencies using configurable trust policies - Blog Post</a>

* <a href="https://devblogs.microsoft.com/nuget/how-to-scan-nuget-packages-for-security-vulnerabilities/" target="_blank">How to Scan NuGet Packages for Security Vulnerabilities - Blog Post</a>

* <a href="https://docs.microsoft.com/en-us/nuget/concepts/security-best-practices" target="_blank">Best practices for a secure software supply chain - MSDN docs</a>

Telerik is working on providing signed packages that you can verify, you can Follow the status of this enhancement <a href="https://feedback.telerik.com/blazor/1510495-provide-signed-nuget-packages" target="_blank">here</a>.
#end