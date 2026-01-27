---
title: Localize Selected Localization Keys with Custom Strings
description: How to modify selected localized strings without maintaining the complete version of the localization resource files
type: how-to
page_title: Localize selected localization keys with custom strings
slug: common-kb-localize-selected-localization-keys
position:
tags: telerik, blazor, localization, key, resources, files, partial, string
ticketid: 1601981, 1607465, 1604787, 1608599
res_type: kb
components: ["general"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>UI for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

This knowledge base article addresses the following scenarios.

* If I want to change a single localized string, is there any mechanism to fall back to component integrated localization? 

* Is there a way to not maintain a complete version of your localization files across all Telerik versions only because I want to change a single string? 

* How to achieve partial localization? 

* If I use a limited part of a component, I want to avoid providing and maintaining a full set of localized resources.

## Solution

To localize selected keys with custom strings:

1. Create a project with Telerik UI for Blazor. For detailed instructions, see:
    * [Getting Started with Blazor WebAssembly Standalone App](slug:getting-started/client-side)
    * [Getting Started with Blazor Web App](slug:getting-started/web-app)
2. Create a `Services` folder and implement the Telerik localization service with a list of all needed localization keys and their corresponding custom strings. The service also relies on a `~/Resources` folder with the necessary `.resx` files. You can find an up-to-date list of the used strings in the [Blazor API documentation](slug:Telerik.Blazor.Resources.Messages) and the [offline version](https://www.telerik.com/account/my-downloads) of the [Blazor Demo solution](https://demos.telerik.com/blazor-ui). Telerik updates the main `TelerikMessages.resx` file (in English) with each new release.
    >caption ResxLocalizer.cs
    
    <div class="skip-repl"></div>

    ````RAZOR
    using Telerik.Blazor.Services;

    public class ResxLocalizer : ITelerikStringLocalizer
    {
        private readonly ITelerikStringLocalizer _fallback;

        // Here is the list of the desired localization keys with their custom string values.
        private Dictionary<string, string> _ownStrings = new Dictionary<string, string>()
        {
            { "Wizard_Next", "Your Custom Text" }
        };

        public ResxLocalizer()
        {
            // This is your public implementation of ITelerikStringLocalizer!
            _fallback = new TelerikStringLocalizer();
        }

        public string this[string name]
        {
            get
            {
                if (_ownStrings?.ContainsKey(name) ?? false)
                {
                    return _ownStrings[name];
                }
                else
                {
                    return _fallback[name];
                }
            }
        }
    }
    ````
3. Modify the `Program.cs` file and register the custom localizer.
    >caption Program.cs

    <div class="skip-repl"></div>

    ````RAZOR
    var builder = WebApplication.CreateBuilder(args);

    // Add services to the container.
    builder.Services.AddRazorPages();
    builder.Services.AddServerSideBlazor();
    builder.Services.AddTelerikBlazor();
    // Example of how to register a service in the project (add only if such exists)
    builder.Services.AddSingleton<WeatherForecastService>();

    // After registering the Telerik services, register a custom localizer for the Telerik components.
    builder.Services.AddSingleton(typeof(ITelerikStringLocalizer), typeof(ResxLocalizer));

    var app = builder.Build();

    // Configure the HTTP request pipeline.
    if (!app.Environment.IsDevelopment())
    {
        app.UseExceptionHandler("/Error");
        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
        app.UseHsts();
    }

    app.UseHttpsRedirection();

    app.UseStaticFiles();

    app.UseRouting();

    app.MapControllers();
    app.MapBlazorHub();
    app.MapFallbackToPage("/_Host");

    app.Run();
    ````
4. (optional) Add the desired `.resx` files to the `~/Resources` folder.

    * Name the files like this `~/Resources/TelerikMessages.<culture-locale>.resx`, for example `TelerikMessages.bg-BG.resx`. You can use different names (for example, in our demos we use `TelerikMessages.resx`). The file names affect the static class that is generated and how you use it in your code (for example, to localize other elements you define yourself, such as grid command buttons or your own buttons).

    * Make sure to add the resource file provided in your Telerik UI for Blazor installation that matches the version used in your project. This is the file that contains the current set of localizable strings and whose designer file need to be generated by the build.

    * Make sure to:

    * Mark the `.resx` files as `Embedded Resource` (right click > Properties > Build Action).
    * Have the following in your `ProjectName.csproj` file so the designer file is generated. It should be added when you add the main messages file, or when you open and save it. Copy the snippet in case it is not added. If the Designer file does not get generated, open the `.resx` file in Visual Studio and toggle its `Access Modifier` to `Public`.
    >caption XML

    <div class="skip-repl"></div>

    ````RAZOR
    <ItemGroup>
        <Compile Update="Resources\TelerikMessages.designer.cs">
        <DesignTime>True</DesignTime>
        <AutoGen>True</AutoGen>
        <DependentUpon>TelerikMessages.resx</DependentUpon>
        </Compile>
    </ItemGroup>

    <ItemGroup>
        <EmbeddedResource Update="Resources\TelerikMessages.resx">
        <Generator>PublicResXFileCodeGenerator</Generator>
        <LastGenOutput>TelerikMessages.Designer.cs</LastGenOutput>
        </EmbeddedResource>
    </ItemGroup>
    ````

## See Also

* [Localization](slug:globalization-localization)
