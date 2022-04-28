---
title: Localization
page_title: Localization
description: The Telerik UI for Blazor suite lets you translate its UI elements into the desired language. This includes texts of buttons, filter operators, WAI-ARIA attributes and so on.
slug: globalization-localization
tags: telerik,blazor,localization
published: True
position: 1
---

# Localization

Localization (L10N) is the process of customizing an app for a given language and region. The Telerik UI for Blazor suite lets you translate its UI elements into the desired language. This includes texts of buttons, filter operators, WAI-ARIA attributes and so on. This article will show you how to use this feature in your application:


1. [How Localization Works in the Telerik Components](#how-localization-works-in-the-telerik-components)
1. [How to Enable Localization in Your App](#how-to-enable-localization-in-your-app)
	* [Sample Projects](#sample-projects)

## How Localization Works in the Telerik Components

The Telerik UI for Blazor components use a set of keys that a localization service resolves to the strings that will be rendered in the UI. The format of the keys is `<ComponentName>_<MessageKey>`. Out of the box, the Telerik NuGet package carries a `.resx` file with the default (English) strings. It is used internally if no app-specific service is provided.

You can find the list of keys in the following places:

* In the [API reference](../api/Telerik.Blazor.Resources.Messages.html)
* In the `Resources/TelerikMessages.resx` file in the offline Demos installation (under a path like `C:\Program Files (x86)\Progress\Telerik UI for Blazor <YOUR VERSION>\demos\TelerikBlazorDemos\Resources`). There you can also see the default English values.

Telerik provides and supports the default English texts. The offline demos carry a few resource files with translations in several languages that are provided as-is, and you can use them as base for implementing your own.

>tip You can find translations provided by the community, or contribute your own, in the following repository: <a href="https://github.com/telerik/blazor-ui-messages" target="_blank">UI for Blazor: Translation of TelerikMessages</a>


## How to Enable Localization in Your App

When localizing a Blazor app, make sure you are familiar with the way localization works in the framework. You can start from the following resources:

* [Globalization and Localization in Blazor](https://docs.microsoft.com/en-us/aspnet/core/blazor/globalization-localization)
* [Localization in ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/localization)

### Sample Projects

You can find sample runnable projects for both server-side Blazor and for WebAssembly in the [Telerik Blazor UI Samples Repo](https://github.com/telerik/blazor-ui/tree/master/common/localization/):

* <a href="https://github.com/telerik/blazor-ui/tree/master/common/localization/ServerLocalizationResx" target="_blank"><strong>Server-side Blazor App Localization Sample Project</strong></a>

* <a href="https://github.com/telerik/blazor-ui/tree/master/common/localization/ClientLocalizationResx" target="_blank"><strong>WebAssembly (Client-side Blazor) App Localization Sample Project</strong></a>

You can also find an example server-side implementation in our offline demos project that are available your Telerik UI for Blazor installation (both [automated](../installation/automated) and [zip](../installation/zip)).


### Walkthrough - How to Add Globalization and Localization to a Server-side Blazor App

>note This section will show a tutorial on how to add globalization and localization to a server-side Blazor app. For a WebAssemly app, chek out the [ClientLocalizationResx sample project](https://github.com/telerik/blazor-ui/tree/master/common/localization/ClientLocalizationResx). The majority of the code is to enable localization in the app itself, the Telerik-specific portion is the same in both WebAssembly and server-side Blazor apps - implementing a service to return the translated strings.

The necessary steps are to:

1. Enable the .NET Core localization services.

1. Implement the UI culture storage (for example, a cookie).

1. Optionally, add UI that will let the user change the culture so you can test how this works (for example, a dropdownlist that will redirect to the appropriate controller). Alternatively, you can hardcode the `options.DefaultRequestCulture` in the `ConfigureServices` method inside `Startup.cs` when generating the options for the framework localization service.

1. Implement a service for localizing the Telerik components - it must return the desired string based on the current culture and the requested key (see the explanations above).



>note When following this tutorial to add localization to an existing app, make sure to compare the configuration you are copying so that you do not remove configuration necessary for your app. Code comments and regions explain details.

>caption Step 1 - Example for enabling localization in the app

* `Startup.cs` for .NET 3.x and .NET 5
* `Program.cs` for .NET 6

<div class="skip-repl"></div>
````Startup.cs
public class Startup
{
    // This method gets called by the runtime. Use this method to add services to the container.
    // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
    public void ConfigureServices(IServiceCollection services)
    {
        #region Localization

        services.AddControllers();
        services.AddLocalization(options => options.ResourcesPath = "Resources");
        services.Configure<RequestLocalizationOptions>(options =>
        {
            // define the list of cultures your app will support
            var supportedCultures = new List<CultureInfo>()
        {
            new CultureInfo("en-US"),
            new CultureInfo("fr-FR"),
            new CultureInfo("bg-BG")
        };

            // set the default culture
            options.DefaultRequestCulture = new RequestCulture("en-US");

            options.SupportedCultures = supportedCultures;
            options.SupportedUICultures = supportedCultures;
        });

        // the custom localizer service is registered later, after the Telerik services

        #endregion

        services.AddRazorPages();
        services.AddServerSideBlazor();


        services.AddTelerikBlazor();
        // register a custom localizer for the Telerik components, after registering the Telerik services
        services.AddSingleton(typeof(ITelerikStringLocalizer), typeof(SampleResxLocalizer));


        services.AddSingleton<WeatherForecastService>();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        #region Localization
        
        app.UseRequestLocalization(app.ApplicationServices.GetService<IOptions<RequestLocalizationOptions>>().Value);
        
        #endregion
        
        // the rest is just a sample app configuration

        app.UseResponseCompression();

        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        else
        {
            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            app.UseHsts();
        }

        app.UseHttpsRedirection();

        app.UseStaticFiles();

        app.UseRouting();

        app.UseEndpoints(endpoints =>
        {
            // enable controllers for the culture controller
            endpoints.MapControllers();

            endpoints.MapBlazorHub();
            endpoints.MapFallbackToPage("/_Host");
        });
    }
}
````
````Program.cs
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddServerSideBlazor();
builder.Services.AddTelerikBlazor();
// Example of how to register a service in the project (add only if such exists)
builder.Services.AddSingleton<WeatherForecastService>();

// register a custom localizer for the Telerik components, after registering the Telerik services
builder.Services.AddSingleton(typeof(ITelerikStringLocalizer), typeof(SampleResxLocalizer));

#region Localization

builder.Services.AddControllers();
builder.Services.AddLocalization(options => options.ResourcesPath = "Resources");
builder.Services.Configure<RequestLocalizationOptions>(options =>
{
    // define the list of cultures your app will support
    var supportedCultures = new List<CultureInfo>()
            {
                new CultureInfo("en-US"),
                new CultureInfo("de-DE"),
                new CultureInfo("es-ES"),
                new CultureInfo("bg-BG")
            };

    // set the default culture
    options.DefaultRequestCulture = new RequestCulture("en-US");

    options.SupportedCultures = supportedCultures;
    options.SupportedUICultures = supportedCultures;
});

// the custom localizer service is registered later, after the Telerik services

#endregion

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

#region Localization

app.UseRequestLocalization(app.Services.GetService<IOptions<RequestLocalizationOptions>>().Value);

#endregion

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.MapControllers();
app.MapBlazorHub();
app.MapFallbackToPage("/_Host");

app.Run();

````

>caption Step 2 - Sample controller for changing the thread UI culture and redirecting the user (a redirect is required by the framework)

````CS
[Route("[controller]/[action]")]
public class CultureController : Controller
{
    public IActionResult SetCulture(string culture, string redirectUri)
    {
        if (culture != null)
        {
            HttpContext.Response.Cookies.Append(
                CookieRequestCultureProvider.DefaultCookieName,
                CookieRequestCultureProvider.MakeCookieValue(new RequestCulture(culture, culture)));
        }

        return LocalRedirect(redirectUri);
    }

    public IActionResult ResetCulture(string redirectUri)
    {
        HttpContext.Response.Cookies.Delete(CookieRequestCultureProvider.DefaultCookieName);

        return LocalRedirect(redirectUri);
    }
}
````

>caption Step 2 (continued) - Use a cookie to store the culture choice of the user.

* `~/Pages/_Host.cshtml` for .NET 3.x and .NET 5
* `~/Pages/_Layout.cshtml` for .NET 6

<div class="skip-repl"></div>
````_Host.cshtml
@using Microsoft.AspNetCore.Localization
@using System.Globalization

. . . .
<body>
    @{
        this.HttpContext.Response.Cookies.Append(CookieRequestCultureProvider.DefaultCookieName,
            CookieRequestCultureProvider.MakeCookieValue(new RequestCulture(CultureInfo.CurrentCulture, CultureInfo.CurrentUICulture))
        );
    }
    
    <app>
        <component type="typeof(App)" render-mode="ServerPrerendered" />
    </app>
    
. . . .
    
</body>
````
````_Layout.cshtml
@using Microsoft.AspNetCore.Localization
@using System.Globalization

. . . .
<body>
    @* Culture cookie start *@

    @{
        this.Context.Response.Cookies.Append(CookieRequestCultureProvider.DefaultCookieName,
            CookieRequestCultureProvider.MakeCookieValue(new RequestCulture(CultureInfo.CurrentCulture, CultureInfo.CurrentUICulture))
        );
    }

    @* Culture cookie end *@

    @RenderBody()
    
. . . .
    
</body>
````

>caption Step 3 - Sample UI component for changing cultures

````
@using System.Threading

@inject NavigationManager NavigationManager

<div style="margin-bottom: 20px;">
    Select your language:
    <TelerikDropDownList Data="@Cultures"
                         Value="@SelectedCulture"
                         ValueChanged="@((string value) => { OnValueChanged(value); })"
                         TextField="@nameof(CultureData.Text)"
                         ValueField="@nameof(CultureData.Value)">
        <DropDownListSettings>
            <DropDownListPopupSettings Height="auto" />
        </DropDownListSettings>
    </TelerikDropDownList>
    <br />
    Current UI culture (used for localization): @Thread.CurrentThread.CurrentUICulture.Name
    <br />
    Current thread culture (used for date and number formatting): @Thread.CurrentThread.CurrentCulture.Name
</div>

@code{
    public class CultureData
    {
        public string Text { get; set; }
        public string Value { get; set; }
    }

    public List<CultureData> Cultures { get; set; } = new List<CultureData>()
    {
        new  CultureData() { Text = "English", Value = "en-US" },
        new  CultureData() { Text = "French", Value = "fr-FR" },
        new  CultureData() { Text = "Bulgarian", Value = "bg-BG" },
    };

    public string SelectedCulture { get; set; } = Thread.CurrentThread.CurrentUICulture.Name;

    public void OnValueChanged(string eventArgs)
    {
        SelectedCulture = eventArgs;

        SetCulture(eventArgs);
    }

    public void SetCulture(string culture)
    {
        var uri = new Uri(NavigationManager.Uri).GetComponents(UriComponents.PathAndQuery, UriFormat.Unescaped);
        var query = $"?culture={Uri.EscapeDataString(culture)}&redirectUri={Uri.EscapeDataString(uri)}";

        // use a path that matches your culture redirect controller from the previous steps
        NavigationManager.NavigateTo($"{NavigationManager.BaseUri}Culture/SetCulture{query}", forceLoad: true);
    }
}
````

>caption Step 4 - Sample Telerik localization service implementation - this example relies on a `~/Resources` folder with the necessary `.resx` files.

>tip You must implement the indexer only. You can obtain the needed strings from any source you prefer and that matches your application needs, such as database, `resx` files, `json` files, hash tables, and so on.

````CS
using Telerik.Blazor.Services;

public class SampleResxLocalizer : ITelerikStringLocalizer
{
    // this is the indexer you must implement
    public string this[string name]
    {
        get
        {
            return GetStringFromResource(name);
        }
    }

    // sample implementation - uses .resx files in the ~/Resources folder named TelerikMessages.<culture-locale>.resx
    public string GetStringFromResource(string key)
    {
        return Resources.TelerikMessages.ResourceManager.GetString(key, Resources.TelerikMessages.Culture); ;
    }
}
````

>caption Step 4 (continued) - Add `.resx` files to the `~/Resources` folder

In this example the files must be named `~/Resources/TelerikMessages.<culture-locale>.resx`, for example `TelerikMessages.bg-BG.resx`. You can use different names (for example, in our demos we use `TelerikMessages.resx`). The file names affect the static class that is generated and how you use it in your code (for example, to localize other elements you define yourself, such as grid command buttons or your own buttons).

It is required that you add the resource file provided in your Telerik UI for Blazor installation that matches the version used in your project. This is the file that contains the current set of localizable strings and whose designer file must be generated by the build.

Make sure to:

* Mark the `resx` files as `Embedded Resource` (right click > Properties > Build Action).
* Have the following in your `ProjectName.csproj` file so the designer file is generated. It should be added when you add the main messages file, or when you open and save it. Copy the snippet in case it is not added. If the `Designer` file does not get generated, open the `resx` file in Visual Studio and toggle its `Access Modifier` to `Public`.

    **XML**
    
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


## See Also

  * [Globalization Overview]({%slug globalization-overview%})
