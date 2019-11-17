---
title: Localization
page_title: Localization
description: Localization texts in the Telerik UI for Blazor suite.
slug: globalization-localization
tags: telerik,blazor,localization
published: True
position: 1
---

# Localization

Localization (L10N) is the process of customizing an app for a given language and region. The Telerik UI for Blazor suite lets you translate its UI elements into the desired language. This includes texts of buttons, filter operators, WAI-ARIA attributes and so on. This article will show you how to use this feature in your application:

1. [How Localization Works in the Telerik Components](#how-localization-works-in-the-telerik-components)
1. [How to Enable Localization in Your App](#how-to-enable-localization-in-your-app)

## How Localization Works in the Telerik Components

The Telerik UI for Blazor components use a set of keys that a localization service resolves to the strings that will be rendered in the UI. The format of the keys is `<ComponentName>_<MessageKey>`. Out of the box, the Telerik NuGet package carries a `.resx` file with the default (English) strings. It is used internally if no app-specific service is provided.

You can find the list of keys (and their default values) by inspecting the `Resources/Messages.resx` file. You can find it in the NuGet package itself, and in the offline Demos installation (under a path like `C:\Program Files (x86)\Progress\Telerik UI for Blazor 2.4.0\demos\TelerikBlazorDemos\Resources`). Make sure to refer to the version you are currently using, because newer versions may have more keys than old versions as more components and features are added to the suite.

Telerik provides and supports the default English texts. The offline demos carry a few resource files with translations in several languages that are provided as-is, and you can use them as base for implementing your own.


## How to Enable Localization in Your App

When localizing a Blazor app, make sure you are familiar with the way localization works in the framework. You can start from the following resources:

* [https://docs.microsoft.com/en-us/aspnet/core/fundamentals/localization?view=aspnetcore-3.0](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/localization?view=aspnetcore-3.0)
* [https://github.com/aspnet/AspNetCore.Docs/issues/13436](https://github.com/aspnet/AspNetCore.Docs/issues/13436)

The necessary steps are to:

1. Enable the .NET Core localization services.
1. Implement the UI culture storage (for example, a cookie).
1. Optionally, add UI that will let the user change the culture so you can test how this works (for example, a dropdownlist that will redirect to the appropriate controller). Alternatively, you can hardcode the `options.DefaultRequestCulture` in the `ConfigureServices` method inside `Startup.cs` when generating the options for the framework localization service.
1. Implement a service for localizing the Telerik components - it must return the desired string based on the current culture and the requested key (see the explanations above).

>note The code snippets below will showcase a sample implementation for a server-side app. For a client-side app, some framework configurations my differ and you cannot use `.resx` files because the framework does not support them.

>tip You can find an example implementation in our offline demos project that you can find your Telerik UI for Blazor installation.

>caption Step 1 - Example for enabling localization in the app

````CS
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
                new CultureInfo("de-DE"),
                new CultureInfo("es-ES"),
                new CultureInfo("bg-BG"),
            };

            // set the default culture
            options.DefaultRequestCulture = new RequestCulture("en-US");

            options.SupportedCultures = supportedCultures;
            options.SupportedUICultures = supportedCultures;
        });

        #endregion

        // there may be other services registered here, this is just an example
        services.AddRazorPages();
        services.AddServerSideBlazor();

        services.AddTelerikBlazor();

        // register a custom localizer for the Telerik components
        services.AddSingleton(typeof(ITelerikStringLocalizer), typeof(SampleResxLocalizer));
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
            endpoints.MapDefaultControllerRoute();
            endpoints.MapControllers();

            endpoints.MapBlazorHub();
            endpoints.MapFallbackToPage("/_Host");
        });
    }
}
````

>caption Step 2 -Controller for changing the thread UI culture and redirecting the user (a redirect is required by the framework)

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
                CookieRequestCultureProvider.MakeCookieValue(new RequestCulture("en-US", culture)));
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

>caption Use a cookie to store the culture choice of the user - in this example - in `~/Pages/_Host.cshtml`

````CSHTML
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

>caption Sample UI component for changing cultures

````
@using System.Threading

@inject NavigationManager NavigationManager

<div style="margin-bottom: 20px;">
    Select your language:
    <TelerikDropDownList Data="@Cultures"
                         Value="@SelectedCulture"
                         ValueChanged="@((string value) => { OnValueChanged(value); })"
                         PopupHeight=""
                         TextField="@nameof(CultureData.Text)"
                         ValueField="@nameof(CultureData.Value)">
    </TelerikDropDownList>
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
        new  CultureData() { Text = "German", Value = "de-DE" },
        new  CultureData() { Text = "Spanish", Value = "es-ES" },
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
        NavigationManager.NavigateTo("/blazor-ui/Culture/SetCulture" + query, forceLoad: true);
    }
}
````

>caption Sample Telerik localization service implementation - this example relies on a `~/Resources` folder with the necessary `.resx` files.

>important You must implement the indexer only. You can obtain the needed strings from any source you prefer and that matches you application, such as database, `resx` files (not supported in client-side projects at the time of writing), `json` files, hash tables, and so on.

````CS
public class SampleResxLocalizer : ITelerikStringLocalizer
{
    // this is the indexed you must implement
    public string this[string name]
    {
        get
        {
            return GetStringFromResource(name);
        }
    }

    // sample implementation - uses .resx files in the ~/Resources folder names TelerikMessages.<culture-locale>.resx
    public string GetStringFromResource(string key)
    {
        return Resources.TelerikMessages.ResourceManager.GetString(key, Resources.TelerikMessages.Culture); ;
    }
}
````

>caption Add `.resx` files to the `~/Resources` folder

In this example the files must be named `~/Resources/TelerikMessages.<culture-locale>.resx`, for example `TelerikMessages.bg-BG.resx`. Make sure to 

* mark them as `Embedded Resource`
* add this in your `ProjectName.csproj` file so they are built

````XML
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

  * [Globalization Overview]({%slug globalization-overview%})