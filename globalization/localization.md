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
1. [Getting Started with Localization in Your App](#getting-started-with-localization-in-your-app)
1. [Sample Projects](#sample-projects)
1. [Walkthrough - How to Add Globalization and Localization to a Server-side Blazor App](#walkthrough---how-to-add-globalization-and-localization-to-a-server-side-blazor-app)

## How Localization Works in the Telerik Components

The Telerik UI for Blazor components use a set of keys that a localization service resolves to the strings that will be rendered in the UI. The format of the keys is `<ComponentName>_<MessageKey>`. Out of the box, the Telerik NuGet package carries a `.resx` file with the default (English) strings. It is used internally if no app-specific service is provided.

You can find the list of keys in the following places:

* In the [`Telerik.Blazor.Resources.Messages` API reference](/blazor-ui/api/Telerik.Blazor.Resources.Messages.html)
* In the `Resources/TelerikMessages.resx` file in our [Blazor demo site](https://demos.telerik.com/blazor-ui/). Download our [UI for Blazor automated installer]({%slug installation/msi%}) or [UI for Blazor ZIP archive]({%slug installation/zip%}). Then, look inside the installation folder, for example `C:\Program Files (x86)\Progress\Telerik UI for Blazor <YOUR VERSION>\demos\TelerikBlazorDemos\Resources`. It contains localization (`.resx`) files for a few different languages.

Telerik provides and supports the default English strings. The other language strings are provided as-is, and you can use them as base for implementing your own.

> Update the localization files every time you upgrade Telerik UI for Blazor. Otherwise you may see [exceptions related to missing localization strings]({%slug common-kb-null-value-parameter-format%}).

>tip You can find translations provided by the community, or contribute your own, in the following repository: <a href="https://github.com/telerik/blazor-ui-messages" target="_blank">UI for Blazor: Translation of TelerikMessages</a>


## Getting Started with Localization in Your App

When localizing a Blazor app, make sure you are familiar with how localization works in the framework. The Telerik components localization configuration builds on top of the standard .NET and Blazor localization. You can start from the following resources:

* [Globalization and Localization in Blazor](https://learn.microsoft.com/en-us/aspnet/core/blazor/globalization-localization)
* [Localization in ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/localization)


## Sample Projects

You can find sample runnable projects for both server-side Blazor and for WebAssembly in the [Telerik Blazor UI Samples Repo](https://github.com/telerik/blazor-ui/tree/master/common/localization/):

* <a href="https://github.com/telerik/blazor-ui/tree/master/common/localization/ServerLocalizationResx" target="_blank"><strong>Server-side Blazor App Localization Sample Project</strong></a>

* <a href="https://github.com/telerik/blazor-ui/tree/master/common/localization/ClientLocalizationResx" target="_blank"><strong>WebAssembly (Client-side Blazor) App Localization Sample Project</strong></a>

You can also find an example server-side implementation in our offline demos project that are available your Telerik UI for Blazor installation (both [automated](../installation/automated) and [zip](../installation/zip)).


## Walkthrough - How to Add Globalization and Localization to a Server-side Blazor App

This section will show a tutorial on how to add globalization and localization to a server-side Blazor app. For a WebAssemly app, chek out the [ClientLocalizationResx sample project](https://github.com/telerik/blazor-ui/tree/master/common/localization/ClientLocalizationResx). The majority of the code is to enable localization in the app itself, the Telerik-specific portion is the same in both WebAssembly and server-side Blazor apps - implementing a service to return the translated strings.

>note When following this tutorial to add localization to an existing app, make sure to compare the configuration you are copying so that you do not remove configuration necessary for your app. Code comments and regions explain details.

### Step 1: Enable the .NET Core Localization Services

Here is an example for enabling localization in the app:

>caption `Program.cs`

<div class="skip-repl"></div>

````CS
var builder = WebApplication.CreateBuilder(args);

// ...

// AddTelerikBlazor() registers the built-in service that includes only the default English labels.
// The actual localizer for the Telerik components must be registered after the line below.
builder.Services.AddTelerikBlazor();

#region Localization Part 1

// Register your Telerik component localizer after the built-in Telerik services above.
builder.Services.AddSingleton(typeof(ITelerikStringLocalizer), typeof(SampleResxLocalizer));

// Standard .NET localization code
builder.Services.AddControllers();
builder.Services.AddLocalization(options => options.ResourcesPath = "Resources");
builder.Services.Configure<RequestLocalizationOptions>(options =>
{
    // The list of cultures that the app will support.
    var supportedCultures = new List<CultureInfo>()
            {
                new CultureInfo("en-US"),
                new CultureInfo("de-DE"),
                new CultureInfo("es-ES"),
                new CultureInfo("bg-BG")
            };

    // Set the default culture.
    options.DefaultRequestCulture = new RequestCulture("en-US");

    options.SupportedCultures = supportedCultures;
    options.SupportedUICultures = supportedCultures;
});

#endregion Localization Part 1

var app = builder.Build();

#region Localization Part 2

// Standard .NET localization code
app.UseRequestLocalization(app.Services.GetService<IOptions<RequestLocalizationOptions>>().Value);

#endregion Localization Part 2

// ...

app.Run();
````

### Step 2: Implement the UI Culture Storage (for example, a cookie)

Sample controller for changing the thread UI culture and redirecting the user (a redirect is required by the framework):

<div class="skip-repl"></div>

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

Use a cookie to store the culture choice of the user. Add the cookie in the index file of your app. Depending on the Blazor hosting model and framework version, this index file will differ:

   * For Client-Side and Blazor Hybrid apps, use the `wwwroot/index.html` file.
   * For Server-Side Blazor apps, use one of the following files:
      * `~/Pages/_Layout.cshtml` for .NET 6
      * `~/Pages/_Host.cshtml` for .NET 7
   * For Web App projects targeting .NET 8, use the `~/Components/App.razor`.


<div class="skip-repl"></div>

````CSHTML
@using Microsoft.AspNetCore.Localization
@using System.Globalization

<!-- ... -->

<body>
    @{
        this.HttpContext.Response.Cookies.Append(CookieRequestCultureProvider.DefaultCookieName,
            CookieRequestCultureProvider.MakeCookieValue(new RequestCulture(CultureInfo.CurrentCulture, CultureInfo.CurrentUICulture))
        );
    }
    
    <app>
        <component type="typeof(App)" render-mode="ServerPrerendered" />
    </app>
    
</body>
````

### Step 3(optional): Add UI for Changing the Culture

Optionally, create a UI component to allow the user change the culture.

<div class="skip-repl"></div>

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

    private List<CultureData> Cultures { get; set; } = new List<CultureData>()
    {
        new  CultureData() { Text = "English", Value = "en-US" },
        new  CultureData() { Text = "French", Value = "fr-FR" },
        new  CultureData() { Text = "Bulgarian", Value = "bg-BG" },
    };

    private string SelectedCulture { get; set; } = Thread.CurrentThread.CurrentUICulture.Name;

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

### Step 4: Add .resx Files to the ~/Resources Folder

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


### Step 5: Implement a Service for Localizing the Telerik Components

This service must return the desired string based on the current culture and the requested key (see the explanations above).

Here is a sample Telerik localization service implementation - this example relies on [a `~/Resources` folder with the necessary `.resx` files]({%slug globalization-localization%}#step-4-add-resx-files-to-the-resources-folder).

>tip You must implement the indexer only. You can obtain the needed strings from any source you prefer and that matches your application needs, such as database, `resx` files, `json` files, hash tables, and so on.

<div class="skip-repl"></div>

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




## See Also

* [Globalization Overview]({%slug globalization-overview%})
* [Localize Only Some Component Labels]({%slug common-kb-localize-selected-localization-keys%})
