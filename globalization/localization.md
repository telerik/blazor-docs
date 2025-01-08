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

Localization (L10N) is the process of customizing an app for a given language and region. Telerik UI for Blazor lets you translate the labels of the UI components to the desired language. This includes the text in buttons, filter operators, WAI-ARIA attributes and so on. This article describes how to use the Telerik localization feature in your Blazor application.

## Basics

The localization of the Telerik components builds on top of the standard .NET mechanisms. Familiarity with Blazor localization is required to set up Telerik component localization successfully:

* [ASP.NET Core Blazor Globalization and Localization](https://learn.microsoft.com/en-us/aspnet/core/blazor/globalization-localization)
* [Globalization and Localization in ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/localization)

The Telerik UI for Blazor components use a [`ITelerikStringLocalizer`](/blazor-ui/api/Telerik.Blazor.Services.ITelerikStringLocalizer) service to resolve localization keys to strings that will render in the UI. The key format is `<ComponentName>_<Key>`.

The `Telerik.UI.for.Blazor` NuGet package includes a [`Telerik.Blazor.Resources.Messages` class](/blazor-ui/api/telerik.blazor.resources.messages) and a resource file with the default English message strings. The components use the built-in `resx` file internally if the app does not define another localization service for the Telerik components. The API reference for the `Messages` class lists all supported localization keys.


## Localize Telerik Blazor Components

The tutorial below assumes that:

* The Blazor app name and the root namespace is `ServerLocalizationResx`.
* The [Telerik resource files](#step-2-add-resouce-files) exist in folder `~/Resources/` and have names like `TelerikMessages.<locale>.resx`.

Using your own names is possible and will affect:

* The class name and file name of the auto generated designer class (for example, `TelerikMessages` in `TelerikMessages.Designer.cs`)
* The used namespace and class in the [Telerik localization service](#step-3-implement-itelerikstringlocalizer-service) (for example, `AppName.Resources` and `TelerikMessages`)

### Step 1: Set the Blazor App Culture

[Enable Blazor localization and set the application's culture](https://learn.microsoft.com/en-us/aspnet/core/blazor/globalization-localization), depending on the business requirements and the hosting model or render mode.

The purpose of this step is to supply the correct application culture to the `ResourceManager.GetString()` method in your [Telerik localization service](#step-3-implement-itelerikstringlocalizer-service). This in turn will obtain the localized string from the correct resource file with a matching locale in its file name.

>tip This step is optional if your Blazor application will always use the same culture and a single Telerik resource file without a locale in its name.

### Step 2: Add Resouce Files

Create and add localization resource `resx` files to your app, based on the languages that the app must support. Use the following links for reference:

* A full up-to-date list of localization keys is available in the [`Telerik.Blazor.Resources.Messages` API reference](/blazor-ui/api/Telerik.Blazor.Resources.Messages).
* An up-to-date English resource file is available in the [Telerik UI for Blazor demo site](https://demos.telerik.com/blazor-ui). Download the [UI for Blazor automated installer](slug://installation/msi) or [UI for Blazor ZIP archive](slug://installation/zip). Go to the installation location and open the folder `\demos\TelerikBlazorDemos\Resources\`. The folder contains `resx` localization files for a few different languages.
* Community resource files are available in the <a href="https://github.com/telerik/blazor-ui-messages" target="_blank">`blazor-ui-messages` GitHub repository</a>. These resource files are updated and maintained by the Telerik community. They may not be compatible with the latest product version. You are welcome to contribute your own resource files.

> Update the localization resource files every time you upgrade Telerik UI for Blazor. Otherwise you may see:
>
* Missing or non-translated messages in the UI
* [Exceptions related to missing localization keys](slug://common-kb-null-value-parameter-format)
>
> Telerik supports the default English strings. The `resx` files for the other languages are provided as-is and you can use them as base for implementing your own.

Make sure the `resx` files are defined as `EmbeddedResource` in the **Build Action** properties or in the `.csproj` file. Normally, the `Designer` file is generated automatically on every `resx` file save.

>caption Sample resource file configuration in the .csproj file

<div class="skip-repl"></div>

````XML
  <ItemGroup>
    <EmbeddedResource Update="Resources\TelerikMessages.resx">
      <Generator>PublicResXFileCodeGenerator</Generator>
      <LastGenOutput>TelerikMessages.Designer.cs</LastGenOutput>
    </EmbeddedResource>
  </ItemGroup>
  <ItemGroup>
    <Compile Update="Resources\TelerikMessages.Designer.cs">
      <DesignTime>True</DesignTime>
      <AutoGen>True</AutoGen>
      <DependentUpon>TelerikMessages.resx</DependentUpon>
    </Compile>
  </ItemGroup>
````

### Step 3: Implement ITelerikStringLocalizer Service

Create a service that implements [`Telerik.Blazor.Services.ITelerikStringLocalizer`](/blazor-ui/api/Telerik.Blazor.Services.ITelerikStringLocalizer). The service must implement an indexer that returns the desired string based on the requested localization key. Normally, the returned string also depends on the current culture, unless you are [using the localization mechanism to override specific UI labels only](slug://common-kb-localize-selected-localization-keys).

The example below obtains localized strings from resource `resx` files. You can obtain the required strings from any other source, such as a database, `json` files, hash tables, and so on.

>caption Localization service that implements ITelerikStringLocalizer

<div class="skip-repl"></div>

````CS
using ServerLocalizationResx.Resources;
using Telerik.Blazor.Services;

namespace ServerLocalizationResx.Services
{
    public class SampleResxLocalizer : ITelerikStringLocalizer
    {
        // This indexer is required
        public string this[string key]
        {
            get
            {
                return TelerikMessages.ResourceManager.GetString(key, TelerikMessages.Culture) ?? key;
            }
        }
    }
}
````

### Step 4: Register Your Telerik Localization Service

Register your custom Telerik localization service in `Program.cs` after `builder.Services.AddTelerikBlazor();`. The order is crucial and the Telerik components will always use the last registered localization service. If you reorder the two lines below, the components will use the default built-in English localization strings.

>caption Program.cs

<div class="skip-repl"></div>

````CS
using Telerik.Blazor.Services;
using ServerLocalizationResx.Services;

// Register the built-in ITelerikStringLocalizer service that returns English strings only
builder.Services.AddTelerikBlazor();

// Register the custom Telerik localization service
builder.Services.AddSingleton(typeof(ITelerikStringLocalizer), typeof(SampleResxLocalizer));
````

### Step 5: Inject Your Localization Service

This step is optional. You need it to manually render localized strings from the Telerik resource files. For example, the Telerik resource files include keys for the [built-in Grid commands](slug://components/grid/columns/command).

* Import the `Telerik.Blazor.Services` namespace.
* Inject your `ITelerikStringLocalizer` service.
* Import the namespace of your Telerik localization `designer.cs` class.

>caption Localized .razor file with Telerik Blazor components

<div class="skip-repl"></div>

````RAZOR
@using ServerLocalizationResx.Resources

@using Telerik.Blazor.Services
@inject ITelerikStringLocalizer TelerikLocalizer

<p>Localized Strings from Telerik Resource Files</p>

<TelerikButton>@TelerikLocalizer[nameof(TelerikMessages.Grid_Edit)]</TelerikButton>
<TelerikButton>@TelerikLocalizer[nameof(TelerikMessages.Grid_Update)]</TelerikButton>

<p>Localized Strings in Telerik Blazor Components</p>

<TelerikFilter @bind-Value="@FilterValue">
    <FilterFields>
        <FilterField Name="DumyField" Type="@typeof(string)" />
    </FilterFields>
</TelerikFilter>

<br />

<TelerikFileSelect />

@code {
    private Telerik.DataSource.CompositeFilterDescriptor FilterValue { get; set; } = new();
}
````

## Examples

You can find sample runnable projects for both server-side Blazor and for WebAssembly in the [Telerik Blazor UI Samples Repo](https://github.com/telerik/blazor-ui/tree/master/common/localization/):

* <a href="https://github.com/telerik/blazor-ui/tree/master/common/localization/ServerLocalizationResx" target="_blank">Localized Telerik Blazor Web App with Server Render Mode</a>
* <a href="https://github.com/telerik/blazor-ui/tree/master/common/localization/ClientLocalizationResx" target="_blank">Localized Telerik Blazor WebAssembly Standalone App</a>

You can also find a localization implementation in the offline version of the [Telerik UI for Blazor demos](https://demos.telerik.com/blazor-ui). Check your Telerik UI for Blazor installation folder or visit [UI for Blazor automated installer](slug://installation/msi) or [UI for Blazor ZIP archive](slug://installation/zip) for download instructions.


## Troubleshooting

Outdated Telerik resource files may cause [some UI labels to appear in English](slug://common-kb-partial-localization), or the app may trigger a [`Value cannot be null. (Parameter 'format')` exception](slug://common-kb-value-cannot-be-null-parameter-format).

This is not related to the Telerik components, but setting `ResourcePath` in `services.AddLocalization()` may break the standard `IStringLocalizer` in your app or make it more difficult to use.


## See Also

* [Globalization Overview](slug://globalization-overview)
* [Localize Only Some Component Labels](slug://common-kb-localize-selected-localization-keys)
