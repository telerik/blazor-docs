---
title: License Key Errors
page_title: Telerik License Key Errors
description: Troubleshooting Telerik license key errors when using Telerik UI for Blazor.
slug: troubleshooting-license-key-errors
tags: blazor, license, troubleshooting
published: True
position: 3
---

# License Key Errors

This page provides solutions for license key errors that you may encounter while building Telerik Blazor apps.

@[template](/_contentTemplates/common/get-started.md#license-key-version)

## Basics

The build-time Telerik license validation executes as an MSBuild task. It outputs information in the application build log that starts with `[Telerik and Kendo UI Licensing]` and looks like this:

>caption Telerik licensing build-time default log

````TXT.skip-repl
  [Telerik and Kendo UI Licensing]
        Your Telerik UI for Blazor subscription is active. Expiration in 68 days.
  [Telerik and Kendo UI Licensing]
        Your Telerik Document Processing Libraries subscription is active. Expiration in 68 days.
````

The Telerik license key validation can fail in the following scenarios:

* The license key is missing or not set up correctly.
* The license key is outdated or does not include the product version that you are using.
* Your subscription license or trial has expired.
* There are several different conflicting license keys in the same environment. For example, there is one global license key and one in the app. Or, there is a license key file together with an environment variable in CI/CD environment.

In the above cases, the application build log contains [error messages about the problem](#error-messages) that suggest how to proceed. It is also possible to [generate a more detailed log](#build-time-diagnostics) with additional diagnostic and troubleshooting information.

The build-time Telerik license validation creates meta data that is later checked at runtime. If the runtime license verification fails, the application UI displays a banner with a message similar to "No license found" or "We couldn't verify your license key".

If the build-time license validation succeeds, but the runtime validation fails, this suggests that Telerik UI for Blazor is used in a [Razor Class Library project (RCL) or in a project, which is not the main (startup) project](slug:installation-license-key#using-telerik-packages-in-referenced-projects) of the app. This includes cases when the Telerik components are used in the **Client** project of a Blazor Web App with **Auto** or **WebAssembly** render mode that uses pre-rendering.

## Build-Time Diagnostics

Add the optional `<TelerikLicensingVerbosity>` tag to your project file(s) for advanced diagnostic information about the build-time Telerik license validation process.

>caption Enable diagnostic logging for the build-time Telerik license key validation

````XML.skip-repl
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TelerikLicensingVerbosity>diagnostic</TelerikLicensingVerbosity>
  </PropertyGroup>

</Project>
````

When in diagnostic mode, the Telerik licensing MSBuild task outputs a more comprehensive log that includes:

* All Telerik assemblies that are used in the project and their versions.
* All folder locations and environment variables that were checked for a valid license key.
* The licenses that are included in the license key.
* The license verification result.
* The total duration of the Telerik licensing MSBuild task.

The diagnostic log starts and ends with the phrase `"Resolve Telerik Products"`. The log structure and content is similar to the one below.

>caption Telerik licensing build-time diagnostic log

````TXT.skip-repl
  Resolve Telerik Products.

    MSBuildProjectName=MyProjectName
    ...
  
    PackageReferences
    - Telerik.UI.for.Blazor *
    - Telerik.Licensing *
    ...
    
    ...
  
    Looking for Telerik product metadata in referenced assemblies
        ...

        Unique Products:
        - "Telerik UI for Blazor" ...
        - "Telerik Document Processing Libraries" ...
        Found a total of 2 referenced Telerik products for net8.0
  
    Provision Licensing
          Looking up license file...
          - EnvironmentVariablePath: TELERIK_LICENSE_PATH (NotAvailable)
          - EnvironmentVariable: TELERIK_LICENSE (NotAvailable)
          - EnvironmentVariable: KENDO_UI_LICENSE (NotAvailable)
          - RecursiveFilePath: /Users/MyUserName/MyProjectName/telerik-license.txt (NotAvailable)
          - RecursiveFilePath: /Users/MyUserName/MyProjectName/kendo-ui-license.txt (NotAvailable)
          ...
          - RecursiveFilePath: /telerik-license.txt (NotAvailable)
          - RecursiveFilePath: /kendo-ui-license.txt (NotAvailable)
          - UserDirectory: /Users/MyUserName/.telerik/telerik-license.txt (LicenseFound)
          - UserDirectory: /Users/MyUserName/.telerik/kendo-ui-license.txt (Skip)

          LicenseKey
          - AUD: a***.b****@c*******.com
          - UsedId: ...
          - LicenseId: ...
          - IssuedAt: ...
          - Licenses
            0) Perpetual BLAZOR, expiration ..., type: 'perpetual'
            1) Subscription BLAZOR, expiration ..., type: 'subscription'
            2) Usage UserId: ..., LicenseId: ..., type: 'usage'

    License Resolution
          Messages
            - License OK for "Telerik UI for Blazor" ...
            - License OK for "Telerik Document Processing Libraries" ...

          Licenses
            - License OK for "Telerik UI for Blazor" ...
            - License OK for "Telerik Document Processing Libraries" ...
  
  [Telerik and Kendo UI Licensing]
        Telerik and Kendo UI License Key found at: /Users/MyUserName/.telerik/telerik-license.txt (UserDirectory)
        License issued at 2026-03-12 to a*******@b*******.com.
  [Telerik and Kendo UI Licensing]
        Your Telerik UI for Blazor subscription is active. Expiration in 68 days.
  [Telerik and Kendo UI Licensing]
        Your Telerik Document Processing Libraries subscription is active. Expiration in 68 days.
  Resolve Telerik Products. Done (00:00:00.1695430) for net8.0
````

## Error Messages

The following warnings may appear in the [default](#basics) or [diagnostic](#build-time-diagnostics) application build log.

### No Telerik or Kendo UI product references detected in project (TKL001)

This error can occur when a project references `Telerik.Licensing`, but not any other Telerik packages. In this case, remove the `Telerik.Licensing` package from the project. If your scenario is different, [contact Technical Support](https://www.telerik.com/account/support-center).

### No Telerik and Kendo UI License file found (TKL002)

The error means that the license key is missing or not set up correctly. For example, the environment variable is not set or [the license file may be at the wrong place](slug:installation-license-key#manual-installation). The error can also occur if the environment variable or license file exists, but it is empty.

[Install a license key](slug:installation-license-key) again. Also check how to [set up a license key in CI/CD environments](slug:deployment-license-key).

### Corrupted Telerik and Kendo UI License Key content (TKL003)

The license key is detected, but its value is invalid and cannot be decrypted. For example:

* The `TELERIK_LICENSE` environment variable has the license file location as its value. In such cases, set the license key itself as the variable value. Alternatively, remove `TELERIK_LICENSE` and use the `TELERIK_LICENSE_PATH` environment variable instead.
* The `TELERIK_LICENSE` environment variable was set through the Windows operating system's UI and the license key was truncated due to Windows limitations. In such cases, remove the environment variable and use a license key file instead.

Follow the [automatic](slug:installation-license-key#automatic-installation) or [manual](slug:installation-license-key#manual-installation) installation steps from scratch. Also check how to [set up a license key in CI/CD environments](slug:deployment-license-key).

### Unable to locate licenses for all products (TKL004)

Your license is not valid for the detected product(s), because it doesn't include them.

[Review the purchase options for Telerik UI for Blazor](https://www.telerik.com/purchase/blazor-ui). If you have already purchased the required license, then, [update your license key](slug:installation-license-key#license-key-updates).

### Telerik UI for Blazor is not listed in your current license file (TKL101)

Your license key does not include Telerik UI for Blazor.

[Review the purchase options for Telerik UI for Blazor](https://www.telerik.com/purchase/blazor-ui). If you have already purchased the required license, then, [update your license key](slug:installation-license-key#license-key-updates).

### Your current license has expired (TKL102)

This error applies to perpetual licenses. It means that you are using a product version released outside the validity period of your license. To remove the error message, do either of the following:

* [Renew your license](https://www.telerik.com/account/your-licenses) and then, [update your license key](slug:installation-license-key#license-key-updates).
* Use a Telerik UI for Blazor version that was released within the active period of your perpetual license.

### Your subscription has expired (TKL103, TKL104)

This error applies to Subscription licenses. [Renew your subscription](https://www.telerik.com/account/your-licenses) and then, [update your license key](slug:installation-license-key#license-key-updates).

### Your trial expired (TKL105)

[Purchase a commercial license to continue using Telerik UI for Blazor](https://www.telerik.com/purchase/blazor-ui).

### No license found for Telerik UI for Blazor (banner)

This section assumes an existing valid license key and a successful [build-time license validation](#basics), so that the problem is not any of the above.

If you see a warning Telerik license banner in the web browser, then refer to [Using Telerik Packages in Referenced Projects](slug:installation-license-key#using-telerik-packages-in-referenced-projects).

## See Also

* [Download and Install License Key](slug:installation-license-key)
* [Use License Keys in CI/CD](slug:deployment-license-key)
