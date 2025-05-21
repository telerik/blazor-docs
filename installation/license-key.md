---
title: License Key
page_title: Telerik License Key
description: Learn how to create and install a Telerik license key file, which is required during application building and deployment.
slug: installation-license-key
tags: installation, license
published: True
position: 1
---

# Telerik License Key

Telerik UI for Blazor requires activation through a license key for both trial and commercial licenses. This article describes how to download your personal license key and use it to activate the Telerik Blazor components.

@[template](/_contentTemplates/common/get-started.md#license-key-version)

## Basics

To install a license key, you must have a developer or trial license for:

* Telerik UI for Blazor
* Any product bundle that includes Telerik UI for Blazor, such as DevCraft.

If you are new to Telerik UI for Blazor, <a href="https://www.telerik.com/blazor-ui" target="_blank">sign up for a free trial</a>.

The `Telerik.UI.for.Blazor` NuGet package [depends on the `Telerik.Licensing` NuGet package](slug:getting-started/what-you-need#nuget-packages). During project build, the `Telerik.Licensing` package automatically verifies the license key and activates Telerik UI for Blazor in that project.

Follow the steps below for [automatic](#automatic-installation) or [manual](#manual-installation) license key installation in your local development environment. To build Telerik Blazor apps in a CI/CD environment, [set up a Telerik license key in CI/CD](slug:deployment-license-key).

An [invalid or missing license key results in app build warnings](slug:troubleshooting-license-key-errors) and watermarks in the application UI.

>warning The license key file is personal and confidential. Do not commit this file to source control and do not save it to a publicly accessible location!

## Automatic Installation

To download and install your Telerik license key automatically, use either of the following Telerik productivity tools:

* <a href="https://docs.telerik.com/controlpanel/introduction" target="_blank">Telerik Control Panel</a>&mdash;this tool downloads and installs different Telerik products on your machine.
* [Telerik UI for Blazor Visual Studio extension](slug:getting-started-vs-integration-overview)&mdash;this tool adds or upgrades Telerik UI for Blazor in new or existing apps.

The above tools download and install a license key for you and make it available for all projects that you develop on your local machine. The license key file and location is specified in the [Manual Installation](#manual-installation) section below.

@[template](/_contentTemplates/common/get-started.md#license-key-update-whenever)

## Manual Installation

@[template](/_contentTemplates/common/get-started.md#license-key-manual-steps)
If you need to activate Telerik UI for Blazor only in a specific app, then save `telerik-license.txt` to the root folder of your project or solution.

@[template](/_contentTemplates/common/get-started.md#license-key-update-whenever)

## License Key Updates

Always install a new license key whenever you:

* renew or purchase a new Telerik license
* Start a new trial
The new license key includes information about all previous purchases. This process is referred to as a *license key update*.

* If you used [automatic license key installation](#automatic-installation), then open the tool that you used to download and install the license key file. You can also update the license key file by using the [manual steps above](#manual-installation).
* If you used the [manual license key installation](#manual-installation), then repeat the same steps.
* To [update your license key in CI/CD environments](slug:deployment-license-key), get your new license key and update the environment variable value.

## Using Telerik Packages in Referenced Projects

Telerik UI for Blazor may be used in a referenced project in a multi-project app. For example, in the **Client** project of a WebAssembly app that uses server-side pre-rendering. In such cases, you can briefly see a yellow banner in the browser, which says "We couldn't verify your license key for Telerik UI for Blazor. Please see the build log for details and resolution steps".

There are two alternative ways to avoid the warning banner:

* Set `PrivateAssets="none"` to the Telerik UI for Blazor NuGet package registration tag.
  ````XML.skip-repl
  <PackageReference Include="Telerik.UI.for.Blazor" Version="{{site.uiForBlazorLatestVersion}}" PrivateAssets="none" />
  ````

* Reference the `Telerik.Licensing` package explicitly in all projects that reference other projects with Telerik packages. You can use the same version that is referenced by the `Telerik.UI.for.Blazor` NuGet package, or a newer version.
  ````XML.skip-repl
  <ItemGroup>
    <PackageReference Include="Telerik.Licensing" Version="*" />
  </ItemGroup>
  ````

## Troubleshooting

Refer to the [Troubleshooting License Key Errors](slug:troubleshooting-license-key-errors) page to find out what license key warnings you may see during application build and what they mean.

## Frequently Asked Questions

### Does the license key expire?

Yes, the license key expires at the end of your subscription:

* For trial users, this is at the end of your 30-day trial period.
* For commercial license holders, this is when your subscription term expires.

You need to download and install a new license key after:

* Starting a new trial
* Buying a new license
* Renewing an existing license
* Upgrading an existing license

An expired [perpetual license](https://www.telerik.com/purchase/faq/licensing-purchasing#licensing) key is valid for all Telerik UI for Blazor versions published before the license expiration date.

### Will Telerik UI for Blazor work with an expired license key?

This depends on the [Telerik UI for Blazor license type (perpetual, subscription, or trial)](https://www.telerik.com/purchase/faq/licensing-purchasing#licensing):

* *Perpetual licenses* function normally with an expired license key, as long as the application is using a [Telerik UI for Blazor version that was released before the license expiration date](https://www.telerik.com/support/whats-new/blazor-ui/release-history).
* *Subscription licenses* function normally in already deployed applications, as long as you do not rebuild and republish the app.
* *Trial licenses* function normally during the 30-day trial period.

Scenarios that do not match the above descriptions result in the following application behaviors:

* A popup banner appears on application startup.
* A watermark appears on the Telerik components.
* [A warning message appears in the application's build log](slug:troubleshooting-license-key-errors).

To avoid accidental license watermarks and notifications on your live site, you can [fail the application build and abort deployment](slug:deployment-license-key#abort-deployment-on-license-key-error) when there is an issue with the license key.

### I updated Telerik UI for Blazor in my app and got license errors. Why?

The most likely cause is that the new Telerik UI for Blazor version was released after the expiration date of your current license or license key. To fix this issue:

1. Renew your Telerik UI for Blazor license if necessary.
1. [Update your license key](slug:installation-license-key)

### Can I use the same license key in multiple builds?

You can use one license key in multiple pipelines, builds, and environments. However, each individual developer must use their own unique personal license key in their development environment.

### Do I need Internet to activate the license?

No, the license validation and activation occur offline.

### Should I add the license key to source control?

No, do not add the `telerik-license.txt` license key file or its contents to source control.

Do not store the license key in plain text in GitHub Actions Workflow definitions. Build servers [must use the `TELERIK_LICENSE` environment variable](slug:deployment-license-key).

### What happens if I use both the environment variable and the license key file?

If both the `TELERIK_LICENSE` environment variable and the `telerik-license.txt` file are present, then the environment variable will be used.
To use the license key file, unset the environment variable.

### What happens if several license key files exist?

If both a global and a project-specific `telerik-license.txt` files exist, then the project-specific license key will be used.

### My team has multiple licenses. Which key should we use?

To activate Telerik UI for Blazor:

* [Every developer must be assigned their own license or seat](https://www.telerik.com/purchase/faq/licensing-purchasing).
* Every developer must use a license key that is associated with their personal Telerik account.
* You can use any of the available [license keys in cloud build CI/CD environments](slug:deployment-license-key).

### Are earlier Telerik UI for Blazor versions affected?

No, versions up to **7.1.0** released prior to February 2025 do not require a license key.

## Next Steps

* [Set Up the Telerik NuGet Feed](slug:installation/nuget)
* [Install License Key in CI/CD Environment](slug:deployment-license-key)

## See Also

* [Troubleshoot License Key Errors](slug:troubleshooting-license-key-errors)
* [Get Started with a Blazor Web App](slug:getting-started/web-app)
* [Workflow Details for Telerik UI for Blazor](slug:getting-started/what-you-need)
