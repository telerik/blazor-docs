---
title: How to Upgrade
page_title: How to Upgrade
description: How to Upgrade the version of the Telerik UI for Blazor package.
slug: upgrade-tutorial
tags: upgrade,tutorial,changes,update
published: True
position: 0
---

# How to Upgrade Telerik UI for Blazor

This article explains how to upgrade to a new version of Telerik UI for Blazor.

To upgrade the Telerik components, you need to update their NuGet package reference, and, if you use them, the CDN links.

The **latest** available version of UI for Blazor is **{{site.uiForBlazorLatestVersion}}**.

>tip Before starting an upgrade of your project, you may find it useful to review the following information:
>
> * [Framework Versions Support](slug:framework-versions-support) - this will let you see what version of the .NET framework you need and which UI for Blazor versions work on it.
> * [UI for Blazor Release History](https://www.telerik.com/support/whats-new/blazor-ui/release-history) — reviewing the release notes for all releases you go through will let you see what has changed, what fixes, features and components have been implemented so you are better prepared to meet your project's challenges.
> * Whether you are affected by a breaking change. The [List of Telerik UI for Blazor Versions with Breaking Changes](slug:versions-with-breaking-changes) article shows which releases of our component suite have breaking changes. Review the information for the releases you go through so you can evaluate whether you will be affected by anything.

In this article:

* [Upgrade Process](#upgrade-process)
* [Upgrade with Upgrade Wizard](#upgrade-wizard)
* [Upgrade from Trial to Commercial](#upgrade-from-trial-to-commercial)
* [Troubleshooting](#troubleshooting)


## Upgrade Process

To upgrade the Telerik UI for Blazor components used in your project, perform the following steps:

1. @[template](/_contentTemplates/common/general-info.md#ensure-nuget-packge-for-upgrade)

1. [Update your license key](slug:installation-license-key#license-key-updates) if the component version upgrade is related to a license renewal or purchase.

1. Update the version of the `Telerik.UI.for.Blazor` NuGet package in all applicable projects.

1. If you are [loading `telerik-blazor.js` from CDN](slug:common-features-cdn#javascript-urls), update the version number in the CDN URL to match the NuGet package version.

1. If you are [loading themes from CDN](slug:common-features-cdn#css-theme-urls), update the version number in the theme URL. For example, if you are upgrading to Telerik UI for Blazor {{site.uiForBlazorLatestVersion}}, the version number in the theme URL must be:
    * `{{site.themesVersion}}` if using [UNPKG CDN](slug:common-features-cdn#unpkg-cdn)
    * `{{site.uiForBlazorLatestVersion}}` if using the [Telerik CDN](slug:common-features-cdn#telerik-cdn)

1. If you are using a local theme stylesheet in `wwwroot`, then replace it. For example, if the app is using a [custom theme](slug:themes-customize), then recreate it with the [ThemeBuilder](https://docs.telerik.com/themebuilder). Or, if the [project was created with the Telerik&reg; UI for Blazor Visual Studio Extensions](slug:getting-started-vs-integration-new-project), then [download the required built-in theme](slug:themes-overview#built-in-themes) and add it to the project.

1. If the application is localized, [update the Telerik localization resource (`.resx`) files](slug:globalization-localization#step-2-add-resouce-files). Otherwise, you may see [exceptions related to missing localization strings](slug:common-kb-value-cannot-be-null-parameter-format).

1. Clear the browser cache and optionally [add a cache buster for the Telerik CSS and JavaScript files](slug:common-kb-browser-cache-buster).

## Upgrade Wizard

To upgrade the version of Telerik UI for Blazor you can use the [Upgrade Wizard](slug:getting-started-vs-integration-upgrade-project) that comes as part of the [Telerik UI for Blazor Visual Studio Extension](slug:getting-started-vs-integration-overview).

## Upgrade from Trial to Commercial

If you have just purchased a license and you need to migrate from the trial package to the licensed version, perform the following steps:

1. [Update your Telerik license key](slug:installation-license-key#license-key-updates) after you purchase or renew a license.

1. To upgrade to the latest product version, follow the steps for [updating the Telerik UI for ASP.NET MVC version](#upgrading-to-new-versions).

## Troubleshooting

### Microsoft.JSInterop.JSException: Could not find ...

The most common problem you will encounter when upgrading is wrong references to our JS Interop file. You can read more about fixing them in the [Troubleshoot JavaScript Errors](slug:troubleshooting-js-errors) article.

### I Still See the Trial Watermark and Banner

While using a trial license, a watermark will be rendered over the components and you will see a banner with the following message:

> Purchase the Commercial Version now to get access to all product updates and the Telerik expert support.

If you have a commercial license, but you still see the trial watermark and banner, then make sure that:

* Your [Telerik license key is installed correctly](slug:installation-license-key) and there are no [license key errors](slug:troubleshooting-license-key-errors) during build.
* Your [Telerik license key is up-to-date](slug:installation-license-key#license-key-updates).

## See Also

* [What You Need to Use Telerik UI for Blazor](slug:getting-started/what-you-need)
* [Get Started with Client-side Blazor](slug:getting-started/client-side)
* [Get Started with Server-side Blazor](slug:getting-started/server-side)

