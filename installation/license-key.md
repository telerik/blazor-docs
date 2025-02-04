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

The `Telerik.UI.for.Blazor` NuGet package [depends on the `Telerik.Licensing` NuGet package](slug://getting-started/what-you-need#nuget-packages). During project build, the `Telerik.Licensing` package automatically verifies the license key and activates Telerik UI for Blazor in that project.

Follow the steps below for [automatic](#automatic-installation) or [manual](#manual-installation) license key installation in your local development environment. To build Telerik Blazor apps in a CI/CD environment, [set up a Telerik license key in CI/CD](slug://deployment-license-key).

An [invalid or missing license key results in app build warnings](slug://troubleshooting-license-key-errors) and watermarks in the application UI.

>warning The license key file is personal and confidential. Do not commit this file to source control and do not save it to a publicly accessible location!

## Automatic Installation

To download and install your Telerik license key automatically, use either of the following Telerik productivity tools:

* <a href="https://docs.telerik.com/controlpanel/introduction" target="_blank">Telerik Control Panel</a>&mdash;this tool downloads and installs different Telerik products on your machine.
* [Telerik UI for Blazor Visual Studio extension](slug://getting-started-vs-integration-overview)&mdash;this tool adds or upgrades Telerik UI for Blazor in new or existing apps.

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
* To [update your license key in CI/CD environments](slug://deployment-license-key), get your new license key and update the environment variable value.

## Frequently Asked Questions

#### Does the license key expire?

Yes, the license key expires at the end of your subscription:

* For trial users, this is at the end of your 30-day trial period.
* For commercial license holders, this is when your subscription term expires.

You need to download and install a new license key after:

* Starting a new trial
* Buying a new license
* Renewing an existing license
* Upgrading an existing license

An expired [perpetual license](https://www.telerik.com/purchase/faq/licensing-purchasing#licensing) key is valid for all Telerik UI for Blazor versions published before the license expiration date.

#### Will Telerik UI for Blazor function with an expired license key?

This depends on the [Telerik UI for Blazor license type (perpetual, subscription, or trial)](https://www.telerik.com/purchase/faq/licensing-purchasing#licensing):

* *Perpetual licenses* function normally with an expired license key, as long as the application is using a version that was released before the expiration date of the license.
* *Subscription licenses* function normally in already deployed applications, but you cannot rebuild and republish the app.
* *Trial licenses* function normally only within the 30-day trial period.

Scenarios that do not match the above three descriptions result in the following application behaviors:

* A popup banner appears on application startup.
* A watermark appears on Telerik UI for Blazor components.
* [A warning message appears in the application's build log](slug://troubleshooting-license-key-errors).

#### I updated the Telerik UI for Blazor version in my project and license errors appeared. Why?

The most likely cause is that the new Telerik UI for Blazor version was released after the expiration date of your current license or license key. To fix this issue:

1. Renew your Telerik UI for Blazor license if necessary.
1. [Update your license key](slug://installation-license-key)

#### Can I use the same license key in multiple builds?

You can use your personal license key in multiple pipelines, builds, and environments. However, each individual developer must use their own unique personal license key.

#### Do I need an Internet connection to activate the license?

No, the license validation and activation occur offline.

#### Do I have to add the license key to source control?

No, do not add the `telerik-license.txt` license key file or its contents to source control.

Do not store the license key in plain text in GitHub Actions Workflow definitions. Build servers [must use the `TELERIK_LICENSE` environment variable](slug://deployment-license-key).

#### What happens if both the environment variable and the license key file are present?

If both the `TELERIK_LICENSE` environment variable and the `telerik-license.txt` file are present, then the environment variable will be used.
To use the license key file, unset the environment variable.

#### What happens if several license key files exist?

If both a global and a project-specific `telerik-license.txt` files exist, then the project-specific license key will be used.

#### My team has more than one license holder. Which key do we have to use?

To activate Telerik UI for Blazor:

* [Every developer must be assigned their own license or seat](https://www.telerik.com/purchase/faq/licensing-purchasing).
* Every developer must use a license key that is associated with their personal Telerik account.

#### Are earlier Telerik UI for Blazor versions affected?

No, versions up to **7.1.0** released prior to February 2025 do not require a license key.

## Next Steps

* [Set Up the Telerik NuGet Feed](slug://installation/nuget)
* [Install License Key in CI/CD Environment](slug://deployment-license-key)

## See Also

* [Troubleshoot License Key Errors](slug://troubleshooting-license-key-errors)
* [Get Started with a Blazor Web App](slug://getting-started/web-app)
* [Workflow Details for Telerik UI for Blazor](slug://getting-started/what-you-need)
