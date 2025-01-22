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

>tip This article applies to Telerik UI for Blazor version **7.2.0** and above.

## Basics

To install a license key, you must have a developer or trial license for:

* Telerik UI for Blazor
* Any product bundle that includes Telerik UI for Blazor, such as DevCraft.

If you are new to Telerik UI for Blazor, <a href="https://www.telerik.com/blazor-ui" target="_blank">sign up for a free trial</a>.

The [`Telerik.UI.for.Blazor` NuGet package depends on the `Telerik.Licensing` NuGet package](slug://getting-started/what-you-need#nuget-packages). During project build, the `Telerik.Licensing` package automatically verifies the license key and activates Telerik UI for Blazor in that project.

Follow the steps below for [automatic](#automatic-installation) or [manual](#manual-installation) license key installation. An invalid or missing license key results in app build warnings and watermarks in the application UI.

## Automatic Installation

To download and install the license key automatically, use one of the following Telerik productivity tools:

* <a href="https://docs.telerik.com/controlpanel/introduction" target="_blank">Telerik Control Panel</a>&mdash;this tool downloads and installs different Telerik products on your machine.
* [Telerik UI for Blazor Visual Studio extension](slug://getting-started-vs-integration-overview)&mdash;this tool adds or upgrades Telerik UI for Blazor in new or existing apps.

Any of the above two tools will install a license key for you and make it available for all projects that you develop on your local machine.

>tip Update the license key [whenever necessary](#updates).

## Manual Installation

To download and install a license key file manually:

1. Go to the <a href="https://www.telerik.com/account/your-licenses/license-keys" target="_blank">License Keys page</a> in your Telerik account. You can also reach this page from the <a href="https://www.telerik.com/account/your-licenses">Your Licenses</a> page.
1. Click the **Download License Key** button.
1. Save the `telerik-license.txt` file to:
    * (on Windows) `%AppData%\Telerik\telerik-license.txt`, for example, `C:\Users\...\AppData\Roaming\telerik-license.txt`
    * (on Mac or Linux) `~/.telerik/telerik-license.txt`, for example, `/Users/.../.telerik/telerik-license.txt`

The above step will make the license key available to all projects that you develop on your local machine. If you need to activate Telerik UI for Blazor only in a specific app, then save `telerik-license.txt` to the root folder of your project or solution.

>tip Update the license key [whenever necessary](#updates).

>warning The license key file is personal and confidential. Do not commit this file to source control!

## Updates

Whenever you renew or purchase a new Telerik product, always download and install a new license key. The new license key includes information about all previous purchases. This process is referred to as a *license key update*.

* If you used [automatic license key installation](#automatic-installation), then open the tool that you used to download and install the license key file. You can also update the license key file by using the [manual steps above](#manual-installation).
* If you used the [manual license key installation](#manual-installation), then repeat the same steps.

## Next Steps

* [Set Up the Telerik NuGet Feed](slug://installation/nuget)
* [Install License Key in CI/CD Environment](slug://deployment-license-key)

## See Also

* [Get Started with a Blazor Web App](slug://getting-started/web-app)
* [Workflow Details for Telerik UI for Blazor](slug://getting-started/what-you-need)
