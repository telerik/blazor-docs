---
title: MSI Installer
page_title: MSI Installer
description: What the MSI installation package of Telerik UI for Blazor brings.
slug: installation/msi
tags: get,started,installation,msi,wizard
published: True
position: 3
---

# MSI Wizard Installer

This article explains what the automated `msi` installer does for Telerik UI for Blazor components, and how to get it.

While the most common way to install the Telerik UI for Blazor components is to use the [Telerik private NuGet feed]({%slug installation/nuget%}), you can also use a wizard installer, or a [zip archive]({%slug installation/zip%}).

The `MSI` installer provides the following:

* The [necessary `.nupkg` files]({%slug getting-started/what-you-need%}) so you can setup a [local feed in Visual Studio](#set-up-a-local-nuget-feed-in-visual-studio). You can find them in the `packages` folder under the installation folder.
* An offline version of our [demos](https://demos.telerik.com/blazor-ui/) that you can run and inspect in your IDE. You can find them in the `demos` folder in the installation.
* The [document processing]({%slug common-features-dpl%}) `.nupkg` files (in the `dpl` folder).
* A shortcut to our [online demos](https://demos.telerik.com/blazor-ui/).
* Our [Visual Studio Extensions]({%slug getting-started-vs-integration-overview%})



## How to Download the MSI Installer

To download the automated `msi` installer:

@[template](/_contentTemplates/common/get-started.md#navigate-account)

1. Download the Automatic installation (MSI) file.

Once the download completes, run the MSI file and follow the instructions. The default installation path is `C:\Program Files (x86)\Progress\Telerik UI for Blazor <VERSION>\`.

@[template](/_contentTemplates/common/get-started.md#setup-local-feed-vs)

## Next Steps

@[template](/_contentTemplates/common/get-started.md#after-install)


## See Also

* [What You Need To Install]({%slug getting-started/what-you-need%})
* [Get Started with Client-side Blazor]({%slug getting-started/client-side%})
* [Get Started with Server-side Blazor]({%slug getting-started/server-side%})

