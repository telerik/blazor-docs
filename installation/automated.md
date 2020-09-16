---
title: Automated Installer
page_title: Automated Installer
description: What the Automated installation package of Telerik UI for Blazor brings.
slug: installation/msi
previous_url: /installation/msi
tags: get,started,installation,msi,p,wizard
published: True
position: 3
---

# Automated Wizard Installer

This article explains what the automated install wizard does for Telerik UI for Blazor components, and how to get it.

While the most common way to install the Telerik UI for Blazor components is to use the [Telerik private NuGet feed]({%slug installation/nuget%}), you can also use a wizard installer, or a [zip archive]({%slug installation/zip%}).

There is an automated installer for:

* Windows (`.msi`)

* MacOS (`.pkg`)

* Linux (`.sh` + `.tar.gz`). Pass `-s <path to the archive>` when running the script. Other arguments are `-d` for the location where the archive will be extracted (defaults to `${HOME}/telerik-blazor"`) and `-SkipNETCoreInstall` to skip the installation of .NET Core (note that the framework is required).


The automated installer provides the following:

* The [necessary `.nupkg` files]({%slug getting-started/what-you-need%}) so you can setup a [local feed in Visual Studio](#set-up-a-local-nuget-feed-in-visual-studio). You can find them in the `packages` folder under the installation folder.
* An offline version of our [demos](https://demos.telerik.com/blazor-ui/) that you can run and inspect in your IDE. You can find them in the `demos` folder in the installation.
* The [document processing]({%slug common-features-dpl%}) `.nupkg` files (in the `dpl` folder).
* A shortcut to our [online demos](https://demos.telerik.com/blazor-ui/).
* Our [Visual Studio Extensions]({%slug getting-started-vs-integration-overview%})



## How to Download the Automated Installer

To download the automated `msi` (for Windows) or `pkg` (for Mac) installer:

@[template](/_contentTemplates/common/get-started.md#navigate-account)

1. Download the Automatic installation file for your operating system

Once the download completes, run the downloaded file and follow the instructions. The default installation path is `C:\Program Files (x86)\Progress\Telerik UI for Blazor <VERSION>\`.

@[template](/_contentTemplates/common/get-started.md#setup-local-feed-vs)

## Next Steps

@[template](/_contentTemplates/common/get-started.md#after-install)

## Troubleshooting

### Can't Install on MacOS Catalina

MacOS requires that installer packages are signed. The UI for Blazor installation `.pkg` package is signed and the MacOS system should not block the installation. Nevertheless, in rare cases MacOS may still block the Telerik Installer.

There are several approaches you can try:

* Make sure that the "identified developers" downloads are enabled:

    1. Open **System Preferences**
    2. Go to **Security & Privacy** and select the **General** tab
    3. In the bottom half of the window under **Allow apps downloaded from**: option select the **App Store and identified developers**
    4. Apply the option and then give the installer another try

* Install the file manually with either of these approaches:

    * Right-click on the `.pkg` and select "Open". This should bring up an install dialog, but with an option to **Open the file anyway**.
    
    * Right-click on the `.pkg` and select "Open With", and choose **Installer**.
    
    * Or, get around Apple's security precautions by removing the quarantine Extended Attribute on the `.pkg` file by executing `xattr -d com.apple.quarantine /path/to/file`

* You can, alternatively, obtain all the files you need from the [ZIP archive we provide]({%slug installation/zip%}) which does not require an installation.

## See Also

* [What You Need To Install]({%slug getting-started/what-you-need%})
* [Get Started with Client-side Blazor]({%slug getting-started/client-side%})
* [Get Started with Server-side Blazor]({%slug getting-started/server-side%})

