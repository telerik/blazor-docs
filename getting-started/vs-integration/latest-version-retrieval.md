---
title: Downloading New Versions
page_title: Downloading New Versions - Visual Studio Integration
description: Learn how to keep your projects updated when using the Telerik UI for Blazor library.
slug: getting-started-vs-integration-latest-version
position: 6
---

# Downloading New Versions

The Progress&reg; Telerik&reg; UI for Blazor Visual Studio (VS) extensions allow you to download the latest version of the UI components without leaving Visual Studio.


<!--
The Latest Version Retrieval tool automatically checks for the latest Telerik UI for Blazor distribution which is available for you on the Telerik website. Once a day, upon loading a project with Telerik UI for Blazor components, the extensions query the Telerik website for a new version of Telerik UI for Blazor. When a new version is detected, a notification is displayed that lets you download it.

![Getting the latest version notification](images/lva_notification.png)

Clicking the **Update Now** button starts the Latest Version Acquirer tool which prompts for your Telerik credentials on its first page. If you do not have a [www.telerik.com](https://www.telerik.com) account, you can create one through the **Create an account for free** link.
-->


Clicking the **Get Latest** button in the [Create New Project](slug:getting-started-vs-integration-new-project) wizard starts the Latest Version Acquirer tool. The tool checks for new versions of the UI components and allows you to download them to your computer. To continue, you must use your Telerik credentials.

1. Click on the LOG IN button. This will open a browser window with a login form on the telerik.com website.

    >tip For more information on the latest available versions, see the [Telerik UI for Blazor release notes](https://www.telerik.com/support/whats-new/blazor-ui/release-history).

1. Enter your Telerik credentials in the browser. If you do not have a [www.telerik.com](https://www.telerik.com) account, then create a new one.
1. Return to Visual Studio and confirm any privacy-related requests.
1. In the next dialog that appears, click the **Download** button.

1. Return to the [Create New Project](slug:getting-started-vs-integration-new-project) wizard and select the newly downloaded version.

The Latest Version Acquirer tool downloads a `.zip` file that contains the latest Telerik UI for Blazor packages. By default, the file is saved in the `%APPDATA%\Telerik\Updates` folder. If the list with the offered packages gets too long and you do not need the prior versions, close VS and use the Windows Explorer to delete these distributions.

## See Also

* [Telerik UI for Blazor Visual Studio Extensions Overview](slug:getting-started-vs-integration-overview)
* [Creating New Projects with Visual Studio](slug:getting-started-vs-integration-new-project)
