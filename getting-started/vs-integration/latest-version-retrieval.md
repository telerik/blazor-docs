---
title: Download New Versions
page_title: Download New Versions - Visual Studio Integration
description: Learn how to keep your projects updated when using Telerik UI for Blazor.
slug: getting-started-vs-integration-latest-version
position: 4
---

# Download New Versions

The Progress&reg; Telerik&reg; UI for Blazor Visual Studio (VS) Extensions enable you to keep your projects updated.


<!--
The Latest Version Retrieval tool automatically checks for the latest Telerik UI for Blazor distribution which is available for you on the Telerik website. Once a day, upon loading a project with Telerik UI for Blazor components, the extensions query the Telerik website for a new version of Telerik UI for Blazor. When a new version is detected, a notification is displayed that lets you download it.

![Getting the latest version notification](images/lva_notification.png)

Clicking the **Update Now** button starts the Latest Version Acquirer tool which prompts for your Telerik credentials on its first page. If you do not have a [www.telerik.com](https://www.telerik.com) account, you can create one through the **Create an account for free** link.

-->


Clicking the **Get Latest** button in the [Create New Project]({% slug getting-started-vs-integration-new-project %}) wizard starts the Latest Version Acquirer tool. You must enter your Telerik credentials to continue. If you do not have a [www.telerik.com](https://www.telerik.com) account, select the **Create an account for free** link.

1. Log in with your Telerik credentials

    >tip To avoid entering your Telerik credentials multiple times, select **Save my password**. The credentials are saved securely in a per-user context. Other users on the machine do not have access to your stored credentials.

    ![First, log in](images/login-vs-ext-download.png)

    >tip See the [Telerik UI for Blazor release notes](https://www.telerik.com/support/whats-new/blazor-ui/release-history) for more information on the latest available versions.

1. In the dialog that appears, click the **Download** button.

    ![Confirming the download of the latest version dialog](images/download-new-version.png)

1. Return to the [Create New Project]({% slug getting-started-vs-integration-new-project %}) wizard and select the newly downloaded version from the dropdown menu.

    >tip If you use the **Download** or **Get Latest** buttons on the **Create New Project** screen to launch the update, the wizard will return to the same screen automatically.

    ![The new version is now available in the New Project wizard](images/new-version-in-new-project-wizard.png)
    
    
>tip The **Latest Version Acquirer** tool downloads a `.zip` file that contains the latest Telerik UI for Blazor packages. It is saved in the `%APPDATA%\Telerik\Updates` folder by default. If the list with the offered packages gets too long and you do not need the older versions, close VS and use the Windows Explorer to delete these distributions.

## See Also

* [Visual Studio Extensions Overview]({% slug getting-started-vs-integration-overview %})
* [Creating New Projects with Visual Studio]({% slug getting-started-vs-integration-new-project %})
