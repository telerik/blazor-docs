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

A Telerik license key error may occur in the following scenarios:

* The license key is missing or not set up correctly.
* The license key is outdated or does not include the product version that you are using.
* Your subscription license or trial has expired.
* You have different conflicting license keys in the same environment. For example, using one global license key and one in the app. Or, using a license key file together with an environment variable in CI/CD environment.

Refer to the specific error messages and tips below.

## Error Messages

### No Telerik or Kendo UI product references detected in project (TKL001)

This error can occur when a project references `Telerik.Licensing`, but not any other Telerik packages. In this case, remove the `Telerik.Licensing` package from the project. If your scenario is different, [contact Technical Support](https://www.telerik.com/account/support-center).

### No Telerik and Kendo UI License file found (TKL002)

The error means that the license key is missing or not set up correctly. For example, the environment variable is not set or [the license file may be at the wrong place](slug:installation-license-key#manual-installation). The error can also occur if the environment variable or license file exists, but it is empty.

[Install a license key](slug:installation-license-key) again. Also check how to [set up a license key in CI/CD environments](slug:deployment-license-key).

### Corrupted Telerik and Kendo UI License Key content (TKL003)

The license key is detected, but its value is invalid and cannot be decrypted. For example, if you have set a `TELERIK_LICENSE` environment variable through the Windows operating system's UI, then it may be truncated. In such cases, remove the environment variable and use a license key file instead.

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
* Use a Telerik UI for Blazor version that was released within the subscription period of your perpetual license.

### Your subscription has expired (TKL103, TKL104)

This error applies to subscription licenses. [Renew your subscription](https://www.telerik.com/account/your-licenses) and then, [update your license key](slug:installation-license-key#license-key-updates).

### Your trial expired (TKL105)

[Purchase a commercial license to continue using Telerik UI for Blazor](https://www.telerik.com/purchase/blazor-ui).

## See Also

* [Download and Install License Key](slug:installation-license-key)
* [Use License Keys in CI/CD](slug:deployment-license-key)
