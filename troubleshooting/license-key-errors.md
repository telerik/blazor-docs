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

* Missing license key.
* Using an expired subscription license after the end of the subscription term.
* Using a perpetual license with a product version that was released outside the validity period of your license.
* Using an expired trial license.
* Using an outdated license key after making renewals or purchases.
* Using a license key that doesn't include Telerik UI for Blazor.
* Using conflicting license keys in the same environment. For example, using one global license key and one in the app. Or, using a license key file together with an environment variable in CI/CD environment.
* Corrupt license key

Refer to the specific error messages and tips below.

## Error Messages

### No Telerik or Kendo UI product references detected in project (TKL001)

This error can occur when a project references `Telerik.Licensing`, but not any other Telerik packages. If your scenario is different, please contact [Technical Support](https://www.telerik.com/account/support-center).

### No Telerik and Kendo UI License file found (TKL002)

[Install a license key file](slug:installation-license-key). If you already downloaded it, make sure it's [saved at the right place](slug:installation-license-key#manual-installation).

### Corrupted Telerik and Kendo UI License Key content (TKL003)

Follow the [automatic](slug:installation-license-key#automatic-installation) or [manual](slug:installation-license-key#manual-installation) installation steps from scratch. Also check how to [set up a license key in CI/CD environments](slug:deployment-license-key).

If you have set a `TELERIK_LICENSE` environment variable through the Windows operating system's UI, then remove the environment variable and use a license key file instead.

### Unable to locate licenses for all products (TKL004)

Your license is not valid for the detected product(s).

[Review the purchase options for Telerik UI for Blazor](https://www.telerik.com/purchase/blazor-ui). If you have already purchased the required license, then, [update your license key](slug:installation-license-key#license-key-updates).

### Telerik UI for Blazor is not listed in your current license file (TKL101)

Your license is not valid for the detected product(s).

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
