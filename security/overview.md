---
title: Overview
page_title: Overview
description: Learn how to secure Telerik UI for Blazor components and your Web Forms app with best practices, vulnerability reporting, and component-specific security guidelines.
slug: security-overview
tags: telerik, blazor, security, xss, owasp, csp
published: True
position: 1
---

# Security

In today's world, security is more critical than ever. At Progress, we prioritize our customers' security, ensuring that our products are built with a strong foundation to safeguard their data and operations. We are committed to identifying and addressing potential vulnerabilities to provide our clients with the highest level of protection and confidence in our products.

## Purpose of this Article

This article covers common security-related questions, best practices, and the tools and processes we use to ensure the security of our products. It also outlines how customers and security researchers can report security issues, including our processes to mitigate risks. We provide guidance for submitting security reports through technical support or Bugcrowd, ensuring a clear pathway for identifying and addressing security concerns.

## Reporting Security Vulnerabilities

Whether you're a customer encountering an issue or a security researcher, we have processes to ensure a swift response and evaluation. Below are the steps for Progress customers and security researchers to report potential security vulnerabilities:

### For Progress Customers

At Progress, we work diligently to identify and fix security vulnerabilities in our products. Customers who believe they have identified a security issue should contact Technical Support for an evaluation. This allows us to document the issue and have our engineering teams confirm and address it as needed. Customers can submit reports through our support center:

- [Technical Support](https://www.telerik.com/account/support-center)
- [Contact Us](https://www.telerik.com/account/support-center/contact-us/technical-support)

### For Security Researchers

We value the contributions of security researchers and ethical hackers. If a researcher identifies a potential vulnerability, they can submit it via our [Bugcrowd](https://bugcrowd.com/engagements/devtools-vdp) platform. We aim to meet the following response times:

| Type of Response | SLO (in business days) |
|------------------|------------------------|
| First Response    | 7 days                 |
| Time to Triage    | 10 days                |
| Time to Resolution| Depends on severity    |

For more information, visit:

- [Bugcrowd Vulnerability Disclosure Program](https://bugcrowd.com/engagements/devtools-vdp)
- [Progress Trust Center](https://www.progress.com/trust-center)
- [Vulnerability Reporting Policy](https://www.progress.com/trust-center/vulnerability-reporting-policy)


## What We Do to Mitigate Risk

Our dedicated security team, comprised of experienced developers and security experts—our "Security Champions"—reviews all web, desktop, and mobile products technologies for potential vulnerabilities. These vulnerabilities may be internally identified, reported by third-party tools, or flagged externally.

We actively manage the following strategies to mitigate risks:

### Prevention

Our primary goal is to prevent security issues before product delivery. We use the following prevention techniques:

- **Internal Logging**: Every potential security issue is logged, researched, tested, and verified. Issues deemed valid are assessed using a CVSS score, with critical issues prioritized.
- **Third-Party Static Analysis Testing**: We utilize some of the leading security scanning tools in the market to scan for vulnerabilities in our software code. Regular scans are conducted, and results are reviewed to address vulnerabilities and mitigate false positives.


## Third-Party Dependencies Handling

We leverage leading commercial tools to automatically monitor and update third-party dependencies in our Telerik and Kendo GitHub projects, ensuring they remain secure and up-to-date. Alerts are enabled for all GitHub-hosted products, and the identified vulnerable dependencies are addressed by the repository code owners and security champions.

>Note: Our definition of "Done" includes successful builds that are scanned using top security scanning tools, and the resolution of any security alerts.


## Content Security Compliance

Content Security Policy (CSP) is a critical security measure that helps detect and mitigate the risks of content injection vulnerabilities, such as cross-site scripting (XSS) and data injection attacks. Telerik UI for Blazor components are designed to be CSP-compliant, ensuring secure integration into customer projects.

For more detailed information on CSP compliance for Telerik UI for Blazor, refer to the following article:
- [Telerik UI for Blazor - Content Security Policy]({%slug troubleshooting-csp%})

This resource provides guidelines on how to configure your Blazor application to comply with CSP requirements when using the Telerik UI for Blazor components.

## OWASP Top 10 Alignment

We closely monitor the [OWASP Top 10](https://owasp.org/www-project-top-ten/) list of security risks and align our security practices with these industry-leading standards. Regular updates ensure that our products address evolving security threats and vulnerabilities.

## Telerik UI for Blazor Component-Specific Security Guidelines

The following resources outline best practices and recommendations for securing the corresponding component and mitigating potential risks:

* [Editor - Security Guidelines]({%slug editor-overview%}#security)
* [Upload - Security Guidelines]({%slug upload-overview%}#security)

For more detailed answers to common security-related questions, please refer to our [Security FAQ page]({%slug security-faq%}).      
 