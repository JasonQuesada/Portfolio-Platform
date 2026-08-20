# Functional Requirements

## 1. Purpose

This document defines the functional requirements of the Portfolio Platform.

Functional requirements describe what the system must do from the perspective of visitors, the Administrator / Owner, and the application's internal workflows.

The initial system is a personal portfolio application with a public area and a protected administrative area.

The application is not a multi-user portfolio platform.

## 2. Functional Requirement Identification

Requirements are identified using the following convention:

- `FR-PUB-*` — Public Portfolio requirements.
- `FR-CONT-*` — Portfolio Content requirements.
- `FR-NAV-*` — Navigation requirements.
- `FR-CV-*` — CV requirements.
- `FR-CON-*` — Contact requirements.
- `FR-AUTH-*` — Authentication requirements.
- `FR-ADMIN-*` — Administrative requirements.
- `FR-DATA-*` — Data management requirements.
- `FR-MEDIA-*` — Media and file requirements.
- `FR-PUBCTRL-*` — Publication and visibility requirements.

## 3. Public Portfolio Requirements

### FR-PUB-001 — Public Access

The system shall allow visitors to access the public portfolio without authentication.

### FR-PUB-002 — No Visitor Account

The system shall not require visitors to create or use an account to access public portfolio content.

### FR-PUB-003 — Main Portfolio Page

The system shall provide a main public portfolio page through the `/` route.

### FR-PUB-004 — Profile Display

The system shall display the owner's professional profile on the main portfolio page.

### FR-PUB-005 — Main Skills Display

The system shall display the owner's primary skills on the main portfolio page.

### FR-PUB-006 — Experience Preview

The system shall display a limited preview of professional experiences on the main portfolio page.

### FR-PUB-007 — Project Preview

The system shall display a limited preview of selected projects on the main portfolio page.

### FR-PUB-008 — Education Display

The system shall display the owner's education information on the main portfolio page.

### FR-PUB-009 — Public Content Availability

The system shall display content to visitors only when that content is intended to be publicly visible.

### FR-PUB-010 — Responsive Public Interface

The public portfolio shall provide a responsive interface suitable for supported desktop, tablet, and mobile screen sizes.

## 4. Profile Requirements

### FR-CONT-001 — Profile Information

The system shall support storing and displaying the owner's profile information.

### FR-CONT-002 — Professional Name

The system shall support storing and displaying the owner's name.

### FR-CONT-003 — Professional Title

The system shall support storing and displaying the owner's professional title.

### FR-CONT-004 — Professional Summary

The system shall support storing and displaying a professional summary or description.

### FR-CONT-005 — Profile Image

The system shall support storing and displaying a profile image.

### FR-CONT-006 — Professional Links

The system shall support storing and displaying relevant professional links.

## 5. Skills Requirements

### FR-CONT-007 — Main Skills

The system shall support a collection of primary skills associated with the owner's overall profile.

### FR-CONT-008 — Manual Skill Management

The Administrator shall be able to manually create, update, reorder, and remove main skill values.

### FR-CONT-009 — Experience Skills

The system shall support skills associated with individual experiences.

### FR-CONT-010 — Project Skills

The system shall support skills associated with individual projects.

### FR-CONT-011 — Simple Skill Representation

Skills shall initially be represented as simple manually managed values such as strings.

### FR-CONT-012 — Skill Display

The system shall display skills clearly and consistently in the relevant public sections.

### FR-CONT-013 — No Skill Rating System

The initial system shall not require skill ratings, endorsements, voting, or other visitor interaction mechanisms.

## 6. Experience Requirements

### FR-CONT-014 — Experience Collection

The system shall support multiple professional experience records.

### FR-CONT-015 — Experience Basic Information

Each experience shall support, where applicable:

- Position or role.
- Organization.
- Location.
- Start date.
- End date.
- Short description.
- Detailed description.

### FR-CONT-016 — Experience Skills

Each experience shall support an associated list of skills.

### FR-CONT-017 — Experience Publication Status

Each experience shall support a publication or visibility status where required.

### FR-CONT-018 — Experience Ordering

The system shall support controlling the display order of experiences.

### FR-CONT-019 — Experience Preview

The system shall allow selected experiences to be displayed as previews on the main page.

### FR-CONT-020 — Complete Experience View

The system shall provide a dedicated `/experiences` route for displaying the complete experience information.

### FR-CONT-021 — Experience Details

The `/experiences` section shall provide more detailed information than the experience previews shown on the main page.

### FR-CONT-022 — No Unnecessary Experience Routes

The system shall not require a separate public route for every individual experience unless a future requirement explicitly justifies it.

## 7. Project Requirements

### FR-CONT-023 — Project Collection

The system shall support multiple project records.

### FR-CONT-024 — Project Basic Information

Each project shall support, where applicable:

- Project name.
- Short description.
- Detailed description.
- Technologies.
- Relevant links.
- Media.
- Publication status.
- Display order.

### FR-CONT-025 — Project Skills

Each project shall support an associated list of skills.

### FR-CONT-026 — Project Publication Status

Each project shall support a publication or visibility status where required.

### FR-CONT-027 — Project Ordering

The system shall support controlling the display order of projects.

### FR-CONT-028 — Project Preview

The system shall allow selected projects to be displayed as previews on the main page.

### FR-CONT-029 — Complete Project View

The system shall provide a dedicated `/projects` route for displaying the complete project information.

### FR-CONT-030 — Project Details

The `/projects` section shall provide more detailed information than the project previews shown on the main page.

### FR-CONT-031 — No Unnecessary Project Routes

The system shall not require a separate public route for every individual project unless a future requirement explicitly justifies it.

## 8. Education Requirements

### FR-CONT-032 — Education Information

The system shall support storing and displaying the owner's education information.

### FR-CONT-033 — Education Basic Information

Education records shall support, where applicable:

- Institution.
- Program or degree.
- Area of study.
- Start date.
- End date or expected completion date.
- Status.
- Description.
- Display order.

### FR-CONT-034 — Education Main Page Display

Education information shall be available directly from the main public portfolio page.

### FR-CONT-035 — No Dedicated Education Route

The initial system shall not require a dedicated `/education` route.

## 9. Navigation Requirements

### FR-NAV-001 — Main Route

The public portfolio shall be accessible through:

`/`

### FR-NAV-002 — Internal Navigation

The system shall support internal navigation between relevant sections of the main portfolio page.

### FR-NAV-003 — Experience Route

The system shall provide:

`/experiences`

for complete experience information.

### FR-NAV-004 — Project Route

The system shall provide:

`/projects`

for complete project information.

### FR-NAV-005 — Administrative Route

The administrative interface shall be accessible through:

`/admin`

### FR-NAV-006 — Administrative Route Visibility

The `/admin` route shall not be required to appear in the public navigation.

### FR-NAV-007 — Contact Route

The initial system shall not require a dedicated `/contact` route.

### FR-NAV-008 — Education Route

The initial system shall not require a dedicated `/education` route.

### FR-NAV-009 — Progressive Navigation

The system shall allow visitors to obtain general information from the main page while providing additional navigation only when more detailed content is required.

## 10. CV Requirements

### FR-CV-001 — CV Availability

The system shall provide public access to the owner's CV when a CV is configured for publication.

### FR-CV-002 — Embedded CV Viewing

The system shall allow visitors to open and view the CV within the website through an embedded viewing experience where supported by the selected file format and browser.

### FR-CV-003 — CV Download

The system shall allow visitors to download the CV.

### FR-CV-004 — No Authentication for CV

The system shall not require visitor authentication to view or download a publicly available CV.

### FR-CV-005 — CV Storage Reference

The system shall maintain a reference to the CV rather than requiring the CV location to be hard-coded throughout the application.

### FR-CV-006 — CV Management

The Administrator shall be able to update the CV reference or stored CV according to the implemented administrative functionality.

## 11. Contact Requirements

### FR-CON-001 — Email Contact

The system shall provide an email contact action.

### FR-CON-002 — Email Client

Selecting the email contact action shall allow the visitor to open their configured email client.

### FR-CON-003 — WhatsApp Contact

The system shall provide a WhatsApp contact action.

### FR-CON-004 — WhatsApp Client

Selecting the WhatsApp contact action shall open WhatsApp through an appropriate supported link or client behavior.

### FR-CON-005 — No Contact Form

The initial system shall not require a contact form.

### FR-CON-006 — No Message Storage

The initial system shall not store visitor contact messages in Firestore.

### FR-CON-007 — No Messaging Backend

The initial system shall not require a backend messaging service.

## 12. Authentication Requirements

### FR-AUTH-001 — Administrator Authentication

The system shall authenticate administrators using Google Sign-In.

### FR-AUTH-002 — Firebase Authentication

Google authentication shall be handled through Firebase Authentication.

### FR-AUTH-003 — Admin Authentication Entry Point

The administrator shall initiate authentication through:

`/admin`

### FR-AUTH-004 — Visitor Authentication

The system shall not require authentication for visitors accessing the public portfolio.

### FR-AUTH-005 — No Visitor Registration

The system shall not provide visitor registration.

### FR-AUTH-006 — No Visitor Login

The system shall not provide a public visitor login system.

## 13. Authorization Requirements

### FR-AUTH-007 — Authorization Check

After successful authentication, the system shall determine whether the authenticated account is authorized to access the administrative dashboard.

### FR-AUTH-008 — Authorized Admin Collection

Authorization shall use the `authorizedAdmins` Firestore collection.

### FR-AUTH-009 — Authorized Account

An authenticated Google account shall be considered authorized only when it is represented by an appropriate record in `authorizedAdmins`.

### FR-AUTH-010 — Unauthorized Access

An authenticated account that is not authorized shall not be granted access to the administrative dashboard.

### FR-AUTH-011 — Access Denied State

The system shall provide an appropriate access denied state for authenticated users who are not authorized.

### FR-AUTH-012 — Authorization Enforcement

Authorization for protected resources shall be enforced through Firebase Security Rules and shall not rely solely on frontend checks.

### FR-AUTH-013 — Authorized Admin Management

The application shall not provide an administrative interface for modifying the `authorizedAdmins` collection in the initial version.

### FR-AUTH-014 — Firebase-Side Admin Management

Authorized administrator records shall be managed directly through Firebase infrastructure.

## 14. Administrative Dashboard Requirements

### FR-ADMIN-001 — Admin Dashboard

The system shall provide a protected administrative dashboard for the authorized owner.

### FR-ADMIN-002 — Dashboard Access

Only authenticated and authorized accounts shall access the administrative dashboard.

### FR-ADMIN-003 — Profile Management

The Administrator shall be able to manage supported profile information.

### FR-ADMIN-004 — Profile Image Management

The Administrator shall be able to manage the profile image where supported by the implemented CMS.

### FR-ADMIN-005 — Main Skills Management

The Administrator shall be able to create, update, reorder, and remove main skills.

### FR-ADMIN-006 — Experience Management

The Administrator shall be able to create, read, update, and delete experience records.

### FR-ADMIN-007 — Experience Skill Management

The Administrator shall be able to manage the skills associated with each experience.

### FR-ADMIN-008 — Project Management

The Administrator shall be able to create, read, update, and delete project records.

### FR-ADMIN-009 — Project Skill Management

The Administrator shall be able to manage the skills associated with each project.

### FR-ADMIN-010 — Education Management

The Administrator shall be able to manage supported education information.

### FR-ADMIN-011 — CV Management

The Administrator shall be able to manage the published CV reference or file according to the implemented storage architecture.

### FR-ADMIN-012 — Publication Management

The Administrator shall be able to control publication status for supported content.

### FR-ADMIN-013 — Content Ordering

The Administrator shall be able to control display ordering for supported content.

### FR-ADMIN-014 — Administrative Feedback

The administrative interface shall provide appropriate loading, success, and error states for content management operations.

## 15. Data Management Requirements

### FR-DATA-001 — Firestore Content Storage

The system shall store structured portfolio content in Cloud Firestore.

### FR-DATA-002 — Content Retrieval

The public application shall retrieve the portfolio content required to render the public interface.

### FR-DATA-003 — Administrative Data Operations

The administrative dashboard shall perform appropriate Firestore operations for supported content management.

### FR-DATA-004 — Content Validation

The system shall validate administrative input before writing structured content to Firestore.

### FR-DATA-005 — Missing Content Handling

The public application shall handle missing or unavailable optional content without causing the entire portfolio to fail.

### FR-DATA-006 — Publication Filtering

The public application shall retrieve or display only content intended to be publicly visible.

### FR-DATA-007 — Ordering

The system shall support ordering of collections where presentation order is relevant.

## 16. Media and Storage Requirements

### FR-MEDIA-001 — Firebase Storage

The system shall use Firebase Storage for supported binary files and media.

### FR-MEDIA-002 — Profile Media

The system shall support storing the profile image in Firebase Storage where appropriate.

### FR-MEDIA-003 — CV Storage

The system shall support storing the CV in Firebase Storage where appropriate.

### FR-MEDIA-004 — Project Media

The system may support project-related media through Firebase Storage when required.

### FR-MEDIA-005 — Media References

Firestore records shall store references to managed media where appropriate rather than embedding binary file data directly into Firestore documents.

### FR-MEDIA-006 — Protected Media Operations

Administrative media operations shall be protected through appropriate Firebase Security Rules.

## 17. Publication and Visibility Requirements

### FR-PUBCTRL-001 — Published Content

The system shall support identifying content that is publicly published.

### FR-PUBCTRL-002 — Unpublished Content

The system shall support identifying content that should not be displayed publicly.

### FR-PUBCTRL-003 — Public Visibility

The public interface shall not display unpublished portfolio content.

### FR-PUBCTRL-004 — Administrative Visibility

The Administrator shall be able to view and manage content regardless of its publication state when authorized.

### FR-PUBCTRL-005 — Publication State Management

The Administrator shall be able to change the publication state of supported content.

## 18. Error and State Requirements

### FR-PUB-011 — Public Loading States

The public application shall provide appropriate loading behavior while required data is being retrieved.

### FR-PUB-012 — Public Error States

The public application shall provide appropriate error handling when required content cannot be retrieved.

### FR-ADMIN-015 — Administrative Loading States

The administrative interface shall provide appropriate loading feedback during authentication and content operations.

### FR-ADMIN-016 — Administrative Error States

The administrative interface shall clearly communicate relevant authentication, authorization, validation, and data operation errors.

### FR-ADMIN-017 — Authentication State

The administrative interface shall correctly respond to authentication state changes.

### FR-ADMIN-018 — Authorization State

The administrative interface shall correctly respond to authorization state changes.

## 19. Authentication and Authorization Flow

The complete administrative access flow shall follow this general sequence:

    Visitor
        |
        v
    /admin
        |
        v
    Google Sign-In
        |
        v
    Firebase Authentication
        |
        v
    Authenticated Google Account
        |
        v
    Check authorizedAdmins
        |
        +---- Not Authorized ----> Access Denied
        |
        +---- Authorized --------> Admin Dashboard

The system shall not grant administrative access solely because authentication succeeded.

## 20. Public Content Flow

The general public content flow shall follow:

    Visitor
        |
        v
    /
        |
        +-- Profile
        |
        +-- Main Skills
        |
        +-- Experience Preview
        |
        +-- Project Preview
        |
        +-- Education
        |
        +-- CV
        |
        +-- Contact
        |
        +-- Internal Navigation
                |
                +-- /experiences
                |
                +-- /projects

## 21. Administrative Content Flow

The general administrative content flow shall follow:

    Administrator
        |
        v
    /admin
        |
        v
    Authentication
        |
        v
    Authorization
        |
        v
    Admin Dashboard
        |
        +-- Profile
        +-- Skills
        +-- Experiences
        +-- Projects
        +-- Education
        +-- CV
        +-- Media
        +-- Publication Status

## 22. Out-of-Scope Functionalities

The following functions shall not be implemented as part of the initial requirements:

- Visitor account creation.
- Visitor authentication.
- Portfolio creation by visitors.
- Multi-user portfolio management.
- Multi-tenancy.
- Subscription management.
- Payments.
- Billing.
- Visitor messaging.
- Contact form processing.
- Visitor comments.
- Social networking features.
- Public content submissions.
- Analytics management.
- Native mobile application functionality.
- Custom REST API.
- GraphQL API.
- Custom Node.js backend server.
- Administrative management of `authorizedAdmins`.

These functions may only be introduced in a future scope revision if a concrete requirement justifies them.

## 23. Functional Requirement Principles

All implementation decisions related to these requirements should follow these principles:

- Public content must remain accessible without authentication.
- Administrative functionality must remain protected.
- Authentication and authorization must remain separate concepts.
- Firebase Security Rules must enforce protected resource access.
- The application should avoid unnecessary backend infrastructure.
- The public portfolio should prioritize a single-page experience.
- Additional routes should only be introduced when they provide meaningful value.
- Content should be manageable through the administrative dashboard where CMS functionality is required.
- Skills should remain simple and manually manageable.
- The CV should support both embedded viewing and downloading.
- Contact functionality should remain limited to email and WhatsApp in the initial version.
- The source code must remain suitable for eventual Open Source reuse.
- The application must remain a personal portfolio rather than becoming a multi-user portfolio platform.