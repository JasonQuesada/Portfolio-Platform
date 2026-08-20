# Users and Use Cases

## 1. Purpose

This document defines the users, actors, and primary use cases of the Portfolio Platform.

The system has a deliberately limited user model.

The deployed application is a personal portfolio managed by its owner. Public visitors can consume published portfolio content without authentication, while the Administrator / Owner can access protected administrative functionality.

The application is not a multi-user portfolio platform and does not provide portfolio management functionality to public visitors.

## 2. System Actors

The Portfolio Platform has the following primary actors:

- Visitor.
- Administrator / Owner.
- Firebase Authentication.
- Firebase Services.

The Visitor and Administrator / Owner are human actors.

Firebase Authentication and Firebase Services are external system actors that support authentication, authorization, data storage, media storage, hosting, and security enforcement.

## 3. Visitor

### 3.1 Description

A Visitor is any person accessing the public portfolio.

The Visitor does not need to create an account or authenticate.

The Visitor's primary objective is to understand the owner's professional profile and access relevant professional information.

### 3.2 Visitor Goals

A Visitor should be able to:

- Understand who the owner is.
- Read the professional summary.
- Review the owner's main skills.
- Review professional experience.
- Review projects.
- Review education.
- View or download the CV.
- Contact the owner through email.
- Contact the owner through WhatsApp.
- Navigate to more detailed experience information.
- Navigate to more detailed project information.

### 3.3 Visitor Permissions

The Visitor may:

- Access published public content.
- Navigate public routes.
- View public profile information.
- View public skills.
- View published experiences.
- View published projects.
- View education information.
- Access the published CV.
- Use public contact actions.

The Visitor may not:

- Access the administrative dashboard.
- Modify portfolio content.
- Create portfolio content.
- Delete portfolio content.
- Change publication status.
- Manage media.
- Manage administrator authorization.
- Access protected administrative data.
- Create an account.
- Create another portfolio through the application.

## 4. Administrator / Owner

### 4.1 Description

The Administrator / Owner is the person responsible for managing the deployed portfolio.

The Administrator accesses the protected administrative area through:

`/admin`

### 4.2 Administrator Goals

The Administrator should be able to:

- Authenticate securely.
- Access the administrative dashboard when authorized.
- Manage profile information.
- Manage the profile image.
- Manage main skills.
- Manage experiences.
- Manage experience-specific skills.
- Manage projects.
- Manage project-specific skills.
- Manage education information.
- Manage the CV.
- Manage supported media.
- Control publication status.
- Control content ordering.

### 4.3 Administrator Authentication

The Administrator authenticates using Google Sign-In through Firebase Authentication.

Authentication establishes the identity of the user.

Authentication alone does not grant administrative access.

### 4.4 Administrator Authorization

After authentication, the application determines whether the authenticated Google account is authorized.

Authorization is based on the `authorizedAdmins` Firestore collection.

The general flow is:

    Administrator
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
    Authorized Admin Check
        |
        +---- Not Authorized ----> Access Denied
        |
        +---- Authorized --------> Admin Dashboard

### 4.5 Administrator Permissions

An authorized Administrator may:

- Read supported portfolio data.
- Create supported portfolio content.
- Update supported portfolio content.
- Delete supported portfolio content.
- Manage supported media.
- Change publication status.
- Change display ordering.

The Administrator may not manage the `authorizedAdmins` collection through the application in the initial version.

Authorization records are managed directly through Firebase infrastructure.

## 5. Firebase Authentication Actor

### 5.1 Description

Firebase Authentication is an external system responsible for authenticating administrators through Google Sign-In.

### 5.2 Responsibilities

Firebase Authentication is responsible for:

- Initiating Google authentication.
- Authenticating the Google account.
- Establishing the authenticated user identity.
- Providing authentication state information.
- Providing the authenticated user's Firebase identity to the application.

Firebase Authentication does not independently determine whether the authenticated user is an authorized administrator.

Authorization is handled separately.

## 6. Firebase Services Actor

Firebase Services represent the infrastructure used by the application.

The relevant services are:

- Firebase Authentication.
- Cloud Firestore.
- Firebase Storage.
- Firebase Hosting.
- Firebase Security Rules.

### 6.1 Cloud Firestore

Cloud Firestore is responsible for storing structured application data.

It supports:

- Profile information.
- Skills.
- Experiences.
- Projects.
- Education.
- Contact information.
- CV references.
- Publication information.
- Ordering information.
- Administrator authorization records.

### 6.2 Firebase Storage

Firebase Storage is responsible for storing supported files and media.

It may contain:

- Profile images.
- CV files.
- Project media.
- Other supported portfolio assets.

### 6.3 Firebase Hosting

Firebase Hosting provides hosting for the production frontend application.

### 6.4 Firebase Security Rules

Firebase Security Rules enforce access control for protected Firebase resources.

Frontend authorization checks are not considered the primary security boundary.

## 7. Use Case Identification

Use cases are identified using the following convention:

- `UC-PUB-*` — Public Visitor use cases.
- `UC-ADMIN-*` — Administrator use cases.
- `UC-AUTH-*` — Authentication and authorization use cases.
- `UC-DATA-*` — Data management use cases.
- `UC-MEDIA-*` — Media management use cases.
- `UC-CV-*` — CV use cases.
- `UC-CON-*` — Contact use cases.

## 8. Public Visitor Use Cases

### UC-PUB-001 — View Portfolio

**Actor:** Visitor

**Goal:** View the owner's general professional profile.

**Preconditions:**

- The application is available.
- Public content is configured.

**Main Flow:**

1. The Visitor opens the portfolio.
2. The system loads the main public route.
3. The system retrieves the required public content.
4. The system displays the profile.
5. The system displays main skills.
6. The system displays experience previews.
7. The system displays project previews.
8. The system displays education.
9. The system provides CV and contact actions.

**Postconditions:**

- The Visitor can access the general portfolio information.

### UC-PUB-002 — View Profile

**Actor:** Visitor

**Goal:** Review the owner's professional identity and summary.

**Main Flow:**

1. The Visitor accesses the main portfolio page.
2. The system displays the configured profile information.
3. The system displays the profile image when available.
4. The system displays the professional title.
5. The system displays the professional summary.

**Postconditions:**

- The Visitor can understand the owner's professional profile.

### UC-PUB-003 — View Main Skills

**Actor:** Visitor

**Goal:** Review the owner's primary skills.

**Main Flow:**

1. The Visitor accesses the main portfolio page.
2. The system retrieves the configured main skills.
3. The system displays the skills.

**Postconditions:**

- The Visitor can identify the owner's primary skills.

### UC-PUB-004 — View Experience Preview

**Actor:** Visitor

**Goal:** Quickly review selected professional experiences.

**Main Flow:**

1. The Visitor accesses the main portfolio page.
2. The system retrieves published experiences.
3. The system applies the configured ordering.
4. The system selects the experiences intended for the preview.
5. The system displays general experience information.

**Postconditions:**

- The Visitor can quickly review relevant experience without leaving the main page.

### UC-PUB-005 — View All Experiences

**Actor:** Visitor

**Goal:** Review the owner's complete professional experience.

**Main Flow:**

1. The Visitor selects the option to view more experiences.
2. The system navigates to `/experiences`.
3. The system retrieves published experiences.
4. The system displays the available experience information.
5. The system displays associated skills where configured.

**Postconditions:**

- The Visitor can review the complete published experience information.

### UC-PUB-006 — View Project Preview

**Actor:** Visitor

**Goal:** Quickly review selected projects.

**Main Flow:**

1. The Visitor accesses the main portfolio page.
2. The system retrieves published projects.
3. The system applies the configured ordering.
4. The system selects the projects intended for the preview.
5. The system displays project summaries.

**Postconditions:**

- The Visitor can quickly review relevant projects without leaving the main page.

### UC-PUB-007 — View All Projects

**Actor:** Visitor

**Goal:** Review the owner's complete published project information.

**Main Flow:**

1. The Visitor selects the option to view more projects.
2. The system navigates to `/projects`.
3. The system retrieves published projects.
4. The system displays project information.
5. The system displays associated skills and technologies where configured.
6. The system displays relevant project links and media where available.

**Postconditions:**

- The Visitor can review the complete published project information.

### UC-PUB-008 — View Education

**Actor:** Visitor

**Goal:** Review the owner's education background.

**Main Flow:**

1. The Visitor accesses the main portfolio page.
2. The system retrieves education information.
3. The system displays the configured education information.

**Postconditions:**

- The Visitor can review the owner's education.

No dedicated `/education` route is required.

## 9. CV Use Cases

### UC-CV-001 — View CV

**Actor:** Visitor

**Goal:** View the owner's CV.

**Main Flow:**

1. The Visitor selects the CV action.
2. The system retrieves the configured CV reference.
3. The system opens the CV through the supported viewing mechanism.
4. The Visitor can review the document.

**Postconditions:**

- The Visitor can view the CV.

### UC-CV-002 — Download CV

**Actor:** Visitor

**Goal:** Download the owner's CV.

**Main Flow:**

1. The Visitor selects the download CV action.
2. The system retrieves the configured CV file.
3. The browser initiates the download.

**Postconditions:**

- The Visitor has access to a local copy of the CV.

## 10. Contact Use Cases

### UC-CON-001 — Contact by Email

**Actor:** Visitor

**Goal:** Contact the owner by email.

**Main Flow:**

1. The Visitor selects the email contact action.
2. The system invokes the configured email link.
3. The Visitor's configured email client opens or the browser handles the email action.
4. The Visitor can compose and send an email.

**Postconditions:**

- The Visitor can initiate email communication with the owner.

The application does not store the message.

### UC-CON-002 — Contact by WhatsApp

**Actor:** Visitor

**Goal:** Contact the owner through WhatsApp.

**Main Flow:**

1. The Visitor selects the WhatsApp contact action.
2. The system opens the configured WhatsApp link.
3. WhatsApp opens through the supported browser or client behavior.
4. The Visitor can initiate communication.

**Postconditions:**

- The Visitor can initiate WhatsApp communication with the owner.

The application does not store the conversation.

## 11. Authentication Use Cases

### UC-AUTH-001 — Sign In as Administrator

**Actor:** Administrator

**Goal:** Authenticate into the administrative area.

**Preconditions:**

- The Administrator has access to a supported Google account.
- Firebase Authentication is available.

**Main Flow:**

1. The Administrator navigates to `/admin`.
2. The system displays the administrative access interface.
3. The Administrator selects Google Sign-In.
4. The system initiates Google authentication.
5. Firebase Authentication authenticates the account.
6. Firebase provides the authenticated user identity.
7. The application proceeds to authorization verification.

**Alternative Flow:**

- If authentication fails, the system displays an appropriate error state.
- If the Administrator cancels authentication, the system returns to the appropriate unauthenticated state.

**Postconditions:**

- The Administrator is authenticated or remains unauthenticated.

### UC-AUTH-002 — Verify Administrator Authorization

**Actor:** Administrator / Firebase Services

**Goal:** Determine whether an authenticated user is authorized to access the administrative dashboard.

**Preconditions:**

- The user has successfully authenticated through Firebase Authentication.

**Main Flow:**

1. The system obtains the authenticated user's identity.
2. The system checks the appropriate authorization record in `authorizedAdmins`.
3. Firebase Security Rules enforce the corresponding access requirements.
4. If the account is authorized, the system grants access to the administrative dashboard.

**Alternative Flow:**

- If the account is not authorized, the system denies administrative access.
- The system displays an appropriate access-denied state.

**Postconditions:**

- The authenticated user is either authorized or denied access.

### UC-AUTH-003 — Deny Unauthorized Administrator Access

**Actor:** Authenticated User

**Goal:** Prevent unauthorized users from accessing administrative functionality.

**Preconditions:**

- The user has authenticated.
- The user's account is not authorized.

**Main Flow:**

1. The system detects that the account is not present in the authorized administrator records.
2. The system prevents access to the administrative dashboard.
3. The system displays an access-denied state.

**Postconditions:**

- The unauthorized user cannot access protected administrative functionality.

## 12. Administrative Dashboard Use Cases

### UC-ADMIN-001 — Access Dashboard

**Actor:** Administrator

**Goal:** Access the administrative dashboard.

**Preconditions:**

- The Administrator is authenticated.
- The Administrator is authorized.

**Main Flow:**

1. The Administrator accesses `/admin`.
2. The system confirms authentication.
3. The system confirms authorization.
4. The system loads the administrative dashboard.
5. The system displays available management sections.

**Postconditions:**

- The Administrator can manage supported portfolio content.

### UC-ADMIN-002 — Manage Profile

**Actor:** Administrator

**Goal:** Manage profile information.

**Main Flow:**

1. The Administrator opens the profile management section.
2. The system retrieves the current profile data.
3. The Administrator creates or edits profile information.
4. The system validates the input.
5. The system stores the updated information.
6. The system provides success or error feedback.

**Postconditions:**

- The profile data is updated.

### UC-ADMIN-003 — Manage Main Skills

**Actor:** Administrator

**Goal:** Manage primary profile skills.

**Main Flow:**

1. The Administrator opens the skills management section.
2. The system retrieves the current skills.
3. The Administrator creates, updates, reorders, or removes skills.
4. The system validates the operation.
5. The system stores the changes.
6. The system provides appropriate feedback.

**Postconditions:**

- The main skills reflect the Administrator's changes.

### UC-ADMIN-004 — Manage Experiences

**Actor:** Administrator

**Goal:** Manage professional experience records.

**Main Flow:**

1. The Administrator opens the experience management section.
2. The system retrieves existing experiences.
3. The Administrator creates, edits, reorders, publishes, unpublishes, or deletes an experience.
4. The system validates the submitted information.
5. The system stores the changes.
6. The system provides appropriate feedback.

**Postconditions:**

- The experience collection reflects the Administrator's changes.

### UC-ADMIN-005 — Manage Experience Skills

**Actor:** Administrator

**Goal:** Manage skills associated with an experience.

**Main Flow:**

1. The Administrator opens an experience.
2. The system displays the associated skills.
3. The Administrator adds, updates, reorders, or removes skills.
4. The system validates the operation.
5. The system stores the changes.

**Postconditions:**

- The experience contains the configured skills.

### UC-ADMIN-006 — Manage Projects

**Actor:** Administrator

**Goal:** Manage project records.

**Main Flow:**

1. The Administrator opens the project management section.
2. The system retrieves existing projects.
3. The Administrator creates, edits, reorders, publishes, unpublishes, or deletes a project.
4. The system validates the submitted information.
5. The system stores the changes.
6. The system provides appropriate feedback.

**Postconditions:**

- The project collection reflects the Administrator's changes.

### UC-ADMIN-007 — Manage Project Skills

**Actor:** Administrator

**Goal:** Manage skills associated with a project.

**Main Flow:**

1. The Administrator opens a project.
2. The system displays the associated skills.
3. The Administrator adds, updates, reorders, or removes skills.
4. The system validates the operation.
5. The system stores the changes.

**Postconditions:**

- The project contains the configured skills.

### UC-ADMIN-008 — Manage Education

**Actor:** Administrator

**Goal:** Manage education information.

**Main Flow:**

1. The Administrator opens the education management section.
2. The system retrieves existing education information.
3. The Administrator creates or edits education information.
4. The system validates the input.
5. The system stores the changes.
6. The system provides appropriate feedback.

**Postconditions:**

- The education information reflects the Administrator's changes.

### UC-ADMIN-009 — Manage CV

**Actor:** Administrator

**Goal:** Manage the publicly available CV.

**Main Flow:**

1. The Administrator opens the CV management section.
2. The system displays the current CV configuration.
3. The Administrator uploads or selects a replacement CV where supported.
4. The system validates the file.
5. The system stores the file in the appropriate Firebase Storage location.
6. The system updates the relevant Firestore reference.
7. The system provides success or error feedback.

**Postconditions:**

- The configured public CV references the current document.

## 13. Media Use Cases

### UC-MEDIA-001 — Upload Media

**Actor:** Administrator

**Goal:** Upload supported portfolio media.

**Main Flow:**

1. The Administrator selects an upload operation.
2. The system validates the selected file.
3. The system uploads the file to Firebase Storage.
4. The system obtains the appropriate storage reference.
5. The system stores the reference in the relevant Firestore document when required.
6. The system provides success or error feedback.

**Postconditions:**

- The media is available according to its configured visibility.

### UC-MEDIA-002 — Replace Media

**Actor:** Administrator

**Goal:** Replace an existing portfolio asset.

**Main Flow:**

1. The Administrator selects an existing media asset.
2. The Administrator selects a replacement file.
3. The system validates the replacement.
4. The system uploads the new file.
5. The system updates the relevant reference.
6. The system handles the previous file according to the implemented storage lifecycle.

**Postconditions:**

- The relevant content references the new media asset.

### UC-MEDIA-003 — Remove Media

**Actor:** Administrator

**Goal:** Remove an existing media asset.

**Main Flow:**

1. The Administrator selects a media asset for removal.
2. The system confirms the operation where appropriate.
3. The system removes or detaches the media according to the implemented storage lifecycle.
4. The system updates the relevant data reference.

**Postconditions:**

- The removed media is no longer used by the associated content.

## 14. Publication Use Cases

### UC-DATA-001 — Publish Content

**Actor:** Administrator

**Goal:** Make supported content publicly visible.

**Main Flow:**

1. The Administrator opens the relevant content.
2. The Administrator changes its publication status to published.
3. The system validates the operation.
4. The system stores the updated publication state.
5. The public application can subsequently display the content.

**Postconditions:**

- The content is marked as published.

### UC-DATA-002 — Unpublish Content

**Actor:** Administrator

**Goal:** Remove supported content from the public portfolio without necessarily deleting it.

**Main Flow:**

1. The Administrator opens the relevant content.
2. The Administrator changes its publication status to unpublished.
3. The system stores the updated publication state.
4. The public interface no longer displays the content.

**Postconditions:**

- The content remains available to the Administrator but is not publicly displayed.

## 15. Ordering Use Cases

### UC-DATA-003 — Reorder Content

**Actor:** Administrator

**Goal:** Control the order in which supported content appears publicly.

**Main Flow:**

1. The Administrator opens the relevant collection.
2. The system displays the current order.
3. The Administrator changes the order.
4. The system stores the new ordering.
5. The public interface uses the updated order.

**Postconditions:**

- Public content appears according to the configured order.

## 16. Data Retrieval Use Cases

### UC-DATA-004 — Retrieve Public Content

**Actor:** Visitor / Firebase Services

**Goal:** Retrieve the content required to render the public portfolio.

**Main Flow:**

1. The Visitor accesses a public route.
2. The application requests the required public data.
3. Cloud Firestore returns the permitted data.
4. The application processes the data.
5. The interface renders the available content.

**Alternative Flow:**

- If optional data is unavailable, the application continues rendering unrelated sections.
- If required data cannot be retrieved, the application displays an appropriate error state.

**Postconditions:**

- The Visitor receives the available public portfolio content.

### UC-DATA-005 — Retrieve Administrative Content

**Actor:** Administrator / Firebase Services

**Goal:** Retrieve content for management through the administrative dashboard.

**Preconditions:**

- The Administrator is authenticated.
- The Administrator is authorized.

**Main Flow:**

1. The Administrator opens a management section.
2. The application requests the relevant data.
3. Firebase Security Rules evaluate the request.
4. Authorized data is returned.
5. The application displays the data.

**Postconditions:**

- The Administrator can manage the relevant content.

## 17. Data Modification Use Cases

### UC-DATA-006 — Create Content

**Actor:** Administrator

**Goal:** Create a new supported portfolio record.

**Main Flow:**

1. The Administrator opens the relevant management section.
2. The Administrator enters the required information.
3. The application validates the input.
4. The application sends the operation to Firestore.
5. Firebase Security Rules evaluate the request.
6. The record is created if authorized.
7. The application provides success feedback.

**Postconditions:**

- A new portfolio record exists.

### UC-DATA-007 — Update Content

**Actor:** Administrator

**Goal:** Modify an existing portfolio record.

**Main Flow:**

1. The Administrator selects a record.
2. The system retrieves the existing data.
3. The Administrator modifies the information.
4. The system validates the input.
5. The application sends the update to Firestore.
6. Firebase Security Rules evaluate the request.
7. The record is updated if authorized.
8. The application provides success feedback.

**Postconditions:**

- The portfolio record reflects the updated information.

### UC-DATA-008 — Delete Content

**Actor:** Administrator

**Goal:** Delete a supported portfolio record.

**Main Flow:**

1. The Administrator selects a record.
2. The system requests confirmation where appropriate.
3. The Administrator confirms deletion.
4. The application sends the delete operation to Firestore.
5. Firebase Security Rules evaluate the request.
6. The record is deleted if authorized.
7. The application provides success feedback.

**Postconditions:**

- The selected record is removed.

## 18. Use Case Relationships

The major relationships between use cases are:

    View Portfolio
        |
        +-- View Profile
        +-- View Main Skills
        +-- View Experience Preview
        +-- View Project Preview
        +-- View Education
        +-- View CV
        +-- Contact by Email
        +-- Contact by WhatsApp

    View Experience Preview
        |
        +-- View All Experiences

    View Project Preview
        |
        +-- View All Projects

    Access Dashboard
        |
        +-- Sign In as Administrator
        |
        +-- Verify Administrator Authorization
        |
        +-- Manage Profile
        +-- Manage Main Skills
        +-- Manage Experiences
        +-- Manage Experience Skills
        +-- Manage Projects
        +-- Manage Project Skills
        +-- Manage Education
        +-- Manage CV
        +-- Upload Media
        +-- Publish Content
        +-- Unpublish Content
        +-- Reorder Content

## 19. Main Public Use Case Flow

The general Visitor flow is:

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
        |       |
        |       +-- /experiences
        |
        +-- Project Preview
        |       |
        |       +-- /projects
        |
        +-- Education
        |
        +-- CV
        |       |
        |       +-- View
        |       +-- Download
        |
        +-- Contact
                |
                +-- Email
                +-- WhatsApp

## 20. Main Administrative Use Case Flow

The general Administrator flow is:

    Administrator
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
    Authorization Check
        |
        +-- Unauthorized
        |       |
        |       v
        |   Access Denied
        |
        +-- Authorized
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
                +-- Publication
                +-- Ordering

## 21. Security Boundary

Use cases involving administrative data must be protected at the Firebase resource level.

The following principles apply:

- Public users may access only data intended to be public.
- Authenticated users are not automatically administrators.
- Authorization must be checked against `authorizedAdmins`.
- Firebase Security Rules must enforce access to protected resources.
- Frontend route protection is a user-experience mechanism and not the primary security boundary.
- The application must not expose administrative functionality through public interfaces.
- The `authorizedAdmins` collection must not be managed through the application's CMS.

## 22. Out-of-Scope Actors

The following actors are intentionally not part of the initial system:

- Registered Visitor.
- Portfolio Creator.
- Portfolio Tenant.
- Moderator.
- Reviewer.
- Subscriber.
- Customer.
- Payment User.
- Messaging User.
- Analytics User.

These actors may only be introduced if the project scope is formally expanded in a future version.

## 23. Out-of-Scope Use Cases

The following use cases are not included in the initial version:

- Register as a visitor.
- Sign in as a visitor.
- Create a portfolio.
- Manage another user's portfolio.
- Create multiple portfolios.
- Subscribe to the platform.
- Make payments.
- Send messages through an internal messaging system.
- Submit public content.
- Comment on projects.
- Rate skills.
- Endorse skills.
- Manage visitor accounts.
- Manage multiple tenants.
- Manage billing.
- Manage subscriptions.
- Access analytics dashboards.
- Use a native mobile application.

## 24. Use Case Principles

The use case model follows these principles:

- The Visitor is primarily a read-only public user.
- The Administrator / Owner is the primary content manager.
- Public visitors do not require authentication.
- Administrator authentication uses Google Sign-In.
- Authentication and authorization remain separate.
- Authorization uses the `authorizedAdmins` collection.
- Firebase Security Rules enforce protected resource access.
- The main portfolio is primarily a single-page experience.
- Detailed routes are introduced only when they provide meaningful value.
- Contact functionality remains external through email and WhatsApp.
- The CV is publicly accessible when configured for publication.
- Skills can exist globally and within experiences and projects.
- The application remains a personal portfolio rather than a multi-user platform.
- The source code may be reused as an independent Open Source portfolio template.