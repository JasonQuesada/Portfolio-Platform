# Requirements Overview

## 1. Purpose

This document provides a high-level overview of the requirements for the Portfolio Platform.

The project is a personal portfolio website owned and managed by a single administrator. Its primary purpose is to present professional information, experience, projects, skills, education, and other relevant content through a public website.

The application is not a multi-user portfolio platform.

Visitors cannot create accounts, create portfolios, manage content, or access administrative functionality.

The source code may be reused by other developers as an Open Source template for creating their own portfolio websites. Reusing the code does not mean that the deployed application provides portfolio creation functionality to its visitors.

## 2. Product Overview

The Portfolio Platform consists of two main areas:

- A public portfolio.
- A protected administrative dashboard.

The public portfolio is accessible without authentication.

The administrative dashboard is accessed manually through the `/admin` route and requires authentication and authorization.

The application uses Firebase-managed infrastructure for authentication, database storage, file storage, hosting, and access control.

The initial version does not require a custom backend server.

## 3. Requirement Scope

The requirements defined during Phase 01 cover:

- Product vision.
- Product objectives.
- Project scope.
- Functional requirements.
- Non-functional requirements.
- Users.
- Use cases.
- Public portfolio behavior.
- Administrative behavior.
- Navigation.
- Data management.
- Authentication.
- Authorization.
- Firebase integration.
- Security requirements.
- Deployment requirements.
- Open Source reuse requirements.
- Architectural constraints.

Detailed requirements are distributed across the documentation in this directory and related architecture, data model, security, and roadmap documentation.

## 4. Primary Users

The system has two primary user types:

### 4.1 Visitor

A visitor is any person accessing the public portfolio.

A visitor:

- Does not need an account.
- Does not need to authenticate.
- Can view published portfolio content.
- Can navigate public sections and routes.
- Can view profile information.
- Can view skills.
- Can view experience previews and detailed experience information.
- Can view project previews and detailed project information.
- Can view education information.
- Can view the CV.
- Can download the CV.
- Can use the email contact action.
- Can use the WhatsApp contact action.

A visitor cannot:

- Access administrative functionality.
- Modify portfolio content.
- Create an account.
- Create a portfolio.
- Manage users.
- Access protected data.

### 4.2 Administrator / Owner

The Administrator / Owner is the person responsible for managing the portfolio.

The administrator accesses the administrative area manually through:

`/admin`

The administrator:

- Authenticates using Google Sign-In.
- Is authenticated through Firebase Authentication.
- Must be authorized through the `authorizedAdmins` Firestore collection.
- Can access the administrative dashboard only when authorization requirements are satisfied.
- Can manage supported portfolio content.
- Can manage supported media and files.
- Can publish or unpublish supported content.

The initial version is designed around a single owner, although the `authorizedAdmins` collection may technically contain more than one authorized account.

The application does not provide a CMS interface for managing the `authorizedAdmins` collection.

Authorization records are managed directly through Firebase infrastructure.

## 5. Public Portfolio Requirements

The public portfolio must be accessible without requiring visitors to create an account or log in.

The primary public route is:

`/`

The main portfolio page should present the general portfolio experience as a single-page flow containing the most important information.

The main page includes, where applicable:

- Profile.
- Main skills.
- Experience preview.
- Project preview.
- Education.
- CV.
- Contact actions.

The main page should not require a separate route for every content section.

For example, dedicated routes are not initially required for:

- Contact.
- Education.

Additional public routes should be created only when they provide meaningful value because of the amount or depth of content.

The initial detailed routes are:

`/experiences`

`/projects`

These routes provide access to complete lists and more detailed information when the main page previews are not sufficient.

## 6. Portfolio Content Requirements

The portfolio must support dynamic management of the following content:

- Profile information.
- Profile image.
- Main skills.
- Experiences.
- Skills associated with individual experiences.
- Projects.
- Skills associated with individual projects.
- Education.
- Professional links.
- Contact information.
- CV.
- Portfolio media where required.

Content intended to be managed through the administrative dashboard should not be unnecessarily hard-coded into the frontend.

## 7. Profile Requirements

The public portfolio must support a profile section containing relevant professional information.

The profile may include:

- Name.
- Professional title.
- Professional summary or description.
- Profile image.
- Main skills.
- Relevant professional links.

The exact presentation may evolve during implementation while maintaining the architectural requirements defined for the data model and public portfolio.

## 8. Skills Requirements

The application must support main skills associated with the overall profile.

Main skills should be simple values that can be manually managed by the administrator.

The application must also support skills associated with individual experiences.

For example:

    Experience
    |
    +-- Skill
    +-- Skill
    +-- Skill

The application must also support skills associated with individual projects.

For example:

    Project
    |
    +-- Skill
    +-- Skill
    +-- Skill

Skills do not initially require a complex centralized taxonomy, rating system, endorsement system, or visitor interaction model.

The administrator should be able to manually define the relevant skill strings.

## 9. Experience Requirements

The application must support multiple professional experiences.

Each experience should support the information required to present:

- General information.
- Role or position.
- Organization.
- Location where relevant.
- Date or date range.
- Short description.
- Detailed description where applicable.
- Associated skills.
- Publication status.
- Display order where required.

The main public page should show a limited preview of experiences.

The visitor should be able to access additional experience information when appropriate.

The `/experiences` route should support displaying the complete experience collection and detailed information.

The application should avoid requiring a dedicated public route for every individual experience unless such a requirement is justified in a future version.

## 10. Project Requirements

The application must support multiple projects.

Each project should support the information required to present:

- Project name.
- Short description.
- Detailed description where applicable.
- Associated skills.
- Technologies where relevant.
- Relevant links.
- Media where applicable.
- Publication status.
- Display order where required.

The main public page should show a limited preview of projects.

The `/projects` route should support displaying the complete project collection and additional details.

The application should avoid requiring a dedicated public route for every individual project unless such a requirement is justified in a future version.

## 11. Education Requirements

The application must support education information.

Education is expected to contain a relatively limited amount of content and should initially be displayed as part of the main public portfolio.

A dedicated `/education` route is not required for the initial version.

The education model may support:

- Institution.
- Program or degree.
- Area of study.
- Start date.
- End date or expected completion date.
- Status.
- Description where relevant.
- Display order.

## 12. CV Requirements

The application must support a CV or resume.

The CV may be stored using Firebase Storage or another approved storage configuration.

The public portfolio must provide a way for visitors to:

- Open the CV within the website through an embedded viewing experience where supported.
- Download the CV.

The implementation must not require visitors to authenticate to access the publicly available CV.

The application should store references to the CV in a maintainable way rather than unnecessarily hard-coding a file location throughout the frontend.

## 13. Contact Requirements

The initial contact functionality is intentionally simple.

The public portfolio must provide:

- An email contact action.
- A WhatsApp contact action.

The email action should open the visitor's configured email client.

The WhatsApp action should open WhatsApp through an appropriate link or supported client behavior.

The initial version does not require:

- A contact form.
- A messaging backend.
- Firestore message storage.
- Email sending infrastructure.
- Visitor accounts.

## 14. Administrative Requirements

The administrative interface must be accessible through:

`/admin`

The route does not need to be displayed in public navigation.

Accessing `/admin` should present the appropriate authentication or access state.

The administrative dashboard must support management of portfolio content that is included in the initial CMS scope.

Administrative functionality should support appropriate create, read, update, and delete operations where applicable.

The exact administrative interface may be divided into sections based on the content being managed.

## 15. Authentication Requirements

The initial administrator authentication method is Google Sign-In.

The authentication flow is:

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

Successful authentication alone does not grant administrative access.

The authenticated account must also satisfy the authorization requirements.

Visitors do not need to authenticate to view the public portfolio.

The application does not initially support:

- Visitor registration.
- Visitor login.
- Email/password registration for visitors.
- Public user accounts.
- Social features.
- Multi-user portfolio accounts.

## 16. Authorization Requirements

Administrative access must be restricted to authorized Google accounts.

The authorization model uses the `authorizedAdmins` Firestore collection.

The authorization flow is:

    Google Sign-In
        |
        v
    Firebase Authentication
        |
        v
    Authenticated User
        |
        v
    Check authorizedAdmins
        |
        +-- Not Authorized ----> Access Denied
        |
        +-- Authorized --------> Admin Dashboard

The frontend may check authorization to determine the user experience.

However, frontend checks must not be considered the primary security boundary.

Firebase Security Rules must enforce access to protected Firestore and Storage resources.

The application must not provide a CMS interface for adding or removing authorized administrators.

The `authorizedAdmins` collection is managed directly through Firebase infrastructure.

## 17. Data Requirements

Structured portfolio content must be stored in Cloud Firestore.

Binary files and media should be stored in Firebase Storage when appropriate.

The data model must support:

- Published content.
- Unpublished content.
- Content ordering where required.
- Individual experience skills.
- Individual project skills.
- References to stored media.
- Administrative authorization records.

The detailed Firestore schema and Storage structure are defined separately in the data model documentation.

## 18. Publication Requirements

The application must distinguish between content that is publicly visible and content that is not publicly visible.

Published content may be displayed to visitors.

Unpublished content must not be displayed through the public portfolio.

The administrator must be able to manage publication status for supported content where applicable.

Public visibility must not rely solely on hiding content in the user interface.

Data access and publication behavior must be protected through the appropriate application logic and Firebase Security Rules.

## 19. Navigation Requirements

The public portfolio should prioritize a single-page experience for general information.

Internal navigation may allow visitors to move between sections of the main page.

Detailed routes should exist only where they provide meaningful value.

The initial public route structure is:

    /
    /experiences
    /projects

The administrative route is:

    /admin

The `/admin` route is accessed manually and does not need to appear in the public navigation.

## 20. Firebase Requirements

The application must use Firebase services for the initial backend infrastructure.

Required Firebase services are:

- Firebase Authentication.
- Cloud Firestore.
- Firebase Storage.
- Firebase Hosting.
- Firebase Security Rules.

Firebase Authentication is used for administrator authentication.

Cloud Firestore is used for structured portfolio data.

Firebase Storage is used for files and media.

Firebase Hosting is used for production hosting.

Firebase Security Rules are used to enforce access control.

## 21. Security Requirements

The application must protect administrative functionality and portfolio management operations.

Security requirements include:

- Visitors must not require authentication to view public content.
- Unauthorized users must not gain administrative access.
- Successful Google authentication alone must not grant administrative access.
- Administrative authorization must be based on authorized accounts.
- Firebase Security Rules must enforce protected access.
- The `authorizedAdmins` collection must not be managed through the public portfolio or administrative CMS.
- Secrets and privileged credentials must not be committed to the repository.
- Environment-specific configuration must be handled appropriately.
- Public and unpublished content must be treated according to their intended visibility.

Detailed security requirements are defined separately in the security documentation.

## 22. Deployment Requirements

The application must be deployable using Firebase Hosting.

The production deployment must support:

- The public portfolio.
- Client-side routing.
- The `/admin` route.
- Firebase Authentication.
- Firestore access.
- Firebase Storage access.
- Firebase Security Rules.

The application must not require a custom Node.js or Express production server for the initial version.

Normal content updates should not require a new frontend deployment when the application code itself has not changed.

## 23. Open Source Reuse Requirements

The source code should be structured so that other developers can reuse it as a template for their own portfolio.

A developer reusing the repository should be able to:

- Clone or fork the repository.
- Configure their own Firebase project.
- Replace portfolio content.
- Configure their own administrator accounts.
- Deploy their own instance.

The original owner's private Firebase resources and credentials must not be required to reuse the project.

The application itself remains a single-owner portfolio rather than a hosted platform for multiple portfolio users.

## 24. Out of Scope

The initial version does not include:

- A custom Node.js backend.
- Express.
- REST API endpoints.
- GraphQL.
- Visitor accounts.
- Visitor registration.
- Multi-user portfolios.
- Portfolio creation by visitors.
- Multi-tenancy.
- Public user profiles.
- Messaging systems.
- Contact forms with backend processing.
- Payments.
- Billing.
- Analytics.
- Social features.
- Role management beyond the initial administrator authorization model.
- A native mobile application.

These features may be considered in future versions only if they are supported by a concrete project requirement.

## 25. Requirement Priorities

The highest priorities for the initial version are:

1. A professional public portfolio.
2. Public access without visitor authentication.
3. Secure administrator access through Google Sign-In and authorization.
4. Dynamic content management through the administrative dashboard.
5. Firestore-based structured content management.
6. Firebase Storage for required files and media.
7. Experience and project previews with detailed views where meaningful.
8. Main skills and skills associated with individual experiences and projects.
9. CV viewing and downloading.
10. Direct email and WhatsApp contact actions.
11. Responsive design.
12. Secure Firebase Security Rules.
13. Firebase Hosting deployment.
14. Reusability as an Open Source portfolio template.

## 26. Requirement Principles

All detailed requirements should follow these principles:

- The application is primarily a personal portfolio.
- Visitors do not need accounts.
- The public portfolio should remain simple and accessible.
- The administrator accesses `/admin` manually.
- Google Sign-In provides authentication.
- The `authorizedAdmins` collection determines authorization.
- Firebase Security Rules provide the primary access-control enforcement.
- No custom backend is required initially.
- Content should be manageable without unnecessary code changes.
- The main portfolio should prioritize a single-page experience.
- Additional routes should exist only when they provide meaningful value.
- The repository must remain safe for eventual public reuse.
- Private credentials and secrets must never be committed.
- Reuse of the code as a template must remain possible without depending on the original owner's private infrastructure.