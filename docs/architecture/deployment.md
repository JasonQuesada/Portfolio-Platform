# Deployment

## 1. Overview

The portfolio is deployed as a client-side web application using Firebase Hosting.

Firebase provides the infrastructure required for the initial production deployment:

- Firebase Hosting.
- Firebase Authentication.
- Cloud Firestore.
- Firebase Storage.
- Firebase Security Rules.

The application does not require a custom backend server for the initial version.

The deployment architecture is designed for a single personal portfolio while keeping the source code reusable as an Open Source template.

## 2. Deployment Architecture

The production deployment follows this structure:

    Source Code
        |
        v
    React + Vite
        |
        v
    Production Build
        |
        v
    Firebase Hosting
        |
        +-- Public Portfolio
        |
        +-- /admin

Firebase services provide the application's backend infrastructure:

    Firebase Project
    |
    +-- Hosting
    |
    +-- Authentication
    |
    +-- Firestore
    |
    +-- Storage
    |
    └-- Security Rules

## 3. Application Hosting

Firebase Hosting is responsible for serving the production frontend.

The deployed application contains:

- Public portfolio.
- Public navigation.
- Administrative route.
- Administrative dashboard.
- Client-side application logic.

The application is generated as a production build before deployment.

The production build is served through Firebase Hosting.

## 4. Build Process

The expected production build process is:

    Source Code
        |
        v
    Install Dependencies
        |
        v
    Build React Application
        |
        v
    Vite Production Build
        |
        v
    Generated Distribution Files
        |
        v
    Firebase Hosting

The exact npm scripts and build commands are implementation details and are not defined in this architecture phase.

## 5. Firebase Project

The production application is associated with a Firebase project.

The Firebase project contains:

- Authentication configuration.
- Firestore database.
- Storage bucket.
- Hosting configuration.
- Firestore Security Rules.
- Storage Security Rules.

The production Firebase project is controlled independently from the public source repository.

## 6. Firebase Configuration

The frontend requires Firebase client configuration to initialize the Firebase SDK.

Configuration should be provided through environment variables or an equivalent environment-specific configuration mechanism.

The repository should provide an example configuration file without real private values.

For example:

    .env.example

may contain placeholder values that document the expected configuration.

Real production configuration must not be committed to the repository when it is private or environment-specific.

## 7. Secrets and Credentials

The deployment process must never commit privileged credentials to Git.

The repository must not contain:

- Firebase service account private keys.
- Private authentication credentials.
- Private access tokens.
- Passwords.
- Deployment secrets.
- Other privileged credentials.

Browser-side Firebase configuration values may be visible in the deployed application and should not be treated as the application's primary security mechanism.

Access control must instead be enforced through Firebase Authentication and Firebase Security Rules.

## 8. Firebase Security Rules Deployment

Firestore Security Rules and Storage Security Rules are part of the deployment configuration.

The deployment process must ensure that the correct rules are deployed together with the application infrastructure.

Conceptually:

    Source Repository
          |
          +-- Application
          |
          +-- Firestore Rules
          |
          +-- Storage Rules
          |
          +-- Firebase Configuration
          |
          v
    Firebase Project

Security Rules must be reviewed before production deployment.

## 9. Hosting Configuration

Firebase Hosting must be configured to serve the React application correctly.

Because the application uses client-side routing, Firebase Hosting must support fallback behavior for application routes.

The following routes must be directly accessible:

    /
    /experiences
    /projects
    /admin

A direct browser request to one of these routes must resolve to the application rather than returning an unintended server-side 404.

## 10. Client-Side Routing

The application uses client-side navigation.

Firebase Hosting serves the application entry point while the React application determines which view should be rendered.

The deployment configuration must therefore support the application's client-side routing strategy.

The routing configuration should not expose implementation-specific backend paths.

## 11. Public Deployment

The public portfolio does not require authentication.

Visitors should be able to access the production portfolio directly through the public domain.

The public deployment provides access to:

- Profile.
- Skills.
- Experience previews.
- Detailed experiences.
- Project previews.
- Detailed projects.
- Education.
- CV.
- Contact actions.
- Public professional links.

Only content marked as published should be displayed.

## 12. Administrative Deployment

The administrative interface is deployed as part of the same frontend application.

The administrator accesses:

    /admin

The authentication flow is:

    /admin
        |
        v
    Google Sign-In
        |
        v
    Firebase Authentication
        |
        v
    authorizedAdmins Check
        |
        +---- Unauthorized ----> Access Denied
        |
        +---- Authorized ------> Admin Dashboard

The /admin route does not need to be exposed through public navigation.

## 13. Authorization During Deployment

The deployment process must not hard-code the administrator's email address into the application.

Authorization is determined through the authorizedAdmins Firestore collection.

The application reads the authorization state.

The authorizedAdmins collection is managed through Firebase rather than through the application's CMS.

Security Rules must independently enforce administrative access.

## 14. Content Deployment

Portfolio content is primarily managed through the administrative interface after the application has been deployed.

This means that normal content changes do not necessarily require a new application deployment.

For example:

    Admin Dashboard
          |
          v
    Firestore / Storage
          |
          v
    Published Portfolio

Changes to:

- Profile information.
- Skills.
- Experiences.
- Projects.
- Education.
- Links.
- Contact information.
- CV references.
- Media.

can be reflected through Firebase data without rebuilding the application when the application code itself has not changed.

## 15. Application Code Deployment

A new application deployment is required when changes are made to:

- React components.
- Application logic.
- Routing.
- Styling.
- Firebase integration.
- CMS functionality.
- Security-related client behavior.
- Build configuration.
- Dependencies.
- Other source-code functionality.

The general process is:

    Code Change
        |
        v
    Development
        |
        v
    Testing
        |
        v
    Production Build
        |
        v
    Firebase Hosting Deployment

## 16. Database and Storage Changes

Changes to Firestore data and Storage content are separate from frontend code deployment.

The administrator can manage supported portfolio content through the CMS.

Infrastructure-level changes, such as:

- Firestore Security Rules.
- Storage Security Rules.
- Firestore indexes.
- Firebase configuration.

must be treated as deployment changes and reviewed accordingly.

## 17. Development Environment

Development should be performed locally before production deployment.

The development environment may include:

    Developer Machine
    |
    +-- Node.js
    |
    +-- npm
    |
    +-- Vite
    |
    +-- React
    |
    +-- Firebase CLI
    |
    └-- Firebase Emulator Suite

The Firebase Emulator Suite can be used to test Firebase functionality and Security Rules without modifying production resources.

## 18. Testing Before Deployment

Before a production deployment, the application should be tested for:

- Public portfolio access.
- Navigation.
- Responsive behavior.
- Authentication.
- Authorization.
- Firestore reads.
- Firestore writes.
- Storage operations.
- Security Rules.
- CV viewing.
- CV downloading.
- Email contact action.
- WhatsApp contact action.
- Public/unpublished content separation.
- Administrative access denial.
- Administrative access approval.

Production deployment should not be performed solely because the application builds successfully.

## 19. Security Verification

Before deploying security-sensitive changes, verify that:

- Unauthenticated users cannot access administrative operations.
- Authenticated but unauthorized users cannot access administrative operations.
- Authorized administrators can perform intended CMS operations.
- Unauthorized users cannot modify Firestore content.
- Unauthorized users cannot modify protected Storage content.
- Public users can access required published files.
- authorizedAdmins cannot be modified through the application.
- No privileged credentials are present in the repository.

## 20. Deployment Strategy

The project follows a controlled deployment strategy.

The recommended flow is:

    Feature Branch
          |
          v
    Development
          |
          v
    Testing
          |
          v
    Integration Branch
          |
          v
    Production Validation
          |
          v
    Main Branch
          |
          v
    Production Deployment

The exact Git Flow process is documented separately in the project's development and Open Source strategy documentation.

## 21. Production Branch

The production-ready code should be maintained in the designated production branch.

The production branch must contain only code that is considered deployable.

Deployment should be performed from a known and reviewed commit.

The repository must maintain a clear relationship between production deployments and Git history.

## 22. Deployment Reproducibility

The deployment process should be reproducible.

A developer reusing the repository should be able to configure their own Firebase project and deploy their own portfolio without depending on the owner's private Firebase resources.

The repository should document:

- Required environment variables.
- Firebase configuration requirements.
- Required Firebase services.
- Security Rules.
- Hosting configuration.
- Build requirements.
- Deployment prerequisites.

## 23. Open Source Deployment

The deployment architecture must support repository reuse.

A developer cloning the project should be able to replace the owner's Firebase configuration with their own.

The reusable deployment model is:

    Portfolio Template
           |
           +-----------------------+
           |                       |
           v                       v
    Developer A                Developer B
           |                       |
           v                       v
    Firebase Project A        Firebase Project B
           |                       |
           v                       v
    Portfolio A              Portfolio B

The repository must never depend on private credentials belonging to the original owner.

## 24. Custom Domain

Firebase Hosting may be configured with a custom domain for the production portfolio.

The exact domain is an infrastructure configuration detail and is not part of the application architecture.

The application should function correctly through the configured Firebase Hosting domain and, when configured, the custom domain.

## 25. HTTPS

Production traffic should be served through HTTPS.

Firebase Hosting provides HTTPS support for the deployed application.

The application must not require insecure HTTP communication for normal production usage.

## 26. Rollback Strategy

If a production deployment introduces a critical issue, the deployment should be reversible.

The rollback strategy should rely on:

- Git history.
- Known-good commits.
- Firebase Hosting deployment history where available.
- Re-deployment of a previously validated application version.

The exact rollback procedure can be refined during implementation.

## 27. Data Safety During Deployment

Application deployments must not unintentionally delete or modify production Firestore data or Storage files.

Code deployment and content management should remain conceptually separate.

Changes to application code should not require destructive database operations unless explicitly planned and documented.

If a future schema migration becomes necessary, it must be handled as a separate controlled operation.

## 28. Monitoring and Post-Deployment Verification

After a production deployment, the application should be manually verified.

At minimum, verify:

- Homepage loads correctly.
- Public sections render correctly.
- /experiences works.
- /projects works.
- /admin loads.
- Google authentication works.
- Authorized administrator access works.
- Unauthorized access is denied.
- Firestore data loads correctly.
- Storage media loads correctly.
- CV viewing works.
- CV downloading works.
- Email contact action works.
- WhatsApp contact action works.

Additional monitoring services are not required for the initial version.

## 29. Deployment Constraints

The initial deployment architecture intentionally excludes:

- Custom application servers.
- Express servers.
- REST API deployment.
- GraphQL servers.
- Docker-based production deployment.
- Kubernetes.
- Dedicated virtual machines.
- Traditional server hosting.
- Multi-region infrastructure.
- Complex CI/CD infrastructure.
- Visitor-specific backend infrastructure.

These may be considered in future versions only if justified by a concrete requirement.

## 30. Future Deployment Improvements

Future versions may introduce:

- Automated CI/CD.
- Separate development and production Firebase projects.
- Automated Security Rules testing.
- Automated deployment validation.
- Preview deployments.
- Additional monitoring.
- Performance monitoring.
- Automated dependency checks.

These improvements are not required for the initial deployment architecture.

## 31. Deployment Principles

The deployment architecture follows these principles:

- Firebase Hosting serves the production frontend.
- Firebase provides the backend infrastructure.
- No custom backend server is required initially.
- Production deployments must be reproducible.
- Production code must come from a controlled Git revision.
- Security Rules must be deployed and reviewed as infrastructure.
- Private credentials must never be committed.
- Application deployment must not depend on the owner's private resources.
- Content updates should not require application redeployment when possible.
- The deployment model must remain reusable as an Open Source template.
- Simplicity is preferred over unnecessary infrastructure complexity.