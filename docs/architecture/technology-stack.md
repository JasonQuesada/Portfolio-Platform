# Technology Stack

## 1. Overview

The Portfolio Platform is a personal portfolio application designed to demonstrate professional skills in modern web development, business systems analysis, database management, cloud technologies, and software architecture.

The application is a single personal portfolio rather than a multi-user portfolio platform.

The source code is intended to be reusable as an Open Source template. Other developers may use the codebase as a starting point for their own portfolio, but the application does not provide a service where visitors can create or manage their own portfolios.

The initial technology stack prioritizes:

- Simplicity.
- Maintainability.
- Modern web development practices.
- Firebase-managed infrastructure.
- Reusability.
- Security.
- Responsive design.
- Clear separation of responsibilities.

## 2. Technology Stack Overview

The initial stack consists of:

    Frontend
    |
    +-- React
    +-- JavaScript
    +-- Vite
    +-- HTML5
    +-- CSS3

    Backend Infrastructure
    |
    +-- Firebase Authentication
    +-- Cloud Firestore
    +-- Firebase Storage
    +-- Firebase Hosting
    +-- Firebase Security Rules

    Development
    |
    +-- Node.js
    +-- npm
    +-- Git
    +-- GitHub
    +-- Git Flow

    Documentation and Project Management
    |
    +-- Markdown
    +-- Jira
    +-- Confluence

The exact versions of individual dependencies are implementation details and should be defined by the project configuration during development.

## 3. Frontend

### 3.1 React

React is the primary frontend framework.

It is responsible for:

- Rendering the public portfolio.
- Rendering the administrative dashboard.
- Managing reusable UI components.
- Managing application state.
- Handling dynamic portfolio content.
- Supporting client-side navigation.
- Managing interactive elements.
- Providing responsive application views.

React is selected because it aligns with the project's Full Stack Developer profile and provides a component-based architecture suitable for a portfolio application and reusable template.

### 3.2 JavaScript

JavaScript is the primary programming language for the application.

It is used for:

- React components.
- Application logic.
- Firebase integration.
- Data handling.
- Authentication state management.
- Authorization state management.
- Form handling.
- Validation.
- Navigation behavior.
- UI interactions.

The initial project does not require TypeScript.

TypeScript may be considered in a future version if the application grows enough to justify the additional type-system complexity.

### 3.3 Vite

Vite is the frontend build tool.

It is responsible for:

- Local development.
- Development server.
- Production builds.
- Asset processing.
- Frontend bundling.
- Build-time environment configuration.

Vite is used instead of a custom build system.

The production application is generated through the Vite build process and deployed to Firebase Hosting.

## 4. Web Technologies

### 4.1 HTML5

HTML5 provides the semantic structure of the application.

It is used for:

- Page structure.
- Semantic sections.
- Forms.
- Links.
- Buttons.
- Embedded content.
- Accessibility-oriented markup.

The application should use semantic HTML where appropriate.

### 4.2 CSS3

CSS3 is used for presentation and responsive design.

It is responsible for:

- Layout.
- Typography.
- Spacing.
- Responsive behavior.
- Visual hierarchy.
- Animations and transitions where appropriate.
- Component styling.
- Mobile and desktop layouts.

The application should remain usable across common desktop, tablet, and mobile screen sizes.

## 5. Backend Infrastructure

The application does not initially include a traditional custom backend server.

Instead, Firebase provides the required backend infrastructure.

The architecture is:

    React Application
           |
           v
    Firebase SDK
           |
           +-- Authentication
           +-- Firestore
           +-- Storage
           |
           v
    Firebase Infrastructure

No custom Node.js/Express server is required for the initial version.

## 6. Firebase

Firebase is the primary backend and cloud infrastructure platform.

The project uses Firebase for:

- Authentication.
- Database.
- File storage.
- Hosting.
- Security Rules.

Firebase is selected because it provides the required infrastructure without introducing unnecessary custom backend complexity.

## 7. Firebase Authentication

Firebase Authentication manages administrator authentication.

The initial authentication provider is:

- Google.

Visitors do not require accounts.

The authentication model is:

    Visitor
        |
        +-- No Authentication Required

    Administrator
        |
        +-- /admin
                |
                v
           Google Sign-In
                |
                v
           Firebase Authentication

Authentication identifies the Google account.

Authorization is handled separately through the `authorizedAdmins` collection and Firebase Security Rules.

## 8. Cloud Firestore

Cloud Firestore is the primary structured data store.

It stores portfolio information such as:

- Profile.
- Main skills.
- Experiences.
- Experience-specific skills.
- Projects.
- Project-specific skills.
- Education.
- Professional links.
- Contact information.
- Publication status.
- Administrator authorization records.
- References to stored files where applicable.

Firestore provides the structured data layer without requiring a custom database server.

## 9. Firebase Storage

Firebase Storage is used for binary files and media.

Initial storage requirements include:

- Profile image.
- Project images.
- CV.
- Other portfolio media when required.

Structured metadata remains in Firestore while binary files remain in Storage.

For example:

    Firestore
        |
        +-- Profile
        |      |
        |      +-- profileImageUrl
        |
        +-- Resume
               |
               +-- resumeUrl
                        |
                        v
                Firebase Storage

The CV must support viewing within the website through an embedded document viewer where supported by the browser, as well as downloading.

## 10. Firebase Hosting

Firebase Hosting is responsible for hosting the production frontend.

The deployment model is:

    React + Vite
          |
          v
    Production Build
          |
          v
    Firebase Hosting

Firebase Hosting is preferred over maintaining a separate web server because the application is a client-side React application and Firebase already provides the required hosting infrastructure.

## 11. Firebase Security Rules

Firebase Security Rules provide the primary security enforcement mechanism for Firestore and Storage.

They are responsible for enforcing:

- Public read access where appropriate.
- Administrative read access.
- Administrative write access.
- Protection of unpublished content.
- Protection of administrative data.
- Protection of stored files.
- Protection of the `authorizedAdmins` collection.

Frontend authorization checks are used for user experience but are not considered the primary security boundary.

## 12. Firebase SDK

The Firebase JavaScript SDK is used by the React application to communicate with Firebase services.

The SDK provides access to:

- Firebase Authentication.
- Cloud Firestore.
- Firebase Storage.

The application should keep Firebase-specific operations logically separated from presentation components where practical.

## 13. Node.js

Node.js is part of the project's development environment.

Node.js is required for tooling and package management rather than as a custom application backend.

It is used for:

- Running npm.
- Installing dependencies.
- Running development scripts.
- Running Vite.
- Running build processes.
- Running Firebase CLI tooling.

Node.js is therefore part of the development stack even though the production architecture does not use a Node.js server.

## 14. npm

npm is used for JavaScript package management and project scripts.

It is responsible for:

- Installing dependencies.
- Managing development dependencies.
- Running development commands.
- Running production builds.
- Managing project scripts.

The project should maintain a lock file to ensure reproducible dependency installation.

## 15. Git

Git is the version-control system for the project.

Git is used to:

- Track source-code changes.
- Manage branches.
- Review development history.
- Support Git Flow.
- Create releases.
- Maintain production-ready versions.
- Support Open Source reuse.

Commits should be clear, professional, and descriptive.

## 16. GitHub

GitHub is used as the project's source-code repository and eventual Open Source distribution platform.

The repository should contain:

- Source code.
- Documentation.
- Configuration templates.
- Security Rules where appropriate.
- Deployment configuration where appropriate.
- Open Source license.
- Project documentation.

The repository must not contain private credentials or secrets.

The repository is initially private during development and may become public after the project reaches the intended release stage.

## 17. Git Flow

The project follows a Git Flow-oriented development strategy.

The primary branch structure is expected to include:

- `main`.
- `develop`.
- Feature branches.
- Release branches when required.
- Hotfix branches when required.

The exact branching conventions are documented separately as part of the project's development and Open Source strategy.

## 18. Markdown

Markdown is used for project documentation.

The architectural documentation is organized under:

    docs/
    |
    +-- architecture/
    +-- requirements/
    +-- data-model/
    +-- security/
    └-- roadmap/

Markdown is selected because it is:

- Human-readable.
- GitHub-compatible.
- Easy to maintain.
- Suitable for technical documentation.
- Reusable in Open Source repositories.

## 19. Jira

Jira may be used for project planning and task management.

It can support:

- Backlog management.
- User stories.
- Tasks.
- Bugs.
- Sprint planning.
- Development tracking.

Jira is not a runtime dependency of the application.

## 20. Confluence

Confluence may be used for supplementary project and process documentation.

It can support:

- Project notes.
- Planning.
- Technical references.
- Process documentation.
- Development documentation.

The repository's Markdown documentation remains the authoritative technical documentation intended to travel with the source code.

## 21. UI and Component Architecture

The frontend should use reusable React components.

Components should be organized according to responsibility rather than creating unnecessary abstractions.

The component architecture should support:

- Public portfolio sections.
- Reusable content cards.
- Experience previews.
- Project previews.
- Skill displays.
- Contact actions.
- CV viewer.
- Administrative forms.
- Administrative content management interfaces.

The application should avoid excessive component fragmentation when a simpler structure is sufficient.

## 22. Routing

The application uses client-side routing.

The initial public navigation is centered around the main portfolio page.

The main route is:

    /

Additional routes are created only when they provide meaningful value.

Initial detailed routes include:

    /experiences
    /projects

The administrative route is:

    /admin

There is no requirement for separate routes such as:

    /contact
    /education

because these sections are small enough to remain part of the main portfolio experience.

## 23. Data Management

Firestore is the source of truth for dynamic portfolio content.

The application should not hard-code portfolio content that is intended to be managed through the CMS.

Dynamic content includes:

- Profile.
- Skills.
- Experiences.
- Projects.
- Education.
- Links.
- Contact information.
- CV references.

Static application behavior remains in the source code.

## 24. Authentication and Authorization Stack

The authentication and authorization stack is:

    Google
       |
       v
    Firebase Authentication
       |
       v
    Firebase User
       |
       v
    authorizedAdmins
       |
       v
    Firebase Security Rules

Google identifies the administrator.

Firebase Authentication establishes the authenticated identity.

The `authorizedAdmins` collection determines whether the account is authorized.

Firebase Security Rules enforce access to protected resources.

## 25. Contact Functionality

The contact functionality does not require a custom messaging backend.

The initial implementation provides two direct contact actions:

- Email.
- WhatsApp.

The email action opens the visitor's configured email client.

The WhatsApp action opens WhatsApp using the appropriate contact link.

No contact form submission backend is required for the initial version.

No visitor messages are stored in Firestore.

## 26. CV Technology

The CV is stored as a file in Firebase Storage.

The public portfolio provides:

- Embedded CV viewing where supported.
- CV download functionality.

The application does not require a dedicated backend service for CV delivery.

## 27. Responsive Design

The application is designed to work across:

- Desktop.
- Laptop.
- Tablet.
- Mobile devices.

Responsive behavior is implemented through HTML, CSS, and React components.

The public portfolio should prioritize readability, navigation, accessibility, and appropriate content hierarchy across screen sizes.

## 28. Accessibility

The technology stack should support accessible web development practices.

The application should use:

- Semantic HTML.
- Appropriate labels.
- Keyboard-accessible interactive elements.
- Meaningful link text.
- Accessible buttons.
- Appropriate alternative text for images.
- Sufficient visual hierarchy.
- Responsive layouts.

Accessibility is considered a non-functional requirement rather than a separate technology.

## 29. Performance

The stack should support a performant public portfolio.

Performance considerations include:

- Vite production builds.
- Optimized images.
- Efficient Firestore queries.
- Appropriate loading states.
- Minimal unnecessary network requests.
- Efficient component rendering.
- Appropriate asset sizes.
- Firebase Hosting's static asset delivery.

Performance optimization should remain proportional to the size and requirements of the portfolio.

## 30. Environment Configuration

Environment-specific configuration should be separated from application source code.

The project should support environment variables for configuration that should not be hard-coded.

The repository should provide:

    .env.example

with placeholder values and documentation for required variables.

Real private configuration must remain outside version control.

## 31. Dependency Management

Dependencies should be selected based on a concrete project requirement.

The project should avoid unnecessary third-party libraries.

Each dependency should be evaluated based on:

- Maintenance.
- Security.
- Community support.
- Compatibility.
- Bundle impact.
- Actual project value.

The initial stack should remain intentionally small.

## 32. Technology Constraints

The initial technology stack intentionally excludes:

- TypeScript.
- Express.
- Custom Node.js backend.
- REST API.
- GraphQL.
- SQL database.
- Custom authentication server.
- Custom file server.
- Microservices.
- Docker-based production infrastructure.
- Kubernetes.
- Native mobile application.
- Multi-tenant infrastructure.

These technologies may be considered in future versions only if a concrete requirement justifies their introduction.

## 33. Technology Selection Principles

Technology decisions should follow these principles:

- Prefer technologies already aligned with the project's objectives.
- Avoid unnecessary infrastructure.
- Prefer managed services when they reduce operational complexity.
- Keep the application maintainable.
- Keep the repository reusable.
- Avoid unnecessary dependencies.
- Prioritize security.
- Prioritize responsive and accessible design.
- Keep the production architecture simple.
- Ensure the project can be reused as an Open Source template.

## 34. Final Stack

The initial production technology stack is:

    Frontend
    - React
    - JavaScript
    - Vite
    - HTML5
    - CSS3

    Backend Infrastructure
    - Firebase Authentication
    - Cloud Firestore
    - Firebase Storage
    - Firebase Hosting
    - Firebase Security Rules

    Development
    - Node.js
    - npm
    - Git
    - GitHub
    - Git Flow

    Documentation and Project Management
    - Markdown
    - Jira
    - Confluence

The stack intentionally avoids a custom backend because Firebase provides the required authentication, database, storage, hosting, and security infrastructure for the initial version.