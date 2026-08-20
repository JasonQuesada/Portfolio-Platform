# Navigation

## 1. Overview

The navigation architecture is designed around a single-page-first public experience.

The main portfolio should present the most important information on the homepage without requiring visitors to navigate through multiple pages.

Additional routes are introduced only when a section contains enough information to justify a dedicated view.

The administrative area is separated from the public navigation and is accessed manually through `/admin`.

## 2. Navigation Goals

The navigation system is designed to:

- Keep the main portfolio experience simple.
- Present the most important information on a single page.
- Allow visitors to quickly move between portfolio sections.
- Avoid unnecessary routes.
- Provide dedicated pages only for detailed experiences and projects.
- Keep administrative navigation separate from public navigation.
- Provide clear navigation on desktop and mobile devices.
- Support direct navigation through URLs.
- Provide consistent navigation behavior throughout the application.

## 3. Application Routes

The initial application routes are:

| Route | Area | Purpose | Authentication |
|---|---|---|---|
| `/` | Public | Main portfolio page | Not required |
| `/experiences` | Public | Complete experience list and details | Not required |
| `/projects` | Public | Complete project list and details | Not required |
| `/admin` | Administrative | Administrator login and CMS | Required |

No additional routes are required for the initial version.

## 4. Public Navigation

The primary public navigation is associated with the homepage.

The homepage contains the following sections:

- Profile
- Skills
- Experience
- Projects
- Education
- CV
- Contact

The navigation should allow visitors to move directly to these sections without requiring separate routes.

Conceptually:

~~~text
/
|
+-- Profile
|
+-- Skills
|
+-- Experience
|
+-- Projects
|
+-- Education
|
+-- CV
|
+-- Contact
~~~

These sections are part of the same page.

## 5. Homepage Navigation

The homepage should use internal section navigation.

For example:

~~~text
/#profile
/#skills
/#experience
/#projects
/#education
/#cv
/#contact
~~~

The exact URL fragment structure may be adjusted during implementation, but the conceptual behavior should remain the same.

Clicking a navigation item should move the visitor to the corresponding section of the homepage rather than loading a separate page.

## 6. Profile Navigation

The Profile section is part of the homepage.

It should provide:

- Professional introduction.
- Profile image.
- Professional title.
- Short professional summary.
- Access to relevant professional links.
- Access to other important portfolio sections where appropriate.

No dedicated `/profile` route is required.

## 7. Skills Navigation

The main skills are displayed within the homepage.

The skills section provides a concise overview of the owner's primary technical and professional skills.

Skills associated with individual experiences and projects are displayed within those respective sections or detailed views.

No dedicated `/skills` route is required.

## 8. Experience Navigation

The homepage displays a limited preview of professional experiences.

The experience section should provide enough information for visitors to understand the owner's background without opening another page.

A "View More" or equivalent action can navigate to:

~~~text
/experiences
~~~

The `/experiences` route provides the complete experience information.

Conceptually:

~~~text
Homepage
   |
   v
Experience Preview
   |
   +---- Experience 1
   |
   +---- Experience 2
   |
   +---- View More
            |
            v
      /experiences
~~~

## 9. Experience Detail Navigation

The `/experiences` page provides the complete published experience list.

Each experience can display:

- Position.
- Organization.
- Location.
- Dates.
- Description.
- Responsibilities.
- Skills.
- Technologies.
- Relevant links where applicable.

The initial architecture does not require a separate route for every individual experience.

For example, routes such as:

~~~text
/experiences/company-name
/experiences/experience-id
~~~

are not required in the initial version.

All experiences can be displayed within `/experiences`.

## 10. Project Navigation

The homepage displays a limited preview of portfolio projects.

The project section should provide enough information for visitors to understand the projects without requiring immediate navigation to another page.

A "View More" or equivalent action can navigate to:

~~~text
/projects
~~~

Conceptually:

~~~text
Homepage
   |
   v
Project Preview
   |
   +---- Project 1
   |
   +---- Project 2
   |
   +---- View More
            |
            v
        /projects
~~~

## 11. Project Detail Navigation

The `/projects` page provides the complete published project list.

Each project can display:

- Project name.
- Description.
- Technologies.
- Skills.
- Images.
- Links.
- Relevant additional information.

The initial architecture does not require a separate route for every individual project.

For example, routes such as:

~~~text
/projects/project-name
/projects/project-id
~~~

are not required in the initial version.

All projects can be displayed within `/projects`.

## 12. Education Navigation

Education is displayed directly on the homepage.

The education information is intentionally concise.

No dedicated `/education` route is required.

The amount of information does not justify a separate page in the initial architecture.

## 13. CV Navigation

The CV is accessible from the homepage.

The navigation should provide a clear action such as:

- View CV
- Download CV

Selecting "View CV" should allow the CV to be displayed within the page or an appropriate embedded viewer when supported.

Selecting "Download CV" should allow the visitor to download the CV file.

The CV does not require a dedicated `/cv` route.

## 14. Contact Navigation

Contact functionality is displayed directly on the homepage.

The available contact actions are:

- Email.
- WhatsApp.

The email action should open the visitor's configured email client or appropriate email interface.

The WhatsApp action should open WhatsApp or its web interface.

No dedicated `/contact` route is required.

## 15. External Links

Professional external links may be displayed in the profile, footer, or another appropriate section.

Examples may include:

- LinkedIn.
- GitHub.
- Other professional profiles.
- External project links.

External links should open their intended destinations without creating additional internal application routes.

## 16. Administrative Navigation

The administrative area is accessed manually through:

~~~text
/admin
~~~

The `/admin` route is not required to appear in the public navigation.

The administrative flow is:

~~~text
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
   +---- Unauthorized ----> Access Denied
   |
   +---- Authorized ------> Admin Dashboard
~~~

## 17. Administrative Dashboard Navigation

After successful authentication and authorization, the administrator enters the CMS.

The dashboard provides navigation to the available content-management areas.

Conceptually:

~~~text
Admin Dashboard
|
+-- Profile
|
+-- Skills
|
+-- Experiences
|
+-- Projects
|
+-- Education
|
+-- Links
|
+-- Contact
|
+-- CV / Media
|
└-- Sign Out
~~~

The exact dashboard organization can be refined during implementation.

The dashboard must not provide management functionality for the `authorizedAdmins` collection.

## 18. Unauthorized Navigation

If a user authenticates with Google but their account is not present or is not authorized in `authorizedAdmins`, access to the CMS must be denied.

The application should display an appropriate access-denied state.

Conceptually:

~~~text
Google Account
      |
      v
Firebase Authentication
      |
      v
Authorization Check
      |
      +---- Not Authorized
                  |
                  v
            Access Denied
~~~

An unauthorized user must not gain administrative functionality by manually navigating to internal CMS routes.

Firebase Security Rules must independently enforce the same security boundary.

## 19. Navigation Guards

Administrative routes must use an authentication and authorization guard.

The guard should verify:

1. Whether a Firebase user is authenticated.
2. Whether the authenticated user is authorized.
3. Whether the required authorization state has been successfully loaded.

Possible states include:

- Loading.
- Unauthenticated.
- Authenticated but unauthorized.
- Authenticated and authorized.
- Authorization error.

The guard is responsible for the user experience.

Firebase Security Rules remain the actual security boundary.

## 20. Navigation Behavior

Navigation should provide predictable behavior across the application.

The application should:

- Preserve the current navigation context when appropriate.
- Scroll to the selected homepage section when using internal section navigation.
- Avoid unnecessary full-page reloads for internal routes.
- Provide clear visual indication of the active section when appropriate.
- Preserve browser back and forward navigation.
- Support direct access to public routes.
- Support direct access to `/admin`.

## 21. Responsive Navigation

Navigation must work across:

- Desktop.
- Tablet.
- Mobile.

On smaller screens, the public navigation may collapse into a mobile navigation pattern.

The exact visual implementation is outside the scope of the architecture document.

The navigation must remain accessible and understandable regardless of screen size.

## 22. Navigation and Loading States

Navigation should account for asynchronous data loading.

When navigating to sections or routes that depend on Firestore data, the application should provide appropriate loading states.

For example:

~~~text
Loading
   |
   v
Content Available
~~~

If content cannot be loaded, the application should display an appropriate error state rather than leaving the visitor with an unexplained blank area.

## 23. Navigation and Empty States

If no published experiences or projects are available, the public interface should handle the empty state gracefully.

The application should not expose administrative or unpublished information to visitors.

For example:

~~~text
No Published Projects
~~~

is preferable to displaying an empty or broken section.

## 24. Navigation and Publication Status

Public navigation must only lead to publicly available content.

Unpublished experiences and projects must not appear in:

- Homepage previews.
- `/experiences`.
- `/projects`.
- Public navigation elements.

The administrator can still access unpublished content through the CMS.

## 25. Footer Navigation

The footer may provide:

- Internal section links.
- Professional external links.
- Contact actions.
- CV actions.
- Copyright or ownership information.

The footer does not need to duplicate every item from the primary navigation.

The `/admin` route should not be prominently exposed in the public footer.

## 26. Route Naming

Public routes should use clear, semantic names.

The initial routes are:

~~~text
/
/experiences
/projects
/admin
~~~

Routes should remain stable and should not expose internal database identifiers unnecessarily.

Individual content IDs do not need to become part of the public URL structure in the initial version.

## 27. Navigation Constraints

The initial navigation architecture intentionally excludes:

- A `/profile` page.
- A `/skills` page.
- An `/education` page.
- A `/cv` page.
- A `/contact` page.
- Individual experience routes.
- Individual project routes.
- Visitor dashboards.
- Visitor accounts.
- User registration.
- Multi-user navigation.
- Tenant-specific navigation.

These routes or navigation structures may be considered in future versions only if the amount or complexity of content makes them necessary.

## 28. Navigation Principles

The navigation architecture follows these principles:

- Single-page-first public experience.
- Minimal number of routes.
- Dedicated routes only when they provide meaningful additional value.
- Clear separation between public and administrative navigation.
- No authentication required for public content.
- Manual access to the administrative area.
- Consistent navigation across screen sizes.
- Direct and semantic URLs.
- Browser navigation compatibility.
- Accessibility and usability.
- No unnecessary route complexity.