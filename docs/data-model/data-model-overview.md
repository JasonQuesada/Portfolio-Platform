# Data Model Overview

## 1. Purpose

This document provides a high-level overview of the data model used by the Portfolio Platform.

The data model is designed to support the public portfolio, the administrative CMS, Firebase Authentication, Cloud Firestore, and Firebase Storage while remaining simple, maintainable, reusable, and suitable for future Open Source publication.

The initial data model is intentionally focused on the requirements of a personal portfolio and does not introduce unnecessary multi-user or multi-tenant structures.

## 2. Data Architecture

The Portfolio Platform uses two primary Firebase data services:

- Cloud Firestore for structured application data.
- Firebase Storage for files and media.

Firebase Authentication is used separately for administrator identity and authentication.

The high-level architecture is:

    React Application
          |
          +--------------------+
          |                    |
          v                    v
    Cloud Firestore      Firebase Storage
          |                    |
          |                    |
          +---------+----------+
                    |
                    v
            Firebase Services

Firebase Authentication provides the authenticated identity used by the administrative application.

Firebase Security Rules enforce access to protected Firestore and Storage resources.

## 3. Data Categories

The application data is divided into the following main categories:

- Profile data.
- Skills data.
- Experience data.
- Project data.
- Education data.
- Contact data.
- CV data.
- Administrator authorization data.
- Media references.
- Publication and ordering metadata.

## 4. Firestore

Cloud Firestore is the primary structured data store.

Firestore is responsible for storing application data that can be represented as documents and collections.

The initial Firestore model is expected to include collections such as:

    profile
    skills
    experiences
    projects
    education
    settings
    authorizedAdmins

The exact document and field structure is defined in `firestore-schema.md`.

## 5. Profile Data

Profile data represents the owner's primary professional identity.

It may include:

- Name.
- Professional title.
- Professional summary.
- Profile image reference.
- Location.
- Professional links.
- Other approved public profile information.

Profile data is primarily consumed by the public portfolio.

The Administrator can manage profile data through the CMS.

## 6. Skills Data

Skills represent technologies, tools, methodologies, and professional competencies displayed throughout the portfolio.

Skills may be associated with:

- The general professional profile.
- Experiences.
- Projects.

The data model should avoid unnecessary duplication when a skill can be represented as a reusable reference.

The implementation may use a centralized skills collection together with references or embedded skill information depending on the final implementation requirements.

## 7. Experience Data

Experience records represent the owner's professional experience.

An experience may contain:

- Job title.
- Company or organization.
- Location.
- Start date.
- End date.
- Description.
- Responsibilities.
- Achievements.
- Associated skills.
- Ordering information.
- Publication status.
- Optional media or external references.

Experiences are displayed in summarized form on the main portfolio page.

A dedicated `/experiences` route provides access to the complete published experience information.

## 8. Project Data

Project records represent software projects, professional projects, academic projects, or other selected work.

A project may contain:

- Project name.
- Short description.
- Detailed description.
- Technologies.
- Skills.
- Project image.
- Repository URL.
- Live application URL.
- Other relevant links.
- Ordering information.
- Publication status.

Projects are displayed in summarized form on the main portfolio page.

A dedicated `/projects` route provides access to the complete published project information.

## 9. Education Data

Education data represents the owner's academic background.

An education record may include:

- Institution.
- Program or degree.
- Field of study.
- Start date.
- End date.
- Status.
- Description.
- Relevant information.

Education is expected to remain a relatively small section of the portfolio.

A dedicated `/education` route is not required by the initial architecture.

## 10. Contact Data

Contact information represents the public methods through which visitors can contact the owner.

The initial implementation may include:

- Email address.
- WhatsApp contact link.
- LinkedIn URL.
- GitHub URL.
- Other approved professional links.

Contact actions are external interactions.

The application does not implement an internal messaging system in the initial version.

The application should not store visitor messages in Firestore.

## 11. CV Data

The CV is represented through metadata and a reference to a file stored in Firebase Storage.

The Firestore data may contain:

- File name.
- Storage path.
- Public access reference where applicable.
- MIME type.
- Updated timestamp.
- Publication status.

The actual CV file is stored in Firebase Storage rather than directly inside Firestore.

## 12. Media Data

Media files are stored in Firebase Storage.

Potential media includes:

- Profile image.
- CV.
- Project images.
- Experience-related images.
- Other portfolio assets.

Firestore stores references or metadata required to associate media with application entities.

Binary files should not be stored directly in Firestore.

## 13. Administrator Authorization Data

The `authorizedAdmins` collection represents the list of accounts authorized to access administrative functionality.

Authorization records are associated with authenticated Firebase users.

A record may contain:

- Firebase user identifier.
- Email address.
- Display name.
- Active status.
- Creation timestamp.
- Other administrative metadata if required.

The `authorizedAdmins` collection is security-sensitive.

It must not be publicly readable or writable.

It must not be managed through public application functionality.

## 14. Publication Model

Publicly managed entities should support a publication state when the entity requires draft or unpublished content.

The primary publication concept is:

    published: true
    published: false

Published content may be displayed by the public portfolio.

Unpublished content remains available to the Administrator but should not be displayed publicly.

The exact implementation may use additional publication metadata if required.

## 15. Ordering Model

Repeatable portfolio content should support an explicit ordering mechanism.

The initial model may use a numeric field such as:

    order

The value determines the display sequence of records.

This allows the Administrator to control the order of:

- Experiences.
- Projects.
- Skills.
- Other ordered content.

The ordering mechanism should remain simple and predictable.

## 16. Timestamps

Where useful, Firestore documents should contain timestamps such as:

- `createdAt`
- `updatedAt`

These timestamps support:

- Content management.
- Auditing of changes.
- Sorting where appropriate.
- Administrative visibility.
- Future maintenance.

Timestamps should be generated or validated using trusted application or Firebase mechanisms rather than relying exclusively on user-provided values.

## 17. Identifiers

Firestore documents should use stable document identifiers.

Identifiers should not depend unnecessarily on display names.

For example, changing a project name should not require changing its document identifier.

Where appropriate, Firebase-generated document IDs should be used.

## 18. Relationships

The data model contains logical relationships between entities.

Examples include:

    Profile
       |
       +-- Skills

    Experience
       |
       +-- Skills
       +-- Media

    Project
       |
       +-- Skills
       +-- Media

    CV
       |
       +-- Storage File

The exact relationship implementation is defined in `firestore-schema.md`.

## 19. References vs Embedded Data

The application should choose between references and embedded data based on actual usage patterns.

Centralized references are appropriate when:

- The same entity is reused frequently.
- Updating the entity should update all associated contexts.
- The entity contains meaningful independent information.

Embedded data is appropriate when:

- The data is small.
- The data is tightly coupled to its parent.
- Independent management provides little value.
- Avoiding unnecessary reads improves simplicity.

The initial implementation should avoid over-normalizing the data model.

## 20. Data Ownership

The portfolio owner is the sole content owner in the initial version.

The Administrator is responsible for maintaining:

- Profile data.
- Skills.
- Experiences.
- Projects.
- Education.
- Contact information.
- CV configuration.
- Media references.

Public visitors do not own or modify application data.

## 21. Public Data Access

Public visitors should only receive information intended for public presentation.

Examples include:

- Published profile information.
- Published experiences.
- Published projects.
- Public skills.
- Education information.
- Public CV references.
- Public contact information.

Unpublished or administrative information must not be exposed to public users.

## 22. Administrative Data Access

Authorized administrators may access the data required to manage the portfolio.

Administrative access includes:

- Reading existing content.
- Creating content.
- Updating content.
- Deleting content.
- Managing publication state.
- Managing ordering.
- Managing supported media.

Firebase Security Rules must enforce these permissions.

## 23. Data Validation

Data submitted through the administrative interface should be validated before persistence.

Validation should consider:

- Required fields.
- Data types.
- String lengths.
- Valid URLs.
- Valid dates.
- Publication state.
- Ordering values.
- File types.
- File sizes where applicable.

Client-side validation improves user experience but does not replace backend security and validation controls.

## 24. Data Integrity

The application should maintain consistency between Firestore records and Firebase Storage resources.

Examples include:

- A project image reference should correspond to an appropriate Storage object.
- A CV reference should correspond to the configured CV file.
- Deleted content should not leave unnecessary active references.
- Publication state should be respected by public queries.
- Ordering values should produce predictable display behavior.

## 25. Data Lifecycle

Portfolio content generally follows this lifecycle:

    Create
      |
      v
    Draft / Unpublished
      |
      v
    Edit
      |
      v
    Published
      |
      +----> Edit
      |
      +----> Unpublish
      |
      v
    Archived or Deleted

The initial implementation does not require a dedicated archival system.

Unpublished content may remain stored until the Administrator chooses to delete it.

## 26. Deletion Considerations

Deleting a Firestore document does not automatically imply that associated Firebase Storage files are removed unless the implementation explicitly handles that operation.

The application should therefore consider related resources when deleting content.

For example:

    Project Document
          |
          +-- Project Image
          |
          +-- Additional Media

When a project is deleted, associated media should be handled according to the implemented storage lifecycle.

The exact deletion strategy should be documented and implemented consistently.

## 27. Data Backup and Recovery

The initial application does not require a custom backup system.

Because Firestore and Firebase Storage contain the primary application data and media, backup and recovery strategies should be considered as part of the Firebase project infrastructure if required for production use.

The reusable Open Source codebase should not depend on access to the original owner's private backup infrastructure.

## 28. Privacy Considerations

The data model is designed to minimize visitor data collection.

The initial system does not require:

- Visitor accounts.
- Visitor profiles.
- Internal messaging storage.
- Visitor-generated content.
- Payment information.
- User-specific application data.

The application should avoid storing personal visitor information unless a future requirement explicitly introduces such functionality.

## 29. Security Considerations

Data security is enforced through Firebase Security Rules and appropriate authentication and authorization mechanisms.

The following principles apply:

- Public data should be explicitly designed for public access.
- Administrative data must be protected.
- `authorizedAdmins` must be protected.
- Authenticated users are not automatically authorized administrators.
- Storage paths must have appropriate access controls.
- Sensitive configuration must not be stored in Firestore as public data.
- Service account credentials must never be stored in the repository or client-side application.
- Frontend checks must not be considered the primary security boundary.

## 30. Reusability Requirements

The data model should remain reusable for another developer using the Portfolio Platform as a template.

The architecture should allow another user to replace:

- Profile information.
- Skills.
- Experiences.
- Projects.
- Education.
- Contact information.
- CV.
- Media.

without requiring structural changes to the application.

Personal portfolio content should therefore remain data rather than being unnecessarily hard-coded into reusable application components.

## 31. Initial Data Model Scope

The initial data model includes the following conceptual entities:

    Profile
    Skill
    Experience
    Project
    Education
    Contact
    CV
    Media
    Authorized Administrator

Not every conceptual entity necessarily requires a dedicated Firestore collection.

The final physical implementation should prioritize simplicity and maintainability.

## 32. Out-of-Scope Data

The initial data model does not include structures for:

- Visitor accounts.
- User profiles.
- Multiple portfolio owners.
- Tenants.
- Subscriptions.
- Payments.
- Billing.
- Internal messaging.
- Comments.
- Reviews.
- Ratings.
- Social interactions.
- Analytics events.
- Visitor activity tracking.
- Notifications.
- Customer records.

These structures may be introduced only if the project scope is expanded in a future version.

## 33. Data Model Principles

The data model should follow these principles:

- Keep the initial model simple.
- Store structured data in Cloud Firestore.
- Store binary files in Firebase Storage.
- Keep authentication separate from portfolio content.
- Protect administrative data.
- Keep public data explicitly identifiable.
- Avoid unnecessary normalization.
- Avoid unnecessary duplication.
- Use stable document identifiers.
- Use timestamps where useful.
- Use publication status for content requiring draft control.
- Use explicit ordering for repeatable content.
- Validate administrative input.
- Maintain consistency between Firestore references and Storage objects.
- Keep personal content configurable.
- Keep the model reusable for future Open Source users.
- Avoid introducing multi-user complexity without a concrete requirement.

## 34. Source of Truth

Cloud Firestore is the source of truth for structured portfolio content.

Firebase Storage is the source of truth for uploaded files and media.

Firebase Authentication is the source of truth for authenticated administrator identities.

The application frontend is not considered the source of truth for persistent data.

## 35. Related Documentation

The following documents provide more detailed information:

- `docs/data-model/firestore-schema.md` — Firestore collections, documents, fields, and relationships.
- `docs/data-model/storage-structure.md` — Firebase Storage paths and file organization.
- `docs/security/authentication-and-authorization.md` — Authentication and authorization model.
- `docs/security/security-model.md` — Overall application security model.
- `docs/security/security-rules-requirements.md` — Firebase Security Rules requirements.
- `docs/architecture/firebase-architecture.md` — Firebase service architecture.
- `docs/architecture/system-architecture.md` — Overall system architecture.