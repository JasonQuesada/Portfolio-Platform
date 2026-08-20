# Firestore Schema

## 1. Purpose

This document defines the logical Firestore schema for the Portfolio Platform.

Cloud Firestore is used as the primary structured data store for portfolio content, administrative authorization data, and selected configuration metadata.

The schema is designed for a personal portfolio managed by a single authorized Administrator while remaining reusable for future Open Source deployments.

The initial schema prioritizes simplicity, maintainability, clear security boundaries, and efficient public content retrieval.

## 2. Firestore Structure

The initial Firestore database uses the following top-level collections:

    profile
    skills
    experiences
    projects
    education
    settings
    authorizedAdmins

The actual implementation may adjust collection usage when implementation details require it, but changes should remain consistent with the architectural and security requirements defined in this project.

## 3. Collection Overview

| Collection | Purpose | Public Read | Admin Read | Admin Write |
|---|---|---:|---:|---:|
| `profile` | Main professional profile | Yes, when published | Yes | Yes |
| `skills` | Professional skills | Yes, when published | Yes | Yes |
| `experiences` | Professional experiences | Yes, when published | Yes | Yes |
| `projects` | Portfolio projects | Yes, when published | Yes | Yes |
| `education` | Academic information | Yes, when published | Yes | Yes |
| `settings` | Application/public configuration | Depends on document | Yes | Yes |
| `authorizedAdmins` | Administrator authorization | No | Restricted | Restricted |

Public access is controlled by Firebase Security Rules and document-level publication requirements.

## 4. General Document Conventions

Firestore documents should follow these conventions:

- Use stable document IDs.
- Avoid using display names as document IDs when names can change.
- Use camelCase for field names.
- Use Firestore `Timestamp` values for timestamps where appropriate.
- Use boolean values for state fields.
- Use numeric values for ordering fields.
- Use arrays for small, tightly coupled lists.
- Use references only when they provide meaningful reuse or data independence.
- Avoid unnecessary document nesting.
- Avoid storing binary files directly in Firestore.

## 5. Common Fields

Where applicable, portfolio documents may contain the following common fields:

| Field | Type | Required | Description |
|---|---|---:|---|
| `published` | boolean | Yes | Determines whether the record can be displayed publicly |
| `order` | number | No | Determines public display order |
| `createdAt` | timestamp | Yes | Record creation timestamp |
| `updatedAt` | timestamp | Yes | Last update timestamp |

Not every collection must contain every common field.

For example, `authorizedAdmins` follows a different security model and should not be treated as public portfolio content.

## 6. Profile Collection

### Collection

    profile

The `profile` collection stores the owner's main professional profile.

The initial implementation may use a single known document such as:

    profile/main

### Example Schema

    profile
      |
      +-- main
            |
            +-- name
            +-- title
            +-- summary
            +-- location
            +-- profileImage
            +-- email
            +-- whatsapp
            +-- linkedin
            +-- github
            +-- published
            +-- updatedAt

### Fields

| Field | Type | Required | Description |
|---|---|---:|---|
| `name` | string | Yes | Professional name |
| `title` | string | Yes | Main professional title |
| `summary` | string | Yes | Professional summary |
| `location` | string | No | Public professional location |
| `profileImage` | string | No | Firebase Storage path or media reference |
| `email` | string | Yes | Public contact email |
| `whatsapp` | string | No | Public WhatsApp contact value or link configuration |
| `linkedin` | string | No | LinkedIn URL |
| `github` | string | No | GitHub URL |
| `published` | boolean | Yes | Indicates whether profile information is publicly available |
| `updatedAt` | timestamp | Yes | Last update timestamp |

### Notes

The profile document should contain only information intentionally intended for public presentation.

Private administrative information must not be stored in the public profile document.

## 7. Skills Collection

### Collection

    skills

The `skills` collection stores reusable professional skills and technologies.

Each document represents one skill.

### Example

    skills
      |
      +-- skillId
            |
            +-- name
            +-- category
            +-- description
            +-- icon
            +-- published
            +-- order
            +-- createdAt
            +-- updatedAt

### Fields

| Field | Type | Required | Description |
|---|---|---:|---|
| `name` | string | Yes | Skill or technology name |
| `category` | string | No | Skill category |
| `description` | string | No | Optional skill description |
| `icon` | string | No | Optional icon identifier or asset reference |
| `published` | boolean | Yes | Determines whether the skill is publicly displayed |
| `order` | number | Yes | Public display order |
| `createdAt` | timestamp | Yes | Creation timestamp |
| `updatedAt` | timestamp | Yes | Last update timestamp |

### Skill Categories

Possible categories include:

- Frontend.
- Backend.
- Database.
- Cloud.
- Data.
- DevOps.
- Business Analysis.
- Methodologies.
- Tools.
- Other.

Categories are configurable and should not unnecessarily restrict future skills.

## 8. Skill References

Experiences and projects may reference skills from the `skills` collection.

A reference may use a Firestore `DocumentReference` or a stable skill identifier depending on the implementation.

Example conceptual relationship:

    experiences/{experienceId}
        |
        +-- skills
              |
              +-- skills/{skillId}
              +-- skills/{skillId}

The implementation should use one consistent strategy.

### Reference Requirements

Skill references should:

- Point to stable skill identifiers.
- Avoid duplicating complete skill records unnecessarily.
- Allow the same skill to be associated with multiple experiences or projects.
- Remain valid when the display order of skills changes.

## 9. Experiences Collection

### Collection

    experiences

The `experiences` collection stores professional experience records.

Each document represents one experience.

### Example

    experiences
      |
      +-- experienceId
            |
            +-- title
            +-- company
            +-- location
            +-- startDate
            +-- endDate
            +-- current
            +-- shortDescription
            +-- description
            +-- responsibilities
            +-- achievements
            +-- skills
            +-- media
            +-- published
            +-- order
            +-- createdAt
            +-- updatedAt

### Fields

| Field | Type | Required | Description |
|---|---|---:|---|
| `title` | string | Yes | Position or role title |
| `company` | string | Yes | Company or organization |
| `location` | string | No | Location associated with the experience |
| `startDate` | timestamp or string | Yes | Experience start date |
| `endDate` | timestamp or string | No | Experience end date |
| `current` | boolean | Yes | Indicates whether the experience is current |
| `shortDescription` | string | Yes | Concise description used in previews |
| `description` | string | No | Detailed experience description |
| `responsibilities` | array<string> | No | Main responsibilities |
| `achievements` | array<string> | No | Main achievements |
| `skills` | array | No | Associated skills |
| `media` | array | No | Associated media references |
| `published` | boolean | Yes | Determines public visibility |
| `order` | number | Yes | Public display order |
| `createdAt` | timestamp | Yes | Creation timestamp |
| `updatedAt` | timestamp | Yes | Last update timestamp |

### Experience Skills

Experience-specific skills may reference the centralized `skills` collection.

This allows the portfolio to distinguish between:

- Main profile skills.
- Skills demonstrated in a specific experience.

## 10. Projects Collection

### Collection

    projects

The `projects` collection stores portfolio projects.

Each document represents one project.

### Example

    projects
      |
      +-- projectId
            |
            +-- name
            +-- shortDescription
            +-- description
            +-- role
            +-- technologies
            +-- skills
            +-- image
            +-- media
            +-- repositoryUrl
            +-- liveUrl
            +-- published
            +-- order
            +-- createdAt
            +-- updatedAt

### Fields

| Field | Type | Required | Description |
|---|---|---:|---|
| `name` | string | Yes | Project name |
| `shortDescription` | string | Yes | Concise project description |
| `description` | string | No | Detailed project description |
| `role` | string | No | Owner's role in the project |
| `technologies` | array<string> | No | Technologies used by the project |
| `skills` | array | No | Associated skill references |
| `image` | string | No | Main project image reference |
| `media` | array | No | Additional media references |
| `repositoryUrl` | string | No | Source repository URL |
| `liveUrl` | string | No | Deployed project URL |
| `published` | boolean | Yes | Determines public visibility |
| `order` | number | Yes | Public display order |
| `createdAt` | timestamp | Yes | Creation timestamp |
| `updatedAt` | timestamp | Yes | Last update timestamp |

### Technologies vs Skills

`technologies` and `skills` may represent different concepts.

`technologies` identifies technologies directly used to build the project.

`skills` identifies broader professional skills demonstrated by the project.

The implementation should avoid unnecessary duplication between the two.

## 11. Education Collection

### Collection

    education

The `education` collection stores academic background information.

Each document represents one education record.

### Example

    education
      |
      +-- educationId
            |
            +-- institution
            +-- degree
            +-- fieldOfStudy
            +-- startDate
            +-- endDate
            +-- status
            +-- description
            +-- published
            +-- order
            +-- createdAt
            +-- updatedAt

### Fields

| Field | Type | Required | Description |
|---|---|---:|---|
| `institution` | string | Yes | Educational institution |
| `degree` | string | Yes | Degree or program |
| `fieldOfStudy` | string | No | Academic discipline |
| `startDate` | timestamp or string | No | Start date |
| `endDate` | timestamp or string | No | End date |
| `status` | string | No | Academic status |
| `description` | string | No | Additional academic information |
| `published` | boolean | Yes | Determines public visibility |
| `order` | number | Yes | Display order |
| `createdAt` | timestamp | Yes | Creation timestamp |
| `updatedAt` | timestamp | Yes | Last update timestamp |

## 12. Settings Collection

### Collection

    settings

The `settings` collection contains application-level configuration that does not naturally belong to a specific portfolio entity.

The initial implementation should keep this collection small.

Possible documents include:

    settings/site
    settings/contact
    settings/cv

### Example Site Settings

    settings/site
        |
        +-- siteTitle
        +-- siteDescription
        +-- updatedAt

### Example Contact Settings

    settings/contact
        |
        +-- email
        +-- whatsapp
        +-- linkedin
        +-- github
        +-- updatedAt

### Example CV Settings

    settings/cv
        |
        +-- fileName
        +-- storagePath
        +-- mimeType
        +-- published
        +-- updatedAt

### Security

Settings containing public information may be readable by public users.

Administrative configuration must remain protected.

The implementation should avoid placing secrets or privileged configuration in this collection.

## 13. Authorized Administrators Collection

### Collection

    authorizedAdmins

The `authorizedAdmins` collection stores authorization records for users permitted to access the administrative interface.

### Example

    authorizedAdmins
      |
      +-- adminId
            |
            +-- uid
            +-- email
            +-- displayName
            +-- active
            +-- createdAt
            +-- updatedAt

### Fields

| Field | Type | Required | Description |
|---|---|---:|---|
| `uid` | string | Yes | Firebase Authentication user ID |
| `email` | string | Yes | Administrator email |
| `displayName` | string | No | Administrator display name |
| `active` | boolean | Yes | Indicates whether the authorization is active |
| `createdAt` | timestamp | Yes | Authorization creation timestamp |
| `updatedAt` | timestamp | Yes | Last authorization update timestamp |

### Security Requirements

The `authorizedAdmins` collection is security-sensitive.

Public users must not read this collection.

Unauthenticated users must not read or write this collection.

An authenticated user must not automatically gain access to this collection simply because they have successfully signed in.

The application should not provide a public or general CMS interface for modifying administrator authorization records.

## 14. Document ID Strategy

Document IDs should remain stable.

Recommended approach:

    profile/main

For repeatable collections:

    skills/{skillId}
    experiences/{experienceId}
    projects/{projectId}
    education/{educationId}

For administrator authorization:

    authorizedAdmins/{adminId}

Where practical, administrator document IDs may correspond directly to the Firebase Authentication UID.

For example:

    authorizedAdmins/{firebaseUid}

This approach can simplify authorization lookups and security rules.

The final implementation should use one consistent strategy.

## 15. Publication Queries

Public queries should retrieve only records intended for public presentation.

For collections using `published`, the conceptual query is:

    where("published", "==", true)

Where ordering is required, the query should apply the configured ordering field.

Conceptually:

    where("published", "==", true)
    orderBy("order")

The implementation should account for any Firestore composite indexes required by these queries.

## 16. Experience Preview Queries

The main portfolio page should not necessarily load every experience when only a preview is required.

A preview query may:

1. Retrieve published experiences.
2. Sort by `order`.
3. Limit the number of displayed records.

Conceptually:

    where("published", "==", true)
    orderBy("order")
    limit(N)

The exact value of `N` is a UI decision and should not be treated as a data-model constraint.

## 17. Project Preview Queries

The main portfolio page should not necessarily load every project when only a preview is required.

A preview query may:

1. Retrieve published projects.
2. Sort by `order`.
3. Limit the number of displayed records.

Conceptually:

    where("published", "==", true)
    orderBy("order")
    limit(N)

The complete `/projects` route may retrieve the full set of published projects.

## 18. Skill Queries

Main profile skills should be retrieved independently from skills associated with individual experiences and projects when using a centralized skill collection.

This allows the application to:

- Display selected main skills.
- Reuse skills across experiences.
- Reuse skills across projects.
- Update a skill without duplicating its definition.

The application should avoid loading unnecessary skill records when they are not required for the current view.

## 19. Data References

Where a centralized skill collection is used, an experience or project may contain skill references such as:

    skills: [
      "skillId1",
      "skillId2"
    ]

or Firestore `DocumentReference` values.

The implementation must select one representation and use it consistently.

The preferred strategy should prioritize:

- Simple queries.
- Predictable data access.
- Maintainability.
- Security rule compatibility.
- Reusability.

## 20. Media References

Firestore should store references to Firebase Storage objects rather than binary files.

A media object may conceptually contain:

    {
      path,
      type,
      alt,
      name
    }

For example:

    media: [
      {
        path: "projects/project-id/cover.webp",
        type: "image",
        alt: "Project preview"
      }
    ]

The exact structure may be simplified or expanded during implementation.

## 21. URL Fields

Public URLs should be stored as strings.

Examples include:

- `linkedin`
- `github`
- `repositoryUrl`
- `liveUrl`

The application should validate URL formats before persistence.

URLs should not be trusted solely because they were entered through the administrative interface.

## 22. Date Representation

Dates may be represented using Firestore `Timestamp` values or normalized date strings depending on the required precision.

For professional experiences and education, where only a month and year may be required, a normalized representation may be preferable to a full timestamp.

The implementation should choose one consistent strategy for each date type.

The public presentation layer should format stored dates appropriately for visitors.

## 23. Timestamp Management

The following fields should use server-generated timestamps where appropriate:

    createdAt
    updatedAt

When a document is created:

    createdAt = server timestamp
    updatedAt = server timestamp

When a document is updated:

    updatedAt = server timestamp

The Administrator should not be able to arbitrarily manipulate system timestamps through ordinary content forms.

## 24. Deletion Strategy

Deleting a portfolio document should consider related resources.

For example:

    projects/{projectId}
        |
        +-- media references
                |
                +-- Storage objects

Deleting the Firestore document alone may leave orphaned Storage files.

The implementation should therefore define an appropriate cleanup mechanism.

The initial application should avoid introducing unnecessary orphaned files.

## 25. Soft Delete vs Hard Delete

The initial schema does not require a dedicated soft-delete mechanism.

The primary content states are:

- Published.
- Unpublished.
- Deleted.

Unpublished content remains stored but is hidden from the public interface.

Deleted content is removed when the Administrator intentionally deletes it.

A dedicated `deleted` field should only be introduced if future requirements justify it.

## 26. Draft Management

A dedicated draft collection is not required.

The `published` field provides a simple mechanism for maintaining content that should not yet appear publicly.

Conceptually:

    published: false

means that the content can be managed administratively but should not be returned by public content queries.

## 27. Data Ownership and Access Model

The data ownership model is:

    Public Visitor
        |
        +-- Read published public data

    Authorized Administrator
        |
        +-- Read administrative data
        +-- Create data
        +-- Update data
        +-- Delete data

    Unauthorized User
        |
        +-- No administrative access

    Unauthenticated User
        |
        +-- No administrative access

Firebase Security Rules enforce the actual access control.

## 28. Security Rules Expectations

Firestore Security Rules should enforce at minimum:

- Public read access only for intentionally public documents.
- Public users cannot create documents.
- Public users cannot update documents.
- Public users cannot delete documents.
- Administrative writes require an authorized administrator.
- `authorizedAdmins` remains protected.
- Authorization cannot be granted merely by client-side state.
- Sensitive configuration is not publicly readable.

The exact rules are documented separately in:

    docs/security/security-rules-requirements.md

## 29. Indexing Considerations

Firestore indexes should be created only for queries that require them.

Likely query patterns include:

    experiences
        published == true
        orderBy(order)

    projects
        published == true
        orderBy(order)

    skills
        published == true
        orderBy(order)

    education
        published == true
        orderBy(order)

If Firestore requires composite indexes for the final query structure, those indexes should be documented and version-controlled where supported.

## 30. Query Efficiency

The application should avoid retrieving more data than required.

Examples:

- The home page should retrieve only the experience and project information needed for previews.
- Detailed experience views should retrieve the information required for full presentation.
- Administrative interfaces may retrieve unpublished content because administrators require it.
- Public queries should filter unpublished content at the Firestore query level whenever practical.

## 31. Data Duplication

Some duplication may be acceptable when it improves performance or simplifies public rendering.

However, unnecessary duplication should be avoided.

For example, if a centralized `skills` collection is used, complete skill definitions should not be copied into every experience and project unless there is a concrete reason to do so.

The final implementation should balance normalization with Firestore's document-oriented access model.

## 32. Schema Evolution

The Firestore schema may evolve as the application develops.

Schema changes should:

- Be documented.
- Preserve existing data when practical.
- Avoid breaking existing public content.
- Be tested before deployment.
- Consider migration requirements when fields are renamed or removed.

Breaking schema changes should be treated as deliberate architectural changes rather than incidental implementation details.

## 33. Open Source Reusability

The schema must remain reusable by another developer who deploys the Portfolio Platform independently.

A new deployment should be able to create its own:

- Firebase project.
- Firestore database.
- Storage bucket.
- Authentication configuration.
- `authorizedAdmins` records.
- Portfolio content.

The source repository must not contain the original owner's private Firebase credentials or privileged infrastructure configuration.

## 34. Personal Data Separation

The schema should distinguish reusable application structure from personal portfolio content.

The application code should define how entities are handled.

Firestore should contain the actual portfolio content.

This allows another developer to reuse the application without modifying core components merely to replace personal information.

## 35. Initial Seed Data

The initial implementation may include seed or setup data required to initialize a new portfolio.

Any seed data must:

- Be safe to commit.
- Contain no secrets.
- Avoid exposing private credentials.
- Be clearly identified as example or initial content where applicable.
- Be replaceable by another deployment.

## 36. Out-of-Scope Collections

The following collections are not part of the initial schema:

    users
    visitors
    tenants
    subscriptions
    payments
    billing
    messages
    comments
    reviews
    ratings
    analytics
    notifications

These collections should not be introduced without an approved requirement.

## 37. Complete Logical Structure

The initial logical Firestore structure can be represented as:

    Firestore
    |
    +-- profile
    |     |
    |     +-- main
    |
    +-- skills
    |     |
    |     +-- {skillId}
    |
    +-- experiences
    |     |
    |     +-- {experienceId}
    |
    +-- projects
    |     |
    |     +-- {projectId}
    |
    +-- education
    |     |
    |     +-- {educationId}
    |
    +-- settings
    |     |
    |     +-- site
    |     +-- contact
    |     +-- cv
    |
    +-- authorizedAdmins
          |
          +-- {adminId}

## 38. Relationship Overview

The logical relationships are:

    profile/main
        |
        +-- main skills
        |
        +-- contact configuration
        |
        +-- profile media

    experiences/{experienceId}
        |
        +-- skills/{skillId}
        |
        +-- Storage media

    projects/{projectId}
        |
        +-- skills/{skillId}
        |
        +-- Storage media

    settings/cv
        |
        +-- Firebase Storage CV file

    authorizedAdmins/{adminId}
        |
        +-- Firebase Authentication UID

These relationships are logical associations rather than necessarily direct Firestore subcollection relationships.

## 39. Schema Principles

The Firestore schema follows these principles:

- Use collections for repeatable portfolio entities.
- Use a stable document for unique global configuration where appropriate.
- Keep public portfolio data separate from authorization data.
- Keep authentication identity separate from portfolio content.
- Store files in Firebase Storage.
- Store Storage references in Firestore.
- Use explicit publication state.
- Use explicit ordering.
- Use stable identifiers.
- Use timestamps for maintainability.
- Validate administrative input.
- Minimize unnecessary reads.
- Avoid unnecessary data duplication.
- Avoid unnecessary normalization.
- Keep authorization data protected.
- Keep the schema reusable.
- Avoid multi-user complexity.
- Avoid introducing collections without a concrete requirement.

## 40. Related Documentation

The following documents define related aspects of the data architecture:

- `docs/data-model/data-model-overview.md` — High-level data model.
- `docs/data-model/storage-structure.md` — Firebase Storage structure.
- `docs/security/authentication-and-authorization.md` — Authentication and authorization.
- `docs/security/security-model.md` — Application security model.
- `docs/security/security-rules-requirements.md` — Firestore and Storage security requirements.
- `docs/architecture/firebase-architecture.md` — Firebase architecture.
- `docs/architecture/system-architecture.md` — Overall system architecture.