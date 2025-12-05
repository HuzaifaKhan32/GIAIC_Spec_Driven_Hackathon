# Quickstart: Physical AI & Humanoid Robotics Book Chapters

## API Contracts

This feature is focused on the creation and structuring of educational book content in Markdown/MDX format. It is a content-focused feature within the Docusaurus frontend and does not involve any backend API development or new API contracts. Therefore, there are no API contracts to define for this feature.

## Content Structure and Creation

### 1. Chapter Files

Each chapter will be a Markdown (`.md`) or MDX (`.mdx`) file located within the `docusaurus/docs/` directory.

**Example Chapter File (`chapter-01-intro-ai.md`):**

```markdown
---
id: chapter-01-intro-ai
title: Introduction to Physical AI
difficulty: beginner
estimated_time: 30 # minutes
keywords: [physical AI, embodied AI, robotics, introduction]
prerequisites: []
---

# Introduction to Physical AI

## What is Physical AI?

Physical AI, also known as embodied AI, refers to ...

### The Importance of Physical Interaction

Unlike purely software-based AI, physical AI agents ...

## Core Concepts

...

### Key Challenges

...

[[chapter-02-foundations-humanoid]]
```

### 2. Glossary Compilation

A glossary will be compiled from key terms found throughout the chapters. The exact mechanism for compilation (e.g., a separate Markdown file, an automated script) will be determined during implementation, but the output will be a list of terms and their definitions.

### 3. Image Management

All images used within the chapters should be placed in the `docusaurus/static/images/` directory. Images should be referenced using relative paths and always include descriptive alt text for accessibility.

**Example Image Reference:**

```markdown
![Diagram of a robotic arm](/img/robot-arm-diagram.png)
```

### 4. RAG Preparation

Content chunking for RAG will involve ensuring a clear heading hierarchy (H1, H2, H3) within each chapter. Tools will be used during the ingestion process (as part of the RAG Chatbot Backend feature) to semantically chunk content into 500-1000 token segments, preserving metadata.

## Tools and Automation

-   **Gemini CLI**: Can be used as an assistant for drafting chapter content.
-   **Automated Validation**: CI/CD pipeline steps will be configured to:
    -   Validate YAML frontmatter against a defined schema.
    -   Check for broken internal links and missing image references.
