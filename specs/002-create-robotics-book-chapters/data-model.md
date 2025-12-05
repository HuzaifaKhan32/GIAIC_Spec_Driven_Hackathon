# Data Model: Physical AI & Humanoid Robotics Book Chapters

This feature primarily focuses on the content and its structure. The "data model" here refers to the structure of the book chapters and glossary terms as they will be represented in Markdown/MDX files and their associated metadata (YAML frontmatter).

## Entities

### Chapter

Represents a single chapter of the Physical AI & Humanoid Robotics book. Each chapter will correspond to a Markdown/MDX file.

**Attributes:**

-   **`id`** (string, unique): A short, unique identifier for the chapter (e.g., `chapter-01-intro-ai`). Used for internal linking and RAG context.
-   **`title`** (string): The full title of the chapter (e.g., "1. Introduction to Physical AI").
-   **`difficulty`** (enum: "beginner", "intermediate", "advanced"): The target audience difficulty level for the chapter.
-   **`estimated_time`** (integer, minutes): Estimated reading or completion time for the chapter.
-   **`keywords`** (array of strings): A list of relevant keywords for search and categorization.
-   **`prerequisites`** (array of strings): A list of `id`s of other chapters or external knowledge required to understand this chapter.
-   **`content`** (Markdown/MDX string): The full textual content of the chapter, including Markdown headings, paragraphs, code blocks, and image references.

**Relationships:**

-   A Chapter can reference other Chapters via `prerequisites`.
-   A Chapter can link to other Chapters via internal links within its `content`.

### GlossaryTerm

Represents a single term and its definition as compiled into a glossary.

**Attributes:**

-   **`term`** (string, unique): The word or phrase being defined.
-   **`definition`** (string): The explanation or meaning of the term.

**Relationships:**

-   Glossary terms are derived from the content of various Chapters.

## Data Representation

Both `Chapter` and `GlossaryTerm` data will primarily be stored in Markdown/MDX files. Chapter metadata will be in YAML frontmatter. Glossary terms will likely be compiled into a single Markdown file or a structured data file (e.g., JSON) if dynamic lookup is required beyond simple display.
