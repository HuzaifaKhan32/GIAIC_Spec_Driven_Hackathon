# Research: Physical AI & Humanoid Robotics Book Chapters

## Research 1: Best practices for writing Docusaurus content in Markdown/MDX with YAML frontmatter

*   **Decision:** Adhere to Docusaurus's official content guidelines for Markdown/MDX. This involves structuring files within the `docs/` directory, using standard Markdown syntax, and leveraging MDX for enhanced components where necessary. A consistent YAML frontmatter structure will be enforced for all chapters, ensuring all required fields (`id`, `title`, `difficulty`, `estimated_time`, `keywords`, `prerequisites`) are present and correctly formatted.
*   **Rationale:** Following Docusaurus's conventions ensures full compatibility with its build process, leverages its built-in features (like navigation and search indexing), and simplifies future maintenance. Consistent and valid frontmatter is crucial for programmatic access to chapter metadata, which is essential for RAG metadata extraction and other dynamic features.
*   **Alternatives considered:** Implementing a completely custom content rendering pipeline (adds unnecessary complexity and maintenance overhead), using inconsistent or informal frontmatter (leads to parsing errors, data loss, and difficulties in automation).

## Research 2: Best practices for managing images and internal links in Docusaurus content

*   **Decision:** Store all static assets, including chapter images, within the `docusaurus/static/images/` directory. Images will be referenced using relative Markdown paths (e.g., `../static/images/my-image.png` or an absolute path from the static root `/img/my-image.png` if configured). For internal links between chapters, Docusaurus's built-in linking capabilities will be used, typically involving standard Markdown links to other `docs` file paths or by their unique `id` (as defined in frontmatter), supporting the `[[chapter-id]]` format where Docusaurus provides mechanisms for such shorthand.
*   **Rationale:** Centralized image storage simplifies asset management and ensures efficient loading. Docusaurus's internal linking automatically handles routing changes and validation, reducing the likelihood of broken links. Referencing images with alt text is also a best practice for accessibility.
*   **Alternatives considered:** External image hosting (introduces additional dependencies, potential costs, and complexity), manual URL linking (highly prone to broken links if file paths or IDs change), embedding images directly in Markdown (increases file size and management complexity).

## Research 3: Strategies for content chunking (500-1000 tokens) and semantic heading hierarchy for RAG preparation

*   **Decision:** Structure content with a clear and consistent semantic heading hierarchy (H1 for chapter title, H2 for major sections, H3 for subsections). For RAG chunking, the aim will be to use a content processing tool that can semantically split the Markdown/MDX content into logical chunks, preferably preserving heading context (e.g., the heading path like "Chapter 1 > Section 2 > Subsection 1") within each chunk's metadata. The target chunk size of 500-1000 tokens will be achieved by refining section lengths during content creation and through post-processing adjustments.
*   **Rationale:** A strong semantic heading hierarchy facilitates both human readability and automated parsing for RAG. Semantic chunking significantly improves RAG retrieval accuracy by ensuring that each retrieved chunk represents a coherent and contextually rich piece of information, rather than arbitrary text splits. Token-based chunking is a standard and effective practice for optimizing input to LLMs.
*   **Alternatives considered:** Fixed-size character or word-based chunking (can lead to semantically incoherent chunks, reducing RAG effectiveness), manual chunking (highly time-consuming, prone to human error, and difficult to scale).

## Research 4: Tools and methods for automated validation of internal links, images, and YAML frontmatter in Docusaurus

*   **Decision:** Integrate automated content validation into the CI/CD pipeline.
    *   **Internal Links and Images:** Leverage Docusaurus's built-in link validation (if available and sufficient) or external Markdown link checking tools (e.g., `markdown-link-check`). This will verify that all `[[chapter-id]]` links and image paths resolve correctly.
    *   **YAML Frontmatter:** Develop a custom script or integrate a linter/validator (e.g., using `js-yaml` or a similar tool for schema validation) as a pre-commit hook or part of the CI/CD to ensure all chapter frontmatter adheres to the defined schema and has all required fields.
*   **Rationale:** Automated validation is critical for maintaining high content quality, preventing broken user experiences (dead links, missing images), and ensuring that the RAG system receives correctly structured metadata.
*   **Alternatives considered:** Manual validation (extremely error-prone, unscalable for a book with many chapters), ignoring validation (leads directly to a poor user experience and unreliable RAG performance).

