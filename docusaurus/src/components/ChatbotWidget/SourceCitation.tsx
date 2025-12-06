import React from 'react';
import clsx from 'clsx';
import styles from './ChatbotWidget.module.css'; // Assuming styles

export interface Citation {
  title: string;
  chapter_path: string; // e.g., "intro/intro-physical-ai"
  score: number;
}

interface SourceCitationProps {
  citation: Citation;
}

const SourceCitation: React.FC<SourceCitationProps> = ({ citation }) => {
  const chapterLink = `/docs/${citation.chapter_path}`; // Construct Docusaurus link

  return (
    <a href={chapterLink} target="_blank" rel="noopener noreferrer" className={clsx(styles.citationButton, 'button button--outline button--primary button--sm')}>
      {/* Assuming button--sm gives small size and button--primary gives appropriate colors */}
      {citation.title} {/* You might want to show score or other details here */}
    </a>
  );
};

export default SourceCitation;
