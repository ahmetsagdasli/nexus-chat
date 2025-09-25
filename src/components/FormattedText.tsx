import React from 'react';

interface FormattedTextProps {
  text: string;
}

export const FormattedText: React.FC<FormattedTextProps> = ({ text }) => {
  // Function to format text with basic markdown-like support
  const formatText = (text: string) => {
    // Split by code blocks (```code```)
    const parts = text.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        // Code block
        const code = part.slice(3, -3).trim();
        const lines = code.split('\n');
        const language = lines[0].match(/^[a-zA-Z]+$/) ? lines[0] : '';
        const codeContent = language ? lines.slice(1).join('\n') : code;

        return (
          <div key={index} className="code-block">
            {language && <div className="code-language">{language}</div>}
            <pre>
              <code>{codeContent}</code>
            </pre>
          </div>
        );
      } else {
        // Regular text with inline code support
        const textWithInlineCode = part.split(/(`[^`]+`)/g);

        return textWithInlineCode.map((textPart, textIndex) => {
          if (textPart.startsWith('`') && textPart.endsWith('`')) {
            // Inline code
            return (
              <code key={`${index}-${textIndex}`} className="inline-code">
                {textPart.slice(1, -1)}
              </code>
            );
          } else {
            // Regular text - preserve line breaks and add formatting
            return (
              <span key={`${index}-${textIndex}`}>
                {textPart.split('\n').map((line, lineIndex, array) => (
                  <React.Fragment key={lineIndex}>
                    {formatInlineText(line)}
                    {lineIndex < array.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </span>
            );
          }
        });
      }
    });
  };

  // Function to format inline text (bold, italic, etc.)
  const formatInlineText = (text: string) => {
    // Bold text **text**
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Italic text *text*
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');

    return <span dangerouslySetInnerHTML={{ __html: formatted }} />;
  };

  return (
    <div className="formatted-text">
      {formatText(text)}
    </div>
  );
};