import React from 'react';
import ReactMarkdown from 'react-markdown'

interface MarkdownProps {
    text: string;
    inline?: boolean;
}

/**
 * Display Markdown Text as HTML
 */
export const Markdown = ({
    text,
    inline = false,
    ...props
}: MarkdownProps) => {
    const md = <ReactMarkdown children={text} />;
    return React.createElement(inline ? 'span' : 'div', {children: [md]});
};