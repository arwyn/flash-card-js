import React from 'react';
import MarkdownIt from 'markdown-it';
import MarkdownItUnderline from 'markdown-it-underline';

interface MarkdownItPlugin {
    plugin: MarkdownIt.PluginWithParams,
    args: any[]
}

interface MarkdownProps {
    text: string;
    inline: boolean;
}

const mdPlugins: MarkdownItPlugin[] = [
    { plugin: MarkdownItUnderline, args: []}
]

const md = mdPlugins.reduce((md, {plugin, args}) => md.use(plugin, ...args), new MarkdownIt());

/**
 * Display Markdown Text as HTML
 */
export const Markdown = ({
    text,
    inline = false,
    ...props
}: MarkdownProps) => {
    return React.createElement(inline ? 'span' : 'div', { dangerouslySetInnerHTML: { __html: inline ? md.renderInline(text) : md.render(text)}});
};