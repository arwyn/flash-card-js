import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Markdown } from './Markdown';

export default {
    title: 'Components/Markdown',
    component: Markdown
} as ComponentMeta<typeof Markdown>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Markdown> = (args) => <Markdown {...args} />;

export const BasicBlock = Template.bind({});
BasicBlock.args = {
    text: '# markdown text\n\nIn **block** format',
};

export const BasicInline = Template.bind({});
BasicInline.args = {
    inline: true,
    text: 'Some **inline** markdown',
};

export const WithUnderline = Template.bind({});
WithUnderline.args = {
    text: 'This *text* **used** ***various*** _decorations_'
};
