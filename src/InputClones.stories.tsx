import React from 'react';
import {InputClones} from './InputClones';
import {action} from '@storybook/addon-actions';
import {ComponentMeta, ComponentStory} from "@storybook/react";




export default {
    title: "InputClones Component",
    component: InputClones,
    argTypes: {
        addNewItem: {
            description: 'description-button inside from clicked'
        },
    },
} as ComponentMeta<typeof InputClones>;

const Template: ComponentStory<typeof InputClones> = (args) => <InputClones {...args} />;




export const InputClonesStories = Template.bind({});
InputClonesStories.args = {
    addNewItem: action('button inside from clicked')
};
