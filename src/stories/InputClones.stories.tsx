import React from 'react';
import {AddItemForm} from '../components/AddItemForm/AddItemForm';
import {action} from '@storybook/addon-actions';
import {ComponentMeta, ComponentStory} from "@storybook/react";




export default {
    title: "AddItemForm Component",
    component: AddItemForm,
    argTypes: {
        addNewItem: {
            description: 'description-button inside from clicked'
        },
    },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;




export const InputClonesStories = Template.bind({});
InputClonesStories.args = {
    addNewItem: action('button inside from clicked')
};
