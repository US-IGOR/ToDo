import React from 'react';
import {action} from '@storybook/addon-actions';
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Tasks} from "./Tasks";


export default {
    title: "Tasks Component",
    component: Tasks,
    /*    args: {
       remove: action('remove'),
        changeTitleTask: action('changeTitleTask'),
        changeStatus: action('changeStatus'),
        }*/
} as ComponentMeta<typeof Tasks>;

const Template: ComponentStory<typeof Tasks> = (args) => <Tasks {...args} />;


export const TasksCompliteStories = Template.bind({});
TasksCompliteStories.args = {
    remove: action('remove'), //
    changeTitleTask: action('changeTitleTask'),//
    changeStatus: action('changeStatus'),//
    task: {id: 'id_1', title: 'JS', isDone: true},
    todolistId: 'todolistId_123'
};





export const TasksNotCompliteStories = Template.bind({});

TasksNotCompliteStories.args = {
        remove: action('remove'),//
        changeTitleTask: action('changeTitleTask'),//
        changeStatus: action('changeStatus'),//
        task: {id: 'id_2', title: 'React', isDone: false},
        todolistId: 'todolistId_123'
};



