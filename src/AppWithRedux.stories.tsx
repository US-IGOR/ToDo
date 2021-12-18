import React from 'react';
import {AppWithRedux} from './AppWithRedux';
import {action} from '@storybook/addon-actions';
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Provider} from "react-redux";
import {store} from "./state/store";
import {ReduxStoreProviderDecorator} from "./state/ReduxStoreProviderDecorator";


export default {
    title: "AppWithRedux Component",
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]

} as ComponentMeta<typeof AppWithRedux>;

const Template: ComponentStory<typeof AppWithRedux> = (args) =>  <AppWithRedux/>

export const AppWithReduxStories = Template.bind({});
AppWithReduxStories.args = {};
