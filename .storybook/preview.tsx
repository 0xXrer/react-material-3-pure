import { Preview } from '@storybook/react';
import '../src/styles/theme.css';
import '../src/styles/global.css';
import StorybookAnalytics from './preview-body';

export default function StorybookRoot({ children }: { children: React.ReactNode }) {
  return <>
    {children}
    <StorybookAnalytics />
  </>;
}
