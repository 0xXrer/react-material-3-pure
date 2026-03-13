import type { Meta, StoryObj } from '@storybook/react';
import { LinearProgress, CircularProgress } from './Progress';

const meta: Meta = {
  title: 'Components/Progress',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;

export const LinearDeterminate: StoryObj = {
  render: () => (
    <div style={{ width: 300 }}>
      <LinearProgress value={0.6} aria-label="Loading" />
    </div>
  ),
};

export const LinearIndeterminate: StoryObj = {
  render: () => (
    <div style={{ width: 300 }}>
      <LinearProgress indeterminate aria-label="Loading" />
    </div>
  ),
};

export const LinearFourColor: StoryObj = {
  render: () => (
    <div style={{ width: 300 }}>
      <LinearProgress indeterminate fourColor aria-label="Loading" />
    </div>
  ),
};

export const LinearWithBuffer: StoryObj = {
  render: () => (
    <div style={{ width: 300 }}>
      <LinearProgress value={0.4} buffer={0.7} aria-label="Downloading" />
    </div>
  ),
};

export const LinearValues: StoryObj = {
  render: () => (
    <div style={{ width: 300, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <LinearProgress value={0} aria-label="0%" />
      <LinearProgress value={0.25} aria-label="25%" />
      <LinearProgress value={0.5} aria-label="50%" />
      <LinearProgress value={0.75} aria-label="75%" />
      <LinearProgress value={1} aria-label="100%" />
    </div>
  ),
};

export const CircularDeterminate: StoryObj = {
  render: () => <CircularProgress value={0.7} aria-label="Loading" />,
};

export const CircularIndeterminate: StoryObj = {
  render: () => <CircularProgress indeterminate aria-label="Loading" />,
};

export const CircularFourColor: StoryObj = {
  render: () => <CircularProgress indeterminate fourColor aria-label="Loading" />,
};

export const CircularSizes: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <CircularProgress indeterminate size="sm" aria-label="Small" />
      <CircularProgress indeterminate size="md" aria-label="Medium" />
      <CircularProgress indeterminate size="lg" aria-label="Large" />
    </div>
  ),
};

export const CircularValues: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <CircularProgress value={0} aria-label="0%" />
      <CircularProgress value={0.25} aria-label="25%" />
      <CircularProgress value={0.5} aria-label="50%" />
      <CircularProgress value={0.75} aria-label="75%" />
      <CircularProgress value={1} aria-label="100%" />
    </div>
  ),
};
