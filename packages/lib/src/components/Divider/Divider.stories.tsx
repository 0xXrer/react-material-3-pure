import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

/**
 * Material Design 3 Divider Component
 *
 * A divider is a thin line that groups content in lists and containers.
 * Dividers can reinforce tapability, such as when used to separate list items
 * or define tappable regions in an accordion.
 *
 * ## Features
 * - Full-width divider by default
 * - Inset options for indentation
 * - Follows M3 design tokens
 * - High contrast mode support
 *
 * ## Accessibility
 * - Uses `<hr>` element with `role="separator"`
 * - Includes `aria-orientation="horizontal"`
 *
 * @see https://m3.material.io/components/divider
 */
const meta = {
  title: 'Components/Divider',
  component: Divider,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A divider is a thin line that groups content in lists and containers.

### Usage Guidelines
- Use dividers sparingly to create visual separation
- Avoid using dividers if whitespace is sufficient
- Inset dividers are recommended for lists with avatars or icons

### Variants
- **Full-width**: Default divider spanning the full width
- **Inset**: Indented on both sides
- **Inset Start**: Indented on the leading side only
- **Inset End**: Indented on the trailing side only
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    inset: {
      control: 'boolean',
      description: 'Indents the divider on both sides',
    },
    insetStart: {
      control: 'boolean',
      description: 'Indents the divider on the leading side',
    },
    insetEnd: {
      control: 'boolean',
      description: 'Indents the divider on the trailing side',
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ==========================================================================
   BASIC DIVIDER
   ========================================================================== */

/**
 * Full-width divider that spans the entire container width.
 */
export const FullWidth: Story = {
  args: {},
  render: () => (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      <p style={{ margin: '0 0 16px', color: 'var(--md-sys-color-on-surface, #1d1b20)' }}>
        Content above the divider
      </p>
      <Divider />
      <p style={{ margin: '16px 0 0', color: 'var(--md-sys-color-on-surface, #1d1b20)' }}>
        Content below the divider
      </p>
    </div>
  ),
};

/* ==========================================================================
   INSET DIVIDER
   ========================================================================== */

/**
 * Divider with equal padding on both sides. Useful for creating visual
 * separation without spanning the full width.
 */
export const Inset: Story = {
  args: {
    inset: true,
  },
  render: (args) => (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      <p style={{ margin: '0 0 16px', color: 'var(--md-sys-color-on-surface, #1d1b20)' }}>
        Content above the divider
      </p>
      <Divider {...args} />
      <p style={{ margin: '16px 0 0', color: 'var(--md-sys-color-on-surface, #1d1b20)' }}>
        Content below the divider
      </p>
    </div>
  ),
};

/* ==========================================================================
   INSET START DIVIDER
   ========================================================================== */

/**
 * Divider with padding only on the leading (start) side.
 * Commonly used in lists with avatars or icons.
 */
export const InsetStart: Story = {
  args: {
    insetStart: true,
  },
  render: (args) => (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      <p style={{ margin: '0 0 16px', color: 'var(--md-sys-color-on-surface, #1d1b20)' }}>
        Content above the divider
      </p>
      <Divider {...args} />
      <p style={{ margin: '16px 0 0', color: 'var(--md-sys-color-on-surface, #1d1b20)' }}>
        Content below the divider
      </p>
    </div>
  ),
};

/* ==========================================================================
   INSET END DIVIDER
   ========================================================================== */

/**
 * Divider with padding only on the trailing (end) side.
 */
export const InsetEnd: Story = {
  args: {
    insetEnd: true,
  },
  render: (args) => (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      <p style={{ margin: '0 0 16px', color: 'var(--md-sys-color-on-surface, #1d1b20)' }}>
        Content above the divider
      </p>
      <Divider {...args} />
      <p style={{ margin: '16px 0 0', color: 'var(--md-sys-color-on-surface, #1d1b20)' }}>
        Content below the divider
      </p>
    </div>
  ),
};

/* ==========================================================================
   IN LIST CONTEXT
   ========================================================================== */

/**
 * Dividers used within a list to separate items.
 * The inset start variant is commonly used with lists that have leading icons.
 */
export const InListContext: Story = {
  render: () => (
    <div
      style={{
        width: '100%',
        maxWidth: '360px',
        backgroundColor: 'var(--md-sys-color-surface, #fef7ff)',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '12px 16px',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'var(--md-sys-color-primary-container, #eaddff)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--md-sys-color-on-primary-container, #21005d)',
            fontWeight: 500,
          }}
          aria-hidden="true"
        >
          A
        </div>
        <div>
          <div style={{ fontWeight: 500, color: 'var(--md-sys-color-on-surface, #1d1b20)' }}>
            Alice Johnson
          </div>
          <div style={{ fontSize: '14px', color: 'var(--md-sys-color-on-surface-variant, #49454f)' }}>
            alice@example.com
          </div>
        </div>
      </div>
      <Divider insetStart />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '12px 16px',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'var(--md-sys-color-secondary-container, #e8def8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--md-sys-color-on-secondary-container, #1d192b)',
            fontWeight: 500,
          }}
          aria-hidden="true"
        >
          B
        </div>
        <div>
          <div style={{ fontWeight: 500, color: 'var(--md-sys-color-on-surface, #1d1b20)' }}>
            Bob Smith
          </div>
          <div style={{ fontSize: '14px', color: 'var(--md-sys-color-on-surface-variant, #49454f)' }}>
            bob@example.com
          </div>
        </div>
      </div>
      <Divider insetStart />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '12px 16px',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'var(--md-sys-color-tertiary-container, #ffd8e4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--md-sys-color-on-tertiary-container, #31111d)',
            fontWeight: 500,
          }}
          aria-hidden="true"
        >
          C
        </div>
        <div>
          <div style={{ fontWeight: 500, color: 'var(--md-sys-color-on-surface, #1d1b20)' }}>
            Carol Williams
          </div>
          <div style={{ fontSize: '14px', color: 'var(--md-sys-color-on-surface-variant, #49454f)' }}>
            carol@example.com
          </div>
        </div>
      </div>
    </div>
  ),
};

/* ==========================================================================
   ALL VARIANTS
   ========================================================================== */

/**
 * Comparison of all divider variants side by side.
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%', maxWidth: '400px' }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: 500, color: 'var(--md-sys-color-on-surface-variant, #49454f)', textTransform: 'uppercase' }}>
          Full Width
        </p>
        <Divider />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: 500, color: 'var(--md-sys-color-on-surface-variant, #49454f)', textTransform: 'uppercase' }}>
          Inset (Both Sides)
        </p>
        <Divider inset />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: 500, color: 'var(--md-sys-color-on-surface-variant, #49454f)', textTransform: 'uppercase' }}>
          Inset Start
        </p>
        <Divider insetStart />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: 500, color: 'var(--md-sys-color-on-surface-variant, #49454f)', textTransform: 'uppercase' }}>
          Inset End
        </p>
        <Divider insetEnd />
      </div>
    </div>
  ),
};
