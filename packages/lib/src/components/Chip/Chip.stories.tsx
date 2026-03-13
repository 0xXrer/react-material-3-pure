import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  AssistChip,
  FilterChip,
  InputChip,
  SuggestionChip,
  ChipSet,
} from './Chip';

/**
 * # Chips
 *
 * Chips help people enter information, make selections, filter content, or trigger actions.
 *
 * Material Design 3 defines four types of chips:
 * - **Assist**: Smart or automated actions
 * - **Filter**: Selections to filter content
 * - **Input**: User-entered information
 * - **Suggestion**: Dynamically generated suggestions
 *
 * @see https://m3.material.io/components/chips
 */
const meta: Meta = {
  title: 'Components/Chips',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Chips help people enter information, make selections, filter content, or trigger actions.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

/* ==========================================================================
   ICONS
   ========================================================================== */

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
  </svg>
);

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

const LinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
  </svg>
);



/* ==========================================================================
   ASSIST CHIP STORIES
   ========================================================================== */

type AssistStory = StoryObj<typeof AssistChip>;

export const Assist: AssistStory = {
  name: 'Assist Chip',
  render: () => (
    <ChipSet aria-label="Assist chips">
      <AssistChip label="Assist" />
      <AssistChip label="With Icon" icon={<CalendarIcon />} />
      <AssistChip label="Elevated" elevated />
      <AssistChip label="Elevated with Icon" elevated icon={<PersonIcon />} />
    </ChipSet>
  ),
};

export const AssistLink: AssistStory = {
  name: 'Assist Chip as Link',
  render: () => (
    <ChipSet aria-label="Link chips">
      <AssistChip label="Visit Website" href="https://google.com" target="_blank" icon={<LinkIcon />} />
      <AssistChip label="Download File" href="/file.pdf" download="file.pdf" />
    </ChipSet>
  ),
};

export const AssistDisabled: AssistStory = {
  name: 'Assist Chip Disabled',
  render: () => (
    <ChipSet aria-label="Disabled chips">
      <AssistChip label="Disabled" disabled />
      <AssistChip label="Disabled with Icon" disabled icon={<CalendarIcon />} />
      <AssistChip label="Soft Disabled" softDisabled />
    </ChipSet>
  ),
};

/* ==========================================================================
   FILTER CHIP STORIES
   ========================================================================== */

type FilterStory = StoryObj<typeof FilterChip>;

const FilterChipDemo = () => {
  const [selected, setSelected] = useState(false);

  return (
    <FilterChip
      label="Toggleable"
      selected={selected}
      onChange={setSelected}
    />
  );
};

const FilterChipMultiDemo = () => {
  const [filters, setFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    setFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  return (
    <ChipSet aria-label="Filter chips">
      <FilterChip
        label="XS"
        selected={filters.includes('xs')}
        onChange={() => toggleFilter('xs')}
      />
      <FilterChip
        label="S"
        selected={filters.includes('s')}
        onChange={() => toggleFilter('s')}
      />
      <FilterChip
        label="M"
        selected={filters.includes('m')}
        onChange={() => toggleFilter('m')}
      />
      <FilterChip
        label="L"
        selected={filters.includes('l')}
        onChange={() => toggleFilter('l')}
      />
      <FilterChip
        label="XL"
        selected={filters.includes('xl')}
        onChange={() => toggleFilter('xl')}
      />
    </ChipSet>
  );
};

export const Filter: FilterStory = {
  name: 'Filter Chip',
  render: () => <FilterChipDemo />,
};

export const FilterMultiple: FilterStory = {
  name: 'Filter Chip (Multiple Selection)',
  render: () => <FilterChipMultiDemo />,
};

export const FilterWithIcon: FilterStory = {
  name: 'Filter Chip with Icon',
  render: () => {
    const [selected, setSelected] = useState(false);
    return (
      <FilterChip
        label="With Custom Icon"
        icon={<SearchIcon />}
        selected={selected}
        onChange={setSelected}
      />
    );
  },
};

export const FilterRemovable: FilterStory = {
  name: 'Filter Chip Removable',
  render: () => {
    const [chips, setChips] = useState(['Chip 1', 'Chip 2', 'Chip 3']);
    const [selectedChips, setSelectedChips] = useState<string[]>([]);

    return (
      <ChipSet aria-label="Removable filter chips">
        {chips.map((chip) => (
          <FilterChip
            key={chip}
            label={chip}
            selected={selectedChips.includes(chip)}
            onChange={() =>
              setSelectedChips((prev) =>
                prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
              )
            }
            removable
            onRemove={() => setChips((prev) => prev.filter((c) => c !== chip))}
          />
        ))}
      </ChipSet>
    );
  },
};

export const FilterElevated: FilterStory = {
  name: 'Filter Chip Elevated',
  render: () => {
    const [selected, setSelected] = useState(false);
    return (
      <FilterChip
        label="Elevated"
        elevated
        selected={selected}
        onChange={setSelected}
      />
    );
  },
};

/* ==========================================================================
   INPUT CHIP STORIES
   ========================================================================== */

type InputStory = StoryObj<typeof InputChip>;

const InputChipDemo = () => {
  const [chips, setChips] = useState(['React', 'TypeScript', 'Material UI']);

  return (
    <ChipSet aria-label="Input chips">
      {chips.map((chip) => (
        <InputChip
          key={chip}
          label={chip}
          onRemove={() => setChips((prev) => prev.filter((c) => c !== chip))}
        />
      ))}
    </ChipSet>
  );
};

export const Input: InputStory = {
  name: 'Input Chip',
  render: () => <InputChipDemo />,
};

export const InputWithIcon: InputStory = {
  name: 'Input Chip with Icon',
  render: () => {
    const [chips, setChips] = useState(['John Doe', 'Jane Smith']);

    return (
      <ChipSet aria-label="Input chips with icons">
        {chips.map((chip) => (
          <InputChip
            key={chip}
            label={chip}
            icon={<PersonIcon />}
            onRemove={() => setChips((prev) => prev.filter((c) => c !== chip))}
          />
        ))}
      </ChipSet>
    );
  },
};

export const InputAvatar: InputStory = {
  name: 'Input Chip as Avatar',
  render: () => {
    const [chips, setChips] = useState([
      { name: 'John Doe', avatar: 'https://i.pravatar.cc/40?u=1' },
      { name: 'Jane Smith', avatar: 'https://i.pravatar.cc/40?u=2' },
    ]);

    return (
      <ChipSet aria-label="Avatar chips">
        {chips.map((chip) => (
          <InputChip
            key={chip.name}
            label={chip.name}
            avatar
            icon={<img src={chip.avatar} alt={chip.name} />}
            onRemove={() => setChips((prev) => prev.filter((c) => c.name !== chip.name))}
          />
        ))}
      </ChipSet>
    );
  },
};

export const InputSelected: InputStory = {
  name: 'Input Chip Selected',
  render: () => {
    const [selected, setSelected] = useState<string | null>('TypeScript');
    const chips = ['React', 'TypeScript', 'Material UI'];

    return (
      <ChipSet aria-label="Selectable input chips">
        {chips.map((chip) => (
          <InputChip
            key={chip}
            label={chip}
            selected={selected === chip}
            onClick={() => setSelected(chip)}
            onRemove={() => setSelected(null)}
          />
        ))}
      </ChipSet>
    );
  },
};

export const InputLink: InputStory = {
  name: 'Input Chip as Link',
  render: () => {
    const [chips, setChips] = useState(['google.com', 'github.com']);

    return (
      <ChipSet aria-label="Link input chips">
        {chips.map((chip) => (
          <InputChip
            key={chip}
            label={chip}
            icon={<LinkIcon />}
            href={`https://${chip}`}
            target="_blank"
            onRemove={() => setChips((prev) => prev.filter((c) => c !== chip))}
          />
        ))}
      </ChipSet>
    );
  },
};

/* ==========================================================================
   SUGGESTION CHIP STORIES
   ========================================================================== */

type SuggestionStory = StoryObj<typeof SuggestionChip>;

export const Suggestion: SuggestionStory = {
  name: 'Suggestion Chip',
  render: () => (
    <ChipSet aria-label="Suggestion chips">
      <SuggestionChip label="Nearby restaurants" />
      <SuggestionChip label="Best coffee shops" />
      <SuggestionChip label="Gas stations" icon={<SearchIcon />} />
    </ChipSet>
  ),
};

export const SuggestionElevated: SuggestionStory = {
  name: 'Suggestion Chip Elevated',
  render: () => (
    <ChipSet aria-label="Elevated suggestion chips">
      <SuggestionChip label="Turn on lights" elevated />
      <SuggestionChip label="Set alarm" elevated icon={<CalendarIcon />} />
    </ChipSet>
  ),
};

/* ==========================================================================
   CHIP SET STORIES
   ========================================================================== */

type ChipSetStory = StoryObj<typeof ChipSet>;

export const AllTypes: ChipSetStory = {
  name: 'All Chip Types',
  render: () => {
    const [filterSelected, setFilterSelected] = useState(false);
    const [inputChips, setInputChips] = useState(['Tag 1', 'Tag 2']);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h4 style={{ margin: '0 0 8px' }}>Assist Chips</h4>
          <ChipSet aria-label="Assist chips">
            <AssistChip label="Add to calendar" icon={<CalendarIcon />} />
            <AssistChip label="Add contact" icon={<PersonIcon />} />
          </ChipSet>
        </div>

        <div>
          <h4 style={{ margin: '0 0 8px' }}>Filter Chips</h4>
          <ChipSet aria-label="Filter chips">
            <FilterChip
              label="Completed"
              selected={filterSelected}
              onChange={setFilterSelected}
            />
          </ChipSet>
        </div>

        <div>
          <h4 style={{ margin: '0 0 8px' }}>Input Chips</h4>
          <ChipSet aria-label="Input chips">
            {inputChips.map((chip) => (
              <InputChip
                key={chip}
                label={chip}
                onRemove={() => setInputChips((prev) => prev.filter((c) => c !== chip))}
              />
            ))}
          </ChipSet>
        </div>

        <div>
          <h4 style={{ margin: '0 0 8px' }}>Suggestion Chips</h4>
          <ChipSet aria-label="Suggestion chips">
            <SuggestionChip label="Try 'coffee shops'" />
            <SuggestionChip label="Try 'restaurants'" />
          </ChipSet>
        </div>
      </div>
    );
  },
};

export const KeyboardNavigation: ChipSetStory = {
  name: 'Keyboard Navigation',
  parameters: {
    docs: {
      description: {
        story: 'Use arrow keys to navigate between chips. Press Tab to move focus into/out of the chip set.',
      },
    },
  },
  render: () => {
    const chips = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];

    return (
      <div>
        <p style={{ margin: '0 0 16px' }}>
          Focus the first chip and use arrow keys to navigate:
        </p>
        <ChipSet aria-label="Keyboard navigation demo">
          {chips.map((chip) => (
            <AssistChip key={chip} label={chip} />
          ))}
        </ChipSet>
      </div>
    );
  },
};

export const AccessibilityDemo: ChipSetStory = {
  name: 'Accessibility',
  parameters: {
    docs: {
      description: {
        story: 'Chips support full keyboard navigation, screen readers, and high contrast mode.',
      },
    },
  },
  render: () => {
    const [selected, setSelected] = useState<string[]>(['Option B']);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h4 style={{ margin: '0 0 8px' }}>Filter with aria-pressed</h4>
          <ChipSet aria-label="Filter options">
            {['Option A', 'Option B', 'Option C'].map((option) => (
              <FilterChip
                key={option}
                label={option}
                selected={selected.includes(option)}
                onChange={() =>
                  setSelected((prev) =>
                    prev.includes(option)
                      ? prev.filter((o) => o !== option)
                      : [...prev, option]
                  )
                }
              />
            ))}
          </ChipSet>
        </div>

        <div>
          <h4 style={{ margin: '0 0 8px' }}>Input chips with aria-label on remove</h4>
          <ChipSet aria-label="Selected tags">
            <InputChip
              label="Important"
              removeAriaLabel="Remove important tag"
              onRemove={() => {}}
            />
            <InputChip
              label="Urgent"
              removeAriaLabel="Remove urgent tag"
              onRemove={() => {}}
            />
          </ChipSet>
        </div>
      </div>
    );
  },
};
