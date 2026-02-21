import { useState } from 'react';
import { AssistChip, FilterChip, InputChip, SuggestionChip, ChipSet } from '@m3/components/Chip';
import { CodeBlock, InstallCmd } from '@/components/code-block';

export function ChipPage() {
    const [filters, setFilters] = useState<Record<string, boolean>>({
        Running: false,
        Walking: true,
        Cycling: false,
    });

    return (
        <div className="page">
            <div className="page-header">
                <h1 className="page-title">Chip</h1>
                <p className="page-description">
                    Chips help people enter information, make selections, filter content, or trigger actions.
                    Four variants: Assist, Filter, Input, and Suggestion.
                </p>
            </div>

            <InstallCmd cmd="npx m3-pure add chip" />

            <div className="section">
                <h2 className="section-title">Assist Chip</h2>
                <div className="demo-area">
                    <ChipSet>
                        <AssistChip label="Share" />
                        <AssistChip label="Directions" />
                        <AssistChip label="Elevated" elevated />
                    </ChipSet>
                </div>
                <CodeBlock code={`import { AssistChip, ChipSet } from '@/components/ui/Chip';

<ChipSet>
  <AssistChip label="Share" />
  <AssistChip label="Directions" />
  <AssistChip label="Elevated" elevated />
</ChipSet>`} />
            </div>

            <div className="section">
                <h2 className="section-title">Filter Chip</h2>
                <div className="demo-area">
                    <ChipSet>
                        {Object.entries(filters).map(([key, val]) => (
                            <FilterChip
                                key={key}
                                label={key}
                                selected={val}
                                onChange={(s) => setFilters((p) => ({ ...p, [key]: s }))}
                            />
                        ))}
                    </ChipSet>
                </div>
                <CodeBlock code={`<FilterChip
  label="Running"
  selected={selected}
  onChange={(s) => setSelected(s)}
/>`} />
            </div>

            <div className="section">
                <h2 className="section-title">Input Chip</h2>
                <div className="demo-area">
                    <ChipSet>
                        <InputChip label="John" onRemove={() => { }} />
                        <InputChip label="Jane" onRemove={() => { }} />
                    </ChipSet>
                </div>
            </div>

            <div className="section">
                <h2 className="section-title">Suggestion Chip</h2>
                <div className="demo-area">
                    <ChipSet>
                        <SuggestionChip label="Beach" />
                        <SuggestionChip label="Mountains" />
                        <SuggestionChip label="City" />
                    </ChipSet>
                </div>
            </div>
        </div>
    );
}
