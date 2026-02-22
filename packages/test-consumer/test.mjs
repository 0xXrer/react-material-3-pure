import {
    Button,
    Checkbox,
    AssistChip, FilterChip, ChipSet,
    Dialog,
    Divider,
    Radio,
    Switch,
    TextField,
    ThemeProvider,
    useRipple,
} from 'react-material-3-pure';

console.log('✅ Static ESM named imports OK');
console.log('Button:', typeof Button);
console.log('Checkbox:', typeof Checkbox);
console.log('AssistChip:', typeof AssistChip);
console.log('FilterChip:', typeof FilterChip);
console.log('ChipSet:', typeof ChipSet);
console.log('Dialog:', typeof Dialog);
console.log('Divider:', typeof Divider);
console.log('Radio:', typeof Radio);
console.log('Switch:', typeof Switch);
console.log('TextField:', typeof TextField);
console.log('ThemeProvider:', typeof ThemeProvider);
console.log('useRipple:', typeof useRipple);

const ok = [Button, Checkbox, AssistChip, FilterChip, Dialog, Divider, Radio, Switch, TextField, ThemeProvider, useRipple]
    .every(x => typeof x === 'function');

console.log('');
console.log(ok ? '🎉 All tests passed!' : '❌ Some exports are not functions');
