import React, { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

export default { title: 'Molecules/ThemeToggle', component: ThemeToggle };

export const Light = () => { const [value, setValue] = useState<'light' | 'dark'>('light'); return <ThemeToggle value={value} onValueChange={setValue} />; };
export const Dark = () => { const [value, setValue] = useState<'light' | 'dark'>('dark'); return <div data-theme="dark" className="p-6 bg-[var(--sld-surface-shell)]"><ThemeToggle value={value} onValueChange={setValue} /></div>; };
export const Disabled = () => <ThemeToggle value="light" onValueChange={() => {}} disabled />;