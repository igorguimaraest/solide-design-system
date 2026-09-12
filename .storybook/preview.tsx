import React from 'react';
import '../preview/style.css';
export default {
 initialGlobals: {theme:'light'},
 globalTypes: { theme: {description:'Tema Solide',toolbar:{icon:'circlehollow',items:['light','dark'],dynamicTitle:true}} },
 decorators: [(Story, context) => <div data-theme={context.globals.theme} className="sld-ui p-6 min-h-screen bg-[var(--sld-surface-canvas)] text-solide-primary"><Story /></div>],
};
