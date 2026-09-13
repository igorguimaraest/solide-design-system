import {test,expect} from '@playwright/test';
import fs from 'node:fs';
const output='docs/consolidation/screenshots';
test.beforeAll(()=>fs.mkdirSync(output,{recursive:true}));
for(const width of [1440,390])for(const theme of ['light','dark'])test(`${theme} ${width}: components, keyboard and themes`,async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.setViewportSize({width,height:1000});await page.goto('/preview/index.html');
 if(theme==='dark'){const toggle=page.getByRole('switch',{name:'Mudar para modo escuro'});await expect(toggle).toHaveAttribute('aria-checked','false');await toggle.click();await expect(page.getByRole('switch',{name:'Mudar para modo claro'})).toHaveAttribute('aria-checked','true');}
 const primary=page.getByTestId('primary');await expect(primary).toHaveCSS('background-color',theme==='dark'?'rgb(92, 158, 255)':'rgb(29, 99, 214)');
 await expect(primary).toHaveCSS('color',theme==='dark'?'rgb(18, 17, 16)':'rgb(255, 255, 255)');
 await primary.hover();await expect(primary).toHaveCSS('background-color',theme==='dark'?'rgb(147, 191, 255)':'rgb(21, 79, 175)');
 await page.mouse.down();await expect(primary).toHaveCSS('background-color',theme==='dark'?'rgb(45, 124, 246)':'rgb(18, 63, 135)');await page.mouse.up();
 await page.keyboard.press('Tab');await page.keyboard.press('Shift+Tab');await expect(primary).toBeFocused();await expect(primary).toHaveCSS('outline-style','solid');
 await expect(page.getByRole('button',{name:'Indisponível'})).toBeDisabled();
 const selectedColor=theme==='dark'?'rgb(92, 158, 255)':'rgb(29, 99, 214)';
 const selectedHover=theme==='dark'?'rgb(147, 191, 255)':'rgb(21, 79, 175)';
 const backup=page.getByRole('checkbox',{name:'Backup automático'});const backupControl=backup.locator('xpath=following-sibling::*[@data-part="control"]');
 await expect(backup).toBeChecked();await expect(backupControl).toHaveCSS('background-color',selectedColor);await backup.locator('..').hover();await expect(backupControl).toHaveCSS('background-color',selectedHover);await backup.focus();await expect(backupControl).toHaveCSS('outline-style','solid');
 const production=page.getByRole('radio',{name:'Produção'});await expect(production).toBeChecked();await expect(production.locator('xpath=following-sibling::*[@data-part="control"]')).toHaveCSS('background-color',selectedColor);
 const sync=page.getByRole('switch',{name:'Sincronização fiscal'});await expect(sync).toBeChecked();await expect(sync.locator('xpath=following-sibling::*[@data-part="control"]')).toHaveCSS('background-color',selectedColor);
 await page.getByRole('tab',{name:'Todos'}).focus();await page.keyboard.press('ArrowRight');await expect(page.getByRole('tab',{name:'Pendentes'})).toBeFocused();await expect(page.getByRole('tab',{name:'Pendentes'})).toHaveAttribute('aria-selected','true');
 await page.getByRole('button',{name:'Nome',exact:true}).focus();await page.keyboard.press('Enter');await expect(page.getByRole('columnheader',{name:'Nome'})).toHaveAttribute('aria-sort','ascending');
 const rowCheckbox=page.getByRole('checkbox',{name:'Selecionar registro 1'});await rowCheckbox.locator('..').click();await expect(rowCheckbox).toBeChecked();await expect(page.getByRole('checkbox',{name:'Selecionar todos os registros visíveis'})).toHaveJSProperty('indeterminate',true);
 await page.getByRole('button',{name:'Limpar busca'}).click();await expect(page.getByRole('textbox',{name:'Buscar...'})).toHaveValue('');
 if(width===390){await page.getByRole('button',{name:'Alternar navegação'}).click();await expect(page.getByRole('dialog')).toBeVisible();await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).not.toBeVisible();await expect(page.getByRole('button',{name:'Alternar navegação'})).toBeFocused();}
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await primary.focus();await page.screenshot({path:`${output}/kit-${theme}-${width}.png`,fullPage:true});expect(errors).toEqual([]);
});
test('guide: toggle works with storage blocked and renders canonical colors',async({page})=>{
 await page.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new DOMException('blocked','SecurityError')}})});
 await page.goto('/solide-brand-guide.html');await page.locator('#theme-toggle-btn').click();await expect(page.locator('html')).toHaveAttribute('data-theme','dark');await expect(page.locator('#theme-toggle-btn')).toHaveAttribute('aria-checked','true');
 await page.evaluate(()=> (window as any).showScreen('screen-cores'));
 await expect(page.locator('#screen-cores .btn-primary').first()).toHaveCSS('background-color','rgb(92, 158, 255)');
 for(const theme of ['dark','light']){await page.evaluate(t=>(window as any).setTheme(t),theme);const selected=theme==='dark'?'rgb(92, 158, 255)':'rgb(29, 99, 214)';await expect(page.locator('.solide-checkbox:checked').first()).toHaveCSS('background-color',selected);await expect(page.locator('.solide-radio:checked').first()).toHaveCSS('background-color',selected);await expect(page.locator('.solide-switch input:checked + .solide-switch-track').first()).toHaveCSS('background-color',selected);await page.waitForTimeout(400);await page.screenshot({path:`${output}/guide-${theme}-1440.png`,fullPage:true});}
});
