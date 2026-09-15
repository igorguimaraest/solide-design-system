import {test,expect,type Locator,type Page} from '@playwright/test';
import fs from 'node:fs';
const output='docs/consolidation/screenshots';
test.beforeAll(()=>fs.mkdirSync(output,{recursive:true}));

const controlFor=(input:Locator)=>input.locator('xpath=following-sibling::*[@data-part="control"]');
async function tokenColor(page:Page,token:string){return page.evaluate(name=>{const probe=document.createElement('span');probe.style.backgroundColor=`var(${name})`;document.body.appendChild(probe);const color=getComputedStyle(probe).backgroundColor;probe.remove();return color;},token);}
async function tokenColorScoped(page:Page,token:string,scopeSelector:string='.sld-ui'){return page.evaluate(({name,selector})=>{const probe=document.createElement('span');probe.style.backgroundColor=`var(${name})`;const container=document.querySelector(selector)||document.body;container.appendChild(probe);const color=getComputedStyle(probe).backgroundColor;probe.remove();return color;},{name:token,selector:scopeSelector});}
function contrastFromRgb(foreground:string,background:string){const channels=(value:string)=>value.match(/[\d.]+/g)!.slice(0,3).map(Number).map(channel=>{const normalized=channel/255;return normalized<=0.04045?normalized/12.92:((normalized+0.055)/1.055)**2.4;});const luminance=(value:string)=>channels(value).reduce((sum,channel,index)=>sum+channel*[0.2126,0.7152,0.0722][index],0);const foregroundLuminance=luminance(foreground);const backgroundLuminance=luminance(background);return(Math.max(foregroundLuminance,backgroundLuminance)+0.05)/(Math.min(foregroundLuminance,backgroundLuminance)+0.05);}
async function expectThemeToggleContrast(track:Locator,thumb:Locator,theme:string,page:Page){await track.evaluate(async(node)=>await Promise.all(node.getAnimations().map(a=>a.finished)));await thumb.evaluate(async(node)=>await Promise.all(node.getAnimations().map(a=>a.finished)));const trackColor=await track.evaluate(node=>getComputedStyle(node).backgroundColor);const thumbColor=await thumb.evaluate(node=>getComputedStyle(node).backgroundColor);const iconColor=await thumb.evaluate(node=>getComputedStyle(node).color);console.log(`[${theme}] track:${trackColor} thumb:${thumbColor} icon:${iconColor}`);if(theme==='dark'){expect(contrastFromRgb(thumbColor,trackColor)).toBeGreaterThanOrEqual(3);}else{expect(thumbColor).toBe(await tokenColor(page,'--sld-surface-card'));expect(iconColor).toBe(await tokenColor(page,'--sld-text-primary'));}expect(contrastFromRgb(iconColor,thumbColor)).toBeGreaterThanOrEqual(3);}
async function expectKeyboardFocus(page:Page,input:Locator){const control=controlFor(input);await input.focus();await page.keyboard.press('Tab');await page.keyboard.press('Shift+Tab');await expect(input).toBeFocused();await expect(control).toHaveCSS('outline-style','solid');}
async function expectSelectedInteraction(page:Page,input:Locator){const control=controlFor(input);const selected=await tokenColor(page,'--sld-control-selected-bg');const selectedBorder=await tokenColor(page,'--sld-control-selected-border');const hover=await tokenColor(page,'--sld-control-selected-hover-bg');const active=await tokenColor(page,'--sld-control-selected-active-bg');await expect(input).toBeEnabled();await expect(input).toBeChecked();await expect(control).toHaveCSS('background-color',selected);await expect(control).toHaveCSS('border-color',selectedBorder);await input.locator('..').hover();await expect(control).toHaveCSS('background-color',hover);await page.mouse.down();await expect(input.locator('..')).toHaveCSS('cursor','pointer');await expect(control).toHaveCSS('background-color',active);await page.mouse.up();await expect(control).toHaveCSS('background-color',hover);await expectKeyboardFocus(page,input);}
async function expectDisabledPrecedence(page:Page,input:Locator){const control=controlFor(input);const disabled=await tokenColor(page,'--sld-disabled-bg');await expect(input).toBeDisabled();await expect(control).toHaveCSS('background-color',disabled);await input.locator('..').hover();await page.mouse.down();await expect(control).toHaveCSS('background-color',disabled);await page.mouse.up();await expect(control).toHaveCSS('background-color',disabled);}
for(const width of [1440,390])for(const theme of ['light','dark'])test(`${theme} ${width}: components, keyboard and themes`,async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.setViewportSize({width,height:1000});await page.goto('/preview/index.html');
 if(theme==='dark'){const toggle=page.getByRole('switch',{name:'Mudar para modo escuro'});await expect(toggle).toHaveAttribute('aria-checked','false');await toggle.click();await expect(page.getByRole('switch',{name:'Mudar para modo claro'})).toHaveAttribute('aria-checked','true');}
 const themeToggle=page.getByRole('switch',{name:theme==='dark'?'Mudar para modo claro':'Mudar para modo escuro'});await expectThemeToggleContrast(themeToggle.locator('[data-part="track"]'),themeToggle.locator('[data-part="thumb"]'),theme,page);await themeToggle.screenshot({path:`${output}/vc04-kit-${theme}-${width}.png`});
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
 await primary.focus();await page.screenshot({path:`${output}/kit-${theme}-${width}.png`,fullPage:true});
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/tests/fixtures/vc02.html');await page.evaluate(currentTheme=>{document.documentElement.dataset.theme=currentTheme;document.documentElement.style.setProperty('--sld-action-primary-bg','var(--sld-status-error-solid)');},theme);
 const selected=await tokenColor(page,'--sld-control-selected-bg');await expect(selected).not.toBe(await tokenColor(page,'--sld-action-primary-bg'));
 const selectedCheckbox=page.getByRole('checkbox',{name:'Checkbox selecionado'});await expectSelectedInteraction(page,selectedCheckbox);
 const indeterminate=page.getByRole('checkbox',{name:'Checkbox indeterminado'});await expect(indeterminate).toHaveJSProperty('indeterminate',true);await expect(controlFor(indeterminate)).toHaveCSS('background-color',selected);
 const unchecked=page.getByRole('checkbox',{name:'Checkbox não selecionado'});await expect(unchecked).not.toBeChecked();await expect(controlFor(unchecked)).toHaveCSS('background-color',await tokenColor(page,'--sld-surface-card'));
 await expectDisabledPrecedence(page,page.getByRole('checkbox',{name:'Checkbox desabilitado'}));
 const selectedRadio=page.getByRole('radio',{name:'Radio selecionado'});await expectSelectedInteraction(page,selectedRadio);const uncheckedRadio=page.getByRole('radio',{name:'Radio não selecionado'});await expect(uncheckedRadio).not.toBeChecked();await expect(controlFor(uncheckedRadio)).toHaveCSS('background-color',await tokenColor(page,'--sld-surface-card'));await expectDisabledPrecedence(page,page.getByRole('radio',{name:'Radio desabilitado'}));
 const selectedSwitch=page.getByRole('switch',{name:'Switch ligado'});await expectSelectedInteraction(page,selectedSwitch);const offSwitch=page.getByRole('switch',{name:'Switch desligado'});await expect(offSwitch).not.toBeChecked();await expect(controlFor(offSwitch)).toHaveCSS('background-color',await tokenColor(page,'--sld-border-default'));await expectDisabledPrecedence(page,page.getByRole('switch',{name:'Switch desabilitado'}));
 expect(errors).toEqual([]);
});
test('guide: toggle works with storage blocked and renders canonical colors',async({page})=>{
 await page.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new DOMException('blocked','SecurityError')}})});
 await page.goto('/solide-brand-guide.html');await page.locator('#theme-toggle-btn').click();await expect(page.locator('html')).toHaveAttribute('data-theme','dark');await expect(page.locator('#theme-toggle-btn')).toHaveAttribute('aria-checked','true');
 await page.evaluate(()=> (window as any).showScreen('screen-cores'));
 await expect(page.locator('#screen-cores .btn-primary').first()).toHaveCSS('background-color','rgb(92, 158, 255)');
 for(const theme of ['dark','light']){await page.evaluate(t=>(window as any).setTheme(t),theme);const selected=theme==='dark'?'rgb(92, 158, 255)':'rgb(29, 99, 214)';await expect(page.locator('.solide-checkbox:checked').first()).toHaveCSS('background-color',selected);await expect(page.locator('.solide-radio:checked').first()).toHaveCSS('background-color',selected);await expect(page.locator('.solide-switch input:checked + .solide-switch-track').first()).toHaveCSS('background-color',selected);await page.waitForTimeout(400);await page.screenshot({path:`${output}/guide-${theme}-1440.png`,fullPage:true});}
});
for(const width of [1440,390])for(const theme of ['light','dark'])test(`guide: VC-04 ${theme} ${width}`,async({page})=>{
 await page.setViewportSize({width,height:1000});await page.goto('/solide-brand-guide.html');await page.evaluate(currentTheme=>(window as any).setTheme(currentTheme),theme);
 const toggle=page.locator('#theme-toggle-btn');await expect(toggle).toHaveAttribute('aria-checked',theme==='dark'?'true':'false');await expectThemeToggleContrast(toggle.locator('.solide-theme-switch-track'),toggle.locator('.solide-theme-switch-thumb'),theme,page);await toggle.screenshot({path:`${output}/vc04-guide-${theme}-${width}.png`});
});
test('guide: warning action respects semantic contract', async ({ page }) => {
  await page.goto('/solide-brand-guide.html');
  await page.evaluate(() => (window as any).showScreen('screen-alertas'));
  const btn = page.locator('.alert-banner-warning .btn-warning');
  await expect(btn).toHaveText('Renovar Certificado');
  const style = await btn.getAttribute('style');
  if (style) expect(style).not.toMatch(/background:/);

  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
  await expect(btn).toHaveCSS('background-color', 'rgb(232, 165, 66)');
  await expect(btn).toHaveCSS('color', 'rgb(18, 17, 16)');
  await btn.hover();
  await expect(btn).toHaveCSS('background-color', 'rgb(217, 140, 29)');
  await page.mouse.down();
  await expect(btn).toHaveCSS('background-color', 'rgb(217, 140, 29)');
  await page.mouse.up();
  await page.mouse.move(0, 0); // remove hover state

  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await expect(btn).toHaveCSS('background-color', 'rgb(217, 140, 29)');
  await expect(btn).toHaveCSS('color', 'rgb(18, 17, 16)');
  await btn.hover();
  await expect(btn).toHaveCSS('background-color', 'rgb(232, 165, 66)');
  await page.mouse.down();
  await expect(btn).toHaveCSS('background-color', 'rgb(232, 165, 66)');
  await page.mouse.up();
  await page.mouse.move(0, 0); // remove hover state

  await btn.evaluate((node) => node.setAttribute('disabled', 'true'));
  const disabledBg = await tokenColor(page, '--sld-disabled-bg');
  await expect(btn).toHaveCSS('background-color', disabledBg);

  const statusWarning = await tokenColor(page, '--sld-status-warning-bg');
  await expect(btn).not.toHaveCSS('background-color', statusWarning);
});

test.describe('VC-08: Hover Guard', () => {
  for (const theme of ['light', 'dark']) {
    test(`mouse/fine pointer maintains hover and states (${theme})`, async ({ page }) => {
      await page.goto('/preview/index.html');

      expect(await page.evaluate(() => matchMedia('(hover: hover) and (pointer: fine)').matches)).toBe(true);

      if (theme === 'dark') {
        const toggle = page.getByRole('switch', { name: 'Mudar para modo escuro' });
        if (await toggle.isVisible()) {
          await toggle.click();
          await expect(page.getByRole('switch', { name: 'Mudar para modo claro' })).toHaveAttribute('aria-checked', 'true');
          await expect(page.locator('.sld-ui').first()).toHaveAttribute('data-theme', 'dark');
        }
      }

      const primary = page.getByTestId('primary');
      await primary.evaluate(async (node) => await Promise.all(node.getAnimations().map(a => a.finished)));
      const baseColor = await primary.evaluate(node => getComputedStyle(node).backgroundColor);

      await primary.hover();
      await primary.evaluate(async (node) => await Promise.all(node.getAnimations().map(a => a.finished)));
      const hoverColor = await primary.evaluate(node => getComputedStyle(node).backgroundColor);
      expect(hoverColor).not.toBe(baseColor);

      await page.mouse.down();
      await primary.evaluate(async (node) => await Promise.all(node.getAnimations().map(a => a.finished)));
      const expectedActiveColor = await tokenColorScoped(page, '--sld-action-primary-active');
      await expect(primary).toHaveCSS('background-color', expectedActiveColor);
      await page.mouse.up();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Shift+Tab');
      await expect(primary).toBeFocused();
      await expect(primary).toHaveCSS('outline-style', 'solid');

      const disabledBtn = page.getByRole('button', { name: 'Indisponível' });
      await expect(disabledBtn).toBeDisabled();
      const disabledBg = await disabledBtn.evaluate(node => getComputedStyle(node).backgroundColor);
      await disabledBtn.hover();
      await disabledBtn.evaluate(async (node) => await Promise.all(node.getAnimations().map(a => a.finished)));
      await expect(disabledBtn).toHaveCSS('background-color', disabledBg);
    });

    test(`touch/coarse pointer ignores hover media query (${theme})`, async ({ browser }) => {
      const context = await browser.newContext({
        viewport: { width: 390, height: 844 },
        hasTouch: true,
        isMobile: true
      });
      try {
        const page = await context.newPage();
        await page.goto('/preview/index.html');

        expect(await page.evaluate(() => matchMedia('(hover: hover) and (pointer: fine)').matches)).toBe(false);

        if (theme === 'dark') {
          const toggleBtn = page.getByRole('switch', { name: 'Mudar para modo escuro' });
          if (await toggleBtn.isVisible()) {
             await toggleBtn.click();
             await expect(page.getByRole('switch', { name: 'Mudar para modo claro' })).toHaveAttribute('aria-checked', 'true');
             await expect(page.locator('.sld-ui').first()).toHaveAttribute('data-theme', 'dark');
          }
        }

        const primary = page.getByTestId('primary');
        await primary.evaluate(async (node) => await Promise.all(node.getAnimations().map(a => a.finished)));
        const baseColor = await primary.evaluate(node => getComputedStyle(node).backgroundColor);

        await primary.hover();
        await primary.evaluate(async (node) => await Promise.all(node.getAnimations().map(a => a.finished)));
        await expect(primary).toHaveCSS('background-color', baseColor);

        await primary.tap();
        await primary.evaluate(async (node) => await Promise.all(node.getAnimations().map(a => a.finished)));
        await expect(primary).toHaveCSS('background-color', baseColor);

        const disabledBtn = page.getByRole('button', { name: 'Indisponível' });
        const disabledBg = await disabledBtn.evaluate(node => getComputedStyle(node).backgroundColor);
        await disabledBtn.tap({ force: true });
        await disabledBtn.evaluate(async (node) => await Promise.all(node.getAnimations().map(a => a.finished)));
        await expect(disabledBtn).toHaveCSS('background-color', disabledBg);
      } finally {
        await context.close();
      }
    });
  }
});

test.describe('VC-09A: Button Press Contract (Guide)', () => {
  test('Guide text regression protection (scale 0.98 vs 0.97)', async ({ page }) => {
    await page.goto('/solide-brand-guide.html');
    const body = page.locator('body');
    await expect(body).not.toContainText('clique tátil (scale 0.98)');
    await expect(body).not.toContainText('Microestados táteis (scale 0.98)');
  });

  for (const width of [1440, 390]) {
    for (const theme of ['light', 'dark']) {
      test(`Normal motion: press and cancel ${theme} ${width}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 1000 });
        await page.addInitScript((t) => {
          try { localStorage.setItem('solide-theme', t); } catch {}
          document.documentElement.setAttribute('data-theme', t);
        }, theme);
        await page.goto('/solide-brand-guide.html');
        await page.evaluate((t) => (window as any).setTheme(t), theme);
        await page.evaluate(() => (window as any).showScreen('screen-controles'));
        const btn = page.locator('#screen-controles .btn-primary').first();
        await expect(btn).toBeVisible();
        const activeBg = await tokenColorScoped(page, '--sld-action-primary-active', '#screen-controles');

        await btn.hover();
        await page.mouse.down();

        await btn.evaluate(async (node) => await Promise.all(node.getAnimations().map(animation => animation.finished)));
        await btn.screenshot({ path: `test-results/press_${width}_${theme}.png` });

        const transitionProp = await btn.evaluate((el) => window.getComputedStyle(el).transitionProperty);
        expect(transitionProp).not.toContain('transform');

        await expect(btn).toHaveCSS('transform', /0\.97/);
        await expect(btn).toHaveCSS('opacity', '1');
        await expect(btn).toHaveCSS('background-color', activeBg);

        await page.mouse.move(0, 0);
        await expect(btn).toHaveCSS('transform', /none|matrix\(1/);
        await expect(btn).not.toHaveCSS('background-color', activeBg);

        await page.mouse.up();
        await expect(btn).toHaveCSS('transform', /none|matrix\(1/);
        await expect(btn).not.toHaveCSS('background-color', activeBg);

        const disabledBtn = page.locator('#screen-controles button:has-text("Desabilitado")');
        const disabledBg = await disabledBtn.evaluate((node) => getComputedStyle(node).backgroundColor);
        await disabledBtn.hover({ force: true });
        await page.mouse.down();
        await expect(disabledBtn).toHaveCSS('transform', /none|matrix\(1/);
        await expect(disabledBtn).toHaveCSS('opacity', '1');
        await expect(disabledBtn).toHaveCSS('background-color', disabledBg);
        await page.mouse.up();
      });

      test(`Reduced motion: no scale ${theme} ${width}`, async ({ page }) => {
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await page.setViewportSize({ width, height: 1000 });
        await page.addInitScript((t) => {
          try { localStorage.setItem('solide-theme', t); } catch {}
          document.documentElement.setAttribute('data-theme', t);
        }, theme);
        await page.goto('/solide-brand-guide.html');
        await page.evaluate((t) => (window as any).setTheme(t), theme);
        await page.evaluate(() => (window as any).showScreen('screen-controles'));
        const btn = page.locator('#screen-controles .btn-primary').first();
        await expect(btn).toBeVisible();
        const activeBg = await tokenColorScoped(page, '--sld-action-primary-active', '#screen-controles');

        await btn.hover();
        await page.mouse.down();

        await expect(btn).toHaveCSS('transform', /none|matrix\(1/);
        await expect(btn).toHaveCSS('background-color', activeBg);

        const transitionVal = await btn.evaluate((el) => window.getComputedStyle(el).transitionDuration);
        expect(transitionVal === '0s' || transitionVal === '0.01ms' || transitionVal === 'none').toBeTruthy();
        const animations = await btn.evaluate((el) => el.getAnimations().length);
        expect(animations).toBe(0);

        await page.mouse.up();
      });

      test(`Right click ignored ${theme} ${width}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 1000 });
        await page.addInitScript((t) => {
          try { localStorage.setItem('solide-theme', t); } catch {}
          document.documentElement.setAttribute('data-theme', t);
        }, theme);
        await page.goto('/solide-brand-guide.html');
        await page.evaluate((t) => (window as any).setTheme(t), theme);
        await page.evaluate(() => (window as any).showScreen('screen-controles'));
        const btn = page.locator('#screen-controles .btn-primary').first();
        const activeBg = await tokenColorScoped(page, '--sld-action-primary-active', '#screen-controles');

        await btn.hover();
        await page.mouse.down({ button: 'right' });

        await expect(btn).not.toHaveAttribute('data-pressed');
        await expect(btn).toHaveCSS('transform', /none|matrix\(1/);
        await expect(btn).not.toHaveCSS('background-color', activeBg);

        await page.mouse.up({ button: 'right' });
      });

      test(`Ghost press and cancel ${theme} ${width}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 1000 });
        await page.addInitScript((t) => {
          try { localStorage.setItem('solide-theme', t); } catch {}
          document.documentElement.setAttribute('data-theme', t);
        }, theme);
        await page.goto('/solide-brand-guide.html');
        await page.evaluate((t) => (window as any).setTheme(t), theme);
        await page.evaluate(() => (window as any).showScreen('screen-controles'));
        const btn = page.locator('#screen-controles .btn-ghost').first();
        const activeBg = await tokenColorScoped(page, '--sld-action-ghost-active', '#screen-controles');
        const hoverBg = await tokenColorScoped(page, '--sld-action-ghost-hover', '#screen-controles');

        await btn.hover();
        await page.mouse.down();
        await expect(btn).toHaveAttribute('data-pressed', 'true');
        await expect(btn).toHaveCSS('transform', /0\.97/);
        await expect(btn).toHaveCSS('background-color', activeBg);

        await page.mouse.up();
        await expect(btn).not.toHaveAttribute('data-pressed');
        await expect(btn).toHaveCSS('transform', /none|matrix\(1/);
        await expect(btn).toHaveCSS('background-color', hoverBg);
      });

      test(`Keyboard contract (Enter & Space) ${theme} ${width}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 1000 });
        await page.addInitScript((t) => {
          try { localStorage.setItem('solide-theme', t); } catch {}
          document.documentElement.setAttribute('data-theme', t);
        }, theme);
        await page.goto('/solide-brand-guide.html');
        await page.evaluate((t) => (window as any).setTheme(t), theme);
        await page.evaluate(() => (window as any).showScreen('screen-controles'));

        for (const variant of ['primary', 'ghost']) {
          const btn = page.locator(`#screen-controles .btn-${variant}`).first();
          const activeBg = await tokenColorScoped(page, `--sld-action-${variant}-active`, '#screen-controles');

          for (const key of ['Enter', 'Space']) {
            await btn.focus();

            await page.keyboard.down(key);
            await expect(btn).toHaveCSS('background-color', activeBg);
            await expect(btn).toBeFocused();
            await expect(btn).toHaveCSS('transform', /none|matrix\(1/);
            await expect(btn).toHaveAttribute('data-kbd-active', 'true');
            await expect(btn).not.toHaveAttribute('data-pressed');

            await page.keyboard.up(key);
            await expect(btn).not.toHaveAttribute('data-kbd-active');
            await expect(btn).not.toHaveCSS('background-color', activeBg);

            await btn.blur();
          }
        }
      });

      test(`Modality switch (Keyboard to Pointer) ${theme} ${width}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 1000 });
        await page.addInitScript((t) => {
          try { localStorage.setItem('solide-theme', t); } catch {}
          document.documentElement.setAttribute('data-theme', t);
        }, theme);
        await page.goto('/solide-brand-guide.html');
        await page.evaluate((t) => (window as any).setTheme(t), theme);
        await page.evaluate(() => (window as any).showScreen('screen-controles'));

        const btn = page.locator('#screen-controles .btn-primary').first();

        await page.locator('body').focus();
        while (await btn.evaluate((node) => document.activeElement !== node)) {
          await page.keyboard.press('Tab');
        }

        expect(await btn.evaluate((node) => document.activeElement === node)).toBe(true);
        expect(await btn.evaluate((node) => node.matches(':focus-visible'))).toBe(true);

        const box = await btn.boundingBox();
        await page.mouse.move(box!.x + 10, box!.y + 10);
        await page.mouse.down();

        await expect(btn).toBeFocused();
        expect(await btn.evaluate((node) => node.matches(':focus-visible'))).toBe(true);
        await expect(btn).toHaveAttribute('data-pressed', 'true');
        await expect(btn).toHaveCSS('transform', /0\.97/);

        await page.mouse.up();
        await expect(btn).not.toHaveAttribute('data-pressed');
      });

      test(`Loading state guard ${theme} ${width}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 1000 });
        await page.addInitScript((t) => {
          try { localStorage.setItem('solide-theme', t); } catch {}
          document.documentElement.setAttribute('data-theme', t);
        }, theme);
        await page.goto('/solide-brand-guide.html');
        await page.evaluate((t) => (window as any).setTheme(t), theme);
        await page.evaluate(() => (window as any).showScreen('screen-controles'));

        const btn = page.locator('#screen-controles button:has-text("Processando...")');
        await expect(btn).toHaveAttribute('disabled', '');
        await expect(btn).toHaveAttribute('aria-busy', 'true');

        await page.screenshot({ path: `test-results/loading-${theme}-${width}.png` });

        const disabledBg = await btn.evaluate((node) => window.getComputedStyle(node).backgroundColor);

        await btn.hover({ force: true });
        await page.mouse.down();

        await expect(btn).not.toHaveAttribute('data-pressed');
        await expect(btn).toHaveCSS('transform', /none|matrix\(1/);
        await expect(btn).toHaveCSS('background-color', disabledBg);
        await page.mouse.up();

        await btn.focus();
        await expect(btn).not.toBeFocused();

        await page.keyboard.down('Enter');
        await expect(btn).not.toHaveAttribute('data-kbd-active');
        await expect(btn).toHaveCSS('background-color', disabledBg);
        await page.keyboard.up('Enter');

        const client = await page.context().newCDPSession(page);
        const box = await btn.boundingBox();
        if (box) {
          const x = box.x + box.width / 2;
          const y = box.y + box.height / 2;
          await client.send('Input.dispatchTouchEvent', {
            type: 'touchStart',
            touchPoints: [{ x, y }]
          });

          await expect(btn).not.toHaveAttribute('data-pressed');
          await expect(btn).toHaveCSS('transform', /none|matrix\(1/);
          await expect(btn).toHaveCSS('background-color', disabledBg);

          await client.send('Input.dispatchTouchEvent', {
            type: 'touchEnd',
            touchPoints: []
          });
        }
      });
    }
  }

  for (const theme of ['light', 'dark']) {
    test(`Touch/Coarse: press and cancel ${theme} 390`, async ({ browser }) => {
      const context = await browser.newContext({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
      const page = await context.newPage();

      await page.addInitScript((t) => {
        try { localStorage.setItem('solide-theme', t); } catch {}
        document.documentElement.setAttribute('data-theme', t);
      }, theme);

      await page.goto('/solide-brand-guide.html');
      await page.evaluate((t) => (window as any).setTheme(t), theme);
      await page.evaluate(() => (window as any).showScreen('screen-controles'));

      const btn = page.locator('#screen-controles .btn-primary').first();
      await expect(btn).toBeVisible();
      const activeBg = await tokenColorScoped(page, '--sld-action-primary-active', '#screen-controles');

      const box = await btn.boundingBox();
      const x = box!.x + box!.width / 2;
      const y = box!.y + box!.height / 2;

      const client = await context.newCDPSession(page);

      // 1. Touch Start
      await client.send('Input.dispatchTouchEvent', {
        type: 'touchStart',
        touchPoints: [{ x, y }]
      });

      await expect(btn).toHaveAttribute('data-pressed', 'true');
      await expect(btn).toHaveCSS('transform', /0\.97/);
      await expect(btn).toHaveCSS('opacity', '1');
      await expect(btn).toHaveCSS('background-color', activeBg);

      // 2. Touch Move outside
      await client.send('Input.dispatchTouchEvent', {
        type: 'touchMove',
        touchPoints: [{ x: 0, y: 0 }]
      });

      await expect(btn).not.toHaveAttribute('data-pressed');
      await expect(btn).toHaveCSS('transform', /none|matrix\(1/);
      await expect(btn).not.toHaveCSS('background-color', activeBg);

      // 3. Touch End
      await client.send('Input.dispatchTouchEvent', {
        type: 'touchEnd',
        touchPoints: []
      });

      await expect(btn).not.toHaveAttribute('data-pressed');
      await expect(btn).toHaveCSS('transform', /none|matrix\(1/);
      await expect(btn).not.toHaveCSS('background-color', activeBg);

      await context.close();
    });
  }
});
