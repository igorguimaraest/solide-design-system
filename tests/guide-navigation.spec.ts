import { test, expect } from '@playwright/test';

for (const width of [1440, 390]) for (const theme of ['light', 'dark']) {
 test(`documentação individual: ${width}px ${theme}`, async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.setViewportSize({ width, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/solide-brand-guide.html#componentes');
  if (theme === 'dark') await page.getByRole('switch', { name: 'Alternar tema Claro e Escuro' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
  const catalog = page.locator('#screen-componentes');
  await expect(catalog).toBeVisible();
  await expect(catalog.getByRole('heading', { name: 'Biblioteca de componentes' })).toBeInViewport();
  const links = await catalog.locator('.component-tile').evaluateAll(nodes => nodes.map(node => ({ hash: (node as HTMLAnchorElement).hash, title: node.querySelector('strong')!.textContent! })));
  expect(links).toHaveLength(29);
  for (const { hash, title } of links) {
   await catalog.locator(`a[href="${hash}"]`).click();
   const screen = page.locator(`#screen-${hash.slice(1)}`);
   await expect(screen).toBeVisible();
   await expect(screen.getByRole('heading', { name: title, exact: true })).toBeVisible();
   await expect(screen.getByRole('heading', { name: title, exact: true })).toBeInViewport();
   for (const section of ['Quando usar', 'Evite', 'Estados e comportamento', 'Acessibilidade', 'Tokens', 'Exemplo de marcação']) {
    await expect(screen.getByRole('heading', { name: section, exact: true })).toHaveCount(1);
   }
   expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
   expect(await screen.evaluate(node => node.scrollWidth <= node.clientWidth + 1)).toBe(true);
   const tokens = await screen.locator('li code').allTextContents();
   expect(await page.evaluate(names => names.filter(name => !getComputedStyle(document.documentElement).getPropertyValue(name).trim()), tokens)).toEqual([]);
   const laboratory = screen.getByRole('link', { name: 'Ver variantes no laboratório →' });
   await laboratory.click();
   await expect(page.locator('.doc-screen.active')).toHaveCount(1);
   await page.goBack();
   await expect(screen).toBeVisible();
   await screen.getByRole('link', { name: '← Todos os componentes' }).click();
  }
  await page.screenshot({ animations: 'disabled', path: `docs/audits/componentes/catalogo-${width}-${theme}.png` });
  await catalog.locator('a[href="#componente-button"]').click();
  await page.screenshot({ animations: 'disabled', path: `docs/audits/componentes/botoes-${width}-${theme}.png` });
  await page.reload();
  await expect(page.locator('#screen-componente-button')).toBeVisible();
  expect(errors).toEqual([]);
 });
}

test('exemplos: seleção, teclado, erros e histórico', async ({ page }) => {
 await page.goto('/solide-brand-guide.html#componente-switch');
 const toggle = page.locator('#screen-componente-switch input');
 await page.locator('#screen-componente-switch label').click(); await expect(toggle).toBeChecked();
 await page.goto('/solide-brand-guide.html#componente-tabs');
 const tabs = page.locator('#screen-componente-tabs [role="tab"]');
 await tabs.first().focus(); await page.keyboard.press('ArrowRight');
 await expect(tabs.nth(1)).toBeFocused(); await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
 await expect(page.locator('#screen-componente-tabs [role="tabpanel"]').nth(1)).toBeVisible();
 await page.goto('/solide-brand-guide.html#componente-search');
 await page.locator('#screen-componente-search input').fill('zzzz');
 await expect(page.locator('[data-doc-search-result]')).toHaveText('Nenhum componente encontrado.');
 await page.goto('/solide-brand-guide.html#componente-date');
 await page.locator('[data-doc-start]').fill('2026-12-01');
 await expect(page.locator('[data-doc-range]')).toHaveText('O fim precisa ser igual ou posterior ao início.');
 await page.goto('/solide-brand-guide.html#componente-modal');
 const opener = page.getByRole('button', { name: 'Abrir exemplo', exact: true });
 await opener.click(); await expect(page.locator('[data-doc-dialog]')).toBeVisible();
 await page.keyboard.press('Escape'); await expect(page.locator('[data-doc-dialog]')).not.toBeVisible(); await expect(opener).toBeFocused();
 await page.goto('/solide-brand-guide.html');
 await page.locator('#screen-visao-geral a[data-doc-route][href="#componentes"]').click();
 await page.locator('#screen-componentes a[href="#componente-input"]').click();
 await page.goBack(); await expect(page.locator('#screen-componentes')).toBeVisible();
 await page.goForward(); await expect(page.locator('#screen-componente-input')).toBeVisible();
});

test('menu móvel, busca de componente e ícones no menu compacto', async ({ page }) => {
 await page.setViewportSize({ width: 390, height: 900 });
 await page.goto('/solide-brand-guide.html#componentes');
 await page.getByRole('button', { name: 'Menu Lateral', exact: true }).click();
 await expect(page.locator('#doc-sidebar')).toHaveClass(/open/);
 await page.locator('#header-global-search').fill('Checkbox');
 const checkboxLink = page.locator('#doc-sidebar .component-nav').getByRole('link', { name: 'Checkbox', exact: true });
 await expect(checkboxLink).toBeVisible(); await checkboxLink.click();
 await expect(page.locator('#screen-componente-checkbox')).toBeVisible();
 await expect(page.locator('#doc-sidebar')).not.toHaveClass(/open/);
 await page.setViewportSize({ width: 1440, height: 900 }); await page.reload();
 await expect(page.locator('#doc-sidebar .component-nav .doc-sidebar-title')).toBeVisible();
 await page.getByRole('button', { name: 'Menu Lateral', exact: true }).click();
 await expect(page.locator('#doc-sidebar')).toHaveClass(/compact/);
 const buttonLink = page.locator('#doc-sidebar .component-nav').getByRole('link', { name: 'Botões', exact: true });
 await expect(buttonLink.locator('svg')).toBeVisible(); await buttonLink.click();
 await expect(page.locator('#screen-componente-button')).toBeVisible();
});
