'use client';

import { useEffect, useRef, useState } from 'react';
import { SiteButton, WhatsAppIcon } from '../primitives';
import { whatsappUrl } from '@/content/helpers';
import type { NavLink, NavSection, SiteLinks } from '@/content/types';

/**
 * Nav fixa do template.
 *
 * Transparente sobre o herói (logo claro) e sólida com vidro depois de 60px de
 * rolagem (logo navy), exatamente como o protótipo. O menu mobile é novo: o
 * protótipo só desenhava o botão hambúrguer.
 */
export function SiteNav({
  nav,
  links,
  logoLight,
  logoDark,
}: {
  nav: NavSection;
  links: SiteLinks;
  logoLight: string | null;
  logoDark: string | null;
}) {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // Submenu de cursos no mobile: abre fechado a cada vez que o menu abre.
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const burgerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Menu mobile: ESC fecha, foco preso dentro do painel, scroll travado.
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    menuRef.current?.querySelector<HTMLElement>('button, a')?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        burgerRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusables = menuRef.current?.querySelectorAll<HTMLElement>('button, [href]');
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const waHref = nav.show_whatsapp ? whatsappUrl(nav.whatsapp_number) : null;
  const ctaHref = '#matriculas';
  const closeMenu = () => {
    setMenuOpen(false);
    setOpenGroup(null);
  };

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>

      <header className={`nav${solid ? ' is-solid' : ''}`} id="top">
        <a className="nav__logo" href="#top" aria-label={`${links.nome} — início`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {logoLight && <img src={logoLight} alt={links.nome} className="logo-light" width={180} height={52} />}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {logoDark && <img src={logoDark} alt="" aria-hidden="true" className="logo-dark" width={180} height={52} />}
        </a>

        {nav.links.length > 0 && (
          <nav className="nav__links" aria-label="Principal">
            {nav.links.map((link) =>
              link.children?.length ? (
                <CourseGroup key={link.label} link={link} />
              ) : (
                <a key={link.anchor} href={`#${link.anchor}`}>
                  {link.label}
                </a>
              ),
            )}
          </nav>
        )}

        <div className="nav__cta">
          {waHref && (
            <a className="nav__wa" href={waHref} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <WhatsAppIcon />
            </a>
          )}

          {/* Porta de entrada para quem já é aluno da escola. */}
          <a className="nav__enter" href={links.loginUrl}>
            {nav.login_label || 'Entrar'}
          </a>

          {nav.cta_label && (
            <SiteButton href={ctaHref} variant="teal" size="sm">
              {nav.cta_label}
            </SiteButton>
          )}

          <button
            type="button"
            className="nav__burger"
            ref={burgerRef}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="org-site-menu"
            onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          className="menu"
          id="org-site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          ref={menuRef}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeMenu();
          }}
        >
          <div className="menu__top">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {logoLight && <img src={logoLight} alt={links.nome} />}
            <button type="button" className="menu__close" onClick={closeMenu} aria-label="Fechar menu">
              ×
            </button>
          </div>

          <nav className="menu__links" aria-label="Principal">
            {nav.links.map((link) => {
              if (!link.children?.length) {
                return (
                  <a key={link.anchor} href={`#${link.anchor}`} onClick={closeMenu}>
                    {link.label}
                  </a>
                );
              }
              const expanded = openGroup === link.label;
              const subId = `menu-sub-${link.anchor}`;
              return (
                <div key={link.label} className={`menu__group${expanded ? ' is-open' : ''}`}>
                  <button
                    type="button"
                    className="menu__toggle"
                    aria-expanded={expanded}
                    aria-controls={subId}
                    onClick={() => setOpenGroup(expanded ? null : link.label)}
                  >
                    {link.label}
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  <ul className="menu__sub" id={subId} hidden={!expanded}>
                    {link.children.map((child) => (
                      <li key={child.anchor}>
                        <a href={`#${child.anchor}`} onClick={closeMenu}>
                          <i className={`course-dot course-dot--${child.tone}`} aria-hidden="true" />
                          <span>
                            <b>{child.label}</b>
                            {child.hint && <small>{child.hint}</small>}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
            <a href={links.loginUrl}>{nav.login_label || 'Entrar'}</a>
          </nav>

          <div className="menu__foot">
            {waHref && (
              <SiteButton href={waHref} variant="ghost" size="lg" external onClick={closeMenu}>
                Falar no WhatsApp
              </SiteButton>
            )}
            {nav.cta_label && (
              <SiteButton href={ctaHref} variant="teal" size="lg" onClick={closeMenu}>
                {nav.cta_label}
              </SiteButton>
            )}
          </div>
        </div>
      )}
    </>
  );
}

/**
 * Os cursos na barra do desktop: em vez de um "Cursos" genérico, os três
 * aparecem como pílulas, cada uma com o marcador na cor da própria seção —
 * teal da Redação, quente do Miguilim, navy do Empresarial.
 */
function CourseGroup({ link }: { link: NavLink }) {
  return (
    <div className="nav__courses" role="group" aria-label={link.label}>
      <span className="nav__courses-k" aria-hidden="true">
        {link.label}
      </span>
      {link.children?.map((child) => (
        <a key={child.anchor} className="nav__course" href={`#${child.anchor}`}>
          <i className={`course-dot course-dot--${child.tone}`} aria-hidden="true" />
          {child.label}
        </a>
      ))}
    </div>
  );
}
