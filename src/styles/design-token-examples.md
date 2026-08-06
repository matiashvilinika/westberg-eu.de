# Design Token Usage Examples

## Buttons

```tsx
<button className="rounded-none bg-[var(--color-accent)] px-8 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[var(--color-cyan-600)]">
  Get Started
</button>
```

```scss
.button-primary {
  background: $color-accent;
  color: $color-white;
  border: 1px solid $color-accent;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
```

## Cards

```tsx
<div className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-card)] p-8 shadow-card">
  <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Premium insights</h3>
  <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">A grounded design system with refined visual hierarchy.</p>
</div>
```

## Forms

```tsx
<label className="block text-sm font-medium text-[var(--color-text-secondary)]">
  Email address
  <input
    type="email"
    className="mt-2 w-full rounded-none border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-base text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[rgba(67,165,190,0.18)]"
  />
</label>
```

## Navigation

```tsx
<nav className="flex items-center justify-between gap-6 px-6 py-4 text-sm text-[var(--color-text-secondary)]">
  <a className="hover:text-[var(--color-primary)]" href="#">Products</a>
  <a className="hover:text-[var(--color-primary)]" href="#">Solutions</a>
  <a className="hover:text-[var(--color-primary)]" href="#">Contact</a>
</nav>
```

## Alerts

```tsx
<div className="rounded-[20px] border border-[var(--color-info)] bg-[var(--color-info)]/10 p-5 text-sm text-[var(--color-text-primary)]">
  <strong className="font-semibold text-[var(--color-primary)]">Heads up:</strong>
  <p className="mt-2 text-[var(--color-text-secondary)]">Your billing summary is ready for review.</p>
</div>
```

## Links

```tsx
<a className="font-semibold text-[var(--color-accent)] hover:text-[var(--color-cyan-700)]" href="#">
  Explore our system
</a>
```

## SCSS mixin example

```scss
@mixin surface-card {
  background: $color-card;
  border: 1px solid $color-border;
  box-shadow: 0 30px 60px rgba(15, 23, 42, 0.08);
  color: $color-text-primary;
}

.card {
  @include surface-card;
  padding: 2rem;
  border-radius: 1.5rem;
}
```
