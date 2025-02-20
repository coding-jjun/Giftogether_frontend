import { style } from '@vanilla-extract/css';

export const container = style({
  padding: '18px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const emptyMessage = style({
  height: 'calc(100dvh - 52px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
});

export const donationItem = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px',
});

export const userSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const userImage = style({
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  objectFit: 'cover',
});

export const userName = style({
  fontSize: '16px',
  fontWeight: 700,
  color: '#424242',
});

export const detailsSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  justifyContent: 'center',
  gap: '4px',
});

export const dateText = style({
  fontSize: '12px',
  color: '#888888',
});

export const amountText = style({
  fontSize: '16px',
  fontWeight: 700,
});

export const observer = style({
  height: '20px',
  background: 'transparent',
});