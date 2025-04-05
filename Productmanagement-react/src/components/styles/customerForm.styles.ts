// src/components/styles/customerForm.styles.ts
import { FlexProps, BoxProps, StackProps } from '@chakra-ui/react';

export const editBannerProps: FlexProps = {
  mb: 2,
  p: 2,
  bg: 'yellow.50',
  borderRadius: 'md',
  justify: 'space-between',
  fontSize: 'sm',
  color: 'yellow.700',
};

export const formWrapperProps: BoxProps = {
  as: 'form',
};

export const formStackProps: StackProps = {
  spacing: 4,
  mb: 6,
};
