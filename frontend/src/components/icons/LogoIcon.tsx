import { FC } from 'react'
import { useAppState } from '../../hooks/useAppState'

const logoSizeMap: Record<'large' | 'small', { width: number; height: number }> = {
  large: {
    width: 153,
    height: 50,
  },
  small: {
    width: 55,
    height: 18,
  },
}

interface Props {
  className?: string
}

export const LogoIcon: FC<Props> = ({ className }) => {
  const {
    state: { isDesktopScreen },
  } = useAppState()
  const size = logoSizeMap[isDesktopScreen ? 'large' : 'small']

  return (
    <svg
      className={className}
      width={size.width}
      height={size.height}
      viewBox="0 0 153 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M65.882 36L59.031 20.5H63.712L67.804 30.42L71.896 20.5H76.639L69.757 36H65.882ZM90.2073 34.016C88.616 35.566 86.694 36.341 84.4413 36.341C82.1886 36.341 80.2666 35.566 78.6753 34.016C77.084 32.4453 76.2883 30.5233 76.2883 28.25C76.2883 25.9973 77.084 24.0857 78.6753 22.515C80.2666 20.9443 82.1886 20.159 84.4413 20.159C86.694 20.159 88.616 20.9443 90.2073 22.515C91.7986 24.0857 92.5943 25.9973 92.5943 28.25C92.5943 30.5233 91.7986 32.4453 90.2073 34.016ZM84.4413 32.373C85.5366 32.373 86.446 31.9907 87.1693 31.226C87.9133 30.4407 88.2853 29.4487 88.2853 28.25C88.2853 27.0513 87.9133 26.0697 87.1693 25.305C86.446 24.5197 85.5366 24.127 84.4413 24.127C83.3253 24.127 82.3953 24.5197 81.6513 25.305C80.928 26.0697 80.5663 27.0513 80.5663 28.25C80.5663 29.4487 80.928 30.4407 81.6513 31.226C82.3953 31.9907 83.3253 32.373 84.4413 32.373ZM96.3453 36V18.268H90.4863V13.99H106.792V18.268H100.871V36H96.3453ZM108.973 36V13.99H122.675V18.268H113.468V22.794H120.815V27.072H113.468V31.722H122.675V36H108.973ZM125.663 36V13.99H139.365V18.268H130.158V22.794H137.505V27.072H130.158V31.722H139.365V36H125.663Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M40.438 11.9201C37.0276 7.57101 32.0669 4.81953 26.5305 4.81953C15.8563 4.81953 8.06102 14.7604 8.06102 25.5444C8.06102 33.0444 13.0217 38.6805 18.5581 38.6805C19.0896 38.6805 19.5768 38.6361 20.1083 38.5473C16.3878 35.7959 13.9961 30.8254 13.9961 25.5C13.9961 16.9793 19.7539 10.3669 26.5305 10.3669C33.9272 10.3669 39.065 17.7337 39.065 25.5C39.065 31.2692 36.9833 36.9941 33.3957 41.2101C30.251 44.8935 26.1762 47.2456 21.7028 47.9556C21.7028 47.9556 22.0571 48 22.5443 48C34.9459 48 45 37.926 45 25.5C45 20.3965 43.3169 15.6923 40.438 11.9201ZM37.0276 25.5C37.0276 18 32.0669 12.3639 26.5305 12.3639C25.999 12.3639 25.5118 12.4083 24.9803 12.497C28.7008 15.2041 31.0482 20.1302 31.0482 25.5C31.0482 34.0207 25.2904 40.6331 18.5138 40.6331C11.1171 40.6331 5.97933 33.2663 5.97933 25.5C5.97933 19.7308 8.06102 14.0059 11.6486 9.78994C14.7933 6.10651 18.8681 3.75444 23.3415 3.04438C23.3415 3.04438 22.9872 3 22.4557 3C10.0541 3 0 13.074 0 25.5C0 30.6035 1.68307 35.3077 4.56201 39.0799C7.97244 43.429 12.9774 46.1805 18.4695 46.1805C29.2323 46.2249 37.0276 36.284 37.0276 25.5Z"
        fill="white"
      />
    </svg>
  )
}
