import { Lock } from 'lucide-react';

/**
 * Props for CompatibilityLogo component
 */
interface CompatibilityLogoProps {
  /** The compatibility score (0-100) */
  matchScore: number;
  /** Logo text to display (e.g., "TC", "VR") - optional */
  logoText?: string;
  /** Logo image URL - optional */
  logoImage?: string;
  /** Size of the logo: 'sm' (h-10 w-10) or 'md' (h-12 w-12) */
  size?: 'sm' | 'md';
  /** Whether to show as a confidential lock icon or logo text */
  isConfidential?: boolean;
}

/**
 * CompatibilityLogo Component
 * 
 * Displays a logo or lock icon with a background color that matches the compatibility score.
 * The background color uses light/opaque colors with matching text colors:
 * - Green (≥70%): Light emerald background with emerald text
 * - Amber (40-70%): Light amber background with amber text
 * - Red (<40%): Light red background with red text
 * 
 * @example
 * // Display lock icon with compatibility score color
 * <CompatibilityLogo matchScore={82} isConfidential={true} size="md" />
 * 
 * @example
 * // Display logo text with compatibility score color
 * <CompatibilityLogo matchScore={52} logoText="VR" size="md" />
 * 
 * @param props - The component props
 * @returns React component
 */
export function CompatibilityLogo({
  matchScore,
  logoText,
  logoImage,
  size = 'md',
  isConfidential = false,
}: CompatibilityLogoProps) {
  // Determine size classes
  const sizeClasses = size === 'sm' ? 'h-10 w-10' : 'h-12 w-12';

  // Get background and text colors based on compatibility score
  const getColors = (score: number) => {
    if (score >= 60) {
      return {
        background: 'bg-emerald-100 dark:bg-emerald-900/30',
        text: 'text-emerald-600 dark:text-emerald-400',
      };
    } else if (score >= 45) {
      return {
        background: 'bg-amber-100 dark:bg-amber-900/30',
        text: 'text-amber-600 dark:text-amber-400',
      };
    } else {
      return {
        background: 'bg-red-100 dark:bg-red-900/30',
        text: 'text-red-600 dark:text-red-400',
      };
    }
  };

  const colors = getColors(matchScore);

  // If image is provided, show image
  if (logoImage) {
    return (
      <div className={`${sizeClasses} rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 overflow-hidden`}>
        <img src={logoImage} alt="Logo" className="w-full h-full object-cover" />
      </div>
    );
  }

  // If confidential or no logo text, show lock icon
  if (isConfidential || !logoText) {
    return (
      <div className={`${sizeClasses} rounded-lg ${colors.background} flex items-center justify-center flex-shrink-0`}>
        <Lock className={`${size === 'sm' ? 'h-5 w-5' : 'h-6 w-6'} ${colors.text}`} />
      </div>
    );
  }

  // Show logo text
  return (
    <div className={`${sizeClasses} rounded-lg ${colors.background} flex items-center justify-center flex-shrink-0`}>
      <span className={`font-bold ${size === 'sm' ? 'text-xs' : 'text-sm'} ${colors.text}`}>
        {logoText}
      </span>
    </div>
  );
}
