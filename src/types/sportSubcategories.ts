/**
 * Sport Subcategories Types
 *
 * Type definitions for sport subcategory configuration
 */

import { SportCategory } from "./sports";

export type SportSubcategoryType =
  | "football_israeli"
  | "football_world"
  | "football_champions_league"
  | "football_israeli_league"
  | "football_world_cup"
  | "basketball_all_star"
  | "basketball_nba"
  | "basketball_deni_avdija"
  | "basketball_euroleague"
  | "basketball_eurocup"
  | "basketball_israeli"
  | "basketball_israeli_league"
  | "basketball_israel_national";

export interface SportSubcategoryConfig {
  id: number;
  type: SportSubcategoryType;
  sport: SportCategory;
  name: string;

  // Filtering configuration
  leagueFilter?: {
    include?: number[];
    exclude?: number[];
  };

  teamFilter?: {
    include?: number[];
    exclude?: number[];
    highlight?: number[];
  };

  // Display configuration
  showLeagueTable?: boolean;

  // Custom behavior flags
  isDefault?: boolean;
  highlightTeam?: number;
}

/**
 * API Response for Sport Subcategories from WordPress
 */
export interface ApiSportSubcategory {
  id: number;
  name: string;
  slug: string;
  parent?: number;
  description?: string;
  count?: number;
  meta?: {
    sport?: SportCategory;
    type?: SportSubcategoryType;
    league_filter?: {
      include?: number[];
      exclude?: number[];
    };
    team_filter?: {
      include?: number[];
      exclude?: number[];
      highlight?: number[];
    };
    show_league_table?: boolean;
    is_default?: boolean;
    highlight_team?: number;
  };
}
