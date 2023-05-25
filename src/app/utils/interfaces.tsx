interface Props {
  params?: any
}

/*interface Team {
  [index: string]: string | number | null
}*/

interface Meta {
  total_pages: number | null
  current_page: number | null
  next_page: number | null
  per_page: number | null
  total_count: number | null
}

interface TeamsByConference {
  east: {
    [key: string]: Team[]
    atlantic: Team[]
    central: Team[]
    southeast: Team[]
  }
  west: {
    [key: string]: Team[]
    southwest: Team[]
    northwest: Team[]
    pacific: Team[]
  }
}

interface Player {
  id: number | null
  first_name: string | null
  last_name: string | null
  position: string | null
  team_id: number | null
}

interface Team {
  id: number | null
  abbreviation: string | null
  city: string | null
  conference: string | null
  division: string | null
  full_name: string | null
  name: string | null
}

interface Game {
  id: number
  date: string | Date
  home_team_id: number | null
  home_team_score: number | null
  season: number | null
  visitor_team_id: number | null
  visitor_team_score: number | null
}

interface Boxscore {
  id: number
  ast?: number | null
  blk?: number | null
  dreb?: number | null
  fg3_pct?: number | null
  fg3a?: number | null
  fg3m?: number | null
  fg_pct?: number | null
  fga?: number | null
  fgm?: number | null
  ft_pct?: number | null
  fta?: number | null
  ftm?: number | null
  player: Player
  team: Team
  game: Game
  min?: string | null
  oreb?: number | null
  pf?: number | null
  pts?: number | null
  reb?: number | null
  stl?: number | null
  turnover?: number | null
}

interface IndividualBoxscore {
  players: {
    player: Boxscore
  }
  team: Team
}

interface Schedule {
  data: [ScheduleGame]
  meta: Meta[]
}

interface ScheduleGame {
  id: number
  date: Date | string
  home_team: Team
  home_team_score: number | null
  period: number | null
  postseason: boolean | null
  season: number | null
  status: string
  time: string | null
  visitor_team: Team
  visitor_team_score: number | null
}

interface Players {
  data: [PlayerInfo]
  meta: Meta[]
}

interface PlayerInfo {
  first_name: string | null
  height_feet: number | string | null
  height_inches: number | string | null
  id: number
  last_name: string | null
  position: string | null
  team: Team
  weight_pounds: number | string | null
}

interface PlayerSeason {
  games_played: number | null
  player_id: number | null
  season: number | null
  min: string | null
  fgm: number | null
  fga: number | null
  fg3m: number | null
  fg3a: number | null
  ftm: number | null
  fta: number | null
  oreb: number | null
  dreb: number | null
  reb: number | null
  ast: number | null
  stl: number | null
  blk: number | null
  turnover: number | null
  pf: number | null
  pts: number | null
  fg_pct: number | null
  fg3_pct: number | null
  ft_pct: number | null
}
