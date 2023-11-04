import { Log, LogRecord } from 'src/models/log';
import { Nickname } from 'src/models/account';

export type Rating = number;
export type CardId = number;
export type WonderId = number;
export type Age = 1 | 2 | 3;
export type GameId = number;

export enum Phase {
  prepare = 1,
  turn,
  selectWhoBeginsTheNextAge,
  pickBoardToken,
  pickRandomToken,
  burnCard,
  pickDiscardedCard,
  pickTopLineCard,
  pickReturnedCards,
  over,
}

export enum Victory {
  civilian = 1,
  militarySupremacy,
  scienceSupremacy,
  resign,
  timeout,
}

export enum CardGroupId {
  rawMaterials = 1,
  manufacturedGoods,
  military,
  scientific,
  civilian,
  commercial,
  guild,
}

export enum TokenId {
  agriculture = 1,
  architecture,
  economy,
  law,
  masonry,
  mathematics,
  philosophy,
  strategy,
  theology,
  urbanism,
}

export enum DiscounterContext {
  global = 1,
  civilian,
  wonders,
}

export enum SymbolId {
  astrology = 1,
  wheel,
  sundial,
  mortar,
  compass,
  writing,
  law,
}

export enum ResourceId {
  clay = 1,
  wood,
  stone,
  glass,
  papyrus,
}

export const rawMaterials = [
  ResourceId.wood,
  ResourceId.clay,
  ResourceId.stone,
];

export const manufacturedGoods = [ResourceId.glass, ResourceId.papyrus];

export type CardList = CardId[];
export type CardSet = Record<CardId, never>;
export type TokenList = TokenId[];
export type WonderList = WonderId[];
export type ResourceMap = Record<ResourceId, number>;
export type ChainMap = Record<Age, CardId>;

export interface RoomOptions {
  fast: boolean;
  minRating?: number;
  enemy?: string;
}

export interface Room {
  gameId?: string;
  host: Nickname;
  hostRating: Rating;
  guest?: Nickname;
  guestRating?: Rating;
  options: RoomOptions;
}

export interface Discount {
  context: DiscounterContext;
  resources: Record<ResourceId, never>;
  count: number;
}

export interface Discounter {
  list?: Discount[];
}

export interface Track {
  pos: number;
  maxZone: number;
}

export interface CWonders {
  list: WonderList;
  constructed: Record<WonderId, CardId>;
}

export interface CTokens {
  list: TokenList;
}

export interface CSymbols {
  data: Record<SymbolId, number>;
  order: SymbolId[];
}

export interface CCards {
  data: Record<CardGroupId, CardList>;
}

export interface CTreasure {
  coins: number;
}

export interface CChains {
  list: CardList;
}

export interface Bank {
  discardReward: number;
  cardPrice: Record<CardId, number>;
  wonderPrice: Record<WonderId, number>;
  resourcePrice: Record<ResourceId, number>;
}

export interface Score {
  civilian: number;
  science: number;
  commercial: number;
  guilds: number;
  wonders: number;
  tokens: number;
  coins: number;
  military: number;
  total: number;
}

export interface City {
  name: Nickname;
  score: Score;
  resources: ResourceMap;
  wonders: CWonders;
  tokens: CTokens;
  symbols: CSymbols;
  cards: CCards;
  treasure: CTreasure;
  chains: CChains;
  track: Track;
  discounter: Discounter;
  bank: Bank;
}

export interface CardItems {
  layout?: CardList;
  playable?: CardSet;
  discarded?: CardList;
}

export interface DialogItems {
  wonders?: WonderList;
  cards?: CardList;
  tokens?: TokenList;
}

export interface State {
  age: Age;
  phase: Phase;
  tokens: TokenList;
  me: City;
  enemy: City;
  cardItems: CardItems;
  dialogItems: DialogItems;
  winner?: Nickname;
  victory?: Victory;
}

export interface Clock {
  lastMoveAt: string;
  values: Record<Nickname, number>;
}

export interface Player {
  name: Nickname;
  rating: number;
  points: number;
}

export interface Game {
  id: GameId;
  host: Player;
  guest: Player;
  clock: Clock;
  state: State;
  finished: boolean;
  log: Log;
}

export interface UpdateMessage {
  state: State;
  clock: Clock;
  lastMove: LogRecord;
}
export type RatedPlayers = { name: Nickname; rating: Rating };
export type RatingMap = Record<Nickname, Rating>;
export type RatingTop = RatedPlayers[];
