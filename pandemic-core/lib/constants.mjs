const constants = {
  cards: {
    LOCATION: 'location',
    EVENT: 'event',
    EPIDEMIC: 'epidemic'
  },
  moves: {
    LOCAL: 'local',
    DIRECT: 'direct',
    CHARTER: 'charter',
    SHUTTLE: 'shuttle'
  },
  decks: {
    PLAYER: 'player',
    INFECTION: 'infection',
    PLAYER_DISCARD: 'player_discard',
    INFECTION_DISCARD: 'infection_discard'
  },
  agents: {
    CONTINGENCY_PLANNER: 'contingency_planner',
    DISPATCHER: 'dispatcher',
    MEDIC: 'medic',
    OPERATIONS_EXPERT: 'operations_expert',
    QUARANTINE_SPECIALIST: 'quarantine_specialist',
    RESEARCHER: 'researcher',
    SCIENTIST: 'scientist'
  },
  infectionRateValues: [
    2,
    2,
    2,
    3,
    3,
    4,
    4
  ],
  MAX_CARDS: 7,
  MAX_DISEASE_COUNT: 24,
  MAX_OUTBREAKS: 7,
  loss_conditions: {
    OUTBREAK_COUNTER: 'outbreak_counter',
    DISEASE_COUNT: 'disease_count',
    NO_PLAYER_CARDS: 'no_player_cards'
  },
  win_conditions: {
    ALL_CURES: 'all_cures'
  },
  starting_card_count: {
    2: 4,
    3: 3,
    4: 2
  },
  start_location: 'Atlanta'
};

export default constants;
