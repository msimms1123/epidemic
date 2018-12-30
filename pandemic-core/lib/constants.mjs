const constants = {
  cards: {
    LOCATION: 'location',
    EVENT: 'event',
    EPIDEMIC: 'epidemic'
  },
  actions: {
    MOVE: 'move',
    BUILD: 'build',
    DISMANTLE: 'dismantle',
    TREAT: 'treat',
    INFECT: 'infect',
    CURE: 'cure',
    REVERSE_CURE: 'reverse_cure',
    DISCARD: 'discard',
    INSERT: 'insert',
    EVENT: 'event',
    INFECT: 'infect'
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
  loss_conditions: {
    OUTBREAK_COUNTER: 'outbreak_counter',
    DISEASE_COUNT: 'disease_count',
    NO_PLAYER_CARDS: 'no_player_cards'
  },
  win_conditions: {
    ALL_CURES: 'all_cures'
  }
};

export default constants;
