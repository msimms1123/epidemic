const constants = {
  cards: {
    LOCATION: 'location',
    EVENT: 'event'
  },
  actions: {
    MOVE: 'move',
    BUILD: 'build',
    TREAT: 'treat',
    CURE: 'cure',
    DISCARD: 'discard',
    EVENT: 'event'
  },
  moves: {
    LOCAL: 'local',
    DIRECT: 'direct',
    CHARTER: 'charter',
    SHUTTLE: 'shuttle'
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
  MAX_CARDS: 7
};

export default constants;
