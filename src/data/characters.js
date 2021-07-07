import operations from '../images/operations.png'
import contingency from '../images/contingency.png'
import medic from '../images/medic.png'
import quarantine from '../images/quarantine.png'
import researcher from '../images/researcher.png'
import scientist from '../images/scientist.svg'
import dispatcher from '../images/dispatcher.png'
import opdude from '../images/opdude.png'
import codude from '../images/codude.png'
import medude from '../images/medude.png'
import qudude from '../images/qudude.png'
import redude from '../images/redude.png'
import scdude from '../images/scdude.png'
import didude from '../images/didude.png'

const characters = {
    OPERATIONS_EXPERT:{
        name:"Operations Expert",
        img:operations,
        color:'#f00',
        figure:opdude
    },
    CONTINGENCY_PLANNER:{
        name:"Contingency Planner",
        img: contingency,
        color:'blue',
        figure:codude
    },
    MEDIC:{
        name:"Medic",
        img:medic,
        color: '#f48e15',
        figure:medude
    },
    QUARANTINE_SPECIALIST:{
        name:"Quarantine Specialist",
        img:quarantine,
        color:'#0f0',
        figure:qudude
    },
    RESEARCHER:{
        name:"Researcher",
        img:researcher,
        color:'#a08052',
        figure:redude
    },
    SCIENTIST:{
        name:"Scientist",
        img:scientist,
        color:'#bbb',
        figure:scdude
    },
    DISPATCHER:{
        name:"Dispatcher",
        img:dispatcher,
        color:'#881d87',
        figure:didude
    }
}
export default characters;
